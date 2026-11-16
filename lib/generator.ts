import type { PlaceGroup } from "@/lib/places";
import { BASE_PATH } from "@/lib/site";

// A pool of workers running the Valheim generator in WebAssembly
// (public/wasm/worker.js). Each worker keeps the last seed's world, so a seed
// costs its setup once per worker. Tiles go round-robin; the seed's places,
// measures and point queries go to the first worker, which keeps them.

// Our own choice: enough to fill a screen quickly, leaving a core to the page.
const MAX_WORKERS = 6;

type Call = "tile" | "overlay" | "legend" | "places" | "point" | "measure";
type Reply = { id: number; result?: unknown; error?: string };

export type Pixels = Uint8ClampedArray<ArrayBuffer>;

export class Generator {
  private readonly workers: Worker[];
  private readonly pending = new Map<
    number,
    { resolve: (value: unknown) => void; reject: (reason: Error) => void }
  >();
  private next = 0;

  constructor() {
    const count = Math.max(
      1,
      Math.min(MAX_WORKERS, (navigator.hardwareConcurrency || 2) - 1),
    );
    this.workers = Array.from({ length: count }, () => {
      const worker = new Worker(`${BASE_PATH}/wasm/worker.js`, {
        type: "module",
      });
      worker.onmessage = (event: MessageEvent<Reply>) => {
        const { id, result, error } = event.data;
        const job = this.pending.get(id);
        this.pending.delete(id);
        if (error) {
          job?.reject(new Error(error));
        } else {
          job?.resolve(result);
        }
      };
      return worker;
    });
  }

  private call(worker: number, call: Call, args: unknown[]): Promise<unknown> {
    const id = this.next++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.workers[worker].postMessage({ id, call, args });
    });
  }

  private async pixels(call: Call, args: unknown[]): Promise<Pixels> {
    const worker = this.next % this.workers.length;
    const result = (await this.call(worker, call, args)) as Uint8Array;
    return new Uint8ClampedArray(result.buffer as ArrayBuffer);
  }

  // The map: the top-left pixel centred at world (x0, z0), `step` metres a
  // pixel, rows going south.
  tile(seed: string, x0: number, z0: number, step: number, size: number) {
    return this.pixels("tile", [seed, x0, z0, step, size]);
  }

  overlay(
    seed: string,
    kind: number,
    x0: number,
    z0: number,
    step: number,
    size: number,
  ) {
    return this.pixels("overlay", [seed, kind, x0, z0, step, size]);
  }

  async legend(): Promise<Legend> {
    return JSON.parse((await this.call(0, "legend", [])) as string);
  }

  async places(seed: string): Promise<[number, number, number, number][]> {
    return JSON.parse((await this.call(0, "places", [seed])) as string);
  }

  async point(seed: string, x: number, z: number): Promise<PointInfo> {
    return JSON.parse((await this.call(0, "point", [seed, x, z])) as string);
  }

  async measure(seed: string): Promise<SeedMeasures> {
    return JSON.parse((await this.call(0, "measure", [seed])) as string);
  }

  close() {
    this.workers.forEach((worker) => worker.terminate());
    this.pending.clear();
  }
}

export type Legend = {
  locations: { group: PlaceGroup; key: string; unique: boolean }[];
  subBiomes: { name: string; colour: string }[];
};

export type PointInfo = {
  biome: string;
  height: number;
  subBiomes: string[];
  wideSwamp: boolean;
};

// One place measured from the start (the generator's seed measures).
export type Placed = {
  x: number;
  z: number;
  d: number;
  angle: number;
  offLine: number;
  sea: number;
  island: boolean;
};

export type SeedMeasures = {
  start: { x: number; z: number; fromCentre: number };
  area: Record<string, number>;
  land: Record<string, number>;
  island: {
    area: Record<string, number>;
    interior: Record<string, number>;
  };
  bosses: Record<string, Placed>;
  traders: Record<string, Placed>;
  dungeons: Record<
    string,
    { nearest: number | null; near: number; island: number }
  >;
  highest: number;
  error?: string;
};
