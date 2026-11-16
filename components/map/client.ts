// A pool of workers running one game's generator (worker.ts). Each worker
// keeps the last seed's world, so a seed costs its setup once per worker.
// Tiles go round-robin; places, points and the game's own calls go to the
// first worker, which keeps them.

// Our own choice: enough to fill a screen quickly, leaving a core to the page.
const MAX_WORKERS = 6;

type Reply = { id: number; result?: unknown; error?: string };

// One world of a seed (interface v1): its kind, which the game's page names
// (Valheim's kind 0 is a disc), and its extent.
export type World = {
  kind: number;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
};

export class MapClient {
  private readonly workers: Worker[];
  private readonly pending = new Map<
    number,
    { resolve: (value: unknown) => void; reject: (reason: Error) => void }
  >();
  private next = 0;

  // `moduleUrl`: the game's wasm-bindgen glue (an absolute URL); `workers`:
  // how many, by default as many as the screen's tiles want.
  constructor(
    private readonly moduleUrl: string,
    workers?: number,
  ) {
    const count =
      workers ??
      Math.max(
        1,
        Math.min(MAX_WORKERS, (navigator.hardwareConcurrency || 2) - 1),
      );
    this.workers = Array.from({ length: count }, () => {
      const worker = new Worker(new URL("./worker.js", import.meta.url), {
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

  // Any call of the game's module, on the first worker unless told otherwise.
  call<T>(call: string, args: unknown[], worker = 0): Promise<T> {
    const id = this.next++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, {
        resolve: resolve as (value: unknown) => void,
        reject,
      });
      this.workers[worker % this.workers.length].postMessage({
        id,
        url: this.moduleUrl,
        call,
        args,
      });
    });
  }

  // The interface's calls (generators.md, "One interface for every game's
  // map", version 1).

  async worlds(seed: string): Promise<World[]> {
    const raw = await this.call<Float64Array>("worlds", [seed]);
    const out: World[] = [];
    for (let i = 0; i + 4 < raw.length; i += 5) {
      out.push({
        kind: raw[i],
        x0: raw[i + 1],
        y0: raw[i + 2],
        x1: raw[i + 3],
        y1: raw[i + 4],
      });
    }
    return out;
  }

  // One byte a pixel, an index into the game's palette, 0 for nothing: the
  // top-left pixel centred at (x0, y0), `step` units a pixel, rows going down.
  tile(
    seed: string,
    world: number,
    x0: number,
    y0: number,
    step: number,
    size: number,
  ) {
    return this.call<Uint8Array>(
      "tile",
      [seed, world, x0, y0, step, size],
      this.next,
    );
  }

  overlay(
    seed: string,
    world: number,
    layer: number,
    x0: number,
    y0: number,
    step: number,
    size: number,
  ) {
    return this.call<Uint8Array>(
      "overlay",
      [seed, world, layer, x0, y0, step, size],
      this.next,
    );
  }

  places(seed: string, world: number) {
    return this.call<Float32Array>("places", [seed, world]);
  }

  point(seed: string, world: number, x: number, y: number) {
    return this.call<Float64Array>("point", [seed, world, x, y]);
  }

  close() {
    this.workers.forEach((worker) => worker.terminate());
    this.pending.clear();
  }
}
