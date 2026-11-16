// A pool of workers running one game's generator (worker.ts). Each worker
// keeps the last seed's world, so a seed costs its setup once per worker.
// Tiles go round-robin; places, points and the game's own calls go to the
// first worker, which keeps them.

// Our own choice: enough to fill a screen quickly, leaving a core to the page.
const MAX_WORKERS = 6;

type Reply = { id: number; result?: unknown; error?: string };

export type Bounds = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  // A round world's radius; 0 for a rectangle.
  radius: number;
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

  async bounds(): Promise<Bounds> {
    const [x0, y0, x1, y1, radius] = await this.call<Float32Array>(
      "bounds",
      [],
    );
    return { x0, y0, x1, y1, radius };
  }

  // One byte a pixel, an index into the game's palette: the top-left pixel
  // centred at world (x0, y0), `step` units a pixel, rows going down (−y).
  tile(seed: string, x0: number, y0: number, step: number, size: number) {
    return this.call<Uint8Array>("tile", [seed, x0, y0, step, size], this.next);
  }

  overlay(
    seed: string,
    kind: number,
    x0: number,
    y0: number,
    step: number,
    size: number,
  ) {
    return this.call<Uint8Array>(
      "overlay",
      [seed, kind, x0, y0, step, size],
      this.next,
    );
  }

  places(seed: string) {
    return this.call<Float32Array>("places", [seed]);
  }

  point(seed: string, x: number, y: number) {
    return this.call<Float32Array>("point", [seed, x, y]);
  }

  close() {
    this.workers.forEach((worker) => worker.terminate());
    this.pending.clear();
  }
}
