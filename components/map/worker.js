// Runs a game's generator, built to WebAssembly, off the page's thread. The
// game's module (the glue wasm-bindgen writes, beside its .wasm) comes by URL
// in each message, so this worker knows no game. Every call is the shared map
// interface: bounds, tile, places, point, and any of the game's own.
//
// Plain JavaScript with no imports: the bundler copies a worker file as it is,
// so it must run in the browser untouched.

/** @type {Promise<Record<string, Function>> | null} */
let loaded = null;

self.onmessage = async (event) => {
  const { id, url, call, args } = event.data;
  try {
    loaded ??= import(
      /* webpackIgnore: true */ /* turbopackIgnore: true */ url
    ).then(async (m) => {
      await m.default();
      return m;
    });
    const m = await loaded;
    const fn = m[call];
    if (typeof fn !== "function" || call === "default") {
      throw new Error(`no call ${call}`);
    }
    const result = fn(...args);
    // Typed arrays go back without copying.
    self.postMessage(
      { id, result },
      { transfer: ArrayBuffer.isView(result) ? [result.buffer] : [] },
    );
  } catch (error) {
    self.postMessage({ id, error: String(error) });
  }
};
