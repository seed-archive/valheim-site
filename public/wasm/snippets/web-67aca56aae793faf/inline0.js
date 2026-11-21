export function load_shapes() {
  try {
    const x = new XMLHttpRequest();
    x.open('GET', new URL('../../shapes.bin', import.meta.url), false);
    x.responseType = 'arraybuffer';
    x.send();
    return x.status === 200 ? new Uint8Array(x.response) : new Uint8Array(0);
  } catch (e) {
    return new Uint8Array(0);
  }
}