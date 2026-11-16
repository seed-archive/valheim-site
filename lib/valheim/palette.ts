// The colours of the Valheim map: the generator's tile is one byte a pixel,
// `class · 16 + light`, and these palettes turn the bytes into RGBA.

// The minimap's biome colours (the game's Minimap fields, as the Valheim
// generator reads them), by the generator's biome numbers 1…9; Mistlands is the
// game's code default 0.2 grey.
const BIOME_RGB: Record<number, [number, number, number]> = {
  1: [146, 167, 92], // Meadows
  2: [163, 114, 88], // Swamp
  3: [255, 255, 255], // Mountain
  4: [107, 116, 63], // Black Forest
  5: [231, 171, 120], // Plains
  6: [123, 32, 32], // Ashlands
  7: [255, 255, 255], // Deep North
  8: [255, 255, 255], // Ocean (as land: shallows above the water)
  9: [51, 51, 51], // Mistlands
};

// The generator's light levels: 16 steps from shade to sun over this range
// (its SHADE_RANGE), and its sea: classes 10…15, depth 0…60 m in six bands.
const LIGHT = { from: 0.3, to: 1.55, levels: 16 };
const WATER_CLASS = 10;
const WATER_BANDS = 6;

function lightOf(level: number) {
  return LIGHT.from + (level / (LIGHT.levels - 1)) * (LIGHT.to - LIGHT.from);
}

// The sea's colour at a depth from 0 (shallow) to 1 (60 m and deeper): our
// own ramp from blue-green to deep blue.
function sea(depth: number): [number, number, number] {
  return [30 * (1 - depth), 90 * (1 - depth) + 30, 170 - 70 * depth];
}

export const DEEP_SEA = "rgb(0, 30, 100)";

export function mapPalette(): Uint8ClampedArray {
  const p = new Uint8ClampedArray(256 * 4);
  const put = (i: number, rgb: [number, number, number], light: number) => {
    p[i * 4] = rgb[0] * light;
    p[i * 4 + 1] = rgb[1] * light;
    p[i * 4 + 2] = rgb[2] * light;
    p[i * 4 + 3] = 255;
  };
  for (let level = 0; level < LIGHT.levels; level++) {
    const light = lightOf(level);
    for (const [biome, rgb] of Object.entries(BIOME_RGB)) {
      put(Number(biome) * 16 + level, rgb, light);
    }
    for (let band = 0; band < WATER_BANDS; band++) {
      put(
        (WATER_CLASS + band) * 16 + level,
        sea((band + 0.5) / WATER_BANDS),
        light,
      );
    }
  }
  return p;
}

// A sub-biome's colour: hues spread by the golden angle, so neighbours in the
// list differ (our own choice).
export function subBiomeColour(index: number): [number, number, number] {
  const h = ((index * 137.508) % 360) / 60;
  const x = 1 - Math.abs((h % 2) - 1);
  const [r, g, b] =
    h < 1
      ? [1, x, 0]
      : h < 2
        ? [x, 1, 0]
        : h < 3
          ? [0, 1, x]
          : h < 4
            ? [0, x, 1]
            : h < 5
              ? [x, 0, 1]
              : [1, 0, x];
  return [40 + r * 200, 40 + g * 200, 40 + b * 200];
}

function overlayPalette(
  entries: [number, [number, number, number, number]][],
): Uint8ClampedArray {
  const p = new Uint8ClampedArray(256 * 4);
  for (const [i, rgba] of entries) {
    p.set(rgba, i * 4);
  }
  return p;
}

// The generator's overlay kinds and their colours.
export function overlays(subBiomes: number) {
  return [
    {
      id: "subBiomes",
      kind: 0,
      palette: overlayPalette(
        Array.from({ length: subBiomes }, (_, i) => [
          i + 1,
          [...subBiomeColour(i), 120] as [number, number, number, number],
        ]),
      ),
    },
    {
      id: "swampWidth",
      kind: 1,
      palette: overlayPalette([
        [1, [40, 200, 70, 150]],
        [2, [230, 50, 40, 150]],
      ]),
    },
    {
      id: "relief",
      kind: 2,
      palette: overlayPalette([[1, [40, 30, 20, 170]]]),
    },
  ];
}
