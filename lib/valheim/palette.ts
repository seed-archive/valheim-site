// The colours of the Valheim map: the generator's tile is one byte a pixel,
// `class · 16 + light`, and these palettes turn the bytes into RGBA.

// The land's colours by the generator's biome numbers 1…9: the game's own
// minimap hues, muted and darkened by us so the relief's light and shade read
// on them (the owner, 2026-11-16); Mistlands lilac-grey instead of the game's
// near-black, so its relief shows.
const BIOME_RGB: Record<number, [number, number, number]> = {
  1: [138, 156, 96], // Meadows
  2: [126, 104, 92], // Swamp
  3: [232, 232, 226], // Mountain
  4: [84, 102, 62], // Black Forest
  5: [204, 170, 118], // Plains
  6: [122, 54, 46], // Ashlands
  7: [224, 232, 238], // Deep North
  8: [232, 232, 226], // Ocean (as land: shallows above the water)
  9: [98, 90, 110], // Mistlands
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
  // The shallowest water a little darker than the generator's own ramp, so
  // small islets do not stand out in bright rings.
  const d = 0.12 + depth * 0.88;
  return [30 * (1 - d), 90 * (1 - d) + 30, 170 - 70 * d];
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

function overlayPalette(
  entries: [number, [number, number, number, number]][],
): Uint8ClampedArray {
  const p = new Uint8ClampedArray(256 * 4);
  for (const [i, rgba] of entries) {
    p.set(rgba, i * 4);
  }
  return p;
}

// The generator's overlay layers and their colours: the contour lines, and
// the forest's tree crowns (dark, and lighter on their lit side).
export function overlays() {
  return [
    {
      id: "relief",
      layer: 0,
      palette: overlayPalette([[1, [40, 30, 20, 170]]]),
    },
    {
      id: "forest",
      layer: 1,
      palette: overlayPalette([
        [1, [36, 58, 34, 200]],
        [2, [92, 120, 70, 200]],
      ]),
    },
  ];
}
