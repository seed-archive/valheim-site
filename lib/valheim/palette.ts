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

// The trees layer: 1 a tree's shadow, 2 a trunk, 3 a birch's trunk, then four shades a kind from 32 on
// (dark to light), the order the generator draws them in: beech, birch, oak,
// fir, pine, swamp tree, Yggdrasil shoot, Ashlands tree, dead conifer, dead
// swamp tree. Muted, so the forest
// sits in the land; oak warm and birch pale, so both stand out.
const TREE_KINDS: [number, number, number][][] = [
  [[44, 72, 34], [66, 102, 48], [92, 132, 64], [124, 160, 86]], // beech
  [[112, 120, 76], [156, 164, 108], [196, 202, 146], [228, 230, 186]], // birch
  [[74, 66, 26], [116, 98, 38], [160, 128, 52], [204, 162, 74]], // oak
  [[22, 50, 36], [34, 70, 50], [52, 94, 66], [76, 120, 86]], // fir
  [[36, 60, 38], [54, 84, 52], [78, 110, 70], [104, 136, 92]], // pine
  [[52, 44, 30], [74, 64, 44], [92, 108, 58], [122, 138, 78]], // swamp tree: trunk, branches, moss
  [[92, 74, 46], [150, 132, 56], [196, 178, 74], [226, 210, 112]], // Yggdrasil shoot: twig, leaves
  [[30, 24, 22], [52, 40, 34], [74, 56, 46], [96, 72, 58]], // Ashlands tree: burnt trunk, branches
  [[70, 64, 56], [98, 90, 78], [126, 118, 104], [156, 148, 132]], // dead fir or pine
  [[64, 58, 46], [92, 84, 66], [118, 108, 86], [144, 134, 108]], // dead swamp tree
];
export const TREE_COLOURS: [number, [number, number, number, number]][] = [
  [1, [16, 24, 8, 90]],
  [2, [62, 44, 30, 255]], // trunk
  [3, [214, 210, 196, 255]], // birch trunk
  ...TREE_KINDS.flatMap((shades, k) =>
    shades.map(
      ([r, g, b], s): [number, [number, number, number, number]] => [
        32 + k * 4 + s,
        [r, g, b, 240],
      ],
    ),
  ),
];
// The ore layer: 2 an outline, then a class each.
const VEGETATION_SHARED: [number, [number, number, number, number]][] = [
  [2, [28, 28, 24, 230]],
];
// The berries layer: 23 a bush's leaves, then the berries of each kind.
const BERRY_COLOURS: [number, [number, number, number, number]][] = [
  [23, [70, 112, 52, 255]],
  [24, [214, 44, 60, 255]], // raspberry
  [25, [64, 84, 200, 255]], // blueberry
  [26, [240, 160, 40, 255]], // cloudberry
  [27, [150, 20, 40, 255]], // lingonberry
];

export const ORE_COLOURS: [number, [number, number, number, number]][] = [
  [16, [212, 118, 48, 255]], // copper
  [17, [168, 186, 204, 255]], // tin
  [18, [96, 150, 214, 255]], // silver: steel blue, to stand out on snow
  [19, [146, 62, 40, 255]], // swamp iron (muddy scrap piles)
  [20, [52, 34, 74, 255]], // obsidian
  [21, [120, 204, 92, 255]], // ancient root
  [22, [64, 124, 176, 255]], // Leviathan
];

// The generator's overlay layers and their colours: the contour lines, the
// trees and the ore.
export function overlays() {
  return [
    {
      id: "relief",
      layer: 0,
      palette: overlayPalette([[1, [40, 30, 20, 170]]]),
    },
    {
      id: "trees",
      layer: 1,
      palette: overlayPalette(TREE_COLOURS),
    },
    {
      id: "fineWood",
      layer: 2,
      palette: overlayPalette([
        ...VEGETATION_SHARED,
        [4, [236, 236, 205, 255]],
        [5, [214, 140, 44, 255]],
      ]),
    },
    {
      id: "ore",
      layer: 3,
      palette: overlayPalette([...VEGETATION_SHARED, ...ORE_COLOURS]),
    },
    {
      id: "berries",
      layer: 4,
      palette: overlayPalette([...VEGETATION_SHARED, ...BERRY_COLOURS]),
    },
  ];
}
