import generator from "./generator.json";
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

// The trees layer: 1 a tree's shadow, then the trees' own colours from 32 on,
// eight a tree, rendered from the game's meshes and textures by the generator.
export const TREE_COLOURS: [number, [number, number, number, number]][] = [
  [1, [16, 24, 8, 90]],
  ...(generator.treePalette as number[][]).map(
    ([r, g, b], i): [number, [number, number, number, number]] => [
      32 + i,
      [r, g, b, 255],
    ],
  ),
];
// The berries layer: 23 a bush's leaves, then the berries of each kind.
const BERRY_COLOURS: [number, [number, number, number, number]][] = [
  [23, [70, 112, 52, 255]],
  [24, [214, 44, 60, 255]], // raspberry
  [25, [64, 84, 200, 255]], // blueberry
  [26, [240, 160, 40, 255]], // cloudberry
  [27, [150, 20, 40, 255]], // lingonberry
];

// The spawners layer's pins, a colour a kind of creature (our own choice): the
// Valheim generator's classes from 40.
const SPAWNER_COLOURS: [number, [number, number, number, number]][] = [
  [40, [46, 125, 50, 255]], // greydwarfNest
  [41, [124, 179, 66, 255]], // greydwarfs
  [42, [224, 224, 224, 255]], // skeletons
  [43, [161, 136, 127, 255]], // boars
  [44, [57, 73, 171, 255]], // trolls
  [45, [93, 64, 55, 255]], // bears
  [46, [85, 139, 47, 255]], // draugr
  [47, [144, 164, 174, 255]], // wraiths
  [48, [104, 159, 56, 255]], // blobs
  [49, [120, 144, 156, 255]], // golems
  [50, [251, 192, 45, 255]], // fulings
  [51, [142, 36, 170, 255]], // seekers
  [52, [173, 20, 87, 255]], // ticks
  [53, [0, 137, 123, 255]], // dvergr
  [54, [230, 74, 25, 255]], // charred
  [55, [255, 112, 67, 255]], // voltures
  [56, [69, 39, 160, 255]], // morgens
  [57, [176, 190, 197, 255]], // ghosts
  [58, [27, 94, 32, 255]], // abominations
  [59, [66, 66, 66, 255]], // bats
  [60, [198, 40, 40, 255]], // cultists
  [61, [96, 125, 139, 255]], // ulvs
  [62, [191, 54, 12, 255]], // twitchers
  [63, [121, 85, 72, 255]], // otherCreatures
  [64, [84, 110, 122, 255]], // fenrings
  [65, [3, 155, 229, 255]], // drakes
  [66, [255, 214, 0, 255]], // valkyries
  [67, [109, 76, 65, 255]], // writhans
  [68, [0, 77, 64, 255]], // leeches
  [69, [255, 61, 0, 255]], // surtlings
  [70, [128, 222, 234, 255]], // fryslings
];

export const ORE_COLOURS: [number, [number, number, number, number]][] = [
  [16, [212, 118, 48, 255]], // copper
  [17, [168, 186, 204, 255]], // tin
  [18, [40, 176, 255, 255]], // silver: bright blue, to stand out on snow and rock
  [19, [146, 62, 40, 255]], // swamp iron (muddy scrap piles)
  [20, [52, 34, 74, 255]], // obsidian
  [21, [120, 204, 92, 255]], // ancient root
  [22, [64, 124, 176, 255]], // Leviathan
  [23, [226, 218, 196, 255]], // the giants' remains: soft tissue
  [28, [250, 196, 30, 255]], // a house with a beehive
  [29, [246, 232, 170, 255]], // a Fuling village's barley field: pale wheat
  [30, [176, 140, 230, 255]], // its flax field: lilac
  [31, [150, 40, 30, 255]], // a bonfire with a Fuling totem
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
  ];
}

// The kinds each layer shows, each with a checkbox of its own under the
// layer's: a mark the generator draws (its palette number) with its name key
// (pages.map.legend), or a place's pin by its key (pages.map.places).
export type Kind = { mark: number; key: string } | { pin: string };
export const KINDS: Record<string, Kind[]> = {
  spawners: [
    { mark: 40, key: "greydwarfNest" },
    { mark: 42, key: "skeletons" },
    { mark: 43, key: "boars" },
    { mark: 44, key: "trolls" },
    { mark: 45, key: "bears" },
    { mark: 46, key: "draugr" },
    { mark: 47, key: "wraiths" },
    { mark: 48, key: "blobs" },
    { mark: 49, key: "golems" },
    { mark: 50, key: "fulings" },
    { mark: 51, key: "seekers" },
    { mark: 52, key: "ticks" },
    { mark: 53, key: "dvergr" },
    { mark: 54, key: "charred" },
    { mark: 55, key: "voltures" },
    { mark: 56, key: "morgens" },
    { mark: 57, key: "ghosts" },
    { mark: 58, key: "abominations" },
    { mark: 59, key: "bats" },
    { mark: 60, key: "cultists" },
    { mark: 61, key: "ulvs" },
    { mark: 62, key: "twitchers" },
    { mark: 63, key: "otherCreatures" },
    { mark: 64, key: "fenrings" },
    { mark: 65, key: "drakes" },
    { mark: 66, key: "valkyries" },
    { mark: 67, key: "writhans" },
    { mark: 68, key: "leeches" },
    { mark: 69, key: "surtlings" },
    { mark: 70, key: "fryslings" },
  ],
  dungeons: [
    { pin: "burialChamber" },
    { pin: "trollCave" },
    { pin: "sunkenCrypt" },
    { pin: "frostCave" },
    { pin: "infestedMine" },
    { pin: "fortress" },
    { pin: "fulingOutpost" },
    { pin: "morkhalla" },
    { pin: "theHole" },
    { pin: "hildirCave" },
    { pin: "hildirCrypt" },
    { pin: "hildirFortress" },
  ],
  ore: [
    { mark: 18, key: "silver" },
    { mark: 19, key: "iron" },
    { mark: 16, key: "copper" },
    { mark: 17, key: "tin" },
    { mark: 20, key: "obsidian" },
    { mark: 23, key: "giantRemains" },
    { mark: 22, key: "leviathan" },
  ],
  resources: [
    { pin: "tarPit" },
    { pin: "fulingVillage" },
    { pin: "drakeNest" },
    { pin: "northHomestead" },
    { mark: 28, key: "beehive" },
    { mark: 29, key: "barley" },
    { mark: 30, key: "flax" },
    { mark: 31, key: "totem" },
    { mark: 21, key: "ancientRoot" },
    { mark: 24, key: "raspberry" },
    { mark: 25, key: "blueberry" },
    { mark: 26, key: "cloudberry" },
    { mark: 27, key: "lingonberry" },
  ],
  fineWood: [
    { mark: 4, key: "birch" },
    { mark: 5, key: "oak" },
  ],
};

// The name key of a kind: a place's, or a mark's.
export function kindKey(kind: Kind): string {
  return "pin" in kind ? kind.pin : kind.key;
}

// A mark's colour, as CSS.
export function markColour(layer: string, mark: number): string {
  const all: [number, [number, number, number, number]][] =
    layer === "fineWood"
      ? [
          [4, [236, 236, 205, 255]],
          [5, [214, 140, 44, 255]],
        ]
      : layer === "resources" && mark >= 23 && mark < 28
        ? BERRY_COLOURS
        : layer === "spawners"
          ? SPAWNER_COLOURS
          : ORE_COLOURS;
  const c = all.find(([i]) => i === mark)?.[1] ?? [0, 0, 0, 255];
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}
