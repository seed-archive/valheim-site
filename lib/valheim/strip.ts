// The seed's report, biome by biome, as a run reads it (the generator's
// `docs/seed-rating.md`, the owner's specification): the bosses against a
// vertical strip through the start, and the Valheim generator's measures of
// each biome. The page counts nothing of its own but where a boss stands.

// The strip's width, metres: 5 % of the world's 20 km (the owner, 2026-11-17;
// to be set by the scan).
export const STRIP_WIDTH = 1000;

// A measure of the scan by its dotted path, and whether less is better (a
// distance).
export type Measure = readonly [path: string, less: boolean];

// The blocks of the report, in the run's order: each biome's boss, its
// trader, and the generator's measures of it (`docs/seed-rating.md` → Two kinds
// of measure): counts in the boss's own biome, metres only where things must
// stand side by side. Every measure of a block is scored.
export const BIOMES: { biome: string; boss: string; trader?: string; measures: Measure[] }[] = [
  {
    biome: "meadows",
    boss: "eikthyr",
    trader: "hildir",
    measures: [
      ["bees.near", false],
      ["vegetation.start.birches", false],
      ["vegetation.start.oaks", false],
      ["region.start.cores", false],
    ],
  },
  {
    biome: "blackForest",
    boss: "theElder",
    trader: "haldor",
    // Everything of the forest is counted from one base, the generator's
    // copper troll cave (the owner, 2026-11-17).
    measures: [
      ["bosses.theElder.island", false],
      ["joint.base", true],
      ["vegetation.base.copper", false],
      ["vegetation.base.shore", false],
      ["vegetation.base.tin", false],
      ["vegetation.base.birches", false],
      ["vegetation.base.greydwarfNests", false],
      ["vegetation.base.chambers", false],
      ["vegetation.base.cores", false],
    ],
  },
  {
    biome: "swamp",
    boss: "bonemass",
    // All counted in Bonemass's own Swamp (the owner, 2026-11-17); the Bog
    // Witch by whether she stands in it, not by the strip.
    measures: [
      ["bosses.bonemass.island", false],
      ["region.bonemass.bogWitch", false],
      ["region.bonemass.crypt", false],
      ["region.bonemass.fireHole", false],
      ["region.bonemass.scrap", false],
      ["region.bonemass.iron", false],
      ["region.bonemass.abominationZones", false],
    ],
  },
  {
    biome: "mountain",
    boss: "moder",
    measures: [
      ["bosses.moder.island", false],
      ["region.moder.drakeNest", false],
      ["vegetation.moder.silver", false],
    ],
  },
  {
    biome: "plains",
    boss: "yagluth",
    measures: [
      ["bosses.yagluth.island", false],
      ["region.yagluth.enoughTotems", false],
      ["region.yagluth.village", false],
      ["region.yagluth.tower", false],
      ["region.yagluth.totems", false],
      ["region.yagluth.barley", false],
      ["region.yagluth.flax", false],
    ],
  },
  {
    biome: "mistlands",
    boss: "theQueen",
    measures: [
      ["joint.theQueen", true],
      ["region.theQueen.fragments", false],
      ["around.theQueen.fragmentsNear", false],
      ["region.theQueen.blackCores", false],
      ["around.theQueen.giant1", true],
      ["around.theQueen.root1", true],
      ["around.theQueen.extractor", false],
      ["around.theQueen.extractors", false],
      ["around.theQueen.extractorM", true],
    ],
  },
  {
    biome: "ashlands",
    boss: "fader",
    measures: [
      ["joint.fader", true],
      ["around.fader.fortress1", true],
      ["around.fader.morgenHole2", true],
    ],
  },
  {
    biome: "deepNorth",
    boss: "kall",
    measures: [
      ["joint.kall", true],
      ["around.kall.morkhalla1", true],
      ["around.kall.hole1", true],
    ],
  },
];

// Measures that are the mean over a dungeon's 16 yaws (the Burial Chambers'
// and Sunken Crypts' seed depends on the yaw, `docs/dungeons.md`): shown as
// "about", with the least and the most of the 16 (`<path>Min`, `<path>Max`).
export const ABOUT = ["region.start.cores", "vegetation.base.cores", "region.bonemass.scrap", "region.bonemass.iron"];

// Measures coloured by what the run needs, not by the scan (the owner,
// 2026-11-17): fewer red, exactly the need grey, more green.
export const NEED_OF: Record<string, number> = {
  "region.yagluth.totems": 5,
  "region.start.cores": 14,
  "vegetation.base.cores": 14,
  "around.theQueen.fragmentsNear": 9,
};

// Measures that only explain another row, or have no known need: grey, and
// left out of the score (the villages and outposts serve the totems and crops;
// the barley and flax wait for the amount a farm needs).
export const NEUTRAL = [
  "region.yagluth.village",
  "region.yagluth.tower",
  "region.yagluth.barley",
  "region.yagluth.flax",
];

// Measures that are a yes or a no: the boss on the start island (the iron
// carted, not shipped), the sea by the base, the Bog Witch in his Swamp.
export const YES_NO = [
  "bosses.theElder.island",
  "bosses.bonemass.island",
  "bosses.moder.island",
  "bosses.yagluth.island",
  "vegetation.base.shore",
  "region.bonemass.bogWitch",
  "region.yagluth.enoughTotems",
];

// The start-island rows: a no is no fault (the owner, 2026-11-17: Yagluth is
// not expected there), so grey, not red.
export const ISLAND_FLAGS = YES_NO.filter((m) => m.endsWith(".island"));

// The reaches of the Valheim generator's measures, metres, for the labels
// (`START_WOOD`, `CAVE_COPPER`, `BASE_TIN`, `BASE_BIRCH`, `BASE_CHAMBERS`,
// `SILVER_REACH`; the owner, 2026-11-17).
export const REACH = { start: 200, copper: 100, tin: 200, birch: 200, chambers: 300, silver: 200, extractor: 500 };

// What the run asks for (the game's data): the Elder three ancient seeds,
// Moder three dragon eggs, Yagluth five Fuling totems; a troll cave is a base
// with two copper veins by it (the generator's `CAVE_VEINS`); fourteen
// surtling cores (smelter 5, kiln 5, two portals 2 each, the owner); nine
// Sealbreaker fragments.
export const NEEDS = { seeds: 3, eggs: 3, totems: 5, veins: 2, cores: 14, fragments: 9 };

// One boss or trader: the nearest one in the strip, by the way along it from
// the start (north positive), or, when the strip holds none, the nearest
// anywhere and how far it lies beside the strip.
export type Found = {
  key: string;
  inStrip: { along: number } | null;
  nearest: { distance: number; aside: number } | null;
};

type Point = { x: number; y: number };

const inStrip = (startX: number, x: number) => Math.abs(x - startX) <= STRIP_WIDTH / 2;
const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

export function find(start: Point, points: Point[], key: string): Found {
  const strip = points
    .filter((p) => inStrip(start.x, p.x))
    .sort((a, b) => Math.abs(a.y - start.y) - Math.abs(b.y - start.y))[0];
  const nearest = [...points].sort((a, b) => distance(start, a) - distance(start, b))[0];
  return {
    key,
    inStrip: strip ? { along: strip.y - start.y } : null,
    nearest: nearest
      ? {
          distance: distance(start, nearest),
          aside: Math.max(0, Math.abs(nearest.x - start.x) - STRIP_WIDTH / 2),
        }
      : null,
  };
}
