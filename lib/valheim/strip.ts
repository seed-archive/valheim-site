// The seed's report, biome by biome, as a run reads it (the generator's
// `docs/seed-rating.md`, the owner's specification): the bosses against a
// vertical strip through the start, and the Valheim generator's measures of
// each biome. The page counts nothing of its own but where a boss stands.

import seedStats from "@/lib/valheim/seed-stats.json";

// The strip's width, metres: 5 % of the world's 20 km (the owner, 2026-11-17;
// to be set by the scan).
export const STRIP_WIDTH = 1000;

// A measure of the scan by its dotted path, and whether less is better (a
// distance).
export type Measure = readonly [path: string, less: boolean];

// The blocks of the report, in the run's order, each in one structure (the
// owner, 2026-11-19): the boss's altar against the strip, the biome's trader
// against the strip, whether the boss's altar is on the start island (only
// for a biome that can be on it, `ISLAND_SHARE`), then the generator's
// measures of it (`docs/seed-rating.md` → Two kinds of measure): counts in
// the boss's own biome, or a yes or no within a fixed radius. Every measure
// of a block is scored.
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
    // The Bog Witch against the strip, as every trader (the owner,
    // 2026-11-19); the rest counted in Bonemass's own Swamp (2026-11-17).
    trader: "bogWitch",
    measures: [
      ["region.bonemass.crypt", false],
      ["region.bonemass.fireHole", false],
      ["region.bonemass.scrap", false],
      ["region.bonemass.iron", false],
      ["region.bonemass.abominationsMet", false],
    ],
  },
  {
    biome: "mountain",
    boss: "moder",
    measures: [
      ["region.moder.drakeNest", false],
      ["vegetation.moder.silver", false],
    ],
  },
  {
    biome: "plains",
    boss: "yagluth",
    measures: [
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
    // Yes or no within a fixed radius of the Queen, and her own Mistlands'
    // fragments (the owner's second pass, 2026-11-19); how far the mines
    // stand is the Mistlands guide's.
    measures: [
      ["region.theQueen.enoughFragments", false],
      ["region.theQueen.blackCores", false],
      ["around.theQueen.giantNear", false],
      ["around.theQueen.rootNear", false],
      ["around.theQueen.extractor", false],
    ],
  },
  {
    biome: "ashlands",
    boss: "fader",
    measures: [
      ["around.fader.fortressesNear", false],
      ["around.fader.morgenHolesNear", false],
    ],
  },
  {
    biome: "deepNorth",
    boss: "kall",
    measures: [
      ["around.kall.morkhallaNear", false],
      ["around.kall.holeNear", false],
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

// The share of seeds whose start island holds each biome, from the Valheim
// generator's numbers (`vh guides`, the Meadows guide's "Starting island").
// A block shows "On the start island" only for a biome that can be on it,
// never for the Meadows, which always is (the owner, 2026-11-19).
const ISLAND_SHARE: Record<string, number> = {
  blackForest: seedStats.islandBlackForest,
  swamp: seedStats.islandSwamp,
  mountain: seedStats.islandMountain,
  plains: seedStats.islandPlains,
  mistlands: seedStats.islandMistlands,
  ashlands: seedStats.islandAshlands,
  deepNorth: seedStats.islandDeepNorth,
};

// The block's "On the start island" row, the boss's altar on it (the iron
// carted, not shipped), or null where the biome is never on the island.
export const islandFlag = (biome: string, boss: string): string | null =>
  (ISLAND_SHARE[biome] ?? 0) > 0 ? `bosses.${boss}.island` : null;

// The start-island rows: a no is no fault (the owner, 2026-11-17: Yagluth is
// not expected there), so grey, not red; the island is its own block of the
// score.
export const ISLAND_FLAGS = BIOMES.flatMap((b) => islandFlag(b.biome, b.boss) ?? []);

// Measures that are a yes or a no: the boss on the start island, the sea by
// the base, enough totems and fragments, and what stands within a fixed
// radius of the Queen, Fader and Kall (the owner's second pass, 2026-11-19).
export const YES_NO = [
  ...ISLAND_FLAGS,
  "vegetation.base.shore",
  "region.yagluth.enoughTotems",
  "region.theQueen.enoughFragments",
  "around.theQueen.giantNear",
  "around.theQueen.rootNear",
  "around.fader.fortressesNear",
  "around.fader.morgenHolesNear",
  "around.kall.morkhallaNear",
  "around.kall.holeNear",
];

// Yes or no rows the run can do without: a no is grey, not red (the owner,
// 2026-11-19). The Yggdrasil root's sap serves only the eitr refinery.
export const BONUS = ["around.theQueen.rootNear"];

// Measures shown only as whether the seed has the thing (the owner, 2026-11-19:
// the report says yes or no; how far and how often is the biome guide's): the
// base, a troll cave with two copper veins and tin by it. Still scored by its
// distance.
export const PRESENT = ["joint.base"];

// The reaches of the Valheim generator's measures, metres, for the labels
// (the owner, 2026-11-17 and the second pass, 2026-11-19): fine wood by the
// start, copper, tin, birches and Burial Chambers by the base, silver by
// Moder, the giant's remains and the root by the Queen, the Extractor's
// places by her, Fader's and Kall's places by their altars.
export const REACH = {
  start: 200,
  copper: 100,
  tin: 100,
  birch: 200,
  chambers: 300,
  silver: 100,
  queenNear: 100,
  extractor: 200,
  bossNear: 1000,
};

// What the run asks for (the game's data): the Elder three ancient seeds,
// Moder three dragon eggs, Yagluth five Fuling totems; a troll cave is a base
// with two copper veins by it (the generator's `CAVE_VEINS`); fourteen
// surtling cores (smelter 5, kiln 5, two portals 2 each, the owner); four
// Charred Fortresses for Fader's three bells (nine fragments, an altar giving
// two to four: four fortresses are enough on 80 runs in 81); two Morgen holes
// for two stone portals; three Mörkhalla for Kall's three bloods.
export const NEEDS = { seeds: 3, eggs: 3, totems: 5, veins: 2, cores: 14, fortresses: 4, morgenHoles: 2, morkhalla: 3 };

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
