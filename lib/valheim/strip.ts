// The seed's report, biome by biome, as a run reads it (the generator's
// `docs/seed-rating.md`, the owner's specification): the bosses and traders
// against a vertical strip through the start, `stripM` wide (2 km since
// 2026-11-23), and the Valheim generator's measures of each biome. The page
// counts nothing of its own but where a boss or trader stands.

import type { Ranks } from "@/lib/scan";
import guideValues from "@/lib/valheim/guide-values.json";
import report from "@/lib/valheim/report.json";
import seedStats from "@/lib/valheim/seed-stats.json";

// A measure of the scan by its dotted path, and whether less is better (a
// distance).
export type Measure = readonly [path: string, less: boolean];

// The report's rows live in `report.json` (the owner, 2026-11-22: one source
// the page and the Valheim generator's `vh best` both read, so the best seeds
// are chosen by the page's own rules; `docs/seed-rating.md` → The report by the
// strip's rule). A need there is a number or the key of one of the generator's
// numbers (`seed-stats.json`, `guide-values.json`), so no number is typed.
const NUMBERS = { ...seedStats, ...guideValues } as Record<string, number>;
const number = (need: string | number) =>
  typeof need === "number" ? need : NUMBERS[need];

// The blocks of the report, in the run's order: the boss and the trader in
// the strip (`strip`), first in the block; then its measures.
export const BIOMES: {
  biome: string;
  boss: string;
  strip: Measure[];
  measures: Measure[];
}[] = report.blocks.map((b) => ({
  biome: b.biome,
  boss: b.boss,
  strip: b.strip.map(([p, l]) => [p as string, l as boolean] as const),
  measures: b.measures.map(([p, l]) => [p as string, l as boolean] as const),
}));

// Measures that are the mean over a dungeon's 16 yaws (the Burial Chambers'
// and Sunken Crypts' seed depends on the yaw, `docs/dungeons.md`): shown as
// "about", with the least and the most of the 16 (`<path>Min`, `<path>Max`).
export const ABOUT = report.about;

// Measures coloured by what the run needs, not by the scan (the owner,
// 2026-11-17): fewer red, exactly the need grey, more green.
export const NEED_OF: Record<string, number> = Object.fromEntries(
  Object.entries(report.needOf).map(([p, need]) => [p, number(need)]),
);

// Yes or no by a count (the owner, 2026-11-28, from a speedrunner: the
// Sealbreaker's fragments from one or two quick mines, three at most; every
// mine is found and its guards fought, so the count of mines matters, not the
// metres): at most `full` a full yes, at most `most` a yes worth half (the
// owner: three mines a little lower), beyond it a no. The row shows the count
// beside its answer; `need` and `name` fill its label as a `WITHIN` row's do
// (`{name}` the need, `{nameMost}` the most).
export const AT_MOST: Record<
  string,
  { full: number; most: number; need: number; name: string }
> = Object.fromEntries(
  Object.entries(report.atMost).map(([p, a]) => [
    p,
    { full: a.full, most: a.most, need: number(a.need), name: a.name },
  ]),
);
// An `AT_MOST` row's tier: "high" at most `full`, "mid" at most `most`, else
// (or none) "low".
export const atMostTier = (
  path: string,
  x: number | undefined,
): "high" | "mid" | "low" => {
  const a = AT_MOST[path];
  return x === undefined || x > a.most ? "low" : x <= a.full ? "high" : "mid";
};
// The rows a run cannot do without (the owner, 2026-11-28: more than three
// mines for the fragments and the seed is not considered): a no here keeps a
// seed off the best seeds' list, and the report says so.
export const GATES = report.gates;

// Rows every seed answers alike: grey, and left out of the score.
export const NEUTRAL = report.neutral;

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
// carted, not shipped), or null where the biome is never on the island. The
// Meadows show it too (the owner, 2026-11-22: every block alike), grey, since
// the start island always holds them.
export const islandFlag = (biome: string, boss: string): string | null =>
  biome === "meadows" || (ISLAND_SHARE[biome] ?? 0) > 0
    ? `bosses.${boss}.island`
    : null;

// The start-island rows: a no is no fault (the owner, 2026-11-17: Yagluth is
// not expected there), so grey, not red; the island is its own block of the
// score.
export const ISLAND_FLAGS = BIOMES.flatMap(
  (b) => islandFlag(b.biome, b.boss) ?? [],
);

// Measures that are a yes or a no: the boss on the start island, the sea by
// the base, enough totems and fragments, and what stands within a fixed
// radius of the Queen, Fader and Kall (the owner's second pass, 2026-11-19).
export const YES_NO = [...ISLAND_FLAGS, ...report.yesNo];

// Yes or no by a distance (the owner, 2026-11-22): the measure is how far the
// n-th nearest place stands, and the row asks whether the need lies within the
// scan's median of it, rounded to `WITHIN_ROUND_M`. Each gives its need and the
// name its label fills (`{name}` the need, `{nameM}` the radius): the beehives
// one fermenter keeps busy (the Valheim generator's `hivesFive`), the Elder's
// Greydwarf camps, the surtling cores of the Burial Chambers.
export const WITHIN: Record<string, { need: number; name: string }> =
  Object.fromEntries(
    Object.entries(report.within).map(([p, w]) => [
      p,
      { need: number(w.need), name: w.name },
    ]),
  );
// The radius's rounding, metres: our own choice (the owner, 2026-11-22).
const WITHIN_ROUND_M = report.roundM;
// The radius asked is the scan's upper quarter of the distance (the owner,
// 2026-11-22, by the quarters, not the median, so a no is the worst quarter of
// seeds and not every other one), rounded; the ranks' 21 points are every
// fifth percentile, so the 15th is 75 % and the 5th 25 %.
const ASKED = report.quarterPoints.upper;
const NEAR = report.quarterPoints.lower;
export const withinM = (ranks: Ranks, path: string): number | null => {
  const q = ranks.measures[path];
  return Array.isArray(q)
    ? Math.round(q[ASKED] / WITHIN_ROUND_M) * WITHIN_ROUND_M
    : null;
};
// A distance row's quarter: within the scan's lower quarter green, within the
// asked radius grey, beyond it (or none within reach) red.
export const withinTier = (
  ranks: Ranks,
  path: string,
  x: number | undefined,
): "high" | "mid" | "low" | null => {
  const q = ranks.measures[path];
  const r = withinM(ranks, path);
  if (!Array.isArray(q) || r === null) {
    return null;
  }
  return x === undefined || x > r ? "low" : x <= q[NEAR] ? "high" : "mid";
};

// Numbers with no need, coloured by the scan's quarters (the owner,
// 2026-11-22): red at or below the lower quarter, green at or above the upper,
// grey between.
export const QUARTERS = report.quarters;
const LOWER = report.quarterPoints.lower;
const UPPER = report.quarterPoints.upper;
export const quarter = (
  ranks: Ranks,
  path: string,
  v: number,
): "low" | "mid" | "high" | null => {
  const q = ranks.measures[path];
  if (!Array.isArray(q)) {
    return null;
  }
  return v <= q[LOWER] ? "low" : v >= q[UPPER] ? "high" : "mid";
};

// Yes or no rows the run can do without: a no is grey, not red (the owner,
// 2026-11-19). The Yggdrasil root's sap serves only the eitr refinery.
export const BONUS = report.bonus;

// Measures shown only as whether the seed has the thing (the owner, 2026-11-19:
// the report says yes or no; how far and how often is the biome guide's): the
// base, a troll cave with two copper veins and tin by it. Still scored by its
// distance.
export const PRESENT = ["joint.base"];

// The reaches of the Valheim generator's measures, metres, for the labels
// (the owner, 2026-11-17 and the second pass, 2026-11-19): fine wood by the
// start, copper, tin and Burial Chambers by the base, silver by Moder, the
// giant's remains and the root by the Queen, the Extractor's places by her,
// Fader's and Kall's places by their altars. The base's birches left the
// report (the owner, 2026-11-22: a median of three decides nothing).
export const REACH = {
  start: 200,
  copper: 100,
  tin: 100,
  chambers: 300,
  silver: 100,
  queenNear: 100,
  extractor: 200,
  bossNear: 1000,
  // No Fuling village within this of Yagluth's altar (the generator's
  // `VILLAGE_CLEAR_M`: a Fuling's farthest sense, 50 m, and its wander, 50).
  villageClear: 100,
};

// What the run asks for (the game's data): the Elder three ancient seeds,
// Moder three dragon eggs, Yagluth five Fuling totems; a troll cave is a base
// with two copper veins by it (the generator's `CAVE_VEINS`); fourteen
// surtling cores (smelter 5, kiln 5, two portals 2 each, the owner); four
// Charred Fortresses for Fader's three bells (nine fragments, an altar giving
// two to four: four fortresses are enough on 80 runs in 81); two Morgen holes
// for two stone portals; three Mörkhalla for Kall's three bloods.
export const NEEDS = {
  seeds: 3,
  eggs: 3,
  totems: 5,
  veins: 2,
  cores: 14,
  fortresses: 4,
  morgenHoles: 2,
  morkhalla: 3,
  iron: guideValues.runIron,
  harness: seedStats.harnessTwo,
};

// The strip through the start, metres wide (the Valheim generator's
// `stripM`, 2 km; the owner, 2026-11-23).
export const STRIP_WIDTH = seedStats.stripM;

// One boss: the nearest of his altars in the strip, by the way along it from
// the start (north positive), or null when the strip holds none.
export type Found = {
  key: string;
  inStrip: { along: number } | null;
};

type Point = { x: number; y: number };

const inStrip = (startX: number, x: number) =>
  Math.abs(x - startX) <= STRIP_WIDTH / 2;

export function find(start: Point, points: Point[], key: string): Found {
  const strip = points
    .filter((p) => inStrip(start.x, p.x))
    .sort((a, b) => Math.abs(a.y - start.y) - Math.abs(b.y - start.y))[0];
  return { key, inStrip: strip ? { along: strip.y - start.y } : null };
}
