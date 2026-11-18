import type { SeedMeasures } from "@/lib/valheim/generator";
import { shareBeaten, type Ranks } from "@/lib/scan";
import { BIOMES, ISLAND_FLAGS, NEED_OF, NEUTRAL, YES_NO, type Found, type Measure } from "@/lib/valheim/strip";

// The seed's score, 0 to 100 (the generator's `docs/seed-rating.md` →
// Locations together): the mean of its blocks, the start island and each
// biome. A biome's block is the mean of its boss placed (on the strip; Eikthyr
// on the start island) and the mean share of scanned seeds it beats on every
// measure the block shows. Every block weighs the same.

// The start island's block: Eikthyr and the bonuses on it, each counted once.
const ISLAND_BIOMES = ["blackForest", "swamp", "mountain"];
const ISLAND_BOSSES = ["eikthyr", "theElder", "bonemass", "moder"];

function value(of: SeedMeasures, path: string): number | undefined {
  let node: unknown = of;
  for (const part of path.split(".")) {
    node = node && typeof node === "object" ? (node as Record<string, unknown>)[part] : undefined;
  }
  // A flag (on the start island) reads as 1 or 0.
  if (typeof node === "boolean") {
    return Number(node);
  }
  return typeof node === "number" && !Number.isNaN(node) ? node : undefined;
}

// The share of scanned seeds beaten on one measure: a seed with no such place
// beats nobody; one at the best value of the scan beats every other. Null
// while the measure is not in (the deeper measures come later).
export function beaten(ranks: Ranks, of: SeedMeasures, [path, less]: Measure): number | null {
  const v = value(of, path);
  const q = ranks.measures[path];
  if (!Array.isArray(q)) {
    return null;
  }
  if (v === undefined) {
    return 0;
  }
  if (less && v <= q[0]) {
    return 1;
  }
  return shareBeaten(ranks, path, v, less) ?? 0;
}

// The value of a measure, for the page to show.
export const measured = value;

const mean = (xs: number[]) => (xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : 0);

export type Score = { total: number; parts: Record<string, number> };

export function score(ranks: Ranks, of: SeedMeasures, found: Found[]): Score {
  const parts: Record<string, number> = {
    island:
      (ISLAND_BIOMES.filter((b) => (of.island.area[b] ?? 0) > 0).length +
        ISLAND_BOSSES.filter((b) => of.bosses[b]?.island).length) /
      (ISLAND_BIOMES.length + ISLAND_BOSSES.length),
  };
  for (const { biome, boss, measures } of BIOMES) {
    // Eikthyr counts by the start island, not the strip: the island is the main thing (the owner, 2026-11-17).
    const placed = boss === "eikthyr" ? Boolean(of.bosses[boss]?.island) : Boolean(found.find((f) => f.key === boss)?.inStrip);
    // A yes or no counts as itself; the rest by the share of seeds beaten. The
    // start-island rows are left out: the island is its own block.
    const shares = measures
      .filter((m) => !ISLAND_FLAGS.includes(m[0]) && !NEUTRAL.includes(m[0]))
      .map((m) => {
        const x = value(of, m[0]);
        if (YES_NO.includes(m[0])) {
          return Number(Boolean(x));
        }
        // A measure with a need scores 1 when the need is met.
        if (m[0] in NEED_OF) {
          return Number((x ?? 0) >= NEED_OF[m[0]]);
        }
        return beaten(ranks, of, m) ?? 0;
      });
    parts[biome] = mean([Number(placed), mean(shares)]);
  }
  return { total: Math.round(100 * mean(Object.values(parts))), parts };
}
