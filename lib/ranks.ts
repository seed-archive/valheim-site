import ranks from "@/public/data/seed-ranks.json";

// What a guide quotes from the seed scan, read at build time: a measure's
// value at a percentile (0…100, from the 21 points of seed-ranks.json), and a
// flag's share. Undefined where the scan has no such measure yet, so a page
// says only what is measured.
const measures = (ranks as { measures: Record<string, number[] | number> })
  .measures;

export function percentile(path: string, p: number): number | undefined {
  const q = measures[path];
  return Array.isArray(q) ? q[Math.round(p / 5)] : undefined;
}

export function share(path: string): number | undefined {
  const v = measures[path];
  return typeof v === "number" ? v : undefined;
}

// The share of seeds where a measure is above zero (an area, a count).
export function shareAboveZero(path: string): number | undefined {
  const q = measures[path];
  if (!Array.isArray(q)) {
    return undefined;
  }
  const first = q.findIndex((v) => v > 0);
  return first < 0 ? 0 : 1 - first / (q.length - 1);
}
