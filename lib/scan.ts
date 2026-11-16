import { BASE_PATH } from "@/lib/site";

// Where one seed stands among the worlds of the seed scan, for the seed tool
// only: the Valheim generator's ranks (public/data/seed-ranks.json, copied on
// each new scan), per measure 21 points — every fifth percentile — and per
// flag the share of worlds where it holds.

export type Ranks = { measures: Record<string, number[] | number> };

let loading: Promise<Ranks> | null = null;

export function loadRanks(): Promise<Ranks> {
  loading ??= fetch(`${BASE_PATH}/data/seed-ranks.json`).then((r) => {
    if (!r.ok) {
      loading = null;
      throw new Error(`seed ranks: ${r.status}`);
    }
    return r.json() as Promise<Ranks>;
  });
  return loading;
}

// The share of scanned worlds this value beats (0…1), read off the 21 points
// with straight lines between them: with `less`, worlds whose value is larger
// (a distance: this seed is closer); otherwise worlds whose value is smaller
// (an area, a count). Ties beat nobody, so a value many worlds share (no sea on
// the way) does not claim to beat them. Null when there is no such measure.
export function shareBeaten(
  ranks: Ranks,
  path: string,
  value: number,
  less: boolean,
): number | null {
  const q = ranks.measures[path];
  if (!Array.isArray(q)) {
    return null;
  }
  const s = q.map((v, i): [number, number] => [v, i / (q.length - 1)]);
  if (less) {
    // The best value there is: many worlds share it, so it beats none.
    if (value <= s[0][0]) {
      return null;
    }
    // 1 − (share of worlds at or below the value).
    let atOrBelow = 0;
    for (let i = 0; i < s.length; i++) {
      const [v1, p1] = s[i];
      if (v1 <= value) {
        atOrBelow = p1;
      } else {
        const [v0, p0] = s[i - 1];
        if (v1 > v0) {
          atOrBelow = p0 + ((value - v0) / (v1 - v0)) * (p1 - p0);
        }
        break;
      }
    }
    return 1 - atOrBelow;
  }
  // The share of worlds strictly below the value.
  if (value <= s[0][0]) {
    return 0;
  }
  for (let i = 1; i < s.length; i++) {
    const [v1, p1] = s[i];
    const [v0, p0] = s[i - 1];
    if (value <= v1) {
      return value === v1 ? p0 : p0 + ((value - v0) / (v1 - v0)) * (p1 - p0);
    }
  }
  return 1;
}
