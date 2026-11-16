import summary from "@/lib/data/scan-summary.json";

// Where one seed stands among the worlds of the seed scan: the share of
// scanned worlds it beats on one measure. The summary is the Valheim
// generator's (copied into lib/data on each new scan).

type Measure = {
  worlds: number;
  min?: number;
  p5?: number;
  p25?: number;
  median?: number;
  p75?: number;
  p95?: number;
  max?: number;
  q?: number[];
  share?: number;
};

const MEASURES = summary.measures as Record<string, Measure>;

// The measure's distribution as (value, share of worlds at or below it).
function steps(m: Measure): [number, number][] {
  if (m.q) {
    return m.q.map((v, i) => [v, i / 100]);
  }
  const known: [number | undefined, number][] = [
    [m.min, 0],
    [m.p5, 0.05],
    [m.p25, 0.25],
    [m.median, 0.5],
    [m.p75, 0.75],
    [m.p95, 0.95],
    [m.max, 1],
  ];
  return known.filter((s): s is [number, number] => s[0] !== undefined);
}

// The share of scanned worlds this value beats (0…1), read off the
// distribution with straight lines between its points: with `less`, worlds
// whose value is larger (a distance: this seed is closer); otherwise worlds
// whose value is smaller (an area, a count). Ties beat nobody, so a value many
// worlds share (no sea on the way) does not claim to beat them. Null when the
// scan has no such measure.
export function shareBeaten(
  path: string,
  value: number,
  less: boolean,
): number | null {
  const m = MEASURES[path];
  if (!m) {
    return null;
  }
  const s = steps(m);
  if (less) {
    // The best value there is (no sea at all): many worlds share it, so it
    // beats none of them, and saying so would mislead.
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
        const [v0, p0] = i > 0 ? s[i - 1] : s[i];
        if (i > 0 && v1 > v0) {
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

// The share of scanned worlds where a flag (a boss on the start island) holds.
export function shareOfWorlds(path: string): number | null {
  return MEASURES[path]?.share ?? null;
}
