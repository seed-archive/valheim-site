// The seed page's results for three seeds, held as they are (the owner,
// 2026-11-23: a clean-up before the release must change nothing). The input
// is what the Valheim generator's browser build gives for them
// (`test/fixtures/seeds.json`, rewritten by its `fixtures` command); the
// snapshots prove that the page reads it the same way after a change, not
// that the page is right.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { Ranks } from "@/lib/scan";
import { decodeMeasures, decodePlaces } from "@/lib/valheim/generator";
import { score } from "@/lib/valheim/score";
import { BIOMES, find } from "@/lib/valheim/strip";
import seeds from "./fixtures/seeds.json";

const ranks: Ranks = JSON.parse(
  readFileSync(
    new URL("../public/data/seed-ranks.json", import.meta.url),
    "utf8",
  ),
);

// JSON has no NaN: the fixture writes it as null.
const floats = (xs: (number | null)[]) =>
  Float32Array.from(xs, (x) => (x === null ? NaN : x));

describe.each(Object.entries(seeds))("seed %s", (_, data) => {
  it("scores as before", () => {
    const measures = decodeMeasures(floats(data.measures));
    expect(measures).not.toBeNull();
    expect(score(ranks, measures!)).toMatchSnapshot();
  });

  it("stands its bosses against the strip as before", () => {
    // As the page does it (`components/tools/seed/SeedRating.tsx`).
    const places = decodePlaces(floats(data.places));
    const start = places.find((p) => p.key === "start") ?? { x: 0, y: 0 };
    const found = BIOMES.map((b) => b.boss).map((k) =>
      find(
        start,
        places.filter((p) => p.key === k),
        k,
      ),
    );
    expect(found).toMatchSnapshot();
  });
});
