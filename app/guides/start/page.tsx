import type { Metadata } from "next";

import { StartGuide } from "@/components/guides/StartGuide";
import { percentile, share, shareAboveZero } from "@/lib/ranks";

export const metadata: Metadata = {
  title: "Where to go first on a new seed in Valheim — Seed Archive",
  description:
    "Eikthyr's altar first, then a troll cave on a Black Forest shore with copper at the door and tin on the beach: how near they are on a seed.",
  alternates: { canonical: "/guides/start" },
};

// Metres, rounded for a sentence.
const round = (m: number | undefined) =>
  m === undefined ? undefined : Math.round(m / 10) * 10;
const percent = (s: number | undefined) =>
  s === undefined ? undefined : Math.round(s * 100);

// The numbers are the seed scan's, read when the page is built.
export default function StartPage() {
  return (
    <StartGuide
      eikthyr={{
        median: round(percentile("bosses.eikthyr.d", 50)),
        most: round(percentile("bosses.eikthyr.d", 90)),
        island: percent(share("bosses.eikthyr.island")),
      }}
      blackForest={{
        median: round(percentile("route.firstHome.blackForest", 50)),
        least: round(percentile("route.firstHome.blackForest", 5)),
        island: percent(shareAboveZero("island.area.blackForest")),
      }}
      copper={{
        caves: percentile("vegetation.copperCaves.count", 50),
        nearest: round(percentile("vegetation.copperCaves.nearest", 50)),
        walk: round(percentile("vegetation.copperCaves.walk", 50)),
        shore: round(percentile("vegetation.copperCaves.shore", 50)),
        tin: percentile("vegetation.copperCaves.tin", 50),
      }}
    />
  );
}
