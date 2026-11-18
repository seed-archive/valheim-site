import type { Metadata } from "next";

import { PiecePage } from "@/components/catalog/PiecePage";

export const metadata: Metadata = {
  title: "Stone building in Valheim — Seed Archive",
  description:
    "Every stone, marble and grausten wall, floor, pillar and arch the hammer builds by a stonecutter, by biome, with its materials.",
  alternates: { canonical: "/catalog/stone-building" },
};

export default function StoneBuildingPage() {
  return <PiecePage page="stone-building" words="stoneBuilding" crumb="archive.guideStoneBuilding" />;
}
