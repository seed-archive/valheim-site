import type { Metadata } from "next";

import { PiecePage } from "@/components/catalog/PiecePage";

export const metadata: Metadata = {
  title: "Wood building in Valheim — Seed Archive",
  description:
    "Every wooden wall, floor, roof, beam, door and stair the hammer builds by a workbench, by biome, with its materials.",
  alternates: { canonical: "/catalog/wood-building" },
};

export default function WoodBuildingPage() {
  return <PiecePage page="wood-building" words="woodBuilding" crumb="archive.guideWoodBuilding" />;
}
