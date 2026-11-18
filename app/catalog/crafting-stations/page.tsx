import type { Metadata } from "next";

import { PiecePage } from "@/components/catalog/PiecePage";

export const metadata: Metadata = {
  title: "Crafting stations in Valheim — Seed Archive",
  description:
    "Every crafting station and the upgrades that raise its level, by biome: the station each needs nearby and the materials it takes.",
  alternates: { canonical: "/catalog/crafting-stations" },
};

export default function CraftingStationsPage() {
  return <PiecePage page="crafting-stations" words="stations" crumb="archive.guideStations" />;
}
