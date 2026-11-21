import type { Metadata } from "next";

import { MaterialsView } from "@/components/catalog/MaterialsView";

export const metadata: Metadata = {
  title: "Trophies in Valheim — Seed Archive",
  description:
    "Every trophy by biome: which creature drops it, and what it is for: a boss's power on the start altar, a recipe, a bait.",
  alternates: { canonical: "/catalog/trophies" },
};

export default function TrophiesPage() {
  return <MaterialsView kind="trophies" words="trophies" crumb="archive.guideTrophies" />;
}
