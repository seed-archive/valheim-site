import type { Metadata } from "next";

import { MaterialsView } from "@/components/catalog/MaterialsView";

export const metadata: Metadata = {
  title: "Materials in Valheim — Seed Archive",
  description:
    "Every crafting material by biome: where to find it, and everything it goes into, whatever the biome.",
  alternates: { canonical: "/catalog/materials" },
};

export default function MaterialsPage() {
  return <MaterialsView kind="raw" words="materials" crumb="archive.guideMaterials" />;
}
