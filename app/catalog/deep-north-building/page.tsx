import type { Metadata } from "next";

import { PiecePage } from "@/components/catalog/PiecePage";

export const metadata: Metadata = {
  title: "Deep North building in Valheim — Seed Archive",
  description:
    "The hammer's Deep North tab: its roofs, walls and furniture, with their materials.",
  alternates: { canonical: "/catalog/deep-north-building" },
};

export default function DeepNorthBuildingPage() {
  return (
    <PiecePage
      page="deep-north-building"
      words="deepNorthBuilding"
      crumb="archive.guideDeepNorthBuilding"
    />
  );
}
