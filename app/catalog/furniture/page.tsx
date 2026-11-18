import type { Metadata } from "next";

import { PiecePage } from "@/components/catalog/PiecePage";

export const metadata: Metadata = {
  title: "Furniture in Valheim — Seed Archive",
  description:
    "Every bed, chair, table, chest, banner, rug and light the hammer builds, by biome, with its materials.",
  alternates: { canonical: "/catalog/furniture" },
};

export default function FurniturePage() {
  return <PiecePage page="furniture" words="furniture" crumb="archive.guideFurniture" />;
}
