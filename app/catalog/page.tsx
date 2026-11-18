import type { Metadata } from "next";

import { GuidesIndex } from "@/components/guides/GuidesIndex";
import { CATALOG_GROUPS } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Catalog of Valheim — Seed Archive",
  description:
    "Creatures, dungeons and traders; weapons, bows, armour and tools; food and meads; materials; and everything the hammer builds: what each gives and where to find it.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  return (
    <GuidesIndex
      name="archive.catalog"
      title="pages.catalog.title"
      groups={CATALOG_GROUPS}
    />
  );
}
