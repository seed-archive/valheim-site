import type { Metadata } from "next";

import { GearPage } from "@/components/catalog/GearPage";

export const metadata: Metadata = {
  title: "Bows, crossbows and arrows in Valheim — Seed Archive",
  description:
    "Every bow, crossbow, arrow, bolt and bomb by biome: its damage, the station it needs and its materials.",
  alternates: { canonical: "/catalog/bows" },
};

export default function BowsPage() {
  return <GearPage page="bows" words="bows" crumb="archive.guideBows" />;
}
