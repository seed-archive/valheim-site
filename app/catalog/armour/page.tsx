import type { Metadata } from "next";

import { GearPage } from "@/components/catalog/GearPage";

export const metadata: Metadata = {
  title: "Armour in Valheim — Seed Archive",
  description:
    "Every helmet, chest piece, leg piece, cape, shield and trinket by biome: its armour, block and effects, the station it needs and its materials.",
  alternates: { canonical: "/catalog/armour" },
};

export default function ArmourPage() {
  return <GearPage page="armour" words="armour" crumb="archive.guideArmour" />;
}
