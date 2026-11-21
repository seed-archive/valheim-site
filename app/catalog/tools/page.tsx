import type { Metadata } from "next";

import { GearPage } from "@/components/catalog/GearPage";

export const metadata: Metadata = {
  title: "Tools in Valheim — Seed Archive",
  description:
    "Every pickaxe, building and farming tool, torch, saddle and fishing bait by biome: what it does, the station it needs and its materials.",
  alternates: { canonical: "/catalog/tools" },
};

export default function ToolsPage() {
  return <GearPage page="tools" words="toolsCatalog" crumb="archive.guideToolsCatalog" />;
}
