import type { Metadata } from "next";

import { GuidesIndex } from "@/components/guides/GuidesIndex";
import { GUIDE_GROUPS } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides in Valheim — Seed Archive",
  description:
    "Each biome, fighting, and your base: what a run needs and where it comes from.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <GuidesIndex
      name="archive.guides"
      title="pages.guides.title"
      groups={GUIDE_GROUPS}
    />
  );
}
