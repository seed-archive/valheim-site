import type { Metadata } from "next";

import { GuidesIndex } from "@/components/guides/GuidesIndex";
import { GUIDE_GROUPS } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides in Valheim — Seed Archive",
  description:
    "The eight biomes in the order you meet them, the basics they send you to, and the challenges that play the same world other ways.",
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
