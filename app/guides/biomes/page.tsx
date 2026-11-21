import type { Metadata } from "next";

import { GuidesIndex } from "@/components/guides/GuidesIndex";
import { GUIDE_GROUPS } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Biome guides for Valheim — Seed Archive",
  description:
    "The eight lands in the order you meet them, Meadows to the Deep North: what each asks of you, where it hides it, and how far your seed puts it.",
  alternates: { canonical: "/guides/biomes" },
};

// The Biomes section's contents page: its guides, each in a sentence.
export default function BiomesPage() {
  return (
    <GuidesIndex
      name="archive.groupBiomes"
      title="archive.groupBiomes"
      groups={GUIDE_GROUPS.filter((g) => g.href === "/guides/biomes").map(
        (g) => ({ entries: g.entries }),
      )}
      parent={{ name: "archive.guides", href: "/guides" }}
    />
  );
}
