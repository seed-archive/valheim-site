import type { Metadata } from "next";

import { GuidesIndex } from "@/components/guides/GuidesIndex";
import { GUIDE_GROUPS } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Basics guides for Valheim — Seed Archive",
  description:
    "Where to build your base, how much metal a run takes and how to ring a boss arena: the references every biome's chapter sends you to.",
  alternates: { canonical: "/guides/basics" },
};

// The Basics section's contents page: its guides, each in a sentence.
export default function BasicsPage() {
  return (
    <GuidesIndex
      name="archive.groupBasics"
      title="archive.groupBasics"
      groups={GUIDE_GROUPS.filter((g) => g.href === "/guides/basics").map(
        (g) => ({ entries: g.entries }),
      )}
      parent={{ name: "archive.guides", href: "/guides" }}
    />
  );
}
