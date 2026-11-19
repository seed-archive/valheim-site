import type { Metadata } from "next";

import { GuidesIndex } from "@/components/guides/GuidesIndex";
import { GUIDE_GROUPS } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Challenges guides for Valheim — Seed Archive",
  description:
    "A good start, the speedrun's route, no death, no map, no portals and the reverse run: the run's story under each rule.",
  alternates: { canonical: "/guides/challenges" },
};

// The Challenges section's contents page: its guides, each in a sentence.
export default function ChallengesPage() {
  return (
    <GuidesIndex
      name="archive.groupChallenges"
      title="archive.groupChallenges"
      groups={GUIDE_GROUPS.filter((g) => g.href === "/guides/challenges").map((g) => ({ entries: g.entries }))}
      parent={{ name: "archive.guides", href: "/guides" }}
    />
  );
}
