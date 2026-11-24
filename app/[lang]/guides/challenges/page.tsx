import { GuidesIndex } from "@/components/guides/GuidesIndex";
import { GUIDE_GROUPS } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.guides.meta.challenges", "/guides/challenges");
}

// The Challenges section's contents page: its guides, each in a sentence.
export default function ChallengesPage() {
  return (
    <GuidesIndex
      name="archive.groupChallenges"
      title="archive.groupChallenges"
      groups={GUIDE_GROUPS.filter((g) => g.href === "/guides/challenges").map(
        (g) => ({ entries: g.entries }),
      )}
      parent={{ name: "archive.guides", href: "/guides" }}
    />
  );
}
