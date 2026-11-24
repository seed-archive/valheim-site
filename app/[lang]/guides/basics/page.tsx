import { GuidesIndex } from "@/components/guides/GuidesIndex";
import { GUIDE_GROUPS } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.guides.meta.basics", "/guides/basics");
}

// The Basics section's contents page: its guides, each in a sentence.
export default function BasicsPage() {
  return (
    <GuidesIndex
      name="archive.groupBasics"
      title="archive.groupBasics"
      groups={GUIDE_GROUPS.filter((g) => g.href === "/guides/basics").map(
        (g) => ({ entries: g.entries }),
      )}
    />
  );
}
