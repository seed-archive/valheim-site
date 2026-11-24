import { GuidesIndex } from "@/components/guides/GuidesIndex";
import { GUIDE_GROUPS } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.guides.meta.biomes", "/guides/biomes");
}

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
