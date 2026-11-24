import { GuidesIndex } from "@/components/guides/GuidesIndex";
import { CATALOG_GROUPS } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.catalog.group.world.meta", "/database/world");
}

// The World group's contents page: its pages, each in a sentence.
export default function WorldPage() {
  return (
    <GuidesIndex
      name="archive.groupWorld"
      title="archive.groupWorld"
      groups={CATALOG_GROUPS.filter((g) => g.href === "/database/world").map(
        (g) => ({ entries: g.entries }),
      )}
    />
  );
}
