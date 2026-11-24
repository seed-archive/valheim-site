import { GuidesIndex } from "@/components/guides/GuidesIndex";
import { CATALOG_GROUPS } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.catalog.group.gear.meta", "/database/gear");
}

// The Gear group's contents page: its pages, each in a sentence.
export default function GearGroupPage() {
  return (
    <GuidesIndex
      name="archive.groupGear"
      title="archive.groupGear"
      groups={CATALOG_GROUPS.filter((g) => g.href === "/database/gear").map(
        (g) => ({ entries: g.entries }),
      )}
    />
  );
}
