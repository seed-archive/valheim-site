import { GuidesIndex } from "@/components/guides/GuidesIndex";
import { CATALOG_GROUPS } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.catalog.group.base.meta", "/database/base");
}

// The Your base group's contents page: its pages, each in a sentence.
export default function BaseGroupPage() {
  return (
    <GuidesIndex
      name="archive.groupBase"
      title="archive.groupBase"
      groups={CATALOG_GROUPS.filter((g) => g.href === "/database/base").map(
        (g) => ({ entries: g.entries }),
      )}
    />
  );
}
