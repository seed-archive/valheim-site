import { GuidesIndex } from "@/components/guides/GuidesIndex";
import { CATALOG_GROUPS } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.catalog.meta", "/database");
}

// The database's index: its groups, each a link to the group's own page, and
// every page in a sentence.
export default function CatalogPage() {
  return (
    <GuidesIndex
      name="archive.catalog"
      title="pages.catalog.title"
      groups={CATALOG_GROUPS}
    />
  );
}
