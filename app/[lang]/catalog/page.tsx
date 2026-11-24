import { GuidesIndex } from "@/components/guides/GuidesIndex";
import { CATALOG_GROUPS } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.catalog.meta", "/catalog");
}

export default function CatalogPage() {
  return (
    <GuidesIndex
      name="archive.catalog"
      title="pages.catalog.title"
      groups={CATALOG_GROUPS}
    />
  );
}
