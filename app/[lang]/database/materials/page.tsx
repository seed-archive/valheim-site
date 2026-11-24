import { GuidesIndex } from "@/components/guides/GuidesIndex";
import { CATALOG_GROUPS } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata(
    "pages.catalog.group.materials.meta",
    "/database/materials",
  );
}

// The Materials group's contents page: its pages, each in a sentence.
export default function MaterialsGroupPage() {
  return (
    <GuidesIndex
      name="archive.groupMaterials"
      title="archive.groupMaterials"
      groups={CATALOG_GROUPS.filter(
        (g) => g.href === "/database/materials",
      ).map((g) => ({ entries: g.entries }))}
    />
  );
}
