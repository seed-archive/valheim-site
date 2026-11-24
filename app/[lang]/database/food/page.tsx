import { GuidesIndex } from "@/components/guides/GuidesIndex";
import { CATALOG_GROUPS } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.catalog.group.food.meta", "/database/food");
}

// The Food and drink group's contents page: its pages, each in a sentence.
export default function FoodGroupPage() {
  return (
    <GuidesIndex
      name="archive.groupFood"
      title="archive.groupFood"
      groups={CATALOG_GROUPS.filter((g) => g.href === "/database/food").map(
        (g) => ({ entries: g.entries }),
      )}
    />
  );
}
