import { MaterialsView } from "@/components/catalog/MaterialsView";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.trophies.meta", "/catalog/trophies");
}

export default function TrophiesPage() {
  return (
    <MaterialsView
      kind="trophies"
      words="trophies"
      crumb="archive.guideTrophies"
    />
  );
}
