import { MaterialsView } from "@/components/catalog/MaterialsView";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.materials.meta", "/database/materials/materials");
}

export default function MaterialsPage() {
  return (
    <MaterialsView
      kind="raw"
      words="materials"
      crumb="archive.guideMaterials"
    />
  );
}
