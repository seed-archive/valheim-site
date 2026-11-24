import { PiecePage } from "@/components/catalog/PiecePage";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.woodBuilding.meta", "/catalog/wood-building");
}

export default function WoodBuildingPage() {
  return (
    <PiecePage
      page="wood-building"
      words="woodBuilding"
      crumb="archive.guideWoodBuilding"
    />
  );
}
