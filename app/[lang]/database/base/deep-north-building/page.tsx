import { PiecePage } from "@/components/catalog/PiecePage";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata(
    "pages.deepNorthBuilding.meta",
    "/database/base/deep-north-building",
  );
}

export default function DeepNorthBuildingPage() {
  return (
    <PiecePage
      page="deep-north-building"
      words="deepNorthBuilding"
      crumb="archive.guideDeepNorthBuilding"
    />
  );
}
