import { PiecePage } from "@/components/catalog/PiecePage";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata(
    "pages.stoneBuilding.meta",
    "/database/base/stone-building",
  );
}

export default function StoneBuildingPage() {
  return (
    <PiecePage
      page="stone-building"
      words="stoneBuilding"
      crumb="archive.guideStoneBuilding"
    />
  );
}
