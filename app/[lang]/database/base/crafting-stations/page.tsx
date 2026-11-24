import { PiecePage } from "@/components/catalog/PiecePage";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata(
    "pages.stations.meta",
    "/database/base/crafting-stations",
  );
}

export default function CraftingStationsPage() {
  return (
    <PiecePage
      page="crafting-stations"
      words="stations"
      crumb="archive.guideStations"
    />
  );
}
