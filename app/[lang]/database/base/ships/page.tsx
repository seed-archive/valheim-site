import { PiecePage } from "@/components/catalog/PiecePage";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.ships.meta", "/database/base/ships");
}

export default function ShipsPage() {
  return <PiecePage page="ships" words="ships" crumb="archive.guideShips" />;
}
