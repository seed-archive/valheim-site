import { GearPage } from "@/components/catalog/GearPage";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.bows.meta", "/database/gear/bows");
}

export default function BowsPage() {
  return <GearPage page="bows" words="bows" crumb="archive.guideBows" />;
}
