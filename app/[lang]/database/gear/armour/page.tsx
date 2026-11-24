import { GearPage } from "@/components/catalog/GearPage";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.armour.meta", "/database/gear/armour");
}

export default function ArmourPage() {
  return <GearPage page="armour" words="armour" crumb="archive.guideArmour" />;
}
