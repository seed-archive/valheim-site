import { GearPage } from "@/components/catalog/GearPage";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.toolsCatalog.meta", "/catalog/tools");
}

export default function ToolsPage() {
  return (
    <GearPage
      page="tools"
      words="toolsCatalog"
      crumb="archive.guideToolsCatalog"
    />
  );
}
