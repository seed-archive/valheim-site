import { PiecePage } from "@/components/catalog/PiecePage";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.furniture.meta", "/catalog/furniture");
}

export default function FurniturePage() {
  return (
    <PiecePage
      page="furniture"
      words="furniture"
      crumb="archive.guideFurniture"
    />
  );
}
