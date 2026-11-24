import { PiecePage } from "@/components/catalog/PiecePage";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.otherPieces.meta", "/catalog/other-pieces");
}

export default function OtherPiecesPage() {
  return (
    <PiecePage
      page="other-pieces"
      words="otherPieces"
      crumb="archive.guideOtherPieces"
    />
  );
}
