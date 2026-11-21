import type { Metadata } from "next";

import { PiecePage } from "@/components/catalog/PiecePage";

export const metadata: Metadata = {
  title: "Other build pieces in Valheim — Seed Archive",
  description:
    "The hammer's other pieces: portals, fires, stacks, piles, adornments and the training dummy, by biome, with their materials.",
  alternates: { canonical: "/catalog/other-pieces" },
};

export default function OtherPiecesPage() {
  return <PiecePage page="other-pieces" words="otherPieces" crumb="archive.guideOtherPieces" />;
}
