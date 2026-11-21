import type { Metadata } from "next";

import { PiecePage } from "@/components/catalog/PiecePage";

export const metadata: Metadata = {
  title: "Ships and carts in Valheim — Seed Archive",
  description:
    "The raft, the Karve, the Longship, the Drakkar, the cart and the siege engines: the station each needs nearby and its materials.",
  alternates: { canonical: "/catalog/ships" },
};

export default function ShipsPage() {
  return <PiecePage page="ships" words="ships" crumb="archive.guideShips" />;
}
