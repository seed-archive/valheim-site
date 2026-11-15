import type { Metadata } from "next";

import { MapScreen } from "@/components/map/MapScreen";

export const metadata: Metadata = {
  title: "Valheim seed map — Seed Archive",
  description:
    "The map of any Valheim seed: biomes, bosses, traders and dungeons.",
  alternates: { canonical: "/map" },
};

export default function MapPage() {
  return <MapScreen />;
}
