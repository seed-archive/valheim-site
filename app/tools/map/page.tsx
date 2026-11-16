import { Suspense } from "react";
import type { Metadata } from "next";

import { MapScreen } from "@/components/map/MapScreen";

export const metadata: Metadata = {
  title: "Valheim seed map — Seed Archive",
  description:
    "The map of any Valheim seed: biomes, bosses, traders and dungeons.",
  alternates: { canonical: "/tools/map" },
};

export default function MapPage() {
  // The map reads its seed from the address, which is known only in the
  // browser.
  return (
    <Suspense>
      <MapScreen />
    </Suspense>
  );
}
