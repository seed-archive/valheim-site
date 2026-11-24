import { Suspense } from "react";

import { MapScreen } from "@/components/valheim/MapScreen";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.map.meta", "/tools/map");
}

export default function MapPage() {
  // The map reads its seed from the address, which is known only in the
  // browser.
  return (
    <Suspense>
      <MapScreen />
    </Suspense>
  );
}
