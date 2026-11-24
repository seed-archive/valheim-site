import { Suspense } from "react";

import { SeedRating } from "@/components/tools/seed/SeedRating";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.seedRating.meta", "/tools/how-good-is-my-seed");
}

export default function SeedRatingPage() {
  // The seed is read from the address, which is known only in the browser.
  return (
    <Suspense>
      <SeedRating />
    </Suspense>
  );
}
