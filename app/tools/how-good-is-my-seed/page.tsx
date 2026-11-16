import { Suspense } from "react";
import type { Metadata } from "next";

import { SeedRating } from "@/components/tools/seed/SeedRating";

export const metadata: Metadata = {
  title: "How good is my seed? Rate your Valheim seed — Seed Archive",
  description:
    "Type a Valheim seed and see how its start island, boss altars, traders and dungeons rank against other worlds.",
  alternates: { canonical: "/tools/how-good-is-my-seed" },
};

export default function SeedRatingPage() {
  // The seed is read from the address, which is known only in the browser.
  return (
    <Suspense>
      <SeedRating />
    </Suspense>
  );
}
