import type { Metadata } from "next";

import { BugsPage } from "@/components/bugs/BugsPage";

export const metadata: Metadata = {
  title: "World generation bugs in Valheim — Seed Archive",
  description:
    "Why one Valheim seed gives Burial Chambers different rooms and surtling cores, and which dungeons follow the seed exactly.",
  alternates: { canonical: "/bugs" },
};

export default function Bugs() {
  return <BugsPage />;
}
