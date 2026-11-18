import type { Metadata } from "next";

import { BugsPage } from "@/components/bugs/BugsPage";

export const metadata: Metadata = {
  title: "World generation bugs in Valheim — Seed Archive",
  description:
    "Why one Valheim seed gives Burial Chambers and Sunken Crypts different rooms, which dungeons follow the seed exactly, and why the map's loot is an average.",
  alternates: { canonical: "/bugs" },
};

export default function Bugs() {
  return <BugsPage />;
}
