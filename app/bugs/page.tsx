import type { Metadata } from "next";

import { BugsPage } from "@/components/bugs/BugsPage";

export const metadata: Metadata = {
  title: "Bugs in Valheim — Seed Archive",
  description:
    "Why Burial Chambers and Sunken Crypts differ on one seed, why the map's loot is an average, and why the Helmet of the Protector never reaches the forge.",
  alternates: { canonical: "/bugs" },
};

export default function Bugs() {
  return <BugsPage />;
}
