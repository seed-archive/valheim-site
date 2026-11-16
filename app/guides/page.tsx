import type { Metadata } from "next";

import { GuidesIndex } from "@/components/guides/GuidesIndex";

export const metadata: Metadata = {
  title: "Guides in Valheim — Seed Archive",
  description:
    "What a seed gives a run, stage by stage, measured on the worlds the game makes.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return <GuidesIndex />;
}
