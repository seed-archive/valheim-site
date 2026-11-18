import type { Metadata } from "next";

import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { readGuide } from "@/lib/content";
import SEED_STATS from "@/lib/valheim/seed-stats.json";
import { SUMMONS } from "@/lib/valheim/summons";

// Bronze: copper and tin to one bar (the game's Bronze recipe at the forge).
const BRONZE_COPPER = 2;
const BRONZE_TIN = 1;

// The seed scan's numbers come finished from the Valheim generator
// (`seed-stats.json`); nothing is computed here.
const guide = () =>
  readGuide("black-forest", {
    ...SUMMONS,
    ...SEED_STATS,
    bronzeCopper: BRONZE_COPPER,
    bronzeTin: BRONZE_TIN,
  });

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return {
    title: "The Black Forest guide in Valheim — Seed Archive",
    description: fact,
    alternates: { canonical: "/guides/black-forest" },
  };
}

export default async function BlackForestPage() {
  return <MarkdownGuide guide={await guide()} crumb="archive.guideBlackForest" />;
}
