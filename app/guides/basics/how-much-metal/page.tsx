import type { Metadata } from "next";

import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { SummonTrees } from "@/components/guides/SummonTrees";
import { readGuide } from "@/lib/content";
import SEED_STATS from "@/lib/valheim/seed-stats.json";
import { SUMMONS } from "@/lib/valheim/summons";

// The seed scan's numbers come finished from the Valheim generator.
const guide = () => readGuide("how-much-metal", { ...SUMMONS, ...SEED_STATS });

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return {
    title: "How much metal a run takes in Valheim — Seed Archive",
    description: fact,
    alternates: { canonical: "/guides/basics/how-much-metal" },
  };
}

export default async function HowMuchMetalPage() {
  return (
    <MarkdownGuide
      guide={await guide()}
      crumb="archive.guideHowMuchMetal"
      figures={{ summons: <SummonTrees /> }}
    />
  );
}
