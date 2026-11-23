import type { Metadata } from "next";

import { BreakReturnTable } from "@/components/guides/BreakReturnTable";
import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { readGuide } from "@/lib/content";
import { FORGE } from "@/lib/valheim/forge";
import SEED_STATS from "@/lib/valheim/seed-stats.json";

// The odds from the game's idols, and how far the forge stands from the usual
// home from the Valheim generator's numbers.
const guide = () =>
  readGuide("forge-of-potential", { ...SEED_STATS, ...FORGE });

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return {
    title: "Forge of Potential in Valheim — Seed Archive",
    description: fact,
    alternates: { canonical: "/guides/forge-of-potential" },
  };
}

export default async function ForgeOfPotentialPage() {
  return (
    <MarkdownGuide
      guide={await guide()}
      crumb="archive.guideForge"
      figures={{ breakReturn: <BreakReturnTable /> }}
    />
  );
}
