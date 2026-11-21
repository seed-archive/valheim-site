import type { Metadata } from "next";

import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { readGuide } from "@/lib/content";
import SEED_STATS from "@/lib/valheim/seed-stats.json";
import { SUMMONS } from "@/lib/valheim/summons";

// The game's own values and the seed scan's numbers come finished from the Valheim generator.
const guide = () => readGuide("boss-arenas", { ...SUMMONS, ...SEED_STATS });

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return {
    title: "Boss arenas in Valheim — Seed Archive",
    description: fact,
    alternates: { canonical: "/guides/basics/boss-arenas" },
  };
}

export default async function BossArenasPage() {
  return (
    <MarkdownGuide guide={await guide()} crumb="archive.guideBossArenas" />
  );
}
