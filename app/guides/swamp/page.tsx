import type { Metadata } from "next";

import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { readGuide } from "@/lib/content";
import SEED_STATS from "@/lib/valheim/seed-stats.json";
import { SUMMONS } from "@/lib/valheim/summons";

const guide = () => readGuide("swamp", { ...SUMMONS, ...SEED_STATS });

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return {
    title: "The Swamp guide in Valheim — Seed Archive",
    description: fact,
    alternates: { canonical: "/guides/swamp" },
  };
}

export default async function SwampPage() {
  return <MarkdownGuide guide={await guide()} crumb="archive.guideSwamp" />;
}
