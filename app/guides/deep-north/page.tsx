import type { Metadata } from "next";

import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { readGuide } from "@/lib/content";
import SEED_STATS from "@/lib/valheim/seed-stats.json";
import { SUMMONS } from "@/lib/valheim/summons";

const guide = () => readGuide("deep-north", { ...SUMMONS, ...SEED_STATS });

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return {
    title: "What to bring to the Deep North in Valheim — Seed Archive",
    description: fact,
    alternates: { canonical: "/guides/deep-north" },
  };
}

export default async function DeepNorthPage() {
  return <MarkdownGuide guide={await guide()} crumb="archive.guideDeepNorth" />;
}
