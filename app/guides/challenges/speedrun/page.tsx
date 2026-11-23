import type { Metadata } from "next";

import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { StripFigure } from "@/components/guides/StripFigure";
import { readGuide } from "@/lib/content";
import SEED_STATS from "@/lib/valheim/seed-stats.json";
import { SUMMONS } from "@/lib/valheim/summons";

// The seed scan's numbers come finished from the Valheim generator.
const guide = () => readGuide("speedrun", { ...SUMMONS, ...SEED_STATS });

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return {
    title: "Speedrun in Valheim — Seed Archive",
    description: fact,
    alternates: { canonical: "/guides/challenges/speedrun" },
  };
}

export default async function SpeedrunPage() {
  return (
    <MarkdownGuide
      guide={await guide()}
      crumb="archive.guideSpeedrun"
      figures={{ strip: <StripFigure /> }}
    />
  );
}
