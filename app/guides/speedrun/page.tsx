import type { Metadata } from "next";

import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { readGuide } from "@/lib/content";
import { SUMMONS } from "@/lib/valheim/summons";

const guide = () => readGuide("speedrun", SUMMONS);

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return {
    title: "Speedrun in Valheim — Seed Archive",
    description: fact,
    alternates: { canonical: "/guides/speedrun" },
  };
}

export default async function SpeedrunPage() {
  return <MarkdownGuide guide={await guide()} crumb="archive.guideSpeedrun" />;
}
