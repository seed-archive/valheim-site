import type { Metadata } from "next";

import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { readGuide } from "@/lib/content";
import SEED_STATS from "@/lib/valheim/seed-stats.json";
import { SUMMONS } from "@/lib/valheim/summons";

// The seed scan's numbers come finished from the Valheim generator.
const guide = () => readGuide("reverse-run", { ...SUMMONS, ...SEED_STATS });

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return {
    title: "Reverse run in Valheim — Seed Archive",
    description: fact,
    alternates: { canonical: "/guides/challenges/reverse-run" },
  };
}

export default async function ReverseRunPage() {
  return <MarkdownGuide guide={await guide()} crumb="archive.guideReverseRun" />;
}
