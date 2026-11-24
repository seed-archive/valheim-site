import type { Metadata } from "next";

import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { readGuide } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import SEED_STATS from "@/lib/valheim/seed-stats.json";
import { SUMMONS } from "@/lib/valheim/summons";

// The seed scan's numbers come finished from the Valheim generator.
const guide = () => readGuide("other-rules", { ...SUMMONS, ...SEED_STATS });

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return pageMetadata(
    "pages.guides.meta.otherRules",
    "/guides/challenges/other-rules",
    fact,
  );
}

export default async function ChallengesPage() {
  return (
    <MarkdownGuide guide={await guide()} crumb="archive.guideOtherRules" />
  );
}
