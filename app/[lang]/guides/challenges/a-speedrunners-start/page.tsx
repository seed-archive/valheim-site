import type { Metadata } from "next";

import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { readGuide } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import SEED_STATS from "@/lib/valheim/seed-stats.json";

// The seed scan's numbers come finished from the Valheim generator.
const guide = () => readGuide("a-speedrunners-start", SEED_STATS);

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return pageMetadata(
    "pages.guides.meta.speedrunnersStart",
    "/guides/challenges/a-speedrunners-start",
    fact,
  );
}

export default async function SpeedrunnersStartPage() {
  return (
    <MarkdownGuide
      guide={await guide()}
      crumb="archive.guideSpeedrunnersStart"
    />
  );
}
