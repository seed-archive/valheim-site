import type { Metadata } from "next";

import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { readGuide } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import SEED_STATS from "@/lib/valheim/seed-stats.json";
import { SUMMONS } from "@/lib/valheim/summons";

const guide = () => readGuide("mountain", { ...SUMMONS, ...SEED_STATS });

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return pageMetadata(
    "pages.guides.meta.mountain",
    "/guides/biomes/mountain",
    fact,
  );
}

export default async function MountainPage() {
  return <MarkdownGuide guide={await guide()} crumb="archive.guideMountain" />;
}
