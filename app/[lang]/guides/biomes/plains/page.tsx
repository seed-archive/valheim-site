import type { Metadata } from "next";

import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { readGuide } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import SEED_STATS from "@/lib/valheim/seed-stats.json";
import { SUMMONS } from "@/lib/valheim/summons";

const guide = () => readGuide("plains", { ...SUMMONS, ...SEED_STATS });

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return pageMetadata(
    "pages.guides.meta.plains",
    "/guides/biomes/plains",
    fact,
  );
}

export default async function PlainsPage() {
  return <MarkdownGuide guide={await guide()} crumb="archive.guidePlains" />;
}
