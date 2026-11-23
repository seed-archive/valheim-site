import type { Metadata } from "next";

import { ItemTree } from "@/components/guides/ItemTree";
import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { readGuide } from "@/lib/content";
import SEED_STATS from "@/lib/valheim/seed-stats.json";
import { SUMMONS } from "@/lib/valheim/summons";

const guide = () => readGuide("mistlands", { ...SUMMONS, ...SEED_STATS });

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return {
    title: "The Mistlands guide in Valheim — Seed Archive",
    description: fact,
    alternates: { canonical: "/guides/biomes/mistlands" },
  };
}

export default async function MistlandsPage() {
  return (
    <MarkdownGuide
      guide={await guide()}
      crumb="archive.guideMistlands"
      figures={{
        cape: <ItemTree item="CapeFeather" />,
        hook: <ItemTree item="GrapplingHook" />,
      }}
    />
  );
}
