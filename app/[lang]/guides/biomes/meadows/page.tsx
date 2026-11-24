import type { Metadata } from "next";

import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { readGuide } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import SEED_STATS from "@/lib/valheim/seed-stats.json";
import { SUMMONS } from "@/lib/valheim/summons";

// The antler pickaxe's recipe: wood beside the antler (the game's
// Recipe_PickaxeAntler).
const PICKAXE_WOOD = 10;

// The seed scan's numbers come finished from the Valheim generator
// (`seed-stats.json`); nothing is computed here.
const guide = () =>
  readGuide("meadows", {
    ...SUMMONS,
    ...SEED_STATS,
    pickaxeWood: PICKAXE_WOOD,
  });

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return pageMetadata(
    "pages.guides.meta.meadows",
    "/guides/biomes/meadows",
    fact,
  );
}

export default async function MeadowsPage() {
  return <MarkdownGuide guide={await guide()} crumb="archive.guideMeadows" />;
}
