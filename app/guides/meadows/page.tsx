import type { Metadata } from "next";

import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { readGuide } from "@/lib/content";
import SEED_STATS from "@/lib/valheim/seed-stats.json";
import { SUMMONS } from "@/lib/valheim/summons";

// The antler pickaxe's recipe: wood beside the antler (the game's
// Recipe_PickaxeAntler).
const PICKAXE_WOOD = 10;
// Honey in one mead base (the game's Recipe_MeadBase… recipes).
const MEAD_HONEY = 10;
// An abandoned house's chance to hold a beehive, percent (the game's WoodHouse
// prefabs: the beehive's RandomSpawn).
const HIVE_CHANCE = 25;

// The seed scan's numbers come finished from the Valheim generator
// (`seed-stats.json`); nothing is computed here.
const guide = () =>
  readGuide("meadows", {
    ...SUMMONS,
    ...SEED_STATS,
    pickaxeWood: PICKAXE_WOOD,
    meadHoney: MEAD_HONEY,
    hiveChance: HIVE_CHANCE,
  });

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return {
    title: "The Meadows guide in Valheim — Seed Archive",
    description: fact,
    alternates: { canonical: "/guides/meadows" },
  };
}

export default async function MeadowsPage() {
  return <MarkdownGuide guide={await guide()} crumb="archive.guideMeadows" />;
}
