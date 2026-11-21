import type { Metadata } from "next";

import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { readGuide } from "@/lib/content";
import CRAFTING from "@/lib/valheim/crafting.json";
import SEED_STATS from "@/lib/valheim/seed-stats.json";
import { SUMMONS } from "@/lib/valheim/summons";

// Bronze: copper and tin to one bar (the game's Bronze recipe at the forge).
const BRONZE_COPPER = 2;
const BRONZE_TIN = 1;

// The Black Forest's three armour sets, by the keys of their pieces in the
// Valheim generator's catalogue, and the material each set is counted in.
const BRONZE_SET = ["HelmetBronze", "ArmorBronzeChest", "ArmorBronzeLegs"];
const TROLL_SET = [
  "HelmetTrollLeather",
  "ArmorTrollLeatherChest",
  "ArmorTrollLeatherLegs",
  "CapeTrollHide",
];
const BEAR_SET = [
  "HelmetBerserkerHood",
  "ArmorBerserkerChest",
  "ArmorBerserkerLegs",
];
const PERCENT = 100;

type Gear = (typeof CRAFTING.gear)[number];

// One set as the page's table shows it: armour and weight summed over its
// pieces, how much it slows, and how much of one material the pieces take.
function armourSet(keys: string[], material: string) {
  const pieces = keys
    .map((key) => CRAFTING.gear.find((gear) => gear.key === key))
    .filter((gear): gear is Gear => gear !== undefined);
  const stat = (name: "armor" | "weight" | "movement") =>
    pieces.reduce(
      (sum, gear) =>
        sum + Number((gear.stats as Record<string, unknown>)[name] ?? 0),
      0,
    );
  const taken = pieces.reduce(
    (sum, gear) =>
      sum +
      gear.resources
        .filter((resource) => resource.name === material)
        .reduce((part, resource) => part + resource.amount, 0),
    0,
  );
  return {
    armour: stat("armor"),
    weight: stat("weight"),
    slow: Math.round(-stat("movement") * PERCENT),
    taken,
  };
}

function armourSets() {
  const bronze = armourSet(BRONZE_SET, "Bronze");
  const troll = armourSet(TROLL_SET, "Troll Hide");
  const bear = armourSet(BEAR_SET, "Bear Hide");
  return {
    bronzeSetArmour: bronze.armour,
    bronzeSetWeight: bronze.weight,
    bronzeSetSlow: bronze.slow,
    bronzeSetBronze: bronze.taken,
    trollSetArmour: troll.armour,
    trollSetWeight: troll.weight,
    trollSetHides: troll.taken,
    bearSetArmour: bear.armour,
    bearSetWeight: bear.weight,
    bearSetHides: bear.taken,
  };
}

// The seed scan's numbers come finished from the Valheim generator
// (`seed-stats.json`); only the armour sets' sums are made here.
const guide = () =>
  readGuide("black-forest", {
    ...SUMMONS,
    ...SEED_STATS,
    ...armourSets(),
    bronzeCopper: BRONZE_COPPER,
    bronzeTin: BRONZE_TIN,
  });

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return {
    title: "The Black Forest guide in Valheim — Seed Archive",
    description: fact,
    alternates: { canonical: "/guides/biomes/black-forest" },
  };
}

export default async function BlackForestPage() {
  return (
    <MarkdownGuide guide={await guide()} crumb="archive.guideBlackForest" />
  );
}
