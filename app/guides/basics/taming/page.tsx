import type { Metadata } from "next";

import { ItemTree } from "@/components/guides/ItemTree";
import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import {
  BreedTable,
  MountTable,
  TameTable,
} from "@/components/guides/TamingTables";
import { readGuide } from "@/lib/content";
import taming from "@/lib/valheim/taming.json";

// The game's taming numbers from the Valheim generator (docs/taming.md): the
// same for every animal, so the first one's stand for all.
const first = taming.creatures[0];
const TAMING = {
  tamingMin: Math.round(first.tamingSeconds / 60),
  fedMin: Math.round(first.fedSeconds / 60),
  // How many feedings a whole taming takes, and the taming's minutes with the
  // mead's boost: sums done for the reader.
  foodsToTame: Math.ceil(first.tamingSeconds / first.fedSeconds),
  boostedMin: Math.round(first.tamingSeconds / 60 / (taming.boost?.times ?? 1)),
  boostTimes: taming.boost?.times ?? 0,
  boostM: taming.boost?.withinM ?? 0,
  meadName: taming.mead?.name ?? "",
  tameCount: taming.creatures.length,
  // An egg's hatching time, the same for every egg (`EggGrow.m_growTime`).
  eggMin: Math.round(
    (taming.creatures
      .flatMap((c) => c.breeding.grows)
      .find((g) => g.kind === "egg")?.seconds ?? 0) / 60,
  ),
};

const guide = () => readGuide("taming", TAMING);

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return {
    title: "Taming animals in Valheim — Seed Archive",
    description: fact,
    alternates: { canonical: "/guides/basics/taming" },
  };
}

export default async function TamingPage() {
  return (
    <MarkdownGuide
      guide={await guide()}
      crumb="archive.guideTaming"
      figures={{
        tames: <TameTable />,
        mead: taming.mead?.base ? <ItemTree item={taming.mead.base} /> : null,
        breeding: <BreedTable />,
        mounts: <MountTable />,
      }}
    />
  );
}
