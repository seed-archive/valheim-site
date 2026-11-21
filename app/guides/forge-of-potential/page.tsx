import type { Metadata } from "next";

import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { readGuide } from "@/lib/content";
import { FORGE } from "@/lib/valheim/forge";

const guide = () => readGuide("forge-of-potential", FORGE);

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return {
    title: "Forge of Potential in Valheim — Seed Archive",
    description: fact,
    alternates: { canonical: "/guides/forge-of-potential" },
  };
}

export default async function ForgeOfPotentialPage() {
  return <MarkdownGuide guide={await guide()} crumb="archive.guideForge" />;
}
