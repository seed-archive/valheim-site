import type { Metadata } from "next";

import { MarkdownGuide } from "@/components/guides/MarkdownGuide";
import { readGuide } from "@/lib/content";
import { SUMMONS } from "@/lib/valheim/summons";

const guide = () => readGuide("challenges", SUMMONS);

export async function generateMetadata(): Promise<Metadata> {
  const { fact } = await guide();
  return {
    title: "Challenges in Valheim — Seed Archive",
    description: fact,
    alternates: { canonical: "/guides/challenges" },
  };
}

export default async function ChallengesPage() {
  return <MarkdownGuide guide={await guide()} crumb="archive.guideChallenges" />;
}
