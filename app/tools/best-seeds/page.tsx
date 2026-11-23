import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { BestSeeds, type BestSeed } from "@/components/tools/seed/BestSeeds";
import { PageTrail } from "@seed-archive/ui/page-trail";
import { serverFormat } from "@/lib/i18n/server";
import best from "@/lib/valheim/best-seeds.json";

export const metadata: Metadata = {
  title: "Best seeds in Valheim — Seed Archive",
  description:
    "The best seeds by the seed rating, with every biome's score: sort by the one you care about and open a seed on the map.",
  alternates: { canonical: "/tools/best-seeds" },
};

export default function BestSeedsPage() {
  // The Valheim generator writes the best fifty (the owner, 2026-11-23).
  const seeds: BestSeed[] = best.seeds.map(([seed, score, parts]) => ({
    seed: seed as string,
    score: score as number,
    parts: parts as number[],
  }));
  return (
    <>
      <ArchiveBar />
      <Container component="main" sx={{ py: 6, minHeight: "70vh" }}>
        <PageTrail
          steps={[
            { name: serverFormat("archive.home"), href: "/" },
            { name: serverFormat("archive.tools"), href: "/tools" },
            { name: serverFormat("archive.bestSeeds") },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          {serverFormat("pages.bestSeeds.title")}
        </Typography>
        <BestSeeds blocks={best.blocks} seeds={seeds} />
      </Container>
      <ArchiveFooter />
    </>
  );
}
