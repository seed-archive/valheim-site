import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { BestSeeds, type BestSeed } from "@/components/tools/seed/BestSeeds";
import { PageTrail } from "@/components/PageTrail";
import { serverIntl } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import best from "@/lib/valheim/best-seeds.json";

export function generateMetadata() {
  return pageMetadata("pages.bestSeeds.meta", "/tools/best-seeds");
}

export default async function BestSeedsPage() {
  const intl = await serverIntl();
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
            { name: intl.format("archive.home"), href: "/" },
            { name: intl.format("archive.tools"), href: "/tools" },
            { name: intl.format("archive.bestSeeds") },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          {intl.format("pages.bestSeeds.title")}
        </Typography>
        <BestSeeds blocks={best.blocks} seeds={seeds} />
      </Container>
      <ArchiveFooter />
    </>
  );
}
