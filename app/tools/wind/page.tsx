import Container from "@mui/material/Container";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { PageTrail } from "@seed-archive/ui/page-trail";
import { WindTool } from "@/components/tools/wind/WindTool";
import { serverFormat } from "@/lib/i18n/server";
import values from "@/lib/valheim/guide-values.json";

export const metadata: Metadata = {
  title: "Wind in Valheim — Seed Archive",
  description:
    "Which way the wind blows at every hour of the year's 52 weeks, the same in every world: pick a week and plan a crossing under sail.",
  alternates: { canonical: "/tools/wind" },
};

// The wind's numbers from the Valheim generator (the game's EnvMan and
// Ship): how long the main direction holds, and the dead angle.
const WIND = {
  hold: values.windHoldMin,
  deg: values.sailDeadDeg,
  share: values.sailDeadShare,
};

// The wind tool (the owner, 2026-11-23: the wind's guide turned into a tool,
// a week at a time; its text kept in two short paragraphs under the table).
export default function WindPage() {
  const t = (id: string) => serverFormat(`pages.wind.${id}`, WIND);
  return (
    <>
      <ArchiveBar />
      <Container
        component="main"
        maxWidth="lg"
        sx={{ py: 6, minHeight: "70vh" }}
      >
        <PageTrail
          steps={[
            { name: serverFormat("archive.home"), href: "/" },
            { name: serverFormat("archive.tools"), href: "/tools" },
            { name: serverFormat("archive.wind") },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          {t("title")}
        </Typography>
        <Typography sx={{ mb: 3 }}>
          <b>{t("question")}</b> {t("answer")}
        </Typography>
        <WindTool />
        <Typography sx={{ mb: 2 }}>{t("read")}</Typography>
        <Typography>
          {t("dead")} <Link href="/catalog/bosses#moder">{t("moder")}</Link>.
        </Typography>
      </Container>
      <ArchiveFooter />
    </>
  );
}
