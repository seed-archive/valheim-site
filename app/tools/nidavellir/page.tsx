import Container from "@mui/material/Container";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { PageTrail } from "@seed-archive/ui/page-trail";
import { ForgeName } from "@/components/tools/forge/ForgeName";
import { serverFormat } from "@/lib/i18n/server";

// Named after Nidavellir, where the dwarves Sindri and Brokkr forged Mjölnir
// (the owner, 2026-11-23); the title keeps the Forge of Potential, what a
// player searches for, and differs from the guide's.
export const metadata: Metadata = {
  title:
    "Nidavellir: Forge of Potential without breaking in Valheim — Seed Archive",
  description:
    "Pick an idol, an item and a step at the Forge of Potential, and get the character names whose first try raises it instead of breaking it.",
  alternates: { canonical: "/tools/nidavellir" },
};

export default function ForgePage() {
  const t = (id: string) => serverFormat(`pages.forgeName.${id}`);
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
            { name: serverFormat("archive.forgeName") },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          {t("title")}
        </Typography>
        <Typography
          sx={{ mb: 2, color: "text.secondary", fontStyle: "italic" }}
        >
          {t("subtitle")}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>{t("question")}</b> {t("answer")}
        </Typography>
        <Typography sx={{ mb: 3 }}>
          {t("guide")}{" "}
          <Link href="/guides/forge-of-potential">
            {serverFormat("archive.guideForge")}
          </Link>
          .
        </Typography>
        <ForgeName />
        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 1 }}>
          {t("how.title")}
        </Typography>
        <Typography sx={{ mb: 1 }}>{t("how.lead")}</Typography>
        <Typography sx={{ mb: 1 }}>{t("again")}</Typography>
        <Typography sx={{ mb: 1 }}>{t("how.why")}</Typography>
        <Typography sx={{ mb: 1 }}>
          {t("how.stepsBefore")}{" "}
          <Link href="/guides/forge-of-potential#how-do-i-raise-an-item-without-breaking-it">
            {t("how.steps")}
          </Link>
          , {t("how.catalogBefore")}{" "}
          <Link href="/catalog">{t("how.catalog")}</Link>.
        </Typography>
      </Container>
      <ArchiveFooter />
    </>
  );
}
