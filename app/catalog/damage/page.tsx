import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import { PageTrail } from "@seed-archive/ui/page-trail";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { WeaponMatrix } from "@/components/catalog/WeaponMatrix";
import { serverFormat } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Damage types in Valheim — Seed Archive",
  description:
    "Every creature's and boss's weaknesses and resistances to each damage type, the weapon kind to bring, and the damage it deals back.",
  alternates: { canonical: "/catalog/damage" },
};

const t = (id: string) => serverFormat(`pages.damage.${id}`);

export default function DamagePage() {
  return (
    <>
      <ArchiveBar />
      <Container component="main" maxWidth="lg" sx={{ py: 6, minHeight: "70vh" }}>
        <PageTrail
          steps={[
            { name: serverFormat("archive.home"), href: "/" },
            { name: serverFormat("archive.catalog"), href: "/catalog" },
            { name: serverFormat("archive.guideDamage") },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          {t("title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>{t("question")}</b> {t("lead")}
        </Typography>
        <WeaponMatrix />
      </Container>
      <ArchiveFooter />
    </>
  );
}
