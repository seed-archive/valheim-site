import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { PageTrail } from "@/components/PageTrail";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { SectionLinks } from "@/components/catalog/SectionLinks";
import { WeaponMatrix } from "@/components/catalog/WeaponMatrix";
import { serverIntl } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.damage.meta", "/database/world/damage");
}

export default async function DamagePage() {
  const intl = await serverIntl();
  const t = (id: string) => intl.format(`pages.damage.${id}`);
  return (
    <>
      <ArchiveBar />
      <Container
        component="main"
        maxWidth="lg"
        sx={{ py: 6, minHeight: "70vh" }}
      >
        <PageTrail crumb="archive.guideDamage" />
        <Typography variant="h3" component="h1" gutterBottom>
          {t("title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>{t("question")}</b> {t("lead")}
        </Typography>
        <SectionLinks>
          <WeaponMatrix />
        </SectionLinks>
      </Container>
      <ArchiveFooter />
    </>
  );
}
