import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import Link from "@/components/LocaleLink";
import { PageTrail } from "@/components/PageTrail";
import { ForgeName } from "@/components/tools/forge/ForgeName";
import { serverIntl } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/metadata";

// Named after Nidavellir, where the dwarves Sindri and Brokkr forged Mjölnir
// (the owner, 2026-11-23); the title keeps the Forge of Potential, what a
// player searches for, and differs from the guide's.
export function generateMetadata() {
  return pageMetadata("pages.forgeName.meta", "/tools/nidavellir");
}

export default async function ForgePage() {
  const intl = await serverIntl();
  const t = (id: string) => intl.format(`pages.forgeName.${id}`);
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
            { name: intl.format("archive.home"), href: "/" },
            { name: intl.format("archive.tools"), href: "/tools" },
            { name: intl.format("archive.forgeName") },
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
          {intl.rich("pages.forgeName.guide", {
            link: (chunks) => (
              <Link href="/guides/forge-of-potential">{chunks}</Link>
            ),
          })}
        </Typography>
        <ForgeName />
        <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 1 }}>
          {t("how.title")}
        </Typography>
        <Typography sx={{ mb: 1 }}>{t("how.lead")}</Typography>
        <Typography sx={{ mb: 1 }}>{t("again")}</Typography>
        <Typography sx={{ mb: 1 }}>{t("how.why")}</Typography>
        <Typography sx={{ mb: 1 }}>
          {intl.rich("pages.forgeName.how.steps", {
            steps: (chunks) => (
              <Link href="/guides/forge-of-potential#how-do-i-raise-an-item-without-breaking-it">
                {chunks}
              </Link>
            ),
            catalog: (chunks) => <Link href="/catalog">{chunks}</Link>,
          })}
        </Typography>
      </Container>
      <ArchiveFooter />
    </>
  );
}
