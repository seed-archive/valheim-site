import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import Link from "@/components/LocaleLink";
import { PageTrail } from "@/components/PageTrail";
import { WindTool } from "@/components/tools/wind/WindTool";
import { serverIntl } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import values from "@/lib/valheim/guide-values.json";

export function generateMetadata() {
  return pageMetadata("pages.wind.meta", "/tools/wind");
}

// The wind's numbers from the Valheim generator (the game's EnvMan and
// Ship): how long the main direction holds, and the dead angle.
const WIND = {
  hold: values.windHoldMin,
  deg: values.sailDeadDeg,
  share: values.sailDeadShare,
};

// The wind tool (the owner, 2026-11-23: the wind's guide turned into a tool,
// a week at a time; its text kept in two short paragraphs under the table).
export default async function WindPage() {
  const intl = await serverIntl();
  const t = (id: string) => intl.format(`pages.wind.${id}`, WIND);
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
            { name: intl.format("archive.wind") },
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
          {intl.rich("pages.wind.dead", {
            ...WIND,
            link: (chunks) => (
              <Link href="/catalog/bosses#moder">{chunks}</Link>
            ),
          })}
        </Typography>
      </Container>
      <ArchiveFooter />
    </>
  );
}
