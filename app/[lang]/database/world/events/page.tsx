import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { PageTrail } from "@/components/PageTrail";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { RowLink } from "@/components/catalog/RowLink";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { SectionLinks } from "@/components/catalog/SectionLinks";
import type { GameName } from "@/lib/i18n/game-names";
import { gameNames } from "@/lib/i18n/names";
import { serverIntl, type ServerIntl, type Values } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import events from "@/lib/valheim/events.json";

export function generateMetadata() {
  return pageMetadata("pages.events.meta", "/database/world/events");
}

// The page's words, in the page's language.
const words = (intl: ServerIntl) => (id: string, values?: Values) =>
  intl.format(`pages.events.${id}`, values);

type Key = { key: string; boss: string | null };
type Raid = (typeof events.events)[number];

// The raids that follow the boss order first (they end with a boss), then the
// ones that stay for good, each in the order the run meets them.
const ordered = [...events.events].sort(
  (a, b) => Number(b.ends.length > 0) - Number(a.ends.length > 0),
);

// Who comes, a line a name: two prefabs of one name (the Elaking and the one
// that carries a lantern) are one creature to a player, so their numbers add.
type Comer = {
  key: string;
  name: string | null;
  spawner: string | null;
  max: number;
};
function comers(r: Raid) {
  const out: Comer[] = [];
  for (const s of r.spawn as Comer[]) {
    const same = out.find((o) => o.name !== null && o.name === s.name);
    if (same) {
      same.max += s.max;
    } else {
      out.push({ ...s });
    }
  }
  return out;
}

function row(r: Raid, name: GameName, intl: ServerIntl) {
  const t = words(intl);
  const biomeName = (b: string) => intl.format(`pages.crafting.biome.${b}`);
  // A world key in words: a boss's defeat by its name, the rest by the page's
  // own words (`pages.events.key.<key>`).
  const keyText = (k: Key) => (k.boss ? name(k.boss) : t(`key.${k.key}`));
  const keys = (list: Key[]) => intl.list(list.map(keyText), "unit");
  return (
    <TableRow key={r.key} id={r.key.toLowerCase()}>
      <TableCell>
        <b>{name(r.name)}</b>
        {r.nearBase ? null : (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block" }}
          >
            {t("anywhere")}
          </Typography>
        )}
      </TableCell>
      <TableCell>
        {r.opens.length > 0 ? keys(r.opens) : t("fromStart")}
      </TableCell>
      <TableCell>{r.ends.length > 0 ? keys(r.ends) : t("never")}</TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {t("minutes", { m: Math.round((r.seconds / 60) * 10) / 10 })}
      </TableCell>
      <TableCell>
        {comers(r).map((s) => (
          <Box key={s.key}>
            {s.name === null ? (
              t(`spawner.${s.spawner}`)
            ) : (
              <RowLink item={s.key} creature>
                {name(s.name)}
              </RowLink>
            )}{" "}
            {t("atOnce", { n: s.max })}
          </Box>
        ))}
      </TableCell>
      <TableCell>{intl.list(r.biomes.map(biomeName), "unit")}</TableCell>
    </TableRow>
  );
}

export default async function EventsPage() {
  const name = await gameNames();
  const intl = await serverIntl();
  const t = words(intl);
  return (
    <>
      <ArchiveBar />
      <Container
        component="main"
        maxWidth="lg"
        sx={{ py: 6, minHeight: "70vh" }}
      >
        <SectionLinks>
          <PageTrail crumb="archive.guideEvents" />
          <Typography variant="h3" component="h1" gutterBottom>
            {t("title")}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <b>{t("question")}</b>{" "}
            {t("answer", {
              minutes: events.intervalMinutes,
              chance: events.chance,
            })}
          </Typography>
          <Typography sx={{ mb: 2 }}>{t("how")}</Typography>
          <TableContainer>
            <Table size="small" sx={{ "& td": { verticalAlign: "top" } }}>
              <TableHead>
                <TableRow>
                  <TableCell>{t("head.raid")}</TableCell>
                  <TableCell>{t("head.opens")}</TableCell>
                  <TableCell>{t("head.ends")}</TableCell>
                  <TableCell>{t("head.lasts")}</TableCell>
                  <TableCell>{t("head.who")}</TableCell>
                  <TableCell>{t("head.where")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{ordered.map((r) => row(r, name, intl))}</TableBody>
            </Table>
          </TableContainer>
          <Typography
            variant="h5"
            component="h2"
            id="jotun-invasion"
            sx={{ mt: 5, mb: 1 }}
          >
            {t("invasion.title")}
          </Typography>
          <Typography sx={{ mb: 2 }}>{t("invasion.text")}</Typography>
        </SectionLinks>
      </Container>
      <ArchiveFooter />
    </>
  );
}
