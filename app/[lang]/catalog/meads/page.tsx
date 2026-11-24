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
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import {
  BiomeSections,
  material,
  searchText,
} from "@/components/catalog/BiomeSections";
import { ItemIcon } from "@/components/catalog/ItemIcon";
import { TableSearch } from "@/components/catalog/TableSearch";
import { effectText, type Effect } from "@/lib/valheim/effects";
import type { GameName } from "@/lib/i18n/game-names";
import { gameNames } from "@/lib/i18n/names";
import { serverIntl, type ServerIntl, type Values } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import SEED_STATS from "@/lib/valheim/seed-stats.json";
import crafting from "@/lib/valheim/crafting.json";

export function generateMetadata() {
  return pageMetadata("pages.meads.meta", "/catalog/meads");
}

// Under a minute a mead's time is told in seconds (Tasty Mead 10 s, the
// game's `consume.ttl`), not as a fraction of a minute.
const SECONDS_A_MINUTE = 60;

// The page's words, in the page's language.
const words = (intl: ServerIntl) => (id: string, values?: Values) =>
  intl.format(`pages.meads.${id}`, values);

type Base = (typeof crafting.gear)[number];
type Mead = {
  key: string;
  name: string;
  count: number;
  effect?: { text: string; seconds: number; effects: Effect[] } | null;
};

// One row a mead: the mead and its effect (the game's text, then each effect
// as a number, and how long it lasts), then its base: what the cauldron takes
// for it, and how many bottles the fermenter makes of one base.
function meadTable(list: Base[], name: GameName, intl: ServerIntl) {
  const t = words(intl);
  // By the base's English name.
  const rows = [...list].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <TableContainer>
      <Table size="small" sx={{ tableLayout: { md: "fixed" } }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: { md: "24%" } }}>
              {t("head.mead")}
            </TableCell>
            <TableCell sx={{ width: { md: "40%" } }}>
              {t("head.effect")}
            </TableCell>
            <TableCell>{t("head.base")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((b) => {
            const m = b.mead as Mead | null;
            return (
              <TableRow
                key={b.key}
                id={(m?.key ?? b.key).toLowerCase()}
                data-search={searchText(
                  m?.name && name(m.name),
                  name(b.name),
                  ...b.resources.map((r) => name(r.name)),
                )}
              >
                <TableCell>
                  <ItemIcon item={m?.key ?? b.key}>
                    {name(m?.name ?? b.name)}
                  </ItemIcon>
                </TableCell>
                <TableCell>
                  {m?.effect?.text ? (
                    <Typography
                      variant="body2"
                      sx={{ fontStyle: "italic", mb: 0.5 }}
                    >
                      {name(m.effect.text)}
                    </Typography>
                  ) : null}
                  {(m?.effect?.effects ?? []).map((e, i) => (
                    <Box key={i}>{effectText(e, intl)}</Box>
                  ))}
                  {m?.effect?.seconds ? (
                    <Box sx={{ color: "text.secondary" }}>
                      {m.effect.seconds < SECONDS_A_MINUTE
                        ? t("lastsSeconds", { seconds: m.effect.seconds })
                        : t("lasts", {
                            minutes:
                              Math.round(
                                (m.effect.seconds / SECONDS_A_MINUTE) * 10,
                              ) / 10,
                          })}
                    </Box>
                  ) : null}
                </TableCell>
                <TableCell>
                  <ItemIcon item={b.key}>
                    {name(b.name)}
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block" }}
                    >
                      {t("makes", { count: m?.count ?? 1 })}
                    </Typography>
                  </ItemIcon>
                  {b.resources.map((r) => material(r, name))}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default async function MeadsPage() {
  const name = await gameNames();
  const intl = await serverIntl();
  const t = words(intl);
  const list = crafting.gear.filter((g) => g.page === "meads");
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
            { name: intl.format("archive.catalog"), href: "/catalog" },
            { name: intl.format("archive.guideMeads") },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          {t("title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>{t("question")}</b> {t("lead")}
        </Typography>
        {/* How many hives keep one fermenter busy (the Valheim generator's numbers, the same as the Meadows guide's). */}
        <Typography sx={{ mb: 2 }}>
          {intl.rich("pages.meads.hives", {
            b: (chunks) => <b>{chunks}</b>,
            honey: SEED_STATS.meadHoneyNeed,
            hive: SEED_STATS.hiveSeconds,
            ferment: SEED_STATS.fermentSeconds,
            hives: SEED_STATS.hivesFive,
          })}
        </Typography>
        <TableSearch>
          <BiomeSections
            list={list}
            table={(rows) => meadTable(rows, name, intl)}
          />
        </TableSearch>
      </Container>
      <ArchiveFooter />
    </>
  );
}
