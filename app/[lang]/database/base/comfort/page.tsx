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
import type { ReactNode } from "react";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { AnchorHeading } from "@/components/catalog/AnchorHeading";
import {
  BIOMES,
  anchor,
  biomeOf,
  seasonNote,
} from "@/components/catalog/BiomeSections";
import { ItemIcon } from "@/components/catalog/ItemIcon";
import type { GameName } from "@/lib/i18n/game-names";
import { gameNames } from "@/lib/i18n/names";
import { serverIntl, type ServerIntl, type Values } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import comfort from "@/lib/valheim/comfort.json";
import crafting from "@/lib/valheim/crafting.json";
import { RowLink } from "@/components/catalog/RowLink";

export function generateMetadata() {
  return pageMetadata("pages.comfort.meta", "/database/base/comfort");
}

// The page's words in the page's language.
const wordsOf = (intl: ServerIntl) => ({
  t: (id: string, values?: Values) =>
    intl.format(`pages.comfort.${id}`, values),
  biomeName: (b: string) => intl.format(`pages.crafting.biome.${b}`),
  // The note that tells twin pieces apart, as the build pieces' pages show it
  // (two Item Stands: on a wall, on a floor).
  pieceNote: (key: string) =>
    intl.has(`pages.buildPieces.note.${key}`)
      ? intl.format(`pages.buildPieces.note.${key}`)
      : null,
});

// Comfort before any piece: 1, and 1 more under a roof (the game's
// SE_Rested.CalculateComfortLevel).
const BASE_COMFORT = 1;
const SHELTER_COMFORT = 1;
// The group of pieces that each count once, however many stand.
const NO_KIND = "none";

// Each comfort piece with its home biome from the build pieces catalogue
// (which holds its station and materials; this page links there): the first
// where all it takes can be had and the station it needs nearby stands (the
// hearth's stone, but the stonecutter's iron).
const pieceOf = new Map(crafting.building.map((b) => [b.key, b]));
const stationOf = new Map(crafting.building.map((b) => [b.name, b]));
const later = (a: string | null, b: string | null) =>
  BIOMES.indexOf(biomeOf({ biome: a })) >= BIOMES.indexOf(biomeOf({ biome: b }))
    ? a
    : b;
const groups = comfort.groups.map((g) => ({
  group: g.group,
  pieces: g.pieces.map((p) => {
    const b = pieceOf.get(p.key);
    const station = p.station ? stationOf.get(p.station) : undefined;
    return {
      ...p,
      biome: station
        ? later(b?.biome ?? null, station.biome)
        : (b?.biome ?? null),
      season: b?.season ?? null,
    };
  }),
}));
type Piece = (typeof groups)[number]["pieces"][number];

const rested = (level: number) =>
  comfort.baseMinutes + (level - 1) * comfort.minutesPerLevel;

// Comfort a base can reach with what the run has by the end of each biome:
// the best piece of each kind whose home biome is that one or earlier, and
// every piece of no kind; what joined it in that biome. Seasonal pieces count
// too (the owner, 2026-11-17); their rows say the dates.
type Pick = Piece & { group: string };
const reach = BIOMES.map((biome, i) => {
  const had = (p: Piece) => BIOMES.indexOf(biomeOf(p)) <= i;
  const picked: Pick[] = [];
  for (const g of groups) {
    const ready = g.pieces.filter(had);
    if (g.group === NO_KIND) {
      picked.push(...ready.map((p) => ({ ...p, group: g.group })));
    } else if (ready.length > 0) {
      const top = ready.reduce((a, b) => (b.comfort > a.comfort ? b : a));
      picked.push({ ...top, group: g.group });
    }
  }
  const level =
    BASE_COMFORT + SHELTER_COMFORT + picked.reduce((s, p) => s + p.comfort, 0);
  return { biome, level, picked };
}).filter((r) => r.biome !== "elsewhere");
// What a biome adds: a piece that raises comfort, with what it raises it by
// (a better piece of a kind adds only its difference; an equal one nothing).
const withNew = reach.map((r, i) => {
  const before = i === 0 ? [] : reach[i - 1].picked;
  const added = r.picked
    .map((p) => {
      if (p.group === NO_KIND) {
        return before.some((q) => q.key === p.key)
          ? null
          : { ...p, gain: p.comfort };
      }
      const old = before.find((q) => q.group === p.group)?.comfort ?? 0;
      return p.comfort > old ? { ...p, gain: p.comfort - old } : null;
    })
    .filter((p) => p !== null);
  return { ...r, added };
});
const most = reach[reach.length - 1];

// Sorted by comfort, biome, then the English name.
function groupTable(pieces: Piece[], name: GameName, intl: ServerIntl) {
  const { t, biomeName, pieceNote } = wordsOf(intl);
  const rows = [...pieces].sort(
    (a, b) =>
      b.comfort - a.comfort ||
      BIOMES.indexOf(biomeOf(a)) - BIOMES.indexOf(biomeOf(b)) ||
      a.name.localeCompare(b.name),
  );
  return (
    <TableContainer sx={{ mb: 2 }}>
      <Table size="small" sx={{ tableLayout: { md: "fixed" } }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: { md: "60%" } }}>
              {t("head.piece")}
            </TableCell>
            <TableCell align="right" sx={{ width: { md: "15%" } }}>
              {t("head.comfort")}
            </TableCell>
            <TableCell>{t("head.biome")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((p) => (
            <TableRow key={p.key}>
              <TableCell>
                <ItemIcon item={p.key}>
                  <RowLink item={p.key}>{name(p.name)}</RowLink>
                  {p.litOnly || p.season || pieceNote(p.key) ? (
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block" }}
                    >
                      {[
                        pieceNote(p.key),
                        p.litOnly ? t("litMark") : null,
                        seasonNote(p.season, intl),
                      ]
                        .filter(Boolean)
                        .join(". ")}
                    </Typography>
                  ) : null}
                </ItemIcon>
              </TableCell>
              <TableCell align="right">{p.comfort}</TableCell>
              <TableCell>{biomeName(biomeOf(p))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// A section of the page: its anchor, and a heading that is the link to it.
function Section(props: { id: string; title: string; children: ReactNode }) {
  return (
    <Box component="section" id={props.id}>
      <AnchorHeading id={props.id} sx={{ mt: 4, py: 1 }}>
        {props.title}
      </AnchorHeading>
      {props.children}
    </Box>
  );
}

export default async function ComfortPage() {
  const name = await gameNames();
  const intl = await serverIntl();
  const { t, biomeName } = wordsOf(intl);
  return (
    <>
      <ArchiveBar />
      <Container
        component="main"
        maxWidth="lg"
        sx={{ py: 6, minHeight: "70vh" }}
      >
        <PageTrail crumb="archive.guideComfort" />
        <Typography variant="h3" component="h1" gutterBottom>
          {t("title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>{t("question")}</b> {t("lead")}
        </Typography>

        <Section id="by-biome" title={t("byBiome.title")}>
          <Typography sx={{ mb: 2 }}>
            {t("byBiome.text", {
              most: most.level,
              minutes: rested(most.level),
            })}
          </Typography>
          <TableContainer sx={{ mb: 2 }}>
            <Table size="small" sx={{ tableLayout: { md: "fixed" } }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: { md: "16%" } }}>
                    {t("head.biome")}
                  </TableCell>
                  <TableCell align="right" sx={{ width: { md: "10%" } }}>
                    {t("head.comfort")}
                  </TableCell>
                  <TableCell align="right" sx={{ width: { md: "12%" } }}>
                    {t("head.rested")}
                  </TableCell>
                  <TableCell>{t("head.added")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {withNew.map((r) => (
                  <TableRow key={r.biome} id={`by-biome-${anchor(r.biome)}`}>
                    <TableCell>{biomeName(r.biome)}</TableCell>
                    <TableCell align="right">{r.level}</TableCell>
                    <TableCell align="right">
                      {t("minutes", { minutes: rested(r.level) })}
                    </TableCell>
                    <TableCell>
                      {r.added.length === 0 ? "—" : null}
                      {r.added.map((p) => (
                        <Box key={p.key}>
                          <ItemIcon item={p.key}>
                            <RowLink item={p.key}>{name(p.name)}</RowLink> +
                            {p.gain}
                          </ItemIcon>
                        </Box>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Section>

        <Section id="how-it-counts" title={t("rule.title")}>
          <Typography sx={{ mb: 2 }}>
            {t("rule.rested", {
              base: comfort.baseMinutes,
              per: comfort.minutesPerLevel,
            })}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            {t("rule.sum", { base: BASE_COMFORT, shelter: SHELTER_COMFORT })}
          </Typography>
          <Typography sx={{ mb: 2 }}>{t("rule.groups")}</Typography>
          <Typography sx={{ mb: 2 }}>{t("rule.lit")}</Typography>
        </Section>

        {groups.map((g) => (
          <Section key={g.group} id={g.group} title={t(`group.${g.group}`)}>
            {groupTable(g.pieces, name, intl)}
          </Section>
        ))}
      </Container>
      <ArchiveFooter />
    </>
  );
}
