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
import { BIOMES } from "@/components/catalog/BiomeSections";
import { ItemIcon } from "@/components/catalog/ItemIcon";
import Link from "@/components/LocaleLink";
import type { GameName } from "@/lib/i18n/game-names";
import { gameNames } from "@/lib/i18n/names";
import { serverIntl, type ServerIntl, type Values } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import farming from "@/lib/valheim/farming.json";
import { RowLink } from "@/components/catalog/RowLink";

export function generateMetadata() {
  return pageMetadata("pages.farming.meta", "/guides/basics/farming");
}

// The page's words, in the page's language.
const words = (intl: ServerIntl) => (id: string, values?: Values) =>
  intl.format(`pages.farming.${id}`, values);

type Plant = (typeof farming)[number];
type Thing = { key: string; name: string; amount: number };

// The run's order of biomes, then the English name.
const byRun = (a: Plant, b: Plant) =>
  BIOMES.indexOf(a.biome ?? "elsewhere") -
    BIOMES.indexOf(b.biome ?? "elsewhere") || a.name.localeCompare(b.name);

// An item with its icon, a link to the materials catalogue (which says what
// it goes into), and "× n" past one; its name in the page's language.
function material(x: Thing, name: GameName) {
  return (
    <Box key={x.key}>
      <ItemIcon item={x.key}>
        <RowLink item={x.key}>{name(x.name)}</RowLink>
        {x.amount > 1 ? ` × ${x.amount}` : ""}
      </ItemIcon>
    </Box>
  );
}

// The game keeps a crop and the plant that gives its seeds back as two
// pieces (Carrot from Carrot Seeds, Seed-carrot from a carrot); one row holds
// both: the seed plant is the one whose harvest the crop is planted with, and
// whose piece the game names `sapling_seed…` (a carrot and its seeds give
// each other, so the name tells which is which).
const first = (x: unknown[]) => (x[0] as Thing | undefined)?.key;
const isSeedPlant = (p: Plant) =>
  p.key.toLowerCase().startsWith("sapling_seed");
const seedPlantOf = (crop: Plant, list: Plant[]) =>
  isSeedPlant(crop)
    ? undefined
    : list.find(
        (s) => isSeedPlant(s) && first(s.gives) === first(crop.plantWith),
      );

// One table of plants: the plant, what it is planted with, what it gives,
// what gives its seeds back, how long it grows and where it may grow.
// A crop's own name repeats its seed or its harvest (Carrot: Carrot Seeds →
// Carrot), so the crops' table leaves it out (the owner, 2026-11-17); a tree's
// and a vine's differ from both (Birch Sapling: Birch Seeds → fine wood).
function plantTable(
  list: Plant[],
  named: boolean,
  name: GameName,
  intl: ServerIntl,
) {
  const t = words(intl);
  const biomeName = (b: string) => intl.format(`pages.crafting.biome.${b}`);
  const item = (x: Thing) => material(x, name);
  const seeds = new Map(list.map((p) => [p.key, seedPlantOf(p, list)]));
  const seedPlants = new Set(
    [...seeds.values()].filter(Boolean).map((s) => s!.key),
  );
  const rows = list.filter((p) => !seedPlants.has(p.key));
  const anySeeds = rows.some((p) => seeds.get(p.key));
  return (
    <TableContainer sx={{ mb: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {named ? <TableCell>{t("head.plant")}</TableCell> : null}
            <TableCell>{t("head.with")}</TableCell>
            <TableCell>{t("head.gives")}</TableCell>
            {anySeeds ? <TableCell>{t("head.seeds")}</TableCell> : null}
            <TableCell>{t("head.grows")}</TableCell>
            <TableCell>{t("head.where")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...rows].sort(byRun).map((p) => {
            const s = seeds.get(p.key);
            return (
              <TableRow key={p.key} id={p.key.toLowerCase()}>
                {named ? (
                  <TableCell>
                    <ItemIcon item={p.key}>
                      <RowLink item={p.key}>{name(p.name)}</RowLink>
                    </ItemIcon>
                  </TableCell>
                ) : null}
                <TableCell>{(p.plantWith as Thing[]).map(item)}</TableCell>
                <TableCell>
                  {p.gives.length > 0 ? (p.gives as Thing[]).map(item) : "—"}
                </TableCell>
                {anySeeds ? (
                  <TableCell>
                    {s ? (
                      <>
                        {/* What is planted for seeds is the harvest, said once in
                          "Gives"; only kale is planted with its seeds again. */}
                        {first(s.plantWith) !== first(p.gives) ? (
                          <>
                            {(s.plantWith as Thing[]).map(item)}
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {t("seedsGive")}
                            </Typography>
                          </>
                        ) : null}
                        {(s.gives as Thing[]).map(item)}
                      </>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                ) : null}
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  {t("minutes", {
                    min: Math.round(p.minutes[0]),
                    max: Math.round(p.minutes[1]),
                  })}
                </TableCell>
                <TableCell>
                  {intl.list(p.biomes.map(biomeName), "unit")}
                </TableCell>
              </TableRow>
            );
          })}
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

const range = (m: number[]) => ({
  min: Math.round(m[0]),
  max: Math.round(m[1]),
});

// What the tables say, read off the Valheim generator's data, never typed
// (the owner, 2026-11-23: the page had no conclusion, only the figures).
// A crop is its harvest row, not the seed plant of the same crop.
const CROPS = farming.filter(
  (p) => p.kind === "crop" && !/^Seed[ -]/.test(p.name),
);
// Where you live, the usual player's home (`site-text.md` → Two homes).
const HOME = "meadows";
// The biome where the most crops grow, and what grows only in one biome.
const BEST = BIOMES.map((b) => ({
  b,
  crops: CROPS.filter((c) => c.biomes.includes(b)),
})).sort((x, y) => y.crops.length - x.crops.length)[0];
const ONLY_ONE = CROPS.filter((c) => c.biomes.length === 1);
const AT_HOME = CROPS.filter((c) => c.biomes.includes(HOME));
const CROP_MINUTES = range(CROPS[0].minutes as number[]);
const SAME_TIME = CROPS.every(
  (c) =>
    c.minutes[0] === CROPS[0].minutes[0] &&
    c.minutes[1] === CROPS[0].minutes[1],
);
// Trees: the one that gives the most fine wood, and the quickest.
const TREES = farming.filter((p) => p.kind === "tree");
const fine = (p: Plant) =>
  (p.gives as Thing[]).find((g) => g.key === "FineWood")?.amount ?? 0;
const MOST_FINE = [...TREES].sort((a, b) => fine(b) - fine(a))[0];
const QUICKEST = [...TREES]
  .filter((p) => (p.gives as Thing[]).length > 0)
  .sort((a, b) => a.minutes[1] - b.minutes[1])[0];
const VINES = farming.filter((p) => p.kind === "vine");

export default async function FarmingPage() {
  const name = await gameNames();
  const intl = await serverIntl();
  const t = words(intl);
  const biomeName = (b: string) => intl.format(`pages.crafting.biome.${b}`);
  const of = (kind: string) => farming.filter((p) => p.kind === kind);
  return (
    <>
      <ArchiveBar />
      <Container
        component="main"
        maxWidth="lg"
        sx={{ py: 6, minHeight: "70vh" }}
      >
        <PageTrail crumb="archive.guideFarming" />
        <Typography variant="h3" component="h1" gutterBottom>
          {t("title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>{t("question")}</b> {t("lead")}
        </Typography>
        <Typography sx={{ mb: 2 }}>{t("cultivator")}</Typography>

        <Section id="crops" title={t("crops.title")}>
          <Typography sx={{ mb: 2 }}>
            {intl.rich("pages.farming.crops.text", {
              link: (chunks) => (
                <Link href="/database/materials/materials">{chunks}</Link>
              ),
            })}
          </Typography>
          {plantTable(of("crop"), false, name, intl)}
          <Typography sx={{ mb: 2 }}>
            {t("crops.conclusion", {
              biome: t(`crops.biome.${BEST.b}`),
              count: BEST.crops.length,
              all: CROPS.length,
              missing: intl.list(
                CROPS.filter((c) => !BEST.crops.includes(c)).map((c) =>
                  name(c.name),
                ),
              ),
              only: intl.list(
                ONLY_ONE.map((c) =>
                  t("crops.onlyIn", {
                    name: name(c.name),
                    biome: biomeName(c.biomes[0]),
                  }),
                ),
              ),
              home: AT_HOME.length,
            })}{" "}
            {SAME_TIME ? t("crops.sameTime", CROP_MINUTES) : null}
          </Typography>
        </Section>
        <Section id="trees" title={t("trees.title")}>
          <Typography sx={{ mb: 2 }}>{t("trees.text")}</Typography>
          {plantTable(of("tree"), true, name, intl)}
          <Typography sx={{ mb: 2 }}>
            {t("trees.conclusion", {
              most: name(MOST_FINE.name),
              fine: fine(MOST_FINE),
              ...range(MOST_FINE.minutes as number[]),
              quick: name(QUICKEST.name),
              quickMax: Math.round(QUICKEST.minutes[1]),
            })}
          </Typography>
        </Section>
        <Section id="vines" title={t("vines.title")}>
          <Typography sx={{ mb: 2 }}>{t("vines.text")}</Typography>
          {plantTable(of("vine"), true, name, intl)}
          <Typography sx={{ mb: 2 }}>
            {t("vines.conclusion", {
              ...range(VINES[0].minutes as number[]),
              crop: CROP_MINUTES.min,
            })}
          </Typography>
        </Section>
        <Section id="where" title={t("where.title")}>
          <Typography sx={{ mb: 2 }}>
            {intl.rich("pages.farming.where.text", {
              biome: intl.format(`pages.crafting.theBiome.${BEST.b}`),
              home: AT_HOME.length,
              all: CROPS.length,
              link: (chunks) => (
                <Link href="/database/food/food">{chunks}</Link>
              ),
            })}
          </Typography>
        </Section>
      </Container>
      <ArchiveFooter />
    </>
  );
}
