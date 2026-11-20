import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { PageTrail } from "@seed-archive/ui/page-trail";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { AnchorHeading } from "@/components/catalog/AnchorHeading";
import { BAR, BIOMES } from "@/components/catalog/BiomeSections";
import { ItemIcon } from "@/components/catalog/ItemIcon";
import { serverFormat } from "@/lib/i18n/server";
import farming from "@/lib/valheim/farming.json";
import { RowLink } from "@/components/catalog/RowLink";

export const metadata: Metadata = {
  title: "Farming in Valheim — Seed Archive",
  description:
    "Every crop, tree and vine the cultivator plants: what it is planted with, what it gives, how long it grows, where it grows and which dishes it feeds.",
  alternates: { canonical: "/guides/farming" },
};

const t = (id: string, values?: Record<string, string | number>) =>
  serverFormat(`pages.farming.${id}`, values);
const biomeName = (b: string) => serverFormat(`pages.crafting.biome.${b}`);

type Plant = (typeof farming)[number];
type Thing = { key: string; name: string; amount: number };

// The run's order of biomes.
const byRun = (a: Plant, b: Plant) =>
  BIOMES.indexOf(a.biome ?? "elsewhere") -
    BIOMES.indexOf(b.biome ?? "elsewhere") || a.name.localeCompare(b.name);

// An item with its icon, a link to the materials catalogue (which says what
// it goes into), and "× n" past one.
function material(x: Thing) {
  return (
    <Box key={x.key}>
      <ItemIcon item={x.key}>
        <RowLink item={x.key}>{x.name}</RowLink>
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
function plantTable(list: Plant[], named: boolean) {
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
                      <RowLink item={p.key}>{p.name}</RowLink>
                    </ItemIcon>
                  </TableCell>
                ) : null}
                <TableCell>{(p.plantWith as Thing[]).map(material)}</TableCell>
                <TableCell>
                  {p.gives.length > 0
                    ? (p.gives as Thing[]).map(material)
                    : "—"}
                </TableCell>
                {anySeeds ? (
                  <TableCell>
                    {s ? (
                      <>
                        {/* What is planted for seeds is the harvest, said once in
                          "Gives"; only kale is planted with its seeds again. */}
                        {first(s.plantWith) !== first(p.gives) ? (
                          <>
                            {(s.plantWith as Thing[]).map(material)}
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {t("seedsGive")}
                            </Typography>
                          </>
                        ) : null}
                        {(s.gives as Thing[]).map(material)}
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
                <TableCell>{p.biomes.map(biomeName).join(", ")}</TableCell>
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
    <Box component="section" id={props.id} sx={{ scrollMarginTop: BAR }}>
      <AnchorHeading
        id={props.id}
        sx={{
          position: "sticky",
          top: BAR,
          zIndex: 2,
          mt: 4,
          py: 1,
          bgcolor: "background.default",
        }}
      >
        {props.title}
      </AnchorHeading>
      {props.children}
    </Box>
  );
}

export default function FarmingPage() {
  const of = (kind: string) => farming.filter((p) => p.kind === kind);
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
            { name: serverFormat("archive.guides"), href: "/guides" },
            { name: serverFormat("archive.guideFarming") },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          {t("title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>{t("question")}</b> {t("lead")}
        </Typography>
        <Typography sx={{ mb: 2 }}>{t("cultivator")}</Typography>

        <Section id="crops" title={t("crops.title")}>
          <Typography sx={{ mb: 2 }}>
            {t("crops.text")}{" "}
            <Link href="/catalog/materials">{t("crops.materials")}</Link>.
          </Typography>
          {plantTable(of("crop"), false)}
        </Section>
        <Section id="trees" title={t("trees.title")}>
          <Typography sx={{ mb: 2 }}>{t("trees.text")}</Typography>
          {plantTable(of("tree"), true)}
        </Section>
        <Section id="vines" title={t("vines.title")}>
          <Typography sx={{ mb: 2 }}>{t("vines.text")}</Typography>
          {plantTable(of("vine"), true)}
        </Section>
      </Container>
      <ArchiveFooter />
    </>
  );
}
