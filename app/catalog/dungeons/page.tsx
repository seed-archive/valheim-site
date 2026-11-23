import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import Link from "next/link";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { SectionLinks } from "@/components/catalog/SectionLinks";
import { PageTrail } from "@seed-archive/ui/page-trail";
import { serverFormat, serverMessages } from "@/lib/i18n/server";
import creatures from "@/lib/valheim/creatures.json";
import places from "@/lib/valheim/places-spawners.json";
import { placeAnchor } from "@/lib/valheim/places";
import { mapHref } from "@/lib/valheim/switches";

export const metadata: Metadata = {
  title: "Caves and dungeons in Valheim — Seed Archive",
  description:
    "Every cave, dungeon and camp that holds creatures: which creatures stand there, the chance each stands, and where to find them on the map.",
  alternates: { canonical: "/catalog/dungeons" },
};

type Place = (typeof places)[number];

const t = (id: string, values?: Record<string, string | number>) =>
  serverFormat(`pages.dungeons.${id}`, values);

// The sections: what a seed builds behind a door, what it lays out in the
// open, and what is built the same every time.
const SECTIONS = ["dungeon", "camp", "place"];

// Where a link to a place's spawners opens: the world's centre, at the zoom
// from which spawner pins show (the map's MAX_MARK_STEP: zoom -2).
const SPAWNERS_AT = { x: 0, y: 0, zoom: -2 };

// A kind of spawner by the map's name for it.
const kindName = (kind: string) => serverFormat(`pages.map.legend.${kind}`);
// A place by the map's name for it. A place the map does not name stands in
// no world a seed makes, or only as a part of another place, and is left out.
const named = (p: Place) =>
  p.key !== "unnamed" && `pages.map.places.${p.key}` in serverMessages;
const placeName = (p: Place) => serverFormat(`pages.map.places.${p.key}`);

// Creatures by their prefab, each a link to its entry; variants under one
// name (two Draugr prefabs) are named once.
function creatureLinks(keys: string[]) {
  const list = creatures
    .filter((c) => keys.includes(c.key))
    .filter((c, i, all) => all.findIndex((o) => o.name === c.name) === i);
  // A spawner may make a thing that is no creature (the Charred Fortress's
  // ballista): named in words, without a link.
  const things = keys.filter(
    (k) => `pages.dungeons.thing.${k}` in serverMessages,
  );
  return [
    ...list.map((c, i) => (
      <span key={c.key}>
        {i > 0 ? ", " : ""}
        <Link href={`/catalog/creatures#${c.key.toLowerCase()}`}>{c.name}</Link>
      </span>
    )),
    ...things.map((k, i) => (
      <span key={k}>
        {list.length + i > 0 ? ", " : ""}
        {t(`thing.${k}`)}
      </span>
    )),
  ];
}

// The places grouped under one name: every variant of a Burial Chamber is
// one entry, its variants listed in it.
function grouped(section: string) {
  const byName = new Map<string, Place[]>();
  for (const p of places.filter((p) => p.kind === section && named(p))) {
    const name = placeName(p);
    byName.set(name, [...(byName.get(name) ?? []), p]);
  }
  return [...byName.entries()].sort(([a], [b]) => a.localeCompare(b));
}

export default function DungeonsPage() {
  // One name may stand in two sections (the Ruins that are a camp and the
  // ruins that are not): the first keeps the anchor other pages link, the
  // second takes its section's.
  const anchors = new Set<string>();
  const anchorOf = (section: string, name: string) => {
    const anchor = placeAnchor(name);
    const id = anchors.has(anchor) ? `${section}-${anchor}` : anchor;
    anchors.add(id);
    return id;
  };
  return (
    <>
      <ArchiveBar />
      <Container
        component="main"
        maxWidth="md"
        sx={{ py: 6, minHeight: "70vh" }}
      >
        <SectionLinks>
          <PageTrail
            steps={[
              { name: serverFormat("archive.home"), href: "/" },
              { name: serverFormat("archive.catalog"), href: "/catalog" },
              { name: serverFormat("archive.guideDungeons") },
            ]}
          />
          <Typography variant="h3" component="h1" gutterBottom>
            {t("title")}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <b>{t("question")}</b> {t("lead")}
          </Typography>
          {SECTIONS.map((section) => (
            <section key={section}>
              <Typography
                variant="h5"
                component="h2"
                id={section}
                sx={{ mt: 5, mb: 1 }}
              >
                {t(`section.${section}.title`)}
              </Typography>
              <Typography sx={{ mb: 2 }}>
                {t(`section.${section}.text`)}
              </Typography>
              {grouped(section).map(([name, variants]) => {
                const roomCreatures = [
                  ...new Set(variants.flatMap((v) => v.roomCreatures)),
                ];
                const table = variants.some((v) => v.spawners.length > 0);
                // How many the game places at most a world, every variant
                // together; left out when a variant's count is not known.
                const quantity = variants.every((v) => v.quantity != null)
                  ? variants.reduce((s, v) => s + (v.quantity ?? 0), 0)
                  : null;
                return (
                  <article key={name}>
                    <Typography
                      variant="h6"
                      component="h3"
                      id={anchorOf(section, name)}
                      sx={{ mt: 3 }}
                    >
                      {name}
                    </Typography>
                    {quantity ? (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {t("quantity", { n: quantity })}
                      </Typography>
                    ) : null}
                    {/* The rooms' creatures stand in the table, with their
                      chance; the line is left for a place with none. */}
                    {!table && roomCreatures.length > 0 ? (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {t("rooms")} {creatureLinks(roomCreatures)}.
                      </Typography>
                    ) : null}
                    {table ? (
                      <TableContainer sx={{ mb: 1 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              {variants.length > 1 ? (
                                <TableCell>{t("head.variant")}</TableCell>
                              ) : null}
                              <TableCell>{t("head.spawner")}</TableCell>
                              <TableCell>{t("head.creatures")}</TableCell>
                              <TableCell>{t("head.count")}</TableCell>
                              <TableCell>{t("head.chance")}</TableCell>
                              <TableCell>{t("head.map")}</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {variants.flatMap((v, i) =>
                              v.spawners.map((s, row) => (
                                // Two rows of one place may share a kind and a
                                // chance (the Fulings of Hildir's fortress): the
                                // row's own number keeps the key unique.
                                <TableRow key={`${v.prefab}-${row}`}>
                                  {variants.length > 1 ? (
                                    <TableCell>
                                      {t("variant", { n: i + 1 })}
                                    </TableCell>
                                  ) : null}
                                  <TableCell>{kindName(s.kind)}</TableCell>
                                  <TableCell>
                                    {creatureLinks(s.creatures)}
                                  </TableCell>
                                  <TableCell>{s.count}</TableCell>
                                  <TableCell>{s.percent}%</TableCell>
                                  <TableCell>
                                    <Link
                                      href={mapHref(
                                        "spawners",
                                        [s.kind],
                                        SPAWNERS_AT,
                                      )}
                                    >
                                      {t("mapLink")}
                                    </Link>
                                  </TableCell>
                                </TableRow>
                              )),
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : null}
                  </article>
                );
              })}
            </section>
          ))}
        </SectionLinks>
      </Container>
      <ArchiveFooter />
    </>
  );
}
