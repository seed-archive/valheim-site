import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import type { ReactNode } from "react";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { PageTrail } from "@seed-archive/ui/page-trail";
import { ItemIcon } from "@/components/catalog/ItemIcon";
import { RowLink } from "@/components/catalog/RowLink";
import { MATERIAL_KINDS } from "@/lib/valheim/recipes";
import { RUN_ORDER } from "@/lib/valheim/run-order";
import { SellNote } from "@/components/catalog/SellNote";
import { serverFormat, serverMessages } from "@/lib/i18n/server";
import bosses from "@/lib/valheim/bosses.json";
import crafting from "@/lib/valheim/crafting.json";
import materials from "@/lib/valheim/materials.json";
import traders from "@/lib/valheim/traders.json";

const t = (id: string, values?: Record<string, string | number>) =>
  serverFormat(`pages.materials.${id}`, values);

// The biomes in the run's order; a material no source gives comes last.
const BIOMES = RUN_ORDER;
const ELSEWHERE = "elsewhere";
const biomeAt = (b: string | null) => {
  const i = BIOMES.indexOf(b ?? "");
  return i < 0 ? BIOMES.length : i;
};

// How many places a material names before "and more": a common one (wood,
// stone) lies in dozens (our own choice).
const PLACES_SHOWN = 6;

const anchor = (biome: string) =>
  biome.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

// Everything each material goes into: every recipe and build piece that takes
// it, earliest biome first.
const usedIn = new Map<
  string,
  { key: string; name: string; biome: string | null }[]
>();
for (const r of [...crafting.gear, ...crafting.building]) {
  for (const m of r.resources) {
    const list = usedIn.get(m.key) ?? [];
    if (!list.some((x) => x.key === r.key)) {
      list.push({ key: r.key, name: r.name, biome: r.biome });
    }
    usedIn.set(m.key, list);
  }
}
usedIn.forEach((list) =>
  list.sort(
    (a, b) =>
      biomeAt(a.biome) - biomeAt(b.biome) || a.name.localeCompare(b.name),
  ),
);

const traderName = new Map(
  traders.traders.map((x) => [x.key, x.name ?? x.key]),
);

type Material = (typeof materials)[number];

// Where a material comes from, as a list of short parts.
function sources(m: Material) {
  const parts: ReactNode[] = [];
  if (m.grown) {
    parts.push(t("grown"));
  }
  if (m.made) {
    parts.push(
      <RowLink key="made" item={m.key}>
        {t("made")}
      </RowLink>,
    );
  }
  if (m.gathered) {
    parts.push(t("gathered"));
  }
  if (m.fished) {
    parts.push(
      <Link key="fished" href="/catalog/creatures#fishing">
        {t("fished")}
      </Link>,
    );
  }
  // A fish's extra catch: shown, never counted for the biome (the owner: few
  // players fish).
  m.caughtWith.forEach((f) =>
    parts.push(
      <RowLink key={`with-${f.key}`} item={f.key} creature>
        {t("caughtWith", { fish: f.name })}
      </RowLink>,
    ),
  );
  m.droppedBy.forEach((c) =>
    parts.push(
      <RowLink key={c.key} item={c.key} creature>
        {c.name}
      </RowLink>,
    ),
  );
  m.soldBy.forEach((s) =>
    parts.push(
      <Link key={s} href={`/catalog/traders#${s.toLowerCase()}`}>
        {traderName.get(s) ?? s}
      </Link>,
    ),
  );
  const places = m.places.filter(
    (p) => `pages.map.places.${p}` in serverMessages,
  );
  places
    .slice(0, PLACES_SHOWN)
    .forEach((p) => parts.push(serverFormat(`pages.map.places.${p}`)));
  if (places.length > PLACES_SHOWN) {
    parts.push(t("more", { count: places.length - PLACES_SHOWN }));
  }
  return parts.length > 0
    ? parts.map((p, i) => (
        <span key={i}>
          {i > 0 ? ", " : ""}
          {p}
        </span>
      ))
    : "—";
}

// The bosses, by prefab: a trophy one of them drops gives its power on the
// start altar.
const BOSS_KEYS = new Set(bosses.map((b) => b.key));
const bossSlug = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, "-");
const bossOf = (m: Material) => m.droppedBy.find((c) => BOSS_KEYS.has(c.key));

// The section of the bosses' trophies, and a section's heading.
const BOSSES_SECTION = "bosses";
const heading = (biome: string) =>
  biome === BOSSES_SECTION
    ? t("bossTrophies")
    : serverFormat(`pages.crafting.biome.${biome}`);

// The game's item types a page keeps to, shared with the links (`recipes.ts`).
const KINDS = MATERIAL_KINDS;

// A catalogue page of materials: those of `kind`, in biome sections, with
// where each comes from and what it goes into; its words are `pages.<words>`.
export function MaterialsView(props: {
  kind: keyof typeof KINDS;
  words: string;
  crumb: string;
}) {
  const own = (id: string) => serverFormat(`pages.${props.words}.${id}`);
  const all = materials.filter(KINDS[props.kind]);
  // On the trophies page the bosses' trophies come first, in a section of
  // their own (the owner, 2026-11-17), and leave their biomes.
  const first = props.kind === "trophies" ? all.filter((m) => bossOf(m)) : [];
  const list = all.filter((m) => !first.includes(m));
  const groups = [
    { biome: BOSSES_SECTION, list: first },
    ...[...BIOMES, ELSEWHERE].map((b) => ({
      biome: b,
      list: list.filter((m) => (m.biome ?? ELSEWHERE) === b),
    })),
  ];
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
            { name: serverFormat("archive.catalog"), href: "/catalog" },
            { name: serverFormat(props.crumb) },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          {own("title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>{own("question")}</b> {own("answer")}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          {groups
            .filter((g) => g.list.length > 0)
            .map((g, i) => (
              <span key={g.biome}>
                {i > 0 ? " · " : ""}
                <Link href={`#${anchor(g.biome)}`}>{heading(g.biome)}</Link>
              </span>
            ))}
        </Typography>

        {groups.map(({ biome, list }) =>
          list.length === 0 ? null : (
            <section key={biome} id={anchor(biome)}>
              <Typography variant="h4" component="h2" sx={{ mt: 6, mb: 1 }}>
                {heading(biome)}
              </Typography>
              <TableContainer>
                <Table size="small" sx={{ "& td": { verticalAlign: "top" } }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t("head.material")}</TableCell>
                      <TableCell>{t("head.from")}</TableCell>
                      <TableCell>{t("head.into")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {list.map((m) => {
                      const uses = usedIn.get(m.key) ?? [];
                      return (
                        <TableRow key={m.key} id={m.key.toLowerCase()}>
                          <TableCell sx={{ whiteSpace: "nowrap" }}>
                            <ItemIcon item={m.key}>
                              {m.name}
                              <SellNote item={m.key} />
                            </ItemIcon>
                          </TableCell>
                          <TableCell>{sources(m)}</TableCell>
                          <TableCell>
                            {bossOf(m) ? (
                              <Link
                                href={`/catalog/bosses#${bossSlug(bossOf(m)!.name)}`}
                              >
                                {t("power")}
                              </Link>
                            ) : null}
                            {bossOf(m) && uses.length > 0 ? ", " : ""}
                            {uses.map((u, i) => (
                              <span key={u.key}>
                                {i > 0 ? ", " : ""}
                                <RowLink item={u.key}>{u.name}</RowLink>
                              </span>
                            ))}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </section>
          ),
        )}
      </Container>
      <ArchiveFooter />
    </>
  );
}
