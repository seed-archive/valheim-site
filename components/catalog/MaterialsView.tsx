import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

import Link from "@/components/LocaleLink";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { SectionLinks } from "@/components/catalog/SectionLinks";
import { slug } from "@/lib/slug";
import { PageTrail } from "@/components/PageTrail";
import { ItemIcon } from "@/components/catalog/ItemIcon";
import { RowLink } from "@/components/catalog/RowLink";
import { MATERIAL_KINDS } from "@/lib/valheim/recipes";
import { RUN_ORDER } from "@/lib/valheim/run-order";
import { USED_IN } from "@/lib/valheim/used-in";
import { SellNote } from "@/components/catalog/SellNote";
import type { GameName } from "@/lib/i18n/game-names";
import { gameNames } from "@/lib/i18n/names";
import { serverIntl, type ServerIntl, type Values } from "@/lib/i18n/server";
import bosses from "@/lib/valheim/bosses.json";
import materials from "@/lib/valheim/materials.json";
import traders from "@/lib/valheim/traders.json";

// The page's words, `pages.materials.<id>`.
const words = (intl: ServerIntl) => (id: string, values?: Values) =>
  intl.format(`pages.materials.${id}`, values);

// The biomes in the run's order; a material no source gives comes last.
const BIOMES = RUN_ORDER;
const ELSEWHERE = "elsewhere";

// How many places a material names before "and more": a common one (wood,
// stone) lies in dozens (our own choice).
const PLACES_SHOWN = 6;

const anchor = (biome: string) =>
  biome.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

// Everything each material goes into (`lib/valheim/used-in.ts`).
const usedIn = USED_IN;

// An idol, by the game's prefab names (`Upgrader<tier>Weapon`, `…Armor`): what
// it raises at the Forge of Potential, a Battle idol weapons and tools, a
// Protection idol armour, shields and capes (the recipes that ask for each).
const idolOf = (key: string) =>
  /^Upgrader\d+Weapon$/.test(key)
    ? "battle"
    : /^Upgrader\d+Armor$/.test(key)
      ? "protection"
      : null;

const traderName = new Map(
  traders.traders.map((x) => [x.key, x.name ?? x.key]),
);

type Material = (typeof materials)[number];

// Where a material comes from, as a list of short parts.
function sources(m: Material, name: GameName, intl: ServerIntl) {
  const t = words(intl);
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
      <Link key="fished" href="/database/world/creatures#fishing">
        {t("fished")}
      </Link>,
    );
  }
  // A fish's extra catch: shown, never counted for the biome (the owner: few
  // players fish).
  m.caughtWith.forEach((f) =>
    parts.push(
      <RowLink key={`with-${f.key}`} item={f.key} creature>
        {t("caughtWith", { fish: name(f.name) })}
      </RowLink>,
    ),
  );
  m.droppedBy.forEach((c) =>
    parts.push(
      <RowLink key={c.key} item={c.key} creature>
        {name(c.name)}
      </RowLink>,
    ),
  );
  m.soldBy.forEach((s) =>
    parts.push(
      <Link key={s} href={`/database/world/traders#${s.toLowerCase()}`}>
        {name(traderName.get(s) ?? s)}
      </Link>,
    ),
  );
  const places = m.places.filter((p) => intl.has(`pages.map.places.${p}`));
  places
    .slice(0, PLACES_SHOWN)
    .forEach((p) => parts.push(intl.format(`pages.map.places.${p}`)));
  if (places.length > PLACES_SHOWN) {
    parts.push(t("more", { count: places.length - PLACES_SHOWN }));
  }
  return parts.length > 0 ? intl.list(parts, "unit") : "—";
}

// The bosses, by prefab: a trophy one of them drops gives its power on the
// start altar.
const BOSS_KEYS = new Set(bosses.map((b) => b.key));
const bossSlug = slug;
// Only a trophy gives the power; a boss's other drops (Dragon Tear, Hard
// Antler…) do not.
const bossOf = (m: Material) =>
  m.key.startsWith("Trophy")
    ? m.droppedBy.find((c) => BOSS_KEYS.has(c.key))
    : undefined;

// The section of the bosses' trophies, and a section's heading.
const BOSSES_SECTION = "bosses";
const heading = (biome: string, intl: ServerIntl) =>
  biome === BOSSES_SECTION
    ? words(intl)("bossTrophies")
    : intl.format(`pages.crafting.biome.${biome}`);

// The game's item types a page keeps to, shared with the links (`recipes.ts`).
const KINDS = MATERIAL_KINDS;

// A catalogue page of materials: those of `kind`, in biome sections, with
// where each comes from and what it goes into; its words are `pages.<words>`.
export async function MaterialsView(props: {
  kind: keyof typeof KINDS;
  words: string;
  crumb: string;
}) {
  const name = await gameNames();
  const intl = await serverIntl();
  const t = words(intl);
  const own = (id: string) => intl.format(`pages.${props.words}.${id}`);
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
        <SectionLinks>
          <PageTrail crumb={props.crumb} />
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
                  <Link href={`#${anchor(g.biome)}`}>
                    {heading(g.biome, intl)}
                  </Link>
                </span>
              ))}
          </Typography>

          {groups.map(({ biome, list }) =>
            list.length === 0 ? null : (
              <section key={biome}>
                <Typography
                  variant="h4"
                  component="h2"
                  id={anchor(biome)}
                  sx={{ mt: 6, mb: 1 }}
                >
                  {heading(biome, intl)}
                </Typography>
                <TableContainer>
                  <Table size="small" sx={{ "& td": { verticalAlign: "top" } }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          {t(
                            props.kind === "trophies"
                              ? "head.trophy"
                              : "head.material",
                          )}
                        </TableCell>
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
                                {name(m.name)}
                                <SellNote item={m.key} />
                              </ItemIcon>
                            </TableCell>
                            <TableCell>{sources(m, name, intl)}</TableCell>
                            <TableCell>
                              {intl.list(
                                [
                                  ...(bossOf(m)
                                    ? [
                                        <Link
                                          key="power"
                                          href={`/database/world/bosses#${bossSlug(bossOf(m)!.name)}`}
                                        >
                                          {t("power")}
                                        </Link>,
                                      ]
                                    : []),
                                  ...uses.map((u) => (
                                    <RowLink key={u.key} item={u.key}>
                                      {name(u.name)}
                                    </RowLink>
                                  )),
                                ],
                                "unit",
                              )}
                              {idolOf(m.key) ? (
                                <Link href="/guides/basics/forge-of-potential">
                                  {t(`idol.${idolOf(m.key)}`)}
                                </Link>
                              ) : null}
                              {/* Nothing it goes into: a dash, as "Where from". */}
                              {!bossOf(m) && uses.length === 0 && !idolOf(m.key)
                                ? "—"
                                : null}
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
        </SectionLinks>
      </Container>
      <ArchiveFooter />
    </>
  );
}
