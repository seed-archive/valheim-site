import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import type { ReactNode } from "react";

import { AnchorHeading } from "@/components/catalog/AnchorHeading";
import { ItemIcon } from "@/components/catalog/ItemIcon";
import { SellNote } from "@/components/catalog/SellNote";
import { serverFormat } from "@/lib/i18n/server";
import { recipeHref } from "@/lib/valheim/recipes";
import crafting from "@/lib/valheim/crafting.json";

// What the crafting page and the build pieces page share: the biomes in the
// run's order, a material with its sources, and the biome sections.

const t = (id: string, values?: Record<string, string | number>) =>
  serverFormat(`pages.crafting.${id}`, values);

// The biomes in the run's order: an item belongs to the earliest biome where
// all it takes can be had (the Valheim generator's home biome). What has no
// home biome (a tool that takes nothing, a piece of a rare find) comes last.
export const BIOMES = [
  "meadows",
  "blackForest",
  "swamp",
  "mountain",
  "plains",
  "mistlands",
  "ashlands",
  "deepNorth",
  "elsewhere",
];

// A biome's slug as the guides use it (`blackForest` → `black-forest`).
export const anchor = (biome: string) =>
  biome.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

export const biomeOf = (x: { biome: string | null }) => x.biome ?? "elsewhere";

// What the search looks through in a row, lower case.
export const searchText = (...parts: (string | null | undefined)[]) =>
  parts.filter(Boolean).join(" ").toLowerCase();

// A seasonal piece or recipe's note: the dates the game lets it be made
// (`seasons` of the Valheim generator's crafting data, (day, month)).
const MONTH = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });
const day = ([d, m]: number[]) =>
  `${d} ${MONTH.format(new Date(Date.UTC(2000, m - 1, 1)))}`;
export function seasonNote(season: string | null | undefined) {
  const s = season
    ? (crafting.seasons as Record<string, { start: number[]; end: number[] }>)[season]
    : undefined;
  return s ? t("season", { from: day(s.start), to: day(s.end) }) : null;
}

// Every item with a recipe: a material made by one links to it.
const crafted = new Set(crafting.gear.map((g) => g.key));

type Resource = (typeof crafting.gear)[number]["resources"][number];

// One material: its icon, its name (a link to its own recipe when it has one,
// otherwise to the materials catalogue, which says where it comes from) and
// the amount when more than one is needed (the owner, 2026-11-17: no "× 1",
// no upgrade amounts, no "from" a creature).
export function material(r: Resource) {
  if (r.amount <= 0) {
    return null;
  }
  // One material a line: the icons stand in one column.
  return (
    <Box key={r.key}>
      <ItemIcon item={r.key}>
        <Link
          href={
            crafted.has(r.key)
              ? recipeHref(r.key)
              : `/catalog/materials#${r.key.toLowerCase()}`
          }
        >
          {r.name}
        </Link>
        {r.amount > 1 ? ` × ${r.amount}` : ""}
        <SellNote item={r.key} />
      </ItemIcon>
    </Box>
  );
}

// The shared header's height (Material UI's toolbar: 56 px on a phone, 64 px
// wider): a biome's heading sticks below it.
export const BAR = { xs: 56, sm: 64 };

// The biomes that hold something, each a section with its anchor
// (`#black-forest`); its heading is the link to it (a click copies the
// address) and stays at the top while its table scrolls. A line of links to
// them comes first.
export function BiomeSections<T extends { biome: string | null }>(props: {
  list: T[];
  table: (rows: T[]) => ReactNode;
}) {
  const biomes = BIOMES.filter((b) => props.list.some((x) => biomeOf(x) === b));
  return (
    <>
      <Typography sx={{ mb: 2 }}>
        {biomes.map((b, i) => (
          <span key={b}>
            {i > 0 ? " · " : ""}
            <Link href={`#${anchor(b)}`}>{t(`biome.${b}`)}</Link>
          </span>
        ))}
      </Typography>
      {biomes.map((b) => (
        <Box
          component="section"
          key={b}
          id={anchor(b)}
          // A jump to the biome or to a row lands below the header and the
          // biome's heading.
          sx={{
            scrollMarginTop: BAR,
            "& tr[id]": { scrollMarginTop: { xs: BAR.xs + 48, sm: BAR.sm + 48 } },
          }}
        >
          <AnchorHeading
            id={anchor(b)}
            sx={{
              position: "sticky",
              top: BAR,
              zIndex: 2,
              mt: 4,
              py: 1,
              bgcolor: "background.default",
            }}
          >
            {t(`biome.${b}`)}
          </AnchorHeading>
          {props.table(props.list.filter((x) => biomeOf(x) === b))}
        </Box>
      ))}
    </>
  );
}
