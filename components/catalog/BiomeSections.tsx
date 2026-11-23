import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import type { ReactNode } from "react";

import { AnchorHeading } from "@/components/catalog/AnchorHeading";
import { ItemIcon } from "@/components/catalog/ItemIcon";
import { SellNote } from "@/components/catalog/SellNote";
import { serverFormat } from "@/lib/i18n/server";
import { RowLink } from "@/components/catalog/RowLink";
import { RUN_ORDER } from "@/lib/valheim/run-order";
import crafting from "@/lib/valheim/crafting.json";

// What the crafting page and the build pieces page share: the biomes in the
// run's order, a material with its sources, and the biome sections.

const t = (id: string, values?: Record<string, string | number>) =>
  serverFormat(`pages.crafting.${id}`, values);

// The biomes in the run's order: an item belongs to the earliest biome where
// all it takes can be had (the Valheim generator's home biome). What has no
// home biome (a tool that takes nothing, a piece of a rare find) comes last.
export const BIOMES = [...RUN_ORDER, "elsewhere"];

// A biome's slug as the guides use it (`blackForest` → `black-forest`).
export const anchor = (biome: string) =>
  biome.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

export const biomeOf = (x: { biome: string | null }) => x.biome ?? "elsewhere";

// What the search looks through in a row, lower case.
export const searchText = (...parts: (string | null | undefined)[]) =>
  parts.filter(Boolean).join(" ").toLowerCase();

// A seasonal piece or recipe's note: the dates the game lets it be made
// (`seasons` of the Valheim generator's crafting data, (day, month)).
const MONTH = new Intl.DateTimeFormat("en", {
  month: "short",
  timeZone: "UTC",
});
const day = ([d, m]: number[]) =>
  `${d} ${MONTH.format(new Date(Date.UTC(2000, m - 1, 1)))}`;
export function seasonNote(season: string | null | undefined) {
  const s = season
    ? (crafting.seasons as Record<string, { start: number[]; end: number[] }>)[
        season
      ]
    : undefined;
  return s ? t("season", { from: day(s.start), to: day(s.end) }) : null;
}

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
        <RowLink item={r.key}>{r.name}</RowLink>
        {r.amount > 1 ? ` × ${r.amount}` : ""}
        <SellNote item={r.key} />
      </ItemIcon>
    </Box>
  );
}

// The shared header's height (Material UI's toolbar: 56 px on a phone, 64 px
// wider): an anchor scrolls below it (providers.tsx).
export const BAR = { xs: 56, sm: 64 };

// The biomes that hold something, each a section with its anchor
// (`#black-forest`); its heading is the link to it (a click copies the
// address) and scrolls with its table: only the site's header sticks (the
// owner, 2026-11-23, as in the No Man's Sky section). A line of links to them
// comes first.
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
        <Box component="section" key={b} id={anchor(b)}>
          <AnchorHeading id={anchor(b)} sx={{ mt: 4, py: 1 }}>
            {t(`biome.${b}`)}
          </AnchorHeading>
          {props.table(props.list.filter((x) => biomeOf(x) === b))}
        </Box>
      ))}
    </>
  );
}
