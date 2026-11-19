import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { PageTrail } from "@seed-archive/ui/page-trail";
import {
  BiomeSections,
  material,
  searchText,
  seasonNote,
} from "@/components/catalog/BiomeSections";
import { ItemIcon } from "@/components/catalog/ItemIcon";
import { TableSearch } from "@/components/catalog/TableSearch";
import { serverFormat } from "@/lib/i18n/server";
import crafting from "@/lib/valheim/crafting.json";

const t = (id: string, values?: Record<string, string | number>) =>
  serverFormat(`pages.crafting.${id}`, values);

// The gear's groups in a biome's table (the game's item types, grouped).
const GEAR_GROUPS = [
  "weapons",
  "shields",
  "armour",
  "ammo",
  "tools",
  "consumables",
  "materials",
  "other",
];
// What is compared within a biome, best green and worst red (the owner,
// 2026-11-17): a weapon's damage, each type on its own (not chop and mining,
// which hit trees and rock), the armour of the armour (one group, helmet
// against chest: a runner who makes only one piece sees which) and a
// shield's block. Every other stat is shown without a colour.
const COMPARED: Record<string, (stat: string) => boolean> = {
  weapons: (s) => s.startsWith("damage.") && s !== "damage.chop" && s !== "damage.pickaxe",
  armour: (s) => s === "armor" || s === "eitrRegen",
  shields: (s) => s === "block",
};
// Stats only the best of is marked: eitr regen, which only mage armour has.
const BEST_ONLY = new Set(["eitrRegen"]);

// The usual speed penalty of each group, the most common one in the game's
// data (−5 % for weapons, shields and armour alike): a heavier penalty is red,
// armour that speeds the player up green (the owner, 2026-11-17).
const USUAL_SPEED = (() => {
  const counts = new Map<string, Map<number, number>>();
  for (const g of crafting.gear) {
    const m = (g.stats as { movement?: number } | null)?.movement;
    if (m !== undefined) {
      const c = counts.get(g.group) ?? new Map<number, number>();
      c.set(m, (c.get(m) ?? 0) + 1);
      counts.set(g.group, c);
    }
  }
  const out = new Map<string, number>();
  counts.forEach((c, group) =>
    out.set(group, [...c.entries()].sort((a, b) => b[1] - a[1])[0][0]),
  );
  return out;
})();

type Gear = (typeof crafting.gear)[number];
type Stats = {
  armor?: number;
  block?: number;
  tier?: number;
  durability?: number;
  movement?: number;
  eitrRegen?: number;
  weight?: number;
  damage?: Record<string, number>;
  set?: { name: string; size: number };
};
const statsOf = (g: Gear) => (g.stats ?? {}) as Stats;

// One upgrade step as the Valheim generator writes it: the quality it reaches,
// the station level it needs, what it adds over the quality before, and what
// it costs.
type Step = {
  quality: number;
  level: number;
  gains: {
    damage?: Record<string, number>;
    armor?: number;
    durability?: number;
    block?: number;
    deflection?: number;
  };
  resources: { key: string; name: string; amount: number }[];
};
// What an item of its line gives over the one before it.
type Over = { key: string; name: string; tier: number; damage: Record<string, number> };

// A kind's word: the slot or the skill, or the group for the rest (food,
// materials, arrows).
const kindOf = (g: Gear) =>
  g.kind && g.kind !== "other" ? t(`kind.${g.kind}`) : t(`group.${g.group}`);

// A number as the game shows it: at most one decimal.
const num = (v: number) => String(Math.round(v * 10) / 10);

// An item's stats at quality 1, one line each, the main ones first, each with
// its value: damage by type, armour, block, tool tier, durability, speed,
// eitr, set, quality, weight.
function lines(g: Gear): { stat?: string; value?: number; text: string }[] {
  const s = statsOf(g);
  const out: { stat?: string; value?: number; text: string }[] = [];
  for (const [k, v] of Object.entries(s.damage ?? {})) {
    out.push({ stat: `damage.${k}`, value: v, text: `${t(`damage.${k}`)} ${num(v)}` });
  }
  if (s.armor) {
    out.push({ stat: "armor", value: s.armor, text: t("stat.armor", { value: num(s.armor) }) });
  }
  if (s.block) {
    out.push({ stat: "block", value: s.block, text: t("stat.block", { value: num(s.block) }) });
  }
  if (s.tier !== undefined) {
    out.push({ stat: "tier", value: s.tier, text: t("stat.tier", { value: s.tier }) });
  }
  if (s.durability && g.maxQuality > 1) {
    out.push({ stat: "durability", value: s.durability, text: t("stat.durability", { value: num(s.durability) }) });
  }
  if (s.movement) {
    out.push({ stat: "movement", value: s.movement, text: t("stat.movement", { value: `${s.movement > 0 ? "+" : ""}${num(s.movement * 100)}` }) });
  }
  if (s.eitrRegen) {
    out.push({ stat: "eitrRegen", value: s.eitrRegen, text: t("stat.eitrRegen", { value: `+${num(s.eitrRegen * 100)}` }) });
  }
  if (s.set) {
    out.push({ text: t("stat.set", { value: s.set.size }) });
  }
  if (g.maxQuality > 1) {
    out.push({ text: t("stat.quality", { value: g.maxQuality }) });
  }
  if (s.weight) {
    out.push({ text: t("stat.weight", { value: num(s.weight) }) });
  }
  return out;
}

// A number with its sign.
const signed = (v: number) => `${v > 0 ? "+" : ""}${num(v)}`;

// What an upgrade step adds, in one line: damage by type, armour, block,
// block force, durability.
function gains(s: Step) {
  const g = s.gains;
  return [
    ...Object.entries(g.damage ?? {}).map(([k, v]) =>
      t("upgrade.damage", { type: t(`damage.${k}`), value: num(v) }),
    ),
    ...(["armor", "block", "deflection", "durability"] as const).flatMap((k) =>
      g[k] ? [t(`upgrade.${k}`, { value: num(g[k]) })] : [],
    ),
  ].join(", ");
}

// An item's upgrades, short enough for a phone (the owner, 2026-11-19): what
// a step adds is the same at every step (the Valheim generator's gains), so
// it stands once; then each step with only its station level and materials.
function upgrades(g: Gear) {
  const steps = g.upgrades as Step[];
  if (steps.length === 0) {
    return null;
  }
  const each = gains(steps[0]);
  return (
    <>
      {each && (
        <Typography variant="body2" component="span" sx={{ display: "block", mb: 0.5 }}>
          {t("upgrade.each", { gains: each })}
        </Typography>
      )}
      {steps.map((s) => (
        <Typography key={s.quality} variant="body2" component="span" sx={{ display: "block" }}>
          <Box component="span" sx={{ fontWeight: 500 }}>
            {t("upgrade.step", { quality: s.quality, level: s.level })}
          </Box>{" "}
          <Box component="span" sx={{ color: "text.secondary" }}>
            {s.resources.map((r) => (r.amount > 1 ? `${r.name} × ${r.amount}` : r.name)).join(", ")}
          </Box>
        </Typography>
      ))}
    </>
  );
}

// What an item of its line (a tool line, or its kind of weapon) gives over the
// one before it: the tool tier and each damage type that changes. An item
// that changes no number says nothing.
function overLine(g: Gear) {
  const o = g.over as Over | null;
  if (!o) {
    return null;
  }
  const parts = [
    ...(o.tier ? [t("over.tier", { value: signed(o.tier) })] : []),
    ...Object.entries(o.damage).map(([k, v]) =>
      t("over.damage", { type: t(`damage.${k}`), value: signed(v) }),
    ),
  ];
  if (parts.length === 0) {
    return null;
  }
  return (
    <Box component="span" sx={{ display: "block", mt: 1 }}>
      {t("over.name", { name: o.name })} {parts.join(", ")}
    </Box>
  );
}

// Which items an item is compared with in its biome.
const peers = (g: Gear) => g.group;
const compared = (g: Gear, stat?: string) =>
  stat !== undefined && (COMPARED[g.group]?.(stat) ?? false);

// The best and the worst value of each compared stat among an item's peers in
// one biome, kept only where there is a choice (two different values).
function extremes(rows: Gear[]) {
  const seen = new Map<string, number[]>();
  for (const g of rows) {
    for (const l of lines(g)) {
      if (compared(g, l.stat) && l.value !== undefined) {
        const key = `${peers(g)}|${l.stat}`;
        seen.set(key, [...(seen.get(key) ?? []), l.value]);
      }
    }
  }
  const out = new Map<string, { best: number; worst: number }>();
  seen.forEach((values, key) => {
    const hi = Math.max(...values);
    const lo = Math.min(...values);
    if (hi !== lo) {
      out.set(key, { best: hi, worst: lo });
    }
  });
  return out;
}

const station = (g: Gear) =>
  g.station
    ? t("stationLevel", { station: g.station, level: g.level })
    : t("noStation");

function gearTable(list: Gear[]) {
  // Within a biome, by kind (swords together, then axes…), then by name.
  const rows = [...list].sort(
    (a, b) =>
      GEAR_GROUPS.indexOf(a.group) - GEAR_GROUPS.indexOf(b.group) ||
      kindOf(a).localeCompare(kindOf(b)) ||
      a.name.localeCompare(b.name),
  );
  const marks = extremes(rows);
  const colour = (g: Gear, stat?: string, value?: number) => {
    if (stat === "movement" && value !== undefined) {
      const usual = USUAL_SPEED.get(g.group) ?? 0;
      return value > 0 ? "success.main" : value < usual ? "error.main" : undefined;
    }
    const m = stat ? marks.get(`${peers(g)}|${stat}`) : undefined;
    if (!m) {
      return undefined;
    }
    if (m.best === value) {
      return "success.main";
    }
    return m.worst === value && !BEST_ONLY.has(stat ?? "") ? "error.main" : undefined;
  };
  return (
    <TableContainer>
      <Table size="small" sx={{ tableLayout: { md: "fixed" } }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: { md: "20%" } }}>{t("head.item")}</TableCell>
            <TableCell sx={{ width: { md: "17%" } }}>{t("head.stats")}</TableCell>
            <TableCell sx={{ width: { md: "12%" } }}>{t("head.station")}</TableCell>
            <TableCell sx={{ width: { md: "21%" } }}>{t("head.materials")}</TableCell>
            {/* On a phone the table scrolls sideways; the upgrades keep a
                readable width rather than a column of single words. */}
            <TableCell sx={{ minWidth: { xs: 240, md: "auto" } }}>{t("head.upgrades")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((g) => (
            <TableRow
              key={g.key}
              id={g.key.toLowerCase()}
              data-search={searchText(
                g.name,
                kindOf(g),
                g.station,
                ...g.resources.map((r) => r.name),
              )}
            >
              <TableCell>
                <ItemIcon item={g.key}>
                  {g.name}
                  {g.amount > 1 ? ` × ${g.amount}` : ""}
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block" }}
                  >
                    {kindOf(g)}
                    {g.season ? `. ${seasonNote(g.season)}` : ""}
                  </Typography>
                </ItemIcon>
              </TableCell>
              <TableCell>
                {lines(g).map((l, i) => (
                  <Box
                    key={i}
                    component="span"
                    sx={{ display: "block", color: colour(g, l.stat, l.value) }}
                  >
                    {l.text}
                  </Box>
                ))}
                {overLine(g)}
              </TableCell>
              <TableCell>{station(g)}</TableCell>
              <TableCell>{g.resources.map(material)}</TableCell>
              <TableCell>{upgrades(g)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// One catalogue page of made items: those the Valheim generator puts on
// `page` (weapons, bows, armour, tools), by biome; its words are
// `pages.<words>`: title, question, lead.
export function GearPage(props: { page: string; words: string; crumb: string; before?: React.ReactNode }) {
  const own = (id: string) => serverFormat(`pages.${props.words}.${id}`);
  const list = crafting.gear.filter((g) => g.page === props.page);
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
          <b>{own("question")}</b> {own("lead")}
        </Typography>
        {props.before}
        <Typography sx={{ mb: 2 }}>{t("colours")}</Typography>
        <TableSearch>
          <BiomeSections list={list} table={gearTable} />
        </TableSearch>
      </Container>
      <ArchiveFooter />
    </>
  );
}
