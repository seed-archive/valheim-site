"use client";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useEffect, useState, type ReactNode } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { loadRanks, type Ranks } from "@/lib/scan";
import type { SeedMeasures } from "@/lib/valheim/generator";
import { beaten, measured, score } from "@/lib/valheim/score";
import {
  ABOUT,
  BIOMES,
  BONUS,
  ISLAND_FLAGS,
  islandFlag,
  NEED_OF,
  NEEDS,
  NEUTRAL,
  PRESENT,
  quarter,
  QUARTERS,
  REACH,
  STRIP_WIDTH,
  WITHIN,
  withinM,
  withinTier,
  YES_NO,
  type Found,
  type Measure,
} from "@/lib/valheim/strip";

// The report of a seed, block by block (the generator's `docs/seed-rating.md`):
// the score, the start island, then each biome in the run's order with its
// boss and trader against the strip, the generator's measures of it and a verdict.

// The start island, one row a biome with its boss's altar (the owner,
// 2026-11-19): the Meadows and the Black Forest are required, the Swamp and
// the Mountain bonuses; the best seed holds all four and their altars.
const ISLAND = [
  { biome: "meadows", boss: "eikthyr", required: true },
  { biome: "blackForest", boss: "theElder", required: true },
  { biome: "swamp", boss: "bonemass", required: false },
  { biome: "mountain", boss: "moder", required: false },
] as const;

// Colours against the scan (the owner, 2026-11-17): green in the best 10 % of
// seeds, red worse than the median, grey between.
const GREEN_FROM = 0.9;
const RED_BELOW = 0.5;
const colour = (share: number | null) =>
  share === null
    ? "text.secondary"
    : share >= GREEN_FROM
      ? "success.main"
      : share < RED_BELOW
        ? "error.main"
        : "text.secondary";

// The values every label may fill: the reaches and the needs.
const LABEL_VALUES = { ...REACH, ...NEEDS };

const key = (m: Measure) =>
  `pages.seedRating.measure.${m[0].replaceAll(".", "_")}`;

function Row(props: { label: ReactNode; value: ReactNode; color: string }) {
  return (
    <TableRow>
      <TableCell sx={{ width: "55%" }}>{props.label}</TableCell>
      <TableCell sx={{ color: props.color }}>{props.value}</TableCell>
    </TableRow>
  );
}

export function StripReport(props: {
  measures: SeedMeasures | null;
  complete: boolean;
  found: Found[] | null;
}) {
  const intl = useIntl();
  const km = (m: number) =>
    intl.formatNumber(Math.abs(m) / 1000, { maximumFractionDigits: 1 });
  const byKey = new Map((props.found ?? []).map((f) => [f.key, f]));
  const m = props.measures;
  const v = (path: string) => (m ? measured(m, path) : undefined);
  // The scan's ranks, fetched once.
  const [ranks, setRanks] = useState<Ranks | null>(null);
  useEffect(() => {
    loadRanks()
      .then(setRanks)
      .catch(() => setRanks(null));
  }, []);
  const total = ranks && m ? score(ranks, m) : null;
  // The labels' values: the reaches and needs, and each distance row's need
  // and the scan's median it is asked within.
  const labelValues: Record<string, string | number> = { ...LABEL_VALUES };
  for (const [path, { need, name }] of Object.entries(WITHIN)) {
    labelValues[name] = need;
    labelValues[`${name}M`] = (ranks && withinM(ranks, path)) ?? "…";
  }
  // Whether the need lies within the scan's median; undefined until the ranks
  // and the measure are in. A measure missing once every pass is in means the
  // world holds too few within reach: a no (the owner, 2026-11-22), never
  // "none in this world".
  const within = (path: string) => {
    const x = v(path);
    const r = ranks ? withinM(ranks, path) : null;
    if (r === null) {
      return undefined;
    }
    if (x === undefined) {
      return props.complete ? false : undefined;
    }
    return x <= r;
  };
  const percent = (part: string) =>
    total ? Math.round(100 * total.parts[part]) : null;

  // A measure's value as the page shows it.
  const value = (meas: Measure) => {
    const x = v(meas[0]);
    if (!m) {
      return <FormattedMessage id="pages.seedRating.strip.searching" />;
    }
    if (PRESENT.includes(meas[0])) {
      if (x === undefined && !props.complete) {
        return <FormattedMessage id="pages.seedRating.strip.searching" />;
      }
      return (
        <FormattedMessage
          id={
            x !== undefined
              ? "pages.seedRating.value.yes"
              : "pages.seedRating.value.no"
          }
        />
      );
    }
    if (meas[0] in WITHIN && within(meas[0]) !== undefined) {
      return (
        <FormattedMessage
          id={
            within(meas[0])
              ? "pages.seedRating.value.yes"
              : "pages.seedRating.value.no"
          }
        />
      );
    }
    if (x === undefined) {
      // Not yet measured (the deep measures come seconds later) is not "none".
      return (
        <FormattedMessage
          id={
            props.complete
              ? "pages.seedRating.strip.none"
              : "pages.seedRating.strip.searching"
          }
        />
      );
    }
    if (YES_NO.includes(meas[0])) {
      return (
        <FormattedMessage
          id={x ? "pages.seedRating.value.yes" : "pages.seedRating.value.no"}
        />
      );
    }
    if (ABOUT.includes(meas[0])) {
      return (
        <FormattedMessage
          id="pages.seedRating.value.about"
          values={{
            n: Math.round(x),
            least: Math.round(v(`${meas[0]}Min`) ?? 0),
            most: Math.round(v(`${meas[0]}Max`) ?? 0),
          }}
        />
      );
    }
    // No distances but a boss's altar against the strip (the owner,
    // 2026-11-19): every other row is a count or a yes or no.
    return intl.formatNumber(x);
  };
  const tint = (meas: Measure) => {
    if (NEUTRAL.includes(meas[0])) {
      return "text.secondary";
    }
    if (PRESENT.includes(meas[0])) {
      return m && (props.complete || v(meas[0]) !== undefined)
        ? v(meas[0]) !== undefined
          ? "success.main"
          : "error.main"
        : "text.secondary";
    }
    if (meas[0] in WITHIN) {
      // By the quarters: the lower quarter green, within the asked radius
      // grey, beyond it red; a bonus's no is grey, the run does without it.
      const yes = within(meas[0]);
      const at = ranks ? withinTier(ranks, meas[0], v(meas[0])) : null;
      return yes === undefined ||
        at === null ||
        (!yes && BONUS.includes(meas[0]))
        ? "text.secondary"
        : at === "high"
          ? "success.main"
          : at === "mid"
            ? "text.secondary"
            : "error.main";
    }
    if (QUARTERS.includes(meas[0])) {
      const x = v(meas[0]);
      const at = ranks && x !== undefined ? quarter(ranks, meas[0], x) : null;
      return at === "low"
        ? "error.main"
        : at === "high"
          ? "success.main"
          : "text.secondary";
    }
    // Yes green; no red when the run needs it, grey when it is a bonus.
    if (YES_NO.includes(meas[0])) {
      const x = v(meas[0]);
      const bonus = ISLAND_FLAGS.includes(meas[0]) || BONUS.includes(meas[0]);
      return x === undefined || (!x && bonus)
        ? "text.secondary"
        : x
          ? "success.main"
          : "error.main";
    }
    const need = NEED_OF[meas[0]];
    const x = v(meas[0]);
    if (need !== undefined && x !== undefined) {
      return x < need
        ? "error.main"
        : x > need
          ? "success.main"
          : "text.secondary";
    }
    return ranks && m ? colour(beaten(ranks, m, meas)) : "text.secondary";
  };

  // The verdict of a biome: what the run must do beyond the block.
  const verdict = (biome: string, boss: string, measures: Measure[]) => {
    const says: string[] = [];
    const say = (id: string, values?: Record<string, string | number>) =>
      says.push(
        intl.formatMessage({ id: `pages.seedRating.verdict.${id}` }, values),
      );
    if (!m) {
      return "";
    }
    // A boss off the strip.
    if (boss !== "eikthyr" && byKey.get(boss) && !byKey.get(boss)?.inStrip) {
      say("offStrip", {
        boss: intl.formatMessage({ id: `pages.map.places.${boss}` }),
      });
    }
    if (biome === "blackForest" && v("vegetation.base.copper") !== undefined) {
      say(
        (v("vegetation.base.copper") ?? 0) < NEEDS.veins
          ? "noCopperCave"
          : v("vegetation.base.shore")
            ? "baseGood"
            : "baseInland",
      );
      if (v("vegetation.base.chambers") === 0) {
        say("coresFar");
      }
    }
    if (biome === "swamp" && v("region.bonemass.fireHole") !== undefined) {
      say(v("region.bonemass.fireHole") ? "holesYes" : "holesNo");
      say("abomination");
    }
    if (biome === "mountain" && v("region.moder.drakeNest") !== undefined) {
      say(
        (v("region.moder.drakeNest") ?? 0) >= NEEDS.eggs
          ? "eggsOne"
          : "eggsMore",
      );
    }
    const totems = v("region.yagluth.totems");
    if (biome === "plains" && totems !== undefined) {
      say(totems >= NEEDS.totems ? "plainsEnough" : "plainsSecond", {
        villages: v("region.yagluth.village") ?? 0,
        towers: v("region.yagluth.tower") ?? 0,
        totems,
        need: NEEDS.totems,
      });
    }
    if (biome === "mistlands" && v("region.theQueen.enoughFragments") === 0) {
      say("fragmentsSecond");
    }
    // The parts below most seeds; a joint radius and a yes or no speak for
    // themselves.
    if (ranks) {
      for (const meas of measures.filter(
        (x) =>
          !x[0].startsWith("joint.") &&
          !YES_NO.includes(x[0]) &&
          !NEUTRAL.includes(x[0]) &&
          !(x[0] in NEED_OF) &&
          !(x[0] in WITHIN),
      )) {
        const x = v(meas[0]);
        const share = beaten(ranks, m, meas);
        // A number coloured by the quarters is "fewer" in the lower quarter.
        const fewer = QUARTERS.includes(meas[0])
          ? x !== undefined && quarter(ranks, meas[0], x) === "low"
          : share !== null && share < RED_BELOW;
        if (fewer) {
          say(meas[1] ? "far" : "fewer", {
            what: intl.formatMessage({ id: key(meas) }, labelValues),
          });
        }
      }
    }
    return says.join(" ");
  };

  return (
    <Box sx={{ mb: 3, "& h3": { mt: 3 } }}>
      <Typography variant="h5" component="h2" gutterBottom>
        <FormattedMessage id="pages.seedRating.strip.title" />
      </Typography>
      <Typography gutterBottom>
        <FormattedMessage
          id="pages.seedRating.strip.lead"
          values={{ km: km(STRIP_WIDTH) }}
        />
      </Typography>
      {total ? (
        <Typography variant="h3" component="p">
          <FormattedMessage
            id="pages.seedRating.score.total"
            values={{ n: total.total }}
          />
        </Typography>
      ) : (
        <LinearProgress sx={{ my: 1 }} />
      )}

      <Typography variant="h6" component="h3">
        <FormattedMessage id="pages.seedRating.island.title" />
        {percent("island") !== null ? ` — ${percent("island")}` : null}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <FormattedMessage id="pages.seedRating.island.lead" />
      </Typography>
      {m ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <FormattedMessage id="pages.seedRating.island.biome" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="pages.seedRating.island.onIsland" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="pages.seedRating.island.altar" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ISLAND.map((p) => {
              // Present: green. Missing: red when required (the Meadows, the
              // Black Forest), grey when a bonus (the Swamp, the Mountain).
              const cell = (on: boolean) => (
                <TableCell
                  sx={{
                    color: on
                      ? "success.main"
                      : p.required
                        ? "error.main"
                        : "text.secondary",
                  }}
                >
                  <FormattedMessage
                    id={
                      on
                        ? "pages.seedRating.value.yes"
                        : "pages.seedRating.value.no"
                    }
                  />
                </TableCell>
              );
              return (
                <TableRow key={p.biome}>
                  <TableCell>
                    <FormattedMessage id={`pages.map.biomes.${p.biome}`} />
                    {p.required ? null : (
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {" "}
                        <FormattedMessage id="pages.seedRating.island.optional" />
                      </Typography>
                    )}
                  </TableCell>
                  {cell((m.island.area[p.biome] ?? 0) > 0)}
                  {cell(Boolean(m.bosses[p.boss]?.island))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <LinearProgress sx={{ my: 1 }} />
      )}

      {BIOMES.map(({ biome, boss, strip, measures }) => {
        const island = islandFlag(biome, boss);
        const said = verdict(biome, boss, [...strip, ...measures]);
        const measureRow = (meas: Measure) => (
          <Row
            key={meas[0]}
            label={<FormattedMessage id={key(meas)} values={labelValues} />}
            value={value(meas)}
            color={tint(meas)}
          />
        );
        return (
          <Box key={biome}>
            <Typography variant="h6" component="h3">
              <FormattedMessage id={`pages.map.biomes.${biome}`} />
              {percent(biome) !== null ? ` — ${percent(biome)}` : null}
            </Typography>
            <Table size="small">
              <TableBody>
                {/* The order of every block (the owner, 2026-11-22): the
                    boss, the start island, the trader, then the measures. */}
                {measureRow(strip[0])}
                {island ? (
                  <Row
                    label={
                      <FormattedMessage id="pages.seedRating.island.row" />
                    }
                    value={value([island, false])}
                    color={tint([island, false])}
                  />
                ) : null}
                {strip.slice(1).map(measureRow)}
                {measures.map(measureRow)}
              </TableBody>
            </Table>
            {said ? (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {said}
              </Typography>
            ) : null}
          </Box>
        );
      })}

      {/* How to read it (the owner, 2026-11-22): where the first column's
          numbers come from and what the second's colours say. */}
      <Typography variant="h6" component="h3">
        <FormattedMessage id="pages.seedRating.howToRead.title" />
      </Typography>
      {["where", "colour", "score"].map((part) => (
        <Typography key={part} variant="body2" sx={{ mb: 1 }}>
          <FormattedMessage id={`pages.seedRating.howToRead.${part}`} />
        </Typography>
      ))}
    </Box>
  );
}
