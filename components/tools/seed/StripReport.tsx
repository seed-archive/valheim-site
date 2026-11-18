"use client";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
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
  ISLAND_FLAGS,
  NEED_OF,
  NEEDS,
  NEUTRAL,
  REACH,
  STRIP_WIDTH,
  YES_NO,
  type Found,
  type Measure,
} from "@/lib/valheim/strip";

// The report of a seed, block by block (the generator's `docs/seed-rating.md`):
// the score, the start island, then each biome in the run's order with its
// boss on the strip, its trader, the generator's measures of it and a verdict.

// The start island: the Meadows and Eikthyr are its base; every other biome
// and boss on it is a bonus, the Elder too (missing him is a pity, not a
// fault).
const ISLAND = [
  { key: "meadows", biome: true, base: true },
  { key: "blackForest", biome: true, base: false },
  { key: "swamp", biome: true, base: false },
  { key: "mountain", biome: true, base: false },
  { key: "eikthyr", biome: false, base: true },
  { key: "theElder", biome: false, base: false },
  { key: "bonemass", biome: false, base: false },
  { key: "moder", biome: false, base: false },
] as const;

// Colours against the scan (the owner, 2026-11-17): green in the best 10 % of
// seeds, red worse than the median, grey between.
const GREEN_FROM = 0.9;
const RED_BELOW = 0.5;
const colour = (share: number | null) =>
  share === null ? "text.secondary" : share >= GREEN_FROM ? "success.main" : share < RED_BELOW ? "error.main" : "text.secondary";

// A distance under a kilometre is shown in metres (our own choice).
const METRES_BELOW = 1000;

// A count that is of possible places, not of things standing (the
// Abomination rolls in them, `walkthrough.md`).
const POSSIBLE = ["region.bonemass.abominationZones"];

// The values every label may fill: the reaches and the needs.
const LABEL_VALUES = { ...REACH, ...NEEDS };

const key = (m: Measure) => `pages.seedRating.measure.${m[0].replaceAll(".", "_")}`;

function Row(props: { label: ReactNode; value: ReactNode; color: string }) {
  return (
    <TableRow>
      <TableCell sx={{ width: "55%" }}>{props.label}</TableCell>
      <TableCell sx={{ color: props.color }}>{props.value}</TableCell>
    </TableRow>
  );
}

export function StripReport(props: { measures: SeedMeasures | null; found: Found[] | null }) {
  const intl = useIntl();
  const km = (m: number) => intl.formatNumber(Math.abs(m) / 1000, { maximumFractionDigits: 1 });
  const distance = (m: number) =>
    m < METRES_BELOW
      ? intl.formatMessage({ id: "pages.seedRating.value.m" }, { m: Math.round(m) })
      : intl.formatMessage({ id: "pages.seedRating.value.km" }, { km: km(m) });
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
  const total = ranks && m && props.found ? score(ranks, m, props.found) : null;
  const percent = (part: string) => (total ? Math.round(100 * total.parts[part]) : null);

  // Where a boss or trader stands against the strip.
  const where = (k: string, boss: boolean) => {
    const f = byKey.get(k);
    if (!f) {
      return { text: intl.formatMessage({ id: "pages.seedRating.strip.searching" }), color: "text.secondary" };
    }
    if (f.inStrip) {
      return {
        text: intl.formatMessage(
          { id: f.inStrip.along >= 0 ? "pages.seedRating.strip.north" : "pages.seedRating.strip.south" },
          { km: km(f.inStrip.along) },
        ),
        color: "success.main",
      };
    }
    return {
      text: f.nearest
        ? intl.formatMessage({ id: "pages.seedRating.strip.outside" }, { km: km(f.nearest.distance), aside: km(f.nearest.aside) })
        : intl.formatMessage({ id: "pages.seedRating.strip.none" }),
      // Only bosses must be on the strip (the owner, 2026-11-17).
      color: boss ? "error.main" : "text.secondary",
    };
  };

  // A measure's value as the page shows it.
  const value = (meas: Measure) => {
    const x = v(meas[0]);
    if (!m) {
      return <FormattedMessage id="pages.seedRating.strip.searching" />;
    }
    if (x === undefined) {
      return <FormattedMessage id="pages.seedRating.strip.none" />;
    }
    if (YES_NO.includes(meas[0])) {
      return <FormattedMessage id={x ? "pages.seedRating.value.yes" : "pages.seedRating.value.no"} />;
    }
    if (POSSIBLE.includes(meas[0])) {
      return <FormattedMessage id="pages.seedRating.value.possible" values={{ n: x }} />;
    }
    if (ABOUT.includes(meas[0])) {
      return (
        <FormattedMessage
          id="pages.seedRating.value.about"
          values={{ n: Math.round(x), least: Math.round(v(`${meas[0]}Min`) ?? 0), most: Math.round(v(`${meas[0]}Max`) ?? 0) }}
        />
      );
    }
    // The nearest place that can give a Dvergr Extractor, with its building.
    const kind = meas[0] === "around.theQueen.extractorM" ? v("around.theQueen.extractorKind") : undefined;
    if (kind !== undefined) {
      return intl.formatMessage(
        { id: "pages.seedRating.value.building" },
        { distance: distance(x), building: intl.formatMessage({ id: `pages.seedRating.extractor.${kind}` }) },
      );
    }
    return meas[1] ? distance(x) : intl.formatNumber(x);
  };
  const tint = (meas: Measure) => {
    if (YES_NO.includes(meas[0])) {
      const x = v(meas[0]);
      return x === undefined || (!x && ISLAND_FLAGS.includes(meas[0])) ? "text.secondary" : x ? "success.main" : "error.main";
    }
    if (NEUTRAL.includes(meas[0])) {
      return "text.secondary";
    }
    const need = NEED_OF[meas[0]];
    const x = v(meas[0]);
    if (need !== undefined && x !== undefined) {
      return x < need ? "error.main" : x > need ? "success.main" : "text.secondary";
    }
    return ranks && m ? colour(beaten(ranks, m, meas)) : "text.secondary";
  };

  // The verdict of a biome: what the run must do beyond the block.
  const verdict = (biome: string, boss: string, measures: Measure[]) => {
    const says: string[] = [];
    const say = (id: string, values?: Record<string, string | number>) =>
      says.push(intl.formatMessage({ id: `pages.seedRating.verdict.${id}` }, values));
    if (!m) {
      return "";
    }
    if (boss !== "eikthyr" && byKey.get(boss) && !byKey.get(boss)?.inStrip) {
      say("offStrip", { boss: intl.formatMessage({ id: `pages.map.places.${boss}` }) });
    }
    if (biome === "blackForest" && v("vegetation.base.copper") !== undefined) {
      say(
        (v("vegetation.base.copper") ?? 0) < NEEDS.veins ? "noCopperCave" : v("vegetation.base.shore") ? "baseGood" : "baseInland",
      );
      if (v("vegetation.base.chambers") === 0) {
        say("coresFar");
      }
    }
    if (biome === "swamp" && v("region.bonemass.fireHole") !== undefined) {
      if (v("region.bonemass.bogWitch") === 0) {
        say("witchFar");
      }
      say(v("region.bonemass.fireHole") ? "holesYes" : "holesNo");
      say("abomination");
    }
    if (biome === "mountain" && v("region.moder.drakeNest") !== undefined) {
      say((v("region.moder.drakeNest") ?? 0) >= NEEDS.eggs ? "eggsOne" : "eggsMore");
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
    // The parts below most seeds; a joint radius and a yes or no speak for
    // themselves.
    if (ranks) {
      for (const meas of measures.filter(
        (x) => !x[0].startsWith("joint.") && !YES_NO.includes(x[0]) && !NEUTRAL.includes(x[0]) && !(x[0] in NEED_OF),
      )) {
        const share = beaten(ranks, m, meas);
        if (share !== null && share < RED_BELOW) {
          say(meas[1] ? "far" : "fewer", { what: intl.formatMessage({ id: key(meas) }, LABEL_VALUES) });
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
        <FormattedMessage id="pages.seedRating.strip.lead" values={{ km: STRIP_WIDTH / 1000 }} />
      </Typography>
      {total ? (
        <Typography variant="h3" component="p">
          <FormattedMessage id="pages.seedRating.score.total" values={{ n: total.total }} />
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
          <TableBody>
            {ISLAND.map((p) => {
              const on = p.biome ? (m.island.area[p.key] ?? 0) > 0 : Boolean(m.bosses[p.key]?.island);
              return (
                <Row
                  key={p.key}
                  label={<FormattedMessage id={p.biome ? `pages.map.biomes.${p.key}` : `pages.map.places.${p.key}`} />}
                  value={
                    <FormattedMessage
                      id={on ? (p.base ? "pages.seedRating.island.on" : "pages.seedRating.island.bonus") : "pages.seedRating.island.off"}
                    />
                  }
                  color={on ? "success.main" : p.base ? "error.main" : "text.secondary"}
                />
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <LinearProgress sx={{ my: 1 }} />
      )}

      {BIOMES.map(({ biome, boss, trader, measures }) => {
        // Eikthyr is judged by the start island, not the strip (the owner, 2026-11-17).
        const onIsland = boss === "eikthyr" && Boolean(m?.bosses[boss]?.island);
        const bossAt = onIsland ? { ...where(boss, true), color: "success.main" } : where(boss, true);
        const traderAt = trader ? where(trader, false) : null;
        const said = verdict(biome, boss, measures);
        return (
          <Box key={biome}>
            <Typography variant="h6" component="h3">
              <FormattedMessage id={`pages.map.biomes.${biome}`} />
              {percent(biome) !== null ? ` — ${percent(biome)}` : null}
            </Typography>
            <Table size="small">
              <TableBody>
                <Row label={<FormattedMessage id={`pages.map.places.${boss}`} />} value={bossAt.text} color={bossAt.color} />
                {trader && traderAt ? (
                  <Row label={<FormattedMessage id={`pages.map.places.${trader}`} />} value={traderAt.text} color={traderAt.color} />
                ) : null}
                {measures.map((meas) => (
                  <Row
                    key={meas[0]}
                    label={<FormattedMessage id={key(meas)} values={LABEL_VALUES} />}
                    value={value(meas)}
                    color={tint(meas)}
                  />
                ))}
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
    </Box>
  );
}
