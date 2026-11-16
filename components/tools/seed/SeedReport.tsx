"use client";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { createContext, useContext, useEffect, useState } from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";

import type { Placed, SeedMeasures } from "@/lib/valheim/generator";
import { loadRanks, shareBeaten, type Ranks } from "@/lib/scan";

// The seed scan's ranks, once loaded; until then no rank is shown.
const ScanContext = createContext<Ranks | null>(null);

// What a seed is worth, measured the same way as the seed scan and set against
// it: for each measure, the share of scanned seeds this one beats.

const BOSSES = [
  "eikthyr",
  "theElder",
  "bonemass",
  "moder",
  "yagluth",
  "theQueen",
  "fader",
] as const;
const TRADERS = ["haldor", "hildir", "bogWitch"] as const;
const LAND_BIOMES = [
  "meadows",
  "blackForest",
  "swamp",
  "mountain",
  "plains",
  "mistlands",
] as const;

// The route's measures: path under `route`, and how it is read — a distance
// (shorter is better), a count where more is better, or one where fewer is.
const ROUTE = [
  ["firstHome.walk", "km"],
  ["firstHome.caveShore", "km"],
  ["firstHome.blackForest", "km"],
  ["swamp.bogWitch", "km"],
  ["swamp.crypt", "km"],
  ["swamp.fireHole", "km"],
  ["mountain.fromBonemass", "km"],
  ["plains.fromBonemass", "km"],
  ["plains.villagesClose", "fewer"],
  ["plains.villagesRing", "more"],
  ["mistlands.minePair", "km"],
  ["mistlands.minePairFromStart", "km"],
  ["ashlands.fortressesNearFader", "more"],
  ["ashlands.nearestFortress", "km"],
  ["ashlands.fortressShore", "km"],
  ["line.offSum", "km"],
] as const;

// The trees and ore measures, under `vegetation`, read the same way.
const WOOD = [
  ["copperCaves.count", "more"],
  ["copperCaves.nearest", "km"],
  ["copperCaves.veins", "more"],
  ["copperCaves.oaks", "more"],
  ["copperCaves.birches", "more"],
  ["copperCaves.nearestOak", "km"],
  ["copperCaves.walk", "km"],
  ["copperCaves.shore", "km"],
  ["copperCaves.tin", "more"],
  ["groves.start", "more"],
  ["groves.yagluth", "more"],
] as const;

// A measure under a group by its dotted path, if the world has it.
function routeValue(of: unknown, path: string): number | undefined {
  let node = of;
  for (const part of path.split(".")) {
    node =
      node && typeof node === "object"
        ? (node as Record<string, unknown>)[part]
        : undefined;
  }
  return typeof node === "number" ? node : undefined;
}

// "Better than N % of seeds": for a distance, being closer; for an area or a
// count, having more.
function Beats({
  path,
  value,
  less,
  count = false,
}: {
  path: string;
  value: number;
  less: boolean;
  count?: boolean;
}) {
  const scan = useContext(ScanContext);
  const share = scan ? shareBeaten(scan, path, value, less) : null;
  if (share === null) {
    return null;
  }
  const beats = Math.round(share * 100);
  return (
    <Typography
      variant="caption"
      color={
        beats >= 75
          ? "success.main"
          : beats <= 25
            ? "error.main"
            : "text.secondary"
      }
    >
      <FormattedMessage
        id={
          less
            ? count
              ? "pages.map.report.fewer"
              : "pages.map.report.closer"
            : "pages.map.report.more"
        }
        values={{ n: beats }}
      />
    </Typography>
  );
}

function Distance({ m }: { m: number }) {
  return (
    <FormattedNumber
      value={m / 1000}
      style="unit"
      unit="kilometer"
      maximumFractionDigits={1}
    />
  );
}

function PlacedRows({
  kind,
  names,
  of,
  seed,
}: {
  kind: "bosses" | "traders";
  names: readonly string[];
  of: Record<string, Placed>;
  seed: string;
}) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell align="right">
            <FormattedMessage id="pages.map.report.distance" />
          </TableCell>
          <TableCell align="right">
            <FormattedMessage id="pages.map.report.sea" />
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {names.map((name) => {
          const p = of[name];
          if (!p) {
            return null;
          }
          return (
            <TableRow key={name}>
              <TableCell>
                <Link
                  component={NextLink}
                  href={mapAt(seed, p)}
                  underline="hover"
                >
                  <FormattedMessage id={`pages.map.places.${name}`} />
                </Link>
                {p.island ? (
                  <Typography
                    variant="caption"
                    color="success.main"
                    sx={{ display: "block" }}
                  >
                    <FormattedMessage id="pages.map.report.onIsland" />
                  </Typography>
                ) : null}
              </TableCell>
              <TableCell align="right">
                <Distance m={p.d} />
                <Box>
                  <Beats path={`${kind}.${name}.d`} value={p.d} less />
                </Box>
              </TableCell>
              <TableCell align="right">
                <Distance m={p.sea} />
                <Box>
                  <Beats path={`${kind}.${name}.sea`} value={p.sea} less />
                </Box>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

// Rows of measures under one group: a label, the value and how it ranks.
function MeasureRows({
  group,
  rows,
  of,
}: {
  group: "route" | "vegetation" | "sectors";
  rows: readonly (readonly [string, "km" | "more" | "fewer"])[];
  of: unknown;
}) {
  return (
    <Table size="small">
      <TableBody>
        {rows.map(([path, kind]) => {
          const v = routeValue(of, path);
          if (v === undefined) {
            return null;
          }
          return (
            <TableRow key={path}>
              <TableCell>
                <FormattedMessage
                  id={`pages.map.report.${group}_${path.replace(".", "_")}`}
                />
              </TableCell>
              <TableCell align="right">
                {kind === "km" ? <Distance m={v} /> : v}
                <Box>
                  <Beats
                    path={`${group}.${path}`}
                    value={v}
                    less={kind !== "more"}
                    count={kind === "fewer"}
                  />
                </Box>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

type Props = {
  seed: string;
  measures: SeedMeasures | null;
};

// The map of this seed, centred on a place.
function mapAt(seed: string, p: { x: number; z: number }) {
  return `/tools/map?${new URLSearchParams({ seed, x: String(p.x), z: String(p.z) })}`;
}

export function SeedReport(props: Props) {
  // The ranks are fetched the first time a report shows.
  const [scan, setScan] = useState<Ranks | null>(null);
  useEffect(() => {
    loadRanks()
      .then(setScan)
      .catch(() => setScan(null));
  }, []);
  return (
    <ScanContext.Provider value={scan}>
      <Report {...props} />
    </ScanContext.Provider>
  );
}

function Report({ seed, measures }: Props) {
  if (!measures) {
    return (
      <Box>
        <Typography variant="body2" gutterBottom>
          <FormattedMessage id="pages.map.report.measuring" />
        </Typography>
        <LinearProgress />
      </Box>
    );
  }
  const sunken = measures.dungeons.sunkenCrypts;
  const burial = measures.dungeons.burialChambers;
  const troll = measures.dungeons.trollCaves;
  const island = measures.island;
  const islandLand = LAND_BIOMES.reduce(
    (sum, b) => sum + (island.area[b] ?? 0),
    0,
  );
  return (
    <Box sx={{ "& h3": { mt: 2, mb: 0.5 } }}>
      <Typography variant="body2" color="text.secondary">
        <FormattedMessage id="pages.map.report.lead" />
      </Typography>

      <Typography variant="subtitle2" component="h3">
        <FormattedMessage id="pages.map.report.island" />
      </Typography>
      <Typography variant="body2">
        <FormattedMessage
          id="pages.map.report.islandArea"
          values={{ km2: islandLand.toFixed(1) }}
        />
      </Typography>
      <Table size="small">
        <TableBody>
          {LAND_BIOMES.filter((b) => (island.area[b] ?? 0) > 0).map((b) => (
            <TableRow key={b}>
              <TableCell>
                <FormattedMessage id={`pages.map.biomes.${b}`} />
              </TableCell>
              <TableCell align="right">
                <FormattedMessage
                  id="pages.map.report.km2"
                  values={{ km2: (island.area[b] ?? 0).toFixed(2) }}
                />
              </TableCell>
              <TableCell align="right">
                <FormattedMessage
                  id="pages.map.report.interior"
                  values={{ km2: (island.interior[b] ?? 0).toFixed(2) }}
                />
                <Box>
                  {(island.interior[b] ?? 0) > 0 ? (
                    <Beats
                      path={`island.interior.${b}`}
                      value={island.interior[b] ?? 0}
                      less={false}
                    />
                  ) : null}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="subtitle2" component="h3">
        <FormattedMessage id="pages.map.report.bosses" />
      </Typography>
      <PlacedRows
        kind="bosses"
        names={BOSSES}
        of={measures.bosses}
        seed={seed}
      />

      <Typography variant="subtitle2" component="h3">
        <FormattedMessage id="pages.map.report.route" />
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <FormattedMessage id="pages.map.report.routeLead" />
      </Typography>
      <MeasureRows group="route" rows={ROUTE} of={measures.route} />

      <Typography variant="subtitle2" component="h3">
        <FormattedMessage id="pages.map.report.wood" />
      </Typography>
      {measures.vegetation ? (
        <>
          <MeasureRows
            group="vegetation"
            rows={WOOD}
            of={measures.vegetation}
          />
          <MeasureRows
            group="sectors"
            rows={[["abomination", "km"]] as const}
            of={measures.sectors}
          />
        </>
      ) : (
        <Box>
          <Typography variant="body2" gutterBottom>
            <FormattedMessage id="pages.map.report.woodMeasuring" />
          </Typography>
          <LinearProgress />
        </Box>
      )}

      <Typography variant="subtitle2" component="h3">
        <FormattedMessage id="pages.map.report.traders" />
      </Typography>
      <PlacedRows
        kind="traders"
        names={TRADERS}
        of={measures.traders}
        seed={seed}
      />

      <Typography variant="subtitle2" component="h3">
        <FormattedMessage id="pages.map.report.dungeons" />
      </Typography>
      <Table size="small">
        <TableBody>
          {sunken.nearest !== null ? (
            <TableRow>
              <TableCell>
                <FormattedMessage id="pages.map.report.nearestSunken" />
              </TableCell>
              <TableCell align="right">
                <Distance m={sunken.nearest} />
                <Box>
                  <Beats
                    path="dungeons.sunkenCrypts.nearest"
                    value={sunken.nearest}
                    less
                  />
                </Box>
              </TableCell>
            </TableRow>
          ) : null}
          {(
            [
              ["sunkenNear", sunken.near, "dungeons.sunkenCrypts.near"],
              ["burialNear", burial.near, "dungeons.burialChambers.near"],
              ["trollNear", troll.near, "dungeons.trollCaves.near"],
            ] as const
          ).map(([id, n, path]) => (
            <TableRow key={id}>
              <TableCell>
                <FormattedMessage id={`pages.map.report.${id}`} />
              </TableCell>
              <TableCell align="right">
                {n}
                <Box>
                  <Beats path={path} value={n} less={false} />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="subtitle2" component="h3">
        <FormattedMessage id="pages.map.report.mountains" />
      </Typography>
      <Typography variant="body2">
        <FormattedMessage
          id="pages.map.report.highest"
          values={{ m: Math.round(measures.highest - 30) }}
        />
      </Typography>
      <Beats path="highest" value={measures.highest} less={false} />
    </Box>
  );
}
