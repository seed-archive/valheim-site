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

import type { Placed, SeedMeasures } from "@/lib/generator";
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

// "Better than N % of seeds": for a distance, being closer; for an area or a
// count, having more.
function Beats({
  path,
  value,
  less,
}: {
  path: string;
  value: number;
  less: boolean;
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
        id={less ? "pages.map.report.closer" : "pages.map.report.more"}
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
  if (measures.error) {
    return null;
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
