"use client";

import { useState, type ReactNode } from "react";
import NextLink from "@/components/LocaleLink";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";

export type BestSeed = { seed: string; score: number; parts: number[] };

// The column a table is sorted by: the score, or one block by its place.
type Column = "score" | number;

// The best seeds, each with its score and its blocks' points; a column's head
// sorts by it, highest first, ties by the score and then the seed.
export function BestSeeds({
  blocks,
  seeds,
}: {
  blocks: string[];
  seeds: BestSeed[];
}) {
  const [column, setColumn] = useState<Column>("score");
  const value = (s: BestSeed) =>
    column === "score" ? s.score : s.parts[column];
  const rows = seeds
    .map((s, i) => ({ ...s, rank: i + 1 }))
    .sort(
      (a, b) => value(b) - value(a) || b.score - a.score || a.rank - b.rank,
    );
  const head = (id: Column, label: ReactNode) => (
    <TableCell
      key={id}
      align="right"
      sortDirection={column === id ? "desc" : false}
    >
      <TableSortLabel
        active={column === id}
        direction="desc"
        onClick={() => setColumn(id)}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  );
  return (
    <>
      <Typography sx={{ mb: 3 }}>
        <b>
          <FormattedMessage id="pages.bestSeeds.question" />
        </b>{" "}
        <FormattedMessage
          id="pages.bestSeeds.answer"
          values={{
            count: seeds.length,
            rating: (text) => (
              <Link component={NextLink} href="/tools/how-good-is-my-seed">
                {text}
              </Link>
            ),
          }}
        />
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="right">
                <FormattedMessage id="pages.bestSeeds.rank" />
              </TableCell>
              <TableCell>
                <FormattedMessage id="pages.bestSeeds.seed" />
              </TableCell>
              {head("score", <FormattedMessage id="pages.bestSeeds.score" />)}
              {blocks.map((b, k) =>
                head(
                  k,
                  <FormattedMessage
                    id={
                      b === "island"
                        ? "pages.bestSeeds.island"
                        : `pages.map.biomes.${b}`
                    }
                  />,
                ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((s) => (
              <TableRow key={s.seed} hover>
                <TableCell align="right">{s.rank}</TableCell>
                <TableCell sx={{ fontFamily: "monospace" }}>
                  <Link
                    component={NextLink}
                    href={`/tools/map?${new URLSearchParams({ seed: s.seed })}`}
                  >
                    {s.seed}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <b>{s.score}</b>
                </TableCell>
                {s.parts.map((p, k) => (
                  <TableCell key={blocks[k]} align="right">
                    {p}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
