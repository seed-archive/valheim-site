"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import NextLink from "next/link";
import { FormattedMessage, useIntl } from "react-intl";

import type { MapClient } from "@seed-archive/map/client";
import { slug } from "@/lib/slug";
import { decodeLoot, NAMES, type Certainty, type LootLine } from "@/lib/valheim/loot";

// What a place holds, in a panel on the right of the map (a sheet from the
// bottom on a phone): the generator's loot of that place, in three sections by
// how certain it is (the owner, 2026-11-17).

export type LootPlace = { x: number; y: number; key: string };

const SECTIONS: Certainty[] = ["exact", "overYaws", "atPlay"];

// A count is shown to one decimal, an at-play expectation too (our own choice).
const round = (n: number) => Math.round(n * 10) / 10;

export function LootPanel(props: { client: MapClient | null; seed: string; place: LootPlace | null; onClose: () => void }) {
  const intl = useIntl();
  const phone = useMediaQuery((theme: { breakpoints: { down: (k: string) => string } }) => theme.breakpoints.down("md"));
  const [lines, setLines] = useState<{ at: string; lines: LootLine[] } | null>(null);
  const at = props.place ? `${props.seed}:${props.place.x},${props.place.y}` : null;

  useEffect(() => {
    if (!props.client || !props.place || !at) {
      return;
    }
    let live = true;
    props.client
      .call<Float32Array>("loot", [props.seed, 0, props.place.x, props.place.y])
      .then((raw) => live && setLines({ at, lines: decodeLoot(raw) }));
    return () => {
      live = false;
    };
  }, [props.client, props.seed, props.place, at]);

  const current = lines && lines.at === at ? lines.lines : null;
  const name = (key: string) => {
    const id = `pages.map.loot.items.${key}`;
    return NAMES.get(key) ?? (intl.messages[id] ? intl.formatMessage({ id }) : key);
  };
  return (
    <Drawer
      anchor={phone ? "bottom" : "right"}
      open={Boolean(props.place)}
      onClose={props.onClose}
      variant="temporary"
      slotProps={{ paper: { sx: { width: phone ? "auto" : 360, maxHeight: phone ? "60vh" : undefined, p: 2 } } }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Typography variant="h6" component="h2" sx={{ flex: 1 }}>
          {props.place ? <FormattedMessage id={`pages.map.places.${props.place.key}`} /> : null}
        </Typography>
        <IconButton onClick={props.onClose} aria-label={intl.formatMessage({ id: "pages.map.loot.close" })}>
          <CloseIcon />
        </IconButton>
      </Box>
      {!current ? (
        <LinearProgress />
      ) : current.length === 0 ? (
        <Typography color="text.secondary">
          <FormattedMessage id="pages.map.loot.nothing" />
        </Typography>
      ) : (
        SECTIONS.map((section) => {
          const rows = current.filter((l) => l.certainty === section).sort((a, b) => b.expected - a.expected);
          return rows.length === 0 ? null : (
            <Box key={section} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" component="h3">
                <FormattedMessage id={`pages.map.loot.${section}`} />
              </Typography>
              <Typography variant="caption" color="text.secondary">
                <FormattedMessage id={`pages.map.loot.${section}Lead`} />
              </Typography>
              <Table size="small">
                <TableBody>
                  {rows.map((l) => (
                    <TableRow key={l.key}>
                      <TableCell>{name(l.key)}</TableCell>
                      <TableCell align="right">
                        {section === "overYaws" && l.least !== l.most ? (
                          <FormattedMessage
                            id="pages.map.loot.range"
                            values={{ n: round(l.expected), least: Math.round(l.least), most: Math.round(l.most) }}
                          />
                        ) : round(l.expected) > 0 ? (
                          round(l.expected)
                        ) : (
                          // Rarer than one in twenty: shown as below the first decimal.
                          "< 0.1"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          );
        })
      )}
      {current && current.length > 0 ? (
        <Typography variant="body2" color="text.secondary">
          <FormattedMessage
            id="pages.map.loot.why"
            values={{
              a: (text: React.ReactNode) => (
                <Link component={NextLink} href={`/bugs#${slug(intl.formatMessage({ id: "pages.bugs.loot.title" }))}`}>
                  {text}
                </Link>
              ),
            }}
          />
        </Typography>
      ) : null}
    </Drawer>
  );
}
