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
import { PageTrail } from "@/components/PageTrail";
import {
  BiomeSections,
  material,
  searchText,
  seasonNote,
} from "@/components/catalog/BiomeSections";
import { ItemIcon } from "@/components/catalog/ItemIcon";
import { TableSearch } from "@/components/catalog/TableSearch";
import type { GameName } from "@/lib/i18n/game-names";
import { gameNames } from "@/lib/i18n/names";
import { serverIntl, type ServerIntl, type Values } from "@/lib/i18n/server";
import crafting from "@/lib/valheim/crafting.json";

// The page's words, `pages.buildPieces.<id>`.
const words = (intl: ServerIntl) => (id: string, values?: Values) =>
  intl.format(`pages.buildPieces.${id}`, values);

type Piece = (typeof crafting.building)[number];

// The hammer's own modes, which the game lists among its pieces but build
// nothing (the repair mode).
const HAMMER_MODES = ["piece_repair"];

// One use of a piece as the Valheim generator writes it: its key and the
// numbers its words fill in.
type Use = {
  use: string;
  value?: number;
  slots?: number;
  station?: string;
  items?: string;
  conversions?: { fromName: string; toName: string }[];
  fuel?: string | null;
  material?: string;
};

// What a use names: a converter's conversions, each "a into b", as a list in
// the page's language; any other use the item it makes (one name).
const itemsOf = (u: Use, name: GameName, intl: ServerIntl) =>
  u.conversions
    ? intl.list(
        u.conversions.map((c) =>
          words(intl)("use.into", {
            from: name(c.fromName),
            to: name(c.toName),
          }),
        ),
        "unit",
      )
    : u.items
      ? name(u.items)
      : "";

// What a piece is for, one use a line.
const uses = (b: Piece, name: GameName, intl: ServerIntl) => {
  const t = words(intl);
  return (b.uses as Use[]).map((u) => (
    <Box key={u.use} component="span" sx={{ display: "block" }}>
      {t(`use.${u.use}`, {
        value: u.value ?? "",
        slots: u.slots ?? "",
        station: u.station ? name(u.station) : "",
        items: itemsOf(u, name, intl),
        fuel: u.fuel ? name(u.fuel) : "",
        material: u.material ? t(`material.${u.material}`) : "",
      })}
    </Box>
  ));
};

function pieceTable(list: Piece[], name: GameName, intl: ServerIntl) {
  const t = words(intl);
  const note = (key: string) => `pages.buildPieces.note.${key}`;
  // By the English name.
  const rows = [...list].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <TableContainer>
      <Table size="small" sx={{ tableLayout: { md: "fixed" } }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: { md: "28%" } }}>
              {t("head.piece")}
            </TableCell>
            <TableCell sx={{ width: { md: "24%" } }}>
              {t("head.uses")}
            </TableCell>
            <TableCell sx={{ width: { md: "16%" } }}>
              {t("head.stationNearby")}
            </TableCell>
            <TableCell>{t("head.materials")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((b) => (
            <TableRow
              key={b.key}
              id={b.key.toLowerCase()}
              data-search={searchText(
                name(b.name),
                name(b.tool),
                b.station && name(b.station),
                ...(b.uses as Use[]).map((u) => t(`use.${u.use}`)),
                ...b.resources.map((r) => name(r.name)),
              )}
            >
              <TableCell>
                <ItemIcon item={b.key}>
                  {name(b.name)}
                  {b.season || intl.has(note(b.key)) ? (
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block" }}
                    >
                      {/* The note that tells twins apart, then the season. */}
                      {[
                        intl.has(note(b.key)) ? intl.format(note(b.key)) : null,
                        b.season ? seasonNote(b.season, intl) : null,
                      ]
                        .filter(Boolean)
                        .join(". ")}
                    </Typography>
                  ) : null}
                </ItemIcon>
              </TableCell>
              <TableCell>{b.uses.length ? uses(b, name, intl) : "—"}</TableCell>
              <TableCell>{b.station ? name(b.station) : "—"}</TableCell>
              <TableCell>{b.resources.map((r) => material(r, name))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// One catalogue page of the hammer's pieces: those the Valheim generator puts
// on `page` (one of the hammer's tabs, or the ships and carts), by biome; its
// words are `pages.<words>`: title, question, lead.
export async function PiecePage(props: {
  page: string;
  words: string;
  crumb: string;
}) {
  const name = await gameNames();
  const intl = await serverIntl();
  const own = (id: string) => intl.format(`pages.${props.words}.${id}`);
  const list = crafting.building.filter(
    (b) => b.page === props.page && !HAMMER_MODES.includes(b.key),
  );
  return (
    <>
      <ArchiveBar />
      <Container
        component="main"
        maxWidth="lg"
        sx={{ py: 6, minHeight: "70vh" }}
      >
        <PageTrail crumb={props.crumb} />
        <Typography variant="h3" component="h1" gutterBottom>
          {own("title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>{own("question")}</b> {own("lead")}
        </Typography>
        <TableSearch>
          <BiomeSections
            list={list}
            table={(rows) => pieceTable(rows, name, intl)}
          />
        </TableSearch>
      </Container>
      <ArchiveFooter />
    </>
  );
}
