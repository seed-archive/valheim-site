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
import { serverFormat, serverMessages } from "@/lib/i18n/server";
import crafting from "@/lib/valheim/crafting.json";

const t = (id: string, values?: Record<string, string | number>) =>
  serverFormat(`pages.buildPieces.${id}`, values);

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
  fuel?: string | null;
  material?: string;
};

// What a piece is for, one use a line.
const uses = (b: Piece) =>
  (b.uses as Use[]).map((u) => (
    <Box key={u.use} component="span" sx={{ display: "block" }}>
      {t(`use.${u.use}`, {
        value: u.value ?? "",
        slots: u.slots ?? "",
        station: u.station ?? "",
        items: u.items ?? "",
        fuel: u.fuel ?? "",
        material: u.material ? t(`material.${u.material}`) : "",
      })}
    </Box>
  ));

function pieceTable(list: Piece[]) {
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
                b.name,
                b.tool,
                b.station,
                ...(b.uses as Use[]).map((u) => t(`use.${u.use}`)),
                ...b.resources.map((r) => r.name),
              )}
            >
              <TableCell>
                <ItemIcon item={b.key}>
                  {b.name}
                  {b.season ||
                  `pages.buildPieces.note.${b.key}` in serverMessages ? (
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block" }}
                    >
                      {/* The note that tells twins apart, then the season. */}
                      {[
                        `pages.buildPieces.note.${b.key}` in serverMessages
                          ? serverFormat(`pages.buildPieces.note.${b.key}`)
                          : null,
                        b.season ? seasonNote(b.season) : null,
                      ]
                        .filter(Boolean)
                        .join(". ")}
                    </Typography>
                  ) : null}
                </ItemIcon>
              </TableCell>
              <TableCell>{b.uses.length ? uses(b) : "—"}</TableCell>
              <TableCell>{b.station ?? "—"}</TableCell>
              <TableCell>{b.resources.map(material)}</TableCell>
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
export function PiecePage(props: {
  page: string;
  words: string;
  crumb: string;
}) {
  const own = (id: string) => serverFormat(`pages.${props.words}.${id}`);
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
        <TableSearch>
          <BiomeSections list={list} table={pieceTable} />
        </TableSearch>
      </Container>
      <ArchiveFooter />
    </>
  );
}
