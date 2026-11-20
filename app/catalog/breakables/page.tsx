import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { PageTrail } from "@seed-archive/ui/page-trail";
import type { Metadata } from "next";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { ItemIcon } from "@/components/catalog/ItemIcon";
import { serverFormat } from "@/lib/i18n/server";
import breakables from "@/lib/valheim/breakables.json";
import { RowLink } from "@/components/catalog/RowLink";

export const metadata: Metadata = {
  title: "What to break in Valheim — Seed Archive",
  description:
    "The pots, gates, braziers, hangings and furniture worth smashing: what each break gives and how often, and where they stand.",
  alternates: { canonical: "/catalog/breakables" },
};

const t = (id: string, values?: Record<string, string | number>) =>
  serverFormat(`pages.breakables.${id}`, values);

// The objects worth breaking, one row each (the Valheim generator's
// `breakables.json`): its name, what one break gives with the chance, and the
// places it stands in, always or only sometimes.
export default function BreakablesPage() {
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
            { name: serverFormat("archive.guideBreakables") },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          {serverFormat("archive.guideBreakables")}
        </Typography>
        <Typography sx={{ mb: 3 }}>
          <b>{t("question")}</b> {t("answer")}
        </Typography>
        <TableContainer>
          <Table size="small" sx={{ "& td": { verticalAlign: "top" } }}>
            <TableHead>
              <TableRow>
                <TableCell>{t("head.object")}</TableCell>
                <TableCell>{t("head.gives")}</TableCell>
                <TableCell>{t("head.where")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {breakables.map((r) => (
                <TableRow key={r.id} id={r.key.toLowerCase()}>
                  <TableCell>{r.name ?? t(`object.${r.nameKey}`)}</TableCell>
                  <TableCell>
                    {r.metals.map((m) => (
                      <Box key={m.key} sx={{ mb: 0.5 }}>
                        <ItemIcon item={m.key}>
                          {m.group ? (
                            t(`group.${m.group}`)
                          ) : (
                            <RowLink item={m.key}>{m.name}</RowLink>
                          )}
                          {" ×"}
                          {/* A table may hold a max below its min; the game then gives the min. */}
                          {m.max <= m.min ? m.min : `${m.min}–${m.max}`}
                          {", "}
                          {m.chance === m.chanceMax
                            ? t("chance", { n: m.chance })
                            : t("chanceRange", {
                                low: m.chance,
                                high: m.chanceMax,
                              })}
                        </ItemIcon>
                      </Box>
                    ))}
                  </TableCell>
                  <TableCell>
                    {/* A place the map has no name for ("unnamed") is left out. */}
                    {r.places
                      .filter((p) => p.key !== "unnamed")
                      .map((p, i) => (
                        <span key={p.key}>
                          {i > 0 ? ", " : ""}
                          {serverFormat(`pages.map.places.${p.key}`)}
                          <Box
                            component="span"
                            sx={{ color: "text.secondary" }}
                          >
                            {" "}
                            {p.always ? t("always") : t("sometimes")}
                          </Box>
                        </span>
                      ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {t("note")}
        </Typography>
      </Container>
      <ArchiveFooter />
    </>
  );
}
