import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { PageTrail } from "@/components/PageTrail";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { ItemIcon } from "@/components/catalog/ItemIcon";
import { gameNames } from "@/lib/i18n/names";
import { serverIntl, type Values } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/metadata";
import breakables from "@/lib/valheim/breakables.json";
import { RowLink } from "@/components/catalog/RowLink";

export function generateMetadata() {
  return pageMetadata("pages.breakables.meta", "/catalog/breakables");
}

// The objects worth breaking, one row each (the Valheim generator's
// `breakables.json`): its name, what one break gives with the chance, and the
// places it stands in, always or only sometimes.
export default async function BreakablesPage() {
  const name = await gameNames();
  const intl = await serverIntl();
  const t = (id: string, values?: Values) =>
    intl.format(`pages.breakables.${id}`, values);
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
            { name: intl.format("archive.home"), href: "/" },
            { name: intl.format("archive.catalog"), href: "/catalog" },
            { name: intl.format("archive.guideBreakables") },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          {intl.format("archive.guideBreakables")}
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
                  <TableCell>
                    {r.name ? name(r.name) : t(`object.${r.nameKey}`)}
                  </TableCell>
                  <TableCell>
                    {r.metals.map((m) => (
                      <Box key={m.key} sx={{ mb: 0.5 }}>
                        <ItemIcon item={m.key}>
                          {m.group ? (
                            t(`group.${m.group}`)
                          ) : (
                            <RowLink item={m.key}>
                              {m.name && name(m.name)}
                            </RowLink>
                          )}
                          {/* A table may hold a max below its min; the game then
                              gives the min. "× 1" is left out, as everywhere. */}
                          {m.max <= m.min
                            ? m.min > 1
                              ? ` × ${m.min}`
                              : ""
                            : ` × ${m.min}–${m.max}`}
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
                    {intl.list(
                      r.places
                        .filter((p) => p.key !== "unnamed")
                        .map((p) => (
                          <span key={p.key}>
                            {intl.format(`pages.map.places.${p.key}`)}
                            <Box
                              component="span"
                              sx={{ color: "text.secondary" }}
                            >
                              {" "}
                              {p.always ? t("always") : t("sometimes")}
                            </Box>
                          </span>
                        )),
                      "unit",
                    )}
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
