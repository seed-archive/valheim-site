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
import { RowLink } from "@/components/catalog/RowLink";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { serverFormat } from "@/lib/i18n/server";
import events from "@/lib/valheim/events.json";

export const metadata: Metadata = {
  title: "Raids in Valheim — Seed Archive",
  description:
    "Every raid on your base: what starts it, what ends it for good, how long it lasts, and which creatures come and how many at once.",
  alternates: { canonical: "/catalog/events" },
};

const t = (id: string, values?: Record<string, string | number>) =>
  serverFormat(`pages.events.${id}`, values);
const biomeName = (b: string) => serverFormat(`pages.crafting.biome.${b}`);

type Key = { key: string; boss: string | null };
type Raid = (typeof events.events)[number];

// A world key in words: a boss's defeat by its name, the rest by the page's own
// words (`pages.events.key.<key>`).
const keyText = (k: Key) => k.boss ?? t(`key.${k.key}`);

// The raids that follow the boss order first (they end with a boss), then the
// ones that stay for good, each in the order the run meets them.
const ordered = [...events.events].sort(
  (a, b) => Number(b.ends.length > 0) - Number(a.ends.length > 0),
);

function row(r: Raid) {
  return (
    <TableRow key={r.key} id={r.key.toLowerCase()}>
      <TableCell>
        <b>{r.name}</b>
        {r.nearBase ? null : (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block" }}
          >
            {t("anywhere")}
          </Typography>
        )}
      </TableCell>
      <TableCell>
        {r.opens.length > 0 ? r.opens.map(keyText).join(", ") : t("fromStart")}
      </TableCell>
      <TableCell>
        {r.ends.length > 0 ? r.ends.map(keyText).join(", ") : t("never")}
      </TableCell>
      <TableCell sx={{ whiteSpace: "nowrap" }}>
        {t("minutes", { m: Math.round((r.seconds / 60) * 10) / 10 })}
      </TableCell>
      <TableCell>
        {r.spawn.map((s) => (
          <Box key={s.key}>
            <RowLink item={s.key} creature>
              {s.name}
            </RowLink>{" "}
            {t("atOnce", { n: s.max })}
          </Box>
        ))}
      </TableCell>
      <TableCell>{r.biomes.map(biomeName).join(", ")}</TableCell>
    </TableRow>
  );
}

export default function EventsPage() {
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
            { name: serverFormat("archive.guideEvents") },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          {t("title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>{t("question")}</b>{" "}
          {t("answer", {
            minutes: events.intervalMinutes,
            chance: events.chance,
          })}
        </Typography>
        <Typography sx={{ mb: 2 }}>{t("how")}</Typography>
        <TableContainer>
          <Table size="small" sx={{ "& td": { verticalAlign: "top" } }}>
            <TableHead>
              <TableRow>
                <TableCell>{t("head.raid")}</TableCell>
                <TableCell>{t("head.opens")}</TableCell>
                <TableCell>{t("head.ends")}</TableCell>
                <TableCell>{t("head.lasts")}</TableCell>
                <TableCell>{t("head.who")}</TableCell>
                <TableCell>{t("head.where")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{ordered.map(row)}</TableBody>
          </Table>
        </TableContainer>
        <Typography
          variant="h5"
          component="h2"
          id="jotun-invasion"
          sx={{ mt: 5, mb: 1 }}
        >
          {t("invasion.title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>{t("invasion.text")}</Typography>
      </Container>
      <ArchiveFooter />
    </>
  );
}
