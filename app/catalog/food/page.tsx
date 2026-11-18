import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import Link from "next/link";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { PageTrail } from "@seed-archive/ui/page-trail";
import { ItemIcon } from "@/components/catalog/ItemIcon";
import { serverFormat } from "@/lib/i18n/server";
import food from "@/lib/valheim/food.json";
import matrix from "@/lib/valheim/food-matrix.json";

export const metadata: Metadata = {
  title: "Food and feasts in Valheim — Seed Archive",
  description:
    "Every dish and feast with its health, stamina and eitr: which food suits a melee fighter, an archer or a mage.",
  alternates: { canonical: "/catalog/food" },
};

const t = (id: string, values?: Record<string, string | number>) =>
  serverFormat(`pages.food.${id}`, values);

type Dish = (typeof food)[number];

// The roles in the page's order, each with the stat its dishes are sorted by
// (the Valheim generator gives each dish its role).
const ROLES = [
  { role: "health", stat: "health" },
  { role: "stamina", stat: "stamina" },
  { role: "eitr", stat: "eitr" },
  { role: "balanced", stat: "health" },
] as const;

// The biomes in the run's order, the columns of the matrix (the Valheim
// generator names each dish's home biome: the latest of its ingredients').
const BIOME_ORDER = [
  "meadows",
  "blackForest",
  "swamp",
  "mountain",
  "plains",
  "mistlands",
  "ashlands",
  "deepNorth",
];

// The three dishes of a role a run eats by the end of a biome (the Valheim
// generator picks them: food-matrix.json).
const BY_KEY = new Map(food.map((d) => [d.key, d]));
function bestBy(role: string, col: number): Dish[] {
  const row = matrix.find((r) => r.role === role);
  return (row?.cells[col] ?? []).flatMap((k) => BY_KEY.get(k) ?? []);
}

// Where a dish is made: its recipe's station, and whether it is cooked or
// served after that.
function madeAt(d: Dish) {
  if (!d.station) {
    return "—";
  }
  const at = t("stationLevel", { station: d.station, level: d.level ?? 1 });
  if (d.recipe === d.key) {
    return at;
  }
  return t(d.feast ? "thenServed" : "thenCooked", { at });
}

function dishTable(list: Dish[]) {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t("head.dish")}</TableCell>
            <TableCell>{t("head.biome")}</TableCell>
            <TableCell align="right">{t("head.health")}</TableCell>
            <TableCell align="right">{t("head.stamina")}</TableCell>
            <TableCell align="right">{t("head.eitr")}</TableCell>
            <TableCell align="right">{t("head.regen")}</TableCell>
            <TableCell align="right">{t("head.minutes")}</TableCell>
            <TableCell align="right">{t("head.again")}</TableCell>
            <TableCell>{t("head.made")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((d) => (
            <TableRow key={d.key} id={d.key.toLowerCase()}>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <ItemIcon item={d.key}>
                  {d.name}
                </ItemIcon>
              </TableCell>
              <TableCell>
                {d.biome ? serverFormat(`pages.crafting.biome.${d.biome}`) : "—"}
              </TableCell>
              <TableCell align="right">{d.health}</TableCell>
              <TableCell align="right">{d.stamina}</TableCell>
              <TableCell align="right">{d.eitr || "—"}</TableCell>
              <TableCell align="right">{d.regen}</TableCell>
              <TableCell align="right">{d.minutes}</TableCell>
              <TableCell align="right">{d.again}</TableCell>
              <TableCell>{madeAt(d)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function FoodPage() {
  const feasts = food.filter((d) => d.feast);
  const dishes = food.filter((d) => !d.feast);
  const byRole = ROLES.map(({ role, stat }) => ({
    role,
    list: dishes
      .filter((d) => d.role === role)
      .sort((a, b) => b[stat] - a[stat]),
  }));
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
            { name: serverFormat("archive.guideFood") },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          {t("title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>{t("question")}</b> {t("answer")}
        </Typography>
        <Typography sx={{ mb: 2 }}>{t("basics")}</Typography>

        <Typography variant="h4" component="h2" id="who" sx={{ mt: 5, mb: 1 }}>
          {t("who.title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>{t("who.matrix")}</Typography>
        <TableContainer sx={{ mb: 2 }}>
          <Table size="small" sx={{ "& td, & th": { verticalAlign: "top" } }}>
            <TableHead>
              <TableRow>
                <TableCell />
                {BIOME_ORDER.map((b) => (
                  <TableCell key={b} sx={{ fontWeight: "bold" }}>
                    {serverFormat(`pages.craftTree.biome.${b}`)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {ROLES.map(({ role }) => (
                <TableRow key={role}>
                  <TableCell sx={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                    {t(`who.${role}`)}
                  </TableCell>
                  {BIOME_ORDER.map((b, col) => {
                    const three = bestBy(role, col);
                    const isNew = three.some((d) => d.biome === b);
                    return (
                      <TableCell
                        key={b}
                        sx={{
                          bgcolor: isNew ? "#eef3fb" : undefined,
                          color: isNew ? undefined : "text.secondary",
                          minWidth: 110,
                        }}
                      >
                        {three.length ? (
                          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            {three.map((d) => (
                              <Box key={d.key} sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                <ItemIcon item={d.key} />
                                <Link href={`#${d.key.toLowerCase()}`}>{d.name}</Link>
                              </Box>
                            ))}
                          </Box>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography sx={{ mb: 1.5 }}>
          <b>{t("who.again")}</b> {t("who.againText")}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>
          <b>{t("who.feast")}</b> {t("who.feastText")}
        </Typography>

        {byRole.map(({ role, list }) => (
          <section key={role}>
            <Typography
              variant="h4"
              component="h2"
              id={role}
              sx={{ mt: 5, mb: 1 }}
            >
              {t(`role.${role}`)}
            </Typography>
            {dishTable(list)}
          </section>
        ))}

        <Typography
          variant="h4"
          component="h2"
          id="feasts"
          sx={{ mt: 5, mb: 1 }}
        >
          {t("feasts.title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          {t("feasts.text")} <Link href="/catalog/traders#bogwitch">{t("feasts.tray")}</Link>
        </Typography>
        {dishTable(feasts)}
      </Container>
      <ArchiveFooter />
    </>
  );
}
