import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { RowLink } from "@/components/catalog/RowLink";
import { serverFormat } from "@/lib/i18n/server";
import { creatureName, UNMET } from "@/lib/valheim/creature-names";
import { modifierText } from "@/lib/valheim/modifier";
import { slug } from "@/lib/slug";
import matrix from "@/lib/valheim/weapon-matrix.json";

// The two tables of the damage page: what hurts each creature and boss (its
// multiplier for each damage type a player deals, and the weapon kinds that
// hit it hardest), and what each hits with (its strongest blow of each type).
// The Valheim generator writes it all (weapon-matrix.json); the page only lays
// it out, by biome, the bosses last in their biome.

const t = (id: string, values?: Record<string, string | number>) =>
  serverFormat(`pages.damage.${id}`, values);

// A kind's name: the crafting catalogue's, where two-handed kinds carry ".2h".
const TWO_HANDED = ["polearm", "fist"];
const kindName = (kind: string) =>
  serverFormat(
    `pages.crafting.kind.${TWO_HANDED.includes(kind) ? `${kind}.2h` : kind}`,
  );

// A cell's look: weak green, resistant red, immune grey (the catalogue's colours).
function tone(m: number) {
  if (m === 0) {
    return { color: "text.disabled" };
  }
  return m > 1
    ? { bgcolor: "#e8f5e9", color: "#1b5e20" }
    : { bgcolor: "#ffebee", color: "#b71c1c" };
}

type Row = (typeof matrix.creatures)[number];
type DamageType = keyof Row["multipliers"];
const TYPES = matrix.types as DamageType[];
const BIOMES = [...new Set(matrix.creatures.map((c) => c.biome))];

// One table: a head row, then each biome's heading row and its creatures.
function ByBiome(props: {
  head: React.ReactNode;
  cells: (c: Row) => React.ReactNode;
  columns: number;
}) {
  return (
    <TableContainer sx={{ mb: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>{props.head}</TableRow>
        </TableHead>
        <TableBody>
          {BIOMES.map((biome) => [
            <TableRow key={biome}>
              <TableCell
                colSpan={props.columns}
                sx={{ fontWeight: "bold", bgcolor: "action.hover" }}
              >
                {serverFormat(`pages.crafting.biome.${biome}`)}
              </TableCell>
            </TableRow>,
            ...matrix.creatures
              .filter((c) => c.biome === biome && !UNMET.has(c.key))
              .map((c) => (
                <TableRow key={c.key}>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      fontWeight: c.boss ? 700 : undefined,
                    }}
                  >
                    {c.boss ? (
                      // The bosses guide's headings are its anchors, made from their words.
                      <Link href={`/catalog/bosses#${slug(c.name)}`}>
                        {c.name}
                      </Link>
                    ) : (
                      <RowLink item={c.key} creature>
                        {creatureName(c.key, c.name)}
                      </RowLink>
                    )}
                  </TableCell>
                  {props.cells(c)}
                </TableRow>
              )),
          ])}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const typeHeads = TYPES.map((type) => (
  <TableCell key={type} align="center">
    {serverFormat(`pages.crafting.damage.${type}`)}
  </TableCell>
));

export function WeaponMatrix() {
  // The kinds of each damage type, as one line: "Slash: sword, axe…".
  const byType = TYPES.map((type) => ({
    type,
    kinds: matrix.kinds
      .filter((k) => k.type === type)
      .map((k) => kindName(k.kind)),
  })).filter((g) => g.kinds.length > 0);
  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        id="what-hurts-each-creature"
        sx={{ mt: 4, mb: 1 }}
      >
        {t("hurts.title")}
      </Typography>
      <Typography sx={{ mb: 1 }}>{t("hurts.lead")}</Typography>
      <Typography sx={{ mb: 2 }}>
        {byType.map((g, i) => (
          <span key={g.type}>
            {i > 0 ? " " : ""}
            <b>{serverFormat(`pages.crafting.damage.${g.type}`)}:</b>{" "}
            {g.kinds.join(", ")}.
          </span>
        ))}
      </Typography>
      <ByBiome
        columns={TYPES.length + 2}
        head={[
          <TableCell key="c">{t("creature")}</TableCell>,
          ...typeHeads,
          <TableCell key="b">{t("best")}</TableCell>,
        ]}
        cells={(c) => [
          ...TYPES.map((type) => {
            const m = c.multipliers[type];
            return (
              <TableCell
                key={type}
                align="center"
                sx={m === 1 ? undefined : tone(m)}
              >
                {modifierText(m)}
              </TableCell>
            );
          }),
          <TableCell key="best" sx={{ minWidth: 180 }}>
            {c.best.length === matrix.kinds.length
              ? t("any")
              : c.best.length === 0
                ? t("none")
                : c.best.map(kindName).join(", ")}
          </TableCell>,
        ]}
      />
      <Typography sx={{ mb: 4 }}>{t("hurts.fire")}</Typography>

      <Typography
        variant="h4"
        component="h2"
        id="what-each-creature-hits-with"
        sx={{ mt: 4, mb: 1 }}
      >
        {t("deals.title")}
      </Typography>
      <Typography sx={{ mb: 2 }}>{t("deals.lead")}</Typography>
      <ByBiome
        columns={TYPES.length + 1}
        head={[<TableCell key="c">{t("creature")}</TableCell>, ...typeHeads]}
        cells={(c) =>
          TYPES.map((type) => {
            const v = (c.deals as Partial<Record<DamageType, number>>)[type];
            return (
              <TableCell key={type} align="center">
                {v ? Math.round(v) : ""}
              </TableCell>
            );
          })
        }
      />
      <Typography sx={{ mb: 4 }}>
        {t("deals.pierce")}{" "}
        <Link href="/catalog/armour">{t("deals.armour")}</Link>.
      </Typography>
    </>
  );
}
