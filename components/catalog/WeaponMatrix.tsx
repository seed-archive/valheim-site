import Link from "@/components/LocaleLink";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { RowLink } from "@/components/catalog/RowLink";
import type { GameName } from "@/lib/i18n/game-names";
import { gameNames } from "@/lib/i18n/names";
import { serverIntl, type ServerIntl, type Values } from "@/lib/i18n/server";
import { creatureName, UNMET } from "@/lib/valheim/creature-names";
import { modifierText } from "@/lib/valheim/modifier";
import { slug } from "@/lib/slug";
import matrix from "@/lib/valheim/weapon-matrix.json";

// The two tables of the damage page: what hurts each creature and boss (its
// multiplier for each damage type a player deals, and the weapon kinds that
// hit it hardest), and what each hits with (its strongest blow of each type).
// The Valheim generator writes it all (weapon-matrix.json); the page only lays
// it out, by biome, the bosses last in their biome.

// A kind's key: the crafting catalogue's, where two-handed kinds carry ".2h".
const TWO_HANDED = ["polearm", "fist"];
const kindKey = (kind: string) =>
  `pages.crafting.kind.${TWO_HANDED.includes(kind) ? `${kind}.2h` : kind}`;

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
  name: GameName;
  intl: ServerIntl;
}) {
  const { name, intl } = props;
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
                {intl.format(`pages.crafting.biome.${biome}`)}
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
                        {name(c.name)}
                      </Link>
                    ) : (
                      <RowLink item={c.key} creature>
                        {creatureName(c.key, name(c.name), intl)}
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

export async function WeaponMatrix() {
  const name = await gameNames();
  const intl = await serverIntl();
  const t = (id: string, values?: Values) =>
    intl.format(`pages.damage.${id}`, values);
  const kindName = (kind: string) => intl.format(kindKey(kind));
  const typeHeads = TYPES.map((type) => (
    <TableCell key={type} align="center">
      {intl.format(`pages.crafting.damage.${type}`)}
    </TableCell>
  ));
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
            {intl.rich("pages.damage.hurts.kinds", {
              b: (chunks) => <b>{chunks}</b>,
              type: intl.format(`pages.crafting.damage.${g.type}`),
              kinds: intl.list(g.kinds, "unit"),
            })}
          </span>
        ))}
      </Typography>
      <ByBiome
        name={name}
        intl={intl}
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
                {modifierText(m, intl)}
              </TableCell>
            );
          }),
          <TableCell key="best" sx={{ minWidth: 180 }}>
            {c.best.length === matrix.kinds.length
              ? t("any")
              : c.best.length === 0
                ? t("none")
                : intl.list(c.best.map(kindName), "unit")}
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
        name={name}
        intl={intl}
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
        {intl.rich("pages.damage.deals.pierce", {
          link: (chunks) => <Link href="/catalog/armour">{chunks}</Link>,
        })}
      </Typography>
    </>
  );
}
