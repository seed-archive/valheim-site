import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { ItemIcon } from "@/components/catalog/ItemIcon";
import { RowLink } from "@/components/catalog/RowLink";
import { serverFormat } from "@/lib/i18n/server";
import crafting from "@/lib/valheim/crafting.json";
import {
  FORGE,
  TOP_LEVEL,
  amountAt,
  breakReturn,
  multiplier,
  putIn,
} from "@/lib/valheim/forge";

// The guide's example (the owner, 2026-11-23): the Iron Sword, whose every
// material grows with the level, so each column of the tables moves.
const EXAMPLE = "SwordIron";

const t = (id: string, values?: Record<string, string | number>) =>
  serverFormat(`pages.forge.return.${id}`, values);

type Item = (typeof crafting.gear)[number];

// A level's step with its sum, as `multiplier` computes it, so the reader sees
// why 1, 2, 4 is followed by 4.5 and not 8.
const step = (l: number) =>
  l >= 4
    ? `4 + (${l} − 4) / 2 = ${multiplier(l)}`
    : `${l} − 1 = ${multiplier(l)}`;

// The materials as the tables' heads: icon, name, link to the catalogue.
function heads(item: Item) {
  return item.resources.map((r) => (
    <TableCell key={r.key}>
      <ItemIcon item={r.key}>
        <RowLink item={r.key}>{r.name}</RowLink>
      </ItemIcon>
    </TableCell>
  ));
}

// What each level of the example item costs at its workbench, the total, and
// the forge's levels, which take an idol and no material.
function CostTable({ item }: { item: Item }) {
  const levels = Array.from({ length: item.maxQuality }, (_, i) => i + 1);
  const forgeLevels = Array.from(
    { length: TOP_LEVEL - item.maxQuality },
    (_, i) => item.maxQuality + 1 + i,
  );
  return (
    <TableContainer sx={{ mb: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t("level")}</TableCell>
            <TableCell>{t("multiplier")}</TableCell>
            {heads(item)}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "& td": { fontStyle: "italic" } }}>
            <TableCell>{t("perLevel")}</TableCell>
            <TableCell />
            {item.resources.map((r) => (
              <TableCell key={r.key}>{r.perLevel}</TableCell>
            ))}
          </TableRow>
          {levels.map((l) => (
            <TableRow key={l}>
              <TableCell>{l === 1 ? t("craft") : l}</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                {l === 1 ? "—" : step(l)}
              </TableCell>
              {item.resources.map((r) => (
                <TableCell key={r.key}>{amountAt(r, l)}</TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>{t("total")}</TableCell>
            <TableCell />
            {item.resources.map((r) => (
              <TableCell key={r.key} sx={{ fontWeight: 700 }}>
                {putIn(r, item.maxQuality, item.maxQuality)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell colSpan={item.resources.length + 2}>
              {t("idolOnly", { from: item.maxQuality + 1 })}
            </TableCell>
          </TableRow>
          {/* The forge's levels: what the workbench would ask, never paid,
              counted only when a break gives back (`Requirement.GetAmount`). */}
          {forgeLevels.map((l) => (
            <TableRow key={l} sx={{ "& td": { color: "text.secondary" } }}>
              <TableCell>{l}</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>{step(l)}</TableCell>
              {item.resources.map((r) => (
                <TableCell key={r.key}>{amountAt(r, l)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// What a break gives back at the last workbench level and at the step before
// the tool's top level, each cell with its sum, so the reader sees how.
function ReturnTable({ item }: { item: Item }) {
  const levels = [item.maxQuality, TOP_LEVEL - 1];
  return (
    <TableContainer sx={{ mb: 1 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t("breaks")}</TableCell>
            {heads(item)}
          </TableRow>
        </TableHead>
        <TableBody>
          {levels.map((l) => (
            <TableRow key={l}>
              <TableCell>{t("breaksAt", { level: l })}</TableCell>
              {item.resources.map((r) => (
                <TableCell key={r.key}>
                  {t("sum", {
                    first: amountAt(r, 1),
                    at: amountAt(r, l),
                    pct: FORGE.returned,
                  })}{" "}
                  <b>{breakReturn(r, l)}</b>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// The guide's figure: the example item, what it costs, and what a break gives
// back, all from its recipe in the Valheim generator's data.
export function BreakReturnTable() {
  const item = crafting.gear.find((g) => g.key === EXAMPLE)!;
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ mb: 1 }}>
        <ItemIcon item={item.key}>
          <RowLink item={item.key}>{item.name}</RowLink>
        </ItemIcon>
      </Box>
      <CostTable item={item} />
      <ReturnTable item={item} />
      <Typography variant="body2" color="text.secondary">
        {t("note", { max: item.maxQuality, top: TOP_LEVEL - 1 })}
      </Typography>
    </Box>
  );
}
