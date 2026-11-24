import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { ItemIcon } from "@/components/catalog/ItemIcon";
import { RowLink } from "@/components/catalog/RowLink";
import type { GameName } from "@/lib/i18n/game-names";
import { gameNames } from "@/lib/i18n/names";
import { serverIntl, type Values } from "@/lib/i18n/server";
import taming from "@/lib/valheim/taming.json";

// The taming guide's tables, from the Valheim generator's `taming.json`
// (docs/taming.md): who can be tamed and on what, how they breed, and the
// three mounts.

// The guide's words in the page's language, `pages.taming.<id>`.
async function words() {
  const intl = await serverIntl();
  return (id: string, values?: Values) =>
    intl.format(`pages.taming.${id}`, values);
}

type Creature = (typeof taming.creatures)[number];

// Seconds as whole minutes, the way the guide counts.
const minutes = (s: number) => Math.round(s / 60);

function Name({ c, name }: { c: Creature; name: GameName }) {
  return (
    <RowLink item={c.key} creature>
      {name(c.name)}
    </RowLink>
  );
}

// Who can be tamed: what it eats (icons), whether it takes a saddle, whether it
// follows commands, its health.
export async function TameTable() {
  const name = await gameNames();
  const t = await words();
  return (
    <TableContainer sx={{ mb: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t("head.animal")}</TableCell>
            <TableCell>{t("head.eats")}</TableCell>
            <TableCell>{t("head.ride")}</TableCell>
            <TableCell>{t("head.health")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taming.creatures.map((c) => (
            <TableRow key={c.key}>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <Name c={c} name={name} />
                {c.commandable ? (
                  <Box sx={{ color: "text.secondary", typography: "caption" }}>
                    {t("follows")}
                  </Box>
                ) : null}
                {c.startsTamed ? (
                  <Box sx={{ color: "text.secondary", typography: "caption" }}>
                    {t("bornTame")}
                  </Box>
                ) : null}
              </TableCell>
              <TableCell>
                {c.eats.map((e) => (
                  <Box key={e.key}>
                    <ItemIcon item={e.key}>
                      <RowLink item={e.key}>{name(e.name)}</RowLink>
                    </ItemIcon>
                  </Box>
                ))}
              </TableCell>
              <TableCell>
                {c.saddle ? (
                  <ItemIcon item={c.saddle.key}>
                    <RowLink item={c.saddle.key}>{name(c.saddle.name)}</RowLink>
                  </ItemIcon>
                ) : (
                  "—"
                )}
              </TableCell>
              <TableCell>{c.health}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// How each breeds: love points, partner and crowding, pregnancy, and each step
// from offspring to adult, with an egg's fire and roof.
export async function BreedTable() {
  const name = await gameNames();
  const t = await words();
  return (
    <TableContainer sx={{ mb: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t("head.animal")}</TableCell>
            <TableCell>{t("head.love")}</TableCell>
            <TableCell>{t("head.partner")}</TableCell>
            <TableCell>{t("head.most")}</TableCell>
            <TableCell>{t("head.pregnancy")}</TableCell>
            <TableCell>{t("head.grows")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taming.creatures.map((c) => {
            const b = c.breeding;
            return (
              <TableRow key={c.key}>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  <Name c={c} name={name} />
                </TableCell>
                <TableCell>{b.love}</TableCell>
                <TableCell>{t("metres", { m: b.partnerM })}</TableCell>
                <TableCell>
                  {t("most", { n: b.most, m: b.mostWithinM })}
                </TableCell>
                <TableCell>
                  {t("min", { n: minutes(b.pregnancySeconds) })}
                </TableCell>
                <TableCell>
                  {b.grows.map((g) => (
                    <Box key={g.key}>
                      {t(g.kind === "egg" ? "egg" : "young", {
                        name: name(g.name),
                        n: minutes(g.seconds),
                      })}
                      {g.fire ? ` ${t("fire")}` : ""}
                      {g.roof ? ` ${t("roof")}` : ""}
                    </Box>
                  ))}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// The three mounts: run speed, health, the saddle's stamina and how long a
// gallop and a swim last at the Ride skill's two ends (`Sadle`: the drain times
// lerp(1, 0.5, skill)).
export async function MountTable() {
  const name = await gameNames();
  const t = await words();
  const mounts = taming.creatures.filter((c) => c.saddle);
  return (
    <TableContainer sx={{ mb: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t("head.mount")}</TableCell>
            <TableCell>{t("head.speed")}</TableCell>
            <TableCell>{t("head.health")}</TableCell>
            <TableCell>{t("head.stamina")}</TableCell>
            <TableCell>{t("head.gallop")}</TableCell>
            <TableCell>{t("head.swim")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mounts.map((c) => {
            const s = c.saddle!;
            const span = (drain: number, factor: number) =>
              s.stamina / (drain * factor);
            return (
              <TableRow key={c.key}>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  <Name c={c} name={name} />
                </TableCell>
                <TableCell>
                  {t("speed", { v: Math.round(c.runSpeed * 10) / 10 })}
                </TableCell>
                <TableCell>{c.health}</TableCell>
                <TableCell>{s.stamina}</TableCell>
                <TableCell>
                  {t("span", {
                    low: minutes(span(s.runDrain, 1)),
                    high: minutes(span(s.runDrain, 0.5)),
                  })}
                </TableCell>
                <TableCell>
                  {t("spanSeconds", {
                    low: Math.round(span(s.swimDrain, 1)),
                    high: Math.round(span(s.swimDrain, 0.5)),
                  })}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
