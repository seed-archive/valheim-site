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
import Link from "next/link";
import type { ReactNode } from "react";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { AnchorHeading } from "@/components/catalog/AnchorHeading";
import { ItemIcon } from "@/components/catalog/ItemIcon";
import { serverFormat, serverMessages } from "@/lib/i18n/server";
import { slug as anchorOf } from "@/lib/slug";
import { effectText, joined, type Effect } from "@/lib/valheim/effects";
import bosses from "@/lib/valheim/bosses.json";
import { RowLink } from "@/components/catalog/RowLink";

export const metadata: Metadata = {
  title: "How to kill each boss in Valheim — Seed Archive",
  description:
    "Every boss's health, what hurts it and what it resists, the damage of its attacks, the best weapon a run has by then, and the other way players beat it.",
  alternates: { canonical: "/catalog/bosses" },
};

const t = (id: string, values?: Record<string, string | number>) =>
  serverFormat(`pages.bosses.${id}`, values);
const damage = (k: string) => serverFormat(`pages.crafting.damage.${k}`);
// What a power that turns the wind astern saves: the sail's dead angle and
// share of headings and how long a wind holds (the Valheim generator's
// numbers, on the power's "tailwind" effect).
const sailOf = (effects: Effect[]) =>
  effects.find((e) => e.key === "tailwind")?.value as
    Record<string, number> | undefined;
const biomeName = (b: string) => serverFormat(`pages.crafting.biome.${b}`);
// A message the page may lack (a boss without an alternative yet).
const maybe = (id: string) =>
  `pages.bosses.${id}` in serverMessages ? t(id) : null;

type Boss = (typeof bosses)[number];
type Phase = Boss["phases"][number];

// A boss's anchor (`the-elder`, `kall-fimbulbringer`).
const slug = (b: Boss) => anchorOf(b.name);
// A multiplier as the change it makes to a hit: 2 → +100 %, 0.5 → −50 %.
const percent = (m: number) =>
  `${m > 1 ? "+" : "−"}${Math.round(Math.abs(m - 1) * 100)}%`;

// What hurts a boss more and what less, from its first phase (the game's
// damage modifiers): weak, resisted, immune.
function modifiers(p: Phase) {
  const mods = Object.entries(p.modifiers as Record<string, number>);
  const list = (
    pick: (m: number) => boolean,
    show: (k: string, m: number) => string,
  ) =>
    mods
      .filter(([, m]) => pick(m))
      .sort((a, b) => b[1] - a[1])
      .map(([k, m]) => show(k, m))
      .join(", ");
  return {
    weak: list(
      (m) => m > 1,
      (k, m) => `${damage(k)} ${percent(m)}`,
    ),
    resists: list(
      (m) => m > 0 && m < 1,
      (k, m) => `${damage(k)} ${percent(m)}`,
    ),
    immune: list(
      (m) => m === 0,
      (k) => damage(k),
    ),
  };
}

// The damage types of its attacks, the highest of each, biggest first.
const attacks = (p: Phase) =>
  Object.entries(p.attacks as Record<string, number>)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `${damage(k)} ${v}`)
    .join(", ");

// The time a campfire alone takes to burn a phase down (the Valheim generator's
// `fire`, seconds against the boss's own healing), or that it never does.
const burn = (fire: number | null) =>
  fire === null
    ? t("fire.never")
    : t("fire.time", { minutes: Math.max(1, Math.round(fire / 60)) });

// A phase that brings back earlier bosses (Kall's second): their aspects.
type Aspect = Phase & { key: string; name: string; blast: number };
const aspectsOf = (p: Phase): Aspect[] =>
  "aspects" in p ? (p.aspects as Aspect[]) : [];
// The summary table's anchor: an aspect takes damage as its boss does (the
// same modifiers in the Valheim generator's data), so Kall's second phase
// sends the reader there instead of repeating them.
const SUMMARY = "all-bosses";
// Each aspect's boss (the game's prefab names), so the text names the boss the
// reader finds in the table.
const ASPECT_OF: Record<string, string> = {
  Aspect_Eikthyr: "Eikthyr",
  Aspect_Elder: "gd_king",
  Aspect_Bonemass: "Bonemass",
  Aspect_Moder: "Dragon",
  Aspect_Yagluth: "GoblinKing",
  Aspect_SeekerQueen: "SeekerQueen",
  Aspect_Fader: "Fader",
};
const aspectName = (a: Aspect) =>
  bosses.find((b) => b.key === ASPECT_OF[a.key])?.name ?? a.name;

// One row of facts: a label and its value.
function Fact(props: { label: string; children: ReactNode }) {
  return (
    <Typography sx={{ mb: 1 }}>
      <b>{props.label}:</b> {props.children}
    </Typography>
  );
}

export default function BossesPage() {
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
            { name: serverFormat("archive.guideBosses") },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          {t("title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>{t("question")}</b> {t("lead")}
        </Typography>

        <TableContainer id={SUMMARY} sx={{ mb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t("head.boss")}</TableCell>
                <TableCell>{t("head.biome")}</TableCell>
                <TableCell align="right">{t("head.altars")}</TableCell>
                <TableCell align="right">{t("head.health")}</TableCell>
                <TableCell>{t("head.weak")}</TableCell>
                <TableCell>{t("head.resists")}</TableCell>
                <TableCell>{t("head.immune")}</TableCell>
                <TableCell>{t("head.best")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bosses.map((b) => {
                const best = b.best[0];
                const m = modifiers(b.phases[0]);
                return (
                  <TableRow key={b.key}>
                    <TableCell>
                      <Link href={`#${slug(b)}`}>{b.name}</Link>
                    </TableCell>
                    <TableCell>{biomeName(b.biome)}</TableCell>
                    <TableCell align="right">{b.altars ?? "—"}</TableCell>
                    <TableCell align="right">
                      {b.phases.reduce((s, p) => s + p.health, 0)}
                    </TableCell>
                    <TableCell>{m.weak || "—"}</TableCell>
                    <TableCell>{m.resists || "—"}</TableCell>
                    <TableCell>{m.immune || "—"}</TableCell>
                    <TableCell>
                      {best ? (
                        <>
                          <RowLink item={best.key}>{best.name}</RowLink>
                          {best.ammo ? ` + ${best.ammo.name}` : ""}
                        </>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {bosses.map((b) => {
          const id = slug(b);
          return (
            <Box key={b.key} component="section" id={id}>
              <AnchorHeading id={id} sx={{ mt: 4, py: 1 }}>
                {b.name}
              </AnchorHeading>
              {b.phases.map((p, i) => {
                const m = modifiers(p);
                return (
                  <Box key={i} sx={{ mb: 2 }}>
                    {b.phases.length > 1 ? (
                      // A phase is one level under the boss, as his other
                      // sections are.
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{ mt: 2, mb: 1 }}
                      >
                        {t("phase", { n: i + 1 })}
                      </Typography>
                    ) : null}
                    <Fact label={t("fact.health")}>{p.health}</Fact>
                    {p.immune ? (
                      <Typography sx={{ mb: 1 }}>
                        {t("aspects.lead", {
                          count: aspectsOf(p).length,
                          atOnce: "atOnce" in p ? Number(p.atOnce) : 1,
                          blast: aspectsOf(p)[0]?.blast ?? 0,
                          health: aspectsOf(p)
                            .map((a) => `${aspectName(a)} ${a.health}`)
                            .join(", "),
                        })}{" "}
                        <Link href={`#${SUMMARY}`}>{t("aspects.link")}</Link>.
                      </Typography>
                    ) : (
                      <>
                        {m.weak ? (
                          <Fact label={t("fact.weak")}>{m.weak}</Fact>
                        ) : null}
                        {m.resists ? (
                          <Fact label={t("fact.resists")}>{m.resists}</Fact>
                        ) : null}
                        {m.immune ? (
                          <Fact label={t("fact.immune")}>{m.immune}</Fact>
                        ) : null}
                        <Fact label={t("fact.fire")}>{burn(p.fire)}</Fact>
                      </>
                    )}
                    {attacks(p) ? (
                      <Fact label={t("fact.attacks")}>
                        {attacks(p)}
                        {p.breaks ? `. ${t("breaks")}` : ""}
                      </Fact>
                    ) : null}
                  </Box>
                );
              })}
              <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
                {t("power.title")}
              </Typography>
              {b.power ? (
                <>
                  <Typography sx={{ mb: 1, fontStyle: "italic" }}>
                    {b.power.text}
                  </Typography>
                  <Box component="ul" sx={{ mt: 0, mb: 1, pl: 3 }}>
                    {joined(b.power.effects as Effect[]).map((e, i) => (
                      <li key={i}>
                        <Typography>{effectText(e)}</Typography>
                      </li>
                    ))}
                  </Box>
                  <Typography sx={{ mb: 1 }}>
                    {t("power.how", {
                      minutes: b.power.seconds / 60,
                      cooldown: b.power.cooldown / 60,
                    })}
                  </Typography>
                  {sailOf(b.power.effects as Effect[]) ? (
                    <Typography sx={{ mb: 1 }}>
                      {t("power.sail", sailOf(b.power.effects as Effect[]))}{" "}
                      {t("power.sailMore")}
                      <Link href="/tools/wind">
                        {serverFormat("archive.wind")}
                      </Link>
                      .
                    </Typography>
                  ) : null}
                </>
              ) : (
                <Typography sx={{ mb: 1 }}>{t("power.none")}</Typography>
              )}
              <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
                {t("direct.title")}
              </Typography>
              <Typography sx={{ mb: 1 }}>
                {t("direct.text", { biome: biomeName(b.biome) })}
              </Typography>
              {b.best.map((w) => (
                <Box key={w.key}>
                  <ItemIcon item={w.key}>
                    <RowLink item={w.key}>{w.name}</RowLink>
                    {w.ammo ? (
                      <>
                        {" + "}
                        <RowLink item={w.ammo.key}>{w.ammo.name}</RowLink>
                      </>
                    ) : null}
                    {": "}
                    {t("hit", { hit: w.hit })}
                  </ItemIcon>
                </Box>
              ))}
              {maybe(`tip.${b.key}`) ? (
                <Typography sx={{ mt: 1 }}>{maybe(`tip.${b.key}`)}</Typography>
              ) : null}
              {maybe(`other.${b.key}`) ? (
                <>
                  <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>
                    {t("other.title")}
                  </Typography>
                  <Typography>{maybe(`other.${b.key}`)}</Typography>
                </>
              ) : null}
            </Box>
          );
        })}
      </Container>
      <ArchiveFooter />
    </>
  );
}
