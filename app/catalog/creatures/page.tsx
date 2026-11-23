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
import { SectionLinks } from "@/components/catalog/SectionLinks";
import { ItemIcon } from "@/components/catalog/ItemIcon";
import { RowLink } from "@/components/catalog/RowLink";
import { SellNote, sells } from "@/components/catalog/SellNote";
import { PageTrail } from "@seed-archive/ui/page-trail";
import { serverFormat, serverMessages } from "@/lib/i18n/server";
import { creatureName, unmetTwin } from "@/lib/valheim/creature-names";
import { USED_IN } from "@/lib/valheim/used-in";
import { modifierText } from "@/lib/valheim/modifier";
import creatures from "@/lib/valheim/creatures.json";
import crafting from "@/lib/valheim/crafting.json";
import events from "@/lib/valheim/events.json";
import stars from "@/lib/valheim/stars.json";
import fish from "@/lib/valheim/fish.json";
import places from "@/lib/valheim/places-spawners.json";
import { placeAnchor } from "@/lib/valheim/places";
import { RUN_ORDER } from "@/lib/valheim/run-order";
import { mapHref } from "@/lib/valheim/switches";

export const metadata: Metadata = {
  title: "Creatures and what they drop in Valheim — Seed Archive",
  description:
    "Every creature by biome: its health, what hurts it, what it drops and what each drop is used for, and where it stands on the map.",
  alternates: { canonical: "/catalog/creatures" },
};

type Creature = (typeof creatures)[number];

// A fish's largest depth at or above this means "no limit" (the game's own
// placeholder for open water, the Tuna's 999 m).
const DEEP_WATER = 999;

// A bait with a recipe links to it; the plain bait is bought from Haldor.
const crafted = new Set(crafting.gear.map((g) => g.key));

// The biomes in the run's order, then the creatures that come only from
// spawners inside places (dungeons, camps, nests).
const GROUPS = [...RUN_ORDER, "places"];

// Where a link to the spawners opens: the world's centre, at the zoom from
// which the generator draws spawner pins (four metres a pixel, the map's
// MAX_MARK_STEP: zoom -2).
const SPAWNERS_AT = { x: 0, y: 0, zoom: -2 };

// What a hit of each modifier does to the damage (the game's
// HitData.ApplyModifier); a type with no modifier takes it as is.
const MULTIPLIER: Record<string, number> = {
  normal: 1,
  slightlyWeak: 1.25,
  weak: 1.5,
  veryWeak: 2,
  slightlyResistant: 0.75,
  resistant: 0.5,
  veryResistant: 0.25,
  immune: 0,
  ignore: 0,
};

// The damage types a player deals with weapons, in the table's order; chop
// and pickaxe hurt trees and rock, not creatures, so they are left out.
const DAMAGE_TYPES = [
  "blunt",
  "slash",
  "pierce",
  "fire",
  "frost",
  "lightning",
  "poison",
  "spirit",
];

// A note may quote {weaponSets}, how many weapon sets the creature picks from:
// the game picks one uniformly, so a set it holds once is one creature in that
// many (the troll's log).
const t = (id: string, values?: Record<string, string | number>) =>
  serverFormat(`pages.creatures.${id}`, values);

// A creature's biome: the earliest it stands in, by random spawns, a place's
// spawners or a boss's altar (the Valheim generator); a variant no spawner
// places stays with "places".
// A creature with no spawn rule has an empty list, which TypeScript types as never[].
const groupOf = (c: Creature) =>
  c.biome ?? (c.spawns as { biomes: string[] }[])[0]?.biomes[0] ?? "places";

// Kall's three phases are three prefabs; the page shows him once, under his
// last phase (the one with the drops, in the Deep North), with every phase's
// health, as the bosses page does (the owner, 2026-11-23).
const KALL_PHASES = ["FrozenKing", "FrozenKing_p2", "FrozenKing_p3"];
const KALL = KALL_PHASES[KALL_PHASES.length - 1];
const kallHealth = KALL_PHASES.map(
  (k) => creatures.find((c) => c.key === k)?.health ?? 0,
);

// A creature's heading: its name, and for a twin what tells it apart.
const heading = (c: Creature) => creatureName(c.key, c.name);

// The places a creature stands in, by the spawners that make it: one link a
// place name, to its entry on the caves and dungeons page.
// Kall's health phase by phase, and where his fight is told.
function KallPhases() {
  const [first, second, third] = kallHealth;
  return (
    <>
      {t("phases", { first, second, third })}
      <Link href="/catalog/bosses#kall-fimbulbringer">
        {serverFormat("archive.guideBosses")}
      </Link>
      .
    </>
  );
}

// A drop no recipe takes: a boss's trophy is for his power at the Sacrificial
// Stones; anything else says so with a dash, unless a trader buys it (the
// sell note follows).
function UnusedDrop(props: { boss: boolean; drop: string }) {
  if (props.boss && props.drop.startsWith("Trophy")) {
    return <>{t("usedIn.power")}</>;
  }
  return sells(props.drop) ? null : <>{t("usedIn.none")}</>;
}

function livesIn(c: Creature) {
  const seen = new Map<string, string>();
  for (const p of places) {
    const made = [
      ...p.spawners.flatMap((s) => s.creatures),
      ...p.roomCreatures,
    ];
    // A place the map does not name stands in no world a seed makes, or only
    // as a part of another place: the dungeons page leaves it out too.
    if (
      !made.includes(c.key) ||
      p.key === "unnamed" ||
      !(`pages.map.places.${p.key}` in serverMessages)
    ) {
      continue;
    }
    const name = serverFormat(`pages.map.places.${p.key}`);
    seen.set(name, placeAnchor(name));
  }
  return [...seen.entries()];
}

// Where a creature comes from and whether it comes back, as the Valheim
// generator sums it over every prefab of the creature's name.
type OpenSpawn = {
  biomes: string[];
  rare: boolean;
  chance: number;
  seconds: number;
  maxLevel: number;
  starsFrom: number;
};
type Sources = {
  respawns: { minutes: number }[];
  once: unknown[];
  perPlace: number | null;
  areas: unknown[];
  openWorld: OpenSpawn[];
  raids: { key: string; minLevel: number; maxLevel: number }[];
  night: "only" | "more" | null;
  starsAtNight: boolean;
  verdict: "renews" | "fixed" | "runsOut" | "rare" | null;
};
const sourcesOf = (c: Creature) => c.sources as Sources;

const biomeNames = (open: OpenSpawn[]) =>
  [...new Set(open.flatMap((o) => o.biomes))]
    .map((b) => serverFormat(`pages.crafting.biome.${b}`))
    .join(", ");

// A rare open-world spawn with how often it comes: its chance each roll and
// the minutes between rolls.
const every = (o: OpenSpawn) =>
  t("sources.openEvery", {
    biomes: biomeNames([o]),
    chance: o.chance,
    minutes: Math.round(o.seconds / 60),
  });

// One line: each way the creature comes, then whether it comes back, and what
// the night and the distance from the centre change.
function sourceLine(s: Sources) {
  const regular = s.openWorld.filter((o) => !o.rare);
  const rare = s.openWorld.filter((o) => o.rare);
  const minutes = [...new Set(s.respawns.map((r) => r.minutes))].sort(
    (a, b) => a - b,
  );
  // A day entry and a night entry alike read the same: each once.
  const rareParts = [...new Set(rare.map(every))];
  const later = [
    ...rareParts,
    ...(s.raids.length > 0 ? [t("sources.raids")] : []),
  ].join("; ");
  let text: string;
  if (s.verdict === "renews") {
    const parts = [
      minutes.length > 0
        ? t("sources.respawns", { minutes: minutes.join(t("sources.or")) })
        : null,
      s.once.length > 0 ? t("sources.once") : null,
      s.areas.length > 0 ? t("sources.areas") : null,
      regular.length > 0
        ? t("sources.open", { biomes: biomeNames(regular) })
        : null,
      ...rareParts,
      s.raids.length > 0 ? t("sources.raids") : null,
    ].filter((p) => p !== null);
    text = `${t("sources.from", { parts: parts.join("; ") })} ${t("sources.renews")}`;
  } else if (s.verdict === "fixed") {
    text = s.perPlace
      ? t("sources.fixed", { n: s.perPlace, rest: later })
      : t("sources.fixedRooms", { rest: later });
  } else if (s.verdict === "rare") {
    text = t("sources.rare", { rest: later });
  } else {
    text = t("sources.runsOut");
  }
  const far = s.openWorld.find((o) => o.starsFrom > 0 && o.maxLevel > 1);
  return [
    text,
    s.night === "only" ? t("sources.nightOnly") : null,
    s.night === "more" ? t("sources.nightMore") : null,
    s.starsAtNight ? t("sources.starsAtNight") : null,
    far ? t("sources.starsFrom", { m: far.starsFrom }) : null,
  ]
    .filter((p) => p !== null)
    .join(" ");
}

type Raid = (typeof events.events)[number];
const raidOf = new Map<string, Raid>(events.events.map((r) => [r.key, r]));

// A world key in words: a boss by name, the rest as the raids page words them,
// which start a table cell there and stand mid-sentence here.
const keyText = (k: { key: string; boss: string | null }) => {
  if (k.boss) {
    return k.boss;
  }
  const text = serverFormat(`pages.events.key.${k.key}`);
  return text.charAt(0).toLowerCase() + text.slice(1);
};

// When a raid can come: after its keys (or from the start) and until a boss
// ends it (or for good); and whether its creatures have stars.
function raidSpan(r: Raid, minLevel: number, maxLevel: number) {
  return [
    r.opens.length > 0
      ? t("sources.raidAfter", { keys: r.opens.map(keyText).join(", ") })
      : t("sources.raidFromStart"),
    r.ends.length > 0
      ? t("sources.raidUntil", { keys: r.ends.map(keyText).join(", ") })
      : t("sources.raidForGood"),
    minLevel > 1
      ? t("sources.raidStars")
      : maxLevel > 1
        ? t("sources.raidMayStar")
        : null,
  ]
    .filter((p) => p !== null)
    .join(", ");
}

// A multiplier as every catalogue page shows it (`lib/valheim/modifier.ts`).
const times = modifierText;

// A creature drops `Random.Range(min, max)` on whole numbers, its max left out
// (`CharacterDrop.GenerateDropList`, Traced): a bear's hide "4–5" is always 4.
const amount = (min: number, max: number) => {
  const top = Math.max(min, max - 1);
  return min === top ? String(min) : `${min}–${top}`;
};

export default function CreaturesPage() {
  return (
    <>
      <ArchiveBar />
      <Container
        component="main"
        maxWidth="md"
        sx={{ py: 6, minHeight: "70vh" }}
      >
        <SectionLinks>
          <PageTrail
            steps={[
              { name: serverFormat("archive.home"), href: "/" },
              { name: serverFormat("archive.catalog"), href: "/catalog" },
              { name: serverFormat("archive.guideCreatures") },
            ]}
          />
          <Typography variant="h3" component="h1" gutterBottom>
            {t("title")}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <b>{t("question")}</b> {t("lead")}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            id="stars"
            sx={{ mt: 4, mb: 1 }}
          >
            {t("stars.title")}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {t("stars.text", { chance: stars.levelUpChance })}
          </Typography>
          <TableContainer sx={{ mb: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{t("stars.head.stars")}</TableCell>
                  <TableCell>{t("stars.head.health")}</TableCell>
                  <TableCell>{t("stars.head.damage")}</TableCell>
                  <TableCell>{t("stars.head.drops")}</TableCell>
                  <TableCell>{t("stars.head.share")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stars.levels.map((l) => (
                  <TableRow key={l.level}>
                    <TableCell>{"★".repeat(l.stars) || "—"}</TableCell>
                    <TableCell>{t("stars.times", { n: l.health })}</TableCell>
                    <TableCell>{t("stars.times", { n: l.damage })}</TableCell>
                    <TableCell>{t("stars.times", { n: l.drops })}</TableCell>
                    <TableCell>{t("stars.share", { n: l.percent })}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography variant="caption" color="text.secondary">
              {t("stars.note")}
            </Typography>
          </TableContainer>
          {GROUPS.map((group) => {
            const list = creatures.filter(
              (c) =>
                groupOf(c) === group &&
                (!KALL_PHASES.includes(c.key) || c.key === KALL) &&
                !unmetTwin(c),
            );
            if (list.length === 0) {
              return null;
            }
            return (
              <section key={group}>
                <Typography
                  variant="h5"
                  component="h2"
                  id={group.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}
                  sx={{ mt: 5, mb: 1 }}
                >
                  {t(`group.${group}`)}
                </Typography>
                {list.map((c) => (
                  <article key={c.key}>
                    <Typography
                      variant="h6"
                      component="h3"
                      id={c.key.toLowerCase()}
                      sx={{ mt: 3 }}
                    >
                      {heading(c)}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {c.key === KALL ? (
                        <KallPhases />
                      ) : (
                        t("health", { n: c.health })
                      )}
                    </Typography>
                    <TableContainer sx={{ mb: 1 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            {DAMAGE_TYPES.map((d) => (
                              <TableCell key={d} align="center">
                                {t(`damage.${d}`)}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            {DAMAGE_TYPES.map((d) => {
                              const m =
                                MULTIPLIER[
                                  (c.modifiers as Record<string, string>)[d] ??
                                    "normal"
                                ];
                              return (
                                <TableCell
                                  key={d}
                                  align="center"
                                  sx={{
                                    fontWeight: m > 1 ? 700 : undefined,
                                    color:
                                      m > 1
                                        ? "success.main"
                                        : m < 1
                                          ? "error.main"
                                          : undefined,
                                  }}
                                >
                                  {times(m)}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {c.chops ? (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {t("chops", c.chops)}
                      </Typography>
                    ) : null}
                    {c.mines ? (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {t("mines", c.mines)}
                      </Typography>
                    ) : null}
                    {livesIn(c).length > 0 ? (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {t("livesIn")}
                        {livesIn(c).map(([name, anchor], i) => (
                          <span key={anchor}>
                            {i > 0 ? ", " : ""}
                            <Link href={`/catalog/dungeons#${anchor}`}>
                              {name}
                            </Link>
                          </span>
                        ))}
                        .
                      </Typography>
                    ) : null}
                    {`pages.creatures.notes.${c.key}` in serverMessages ? (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {t(`notes.${c.key}`, {
                          weaponSets: c.weaponSets?.length ?? 0,
                        })}
                      </Typography>
                    ) : null}
                    {sourcesOf(c).verdict ? (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {sourceLine(sourcesOf(c))}
                      </Typography>
                    ) : null}
                    {sourcesOf(c).raids.some((r) => raidOf.has(r.key)) ? (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {t("sources.raidsBefore")}
                        {sourcesOf(c)
                          .raids.filter((r) => raidOf.has(r.key))
                          .map((r, i) => {
                            const raid = raidOf.get(r.key)!;
                            return (
                              <span key={r.key}>
                                {i > 0 ? "; " : ""}
                                <Link
                                  href={`/catalog/events#${r.key.toLowerCase()}`}
                                >
                                  {raid.name}
                                </Link>
                                {` (${raidSpan(raid, r.minLevel, r.maxLevel)})`}
                              </span>
                            );
                          })}
                        .
                      </Typography>
                    ) : null}
                    {c.spawnerKinds.length > 0 ? (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {t("mapBefore")}
                        <Link
                          href={mapHref(
                            "spawners",
                            c.spawnerKinds,
                            SPAWNERS_AT,
                          )}
                        >
                          {t("mapLink")}
                        </Link>
                        .
                      </Typography>
                    ) : null}
                    {c.drops.length > 0 ? (
                      <TableContainer sx={{ mb: 1 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>{t("head.drop")}</TableCell>
                              <TableCell>{t("head.amount")}</TableCell>
                              <TableCell>{t("head.chance")}</TableCell>
                              <TableCell>{t("head.usedIn")}</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {c.drops.map((d) => (
                              <TableRow key={d.key}>
                                <TableCell>
                                  <ItemIcon item={d.key}>
                                    <RowLink item={d.key}>{d.name}</RowLink>
                                  </ItemIcon>
                                </TableCell>
                                <TableCell>{amount(d.min, d.max)}</TableCell>
                                <TableCell>
                                  {Math.round(d.chance * 100)}%
                                </TableCell>
                                <TableCell>
                                  {(USED_IN.get(d.key) ?? []).map((u, i) => (
                                    <span key={u.key}>
                                      {i > 0 ? ", " : ""}
                                      <RowLink item={u.key}>{u.name}</RowLink>
                                    </span>
                                  ))}
                                  {(USED_IN.get(d.key) ?? []).length === 0 ? (
                                    <UnusedDrop boss={c.boss} drop={d.key} />
                                  ) : null}
                                  <SellNote item={d.key} />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      // The game gives it nothing to drop (its CharacterDrop is
                      // empty): said, so no entry reads as a gap.
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {t("dropsNothing")}
                      </Typography>
                    )}
                    {c.sets.length > 0 ? (
                      <TableContainer sx={{ mb: 1 }}>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>{t("sets.head.set")}</TableCell>
                              <TableCell>{t("sets.head.kills")}</TableCell>
                              <TableCell>{t("sets.head.top")}</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {c.sets.map((s) => (
                              <TableRow key={s.set}>
                                <TableCell>
                                  {s.pieces.map((p, i) => (
                                    <span key={p.key}>
                                      {i > 0 ? ", " : ""}
                                      <RowLink item={p.key}>{p.name}</RowLink>
                                    </span>
                                  ))}
                                </TableCell>
                                <TableCell>
                                  {/* A set whose quality 1 takes none of this creature's drops needs it only to upgrade. */}
                                  {s.kills > 0
                                    ? t("sets.kills", {
                                        n: s.kills,
                                        drop: s.by.name,
                                      })
                                    : "—"}
                                </TableCell>
                                <TableCell>
                                  {t("sets.top", {
                                    n: s.killsTop,
                                    drop: s.byTop.name,
                                    quality: s.topQuality,
                                  })}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <Typography variant="caption" color="text.secondary">
                          {t("sets.note")}
                          {sourcesOf(c).verdict === "runsOut" ||
                          sourcesOf(c).verdict === "fixed"
                            ? ` ${
                                sourcesOf(c).perPlace
                                  ? t("sets.runsOut", {
                                      n: sourcesOf(c).perPlace ?? 0,
                                    })
                                  : t("sets.runsOutRooms")
                              }`
                            : null}
                        </Typography>
                      </TableContainer>
                    ) : null}
                  </article>
                ))}
              </section>
            );
          })}

          <Typography
            variant="h4"
            component="h2"
            id="fishing"
            sx={{ mt: 6, mb: 1 }}
          >
            {t("fish.title")}
          </Typography>
          <Typography sx={{ mb: 2 }}>{t("fish.text")}</Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{t("fish.head.fish")}</TableCell>
                  <TableCell>{t("fish.head.where")}</TableCell>
                  <TableCell>{t("fish.head.bait")}</TableCell>
                  <TableCell>{t("fish.head.depth")}</TableCell>
                  <TableCell>{t("fish.head.extras")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fish.map((f) => (
                  <TableRow key={f.key} id={f.key.toLowerCase()}>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      <ItemIcon item={f.key}>{f.name}</ItemIcon>
                    </TableCell>
                    <TableCell>
                      {/* The biomes the game spawns it in, in water this deep or more; or the caves it lies in. */}
                      {f.biomes.length > 0
                        ? t("fish.where", {
                            biomes: f.biomes
                              .map((b) =>
                                serverFormat(`pages.crafting.biome.${b}`),
                              )
                              .join(", "),
                            water: f.water ?? 0,
                          })
                        : f.dungeons
                            .map((d) => serverFormat(`pages.map.places.${d}`))
                            .join(", ")}
                    </TableCell>
                    <TableCell>
                      {f.baits.map((b) => (
                        <ItemIcon key={b.key} item={b.key}>
                          {crafted.has(b.key) ? (
                            <RowLink item={b.key}>{b.name}</RowLink>
                          ) : (
                            <Link
                              href={`/catalog/traders#${b.key.toLowerCase()}`}
                            >
                              {b.name}
                            </Link>
                          )}
                        </ItemIcon>
                      ))}
                    </TableCell>
                    <TableCell>
                      {f.maxDepth >= DEEP_WATER
                        ? t("fish.deeper", { min: f.minDepth })
                        : t("fish.depth", { min: f.minDepth, max: f.maxDepth })}
                    </TableCell>
                    <TableCell>
                      {/* One a line: the icons stand in one column. */}
                      {f.extras.map((x) => (
                        <Box key={x.key}>
                          <ItemIcon item={x.key}>
                            <RowLink item={x.key}>{x.name}</RowLink>
                          </ItemIcon>
                        </Box>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </SectionLinks>
      </Container>
      <ArchiveFooter />
    </>
  );
}
