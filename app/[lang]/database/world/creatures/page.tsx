import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { SectionLinks } from "@/components/catalog/SectionLinks";
import { ItemIcon } from "@/components/catalog/ItemIcon";
import { RowLink } from "@/components/catalog/RowLink";
import { SellNote, sells } from "@/components/catalog/SellNote";
import Link from "@/components/LocaleLink";
import { PageTrail } from "@/components/PageTrail";
import {
  englishIntl,
  serverIntl,
  type ServerIntl,
  type Values,
} from "@/lib/i18n/server";
import type { GameName } from "@/lib/i18n/game-names";
import { gameNames } from "@/lib/i18n/names";
import { pageMetadata } from "@/lib/metadata";
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

export function generateMetadata() {
  return pageMetadata("pages.creatures.meta", "/database/world/creatures");
}

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
// many (the troll's log). The page's words, in the page's language.
const words = (intl: ServerIntl) => (id: string, values?: Values) =>
  intl.format(`pages.creatures.${id}`, values);

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
const heading = (c: Creature, name: GameName, intl: ServerIntl) =>
  creatureName(c.key, name(c.name), intl);

// The places a creature stands in, by the spawners that make it: one link a
// place name, to its entry on the caves and dungeons page.
// Kall's health phase by phase, and where his fight is told.
async function KallPhases() {
  const intl = await serverIntl();
  const [first, second, third] = kallHealth;
  return intl.rich("pages.creatures.phases", {
    first,
    second,
    third,
    link: (chunks) => (
      <Link href="/guides/basics/bosses#kall-fimbulbringer">{chunks}</Link>
    ),
  });
}

// A drop no recipe takes: a boss's trophy is for his power at the Sacrificial
// Stones; anything else says so with a dash, unless a trader buys it (the
// sell note follows).
async function UnusedDrop(props: { boss: boolean; drop: string }) {
  const t = words(await serverIntl());
  if (props.boss && props.drop.startsWith("Trophy")) {
    return <>{t("usedIn.power")}</>;
  }
  return sells(props.drop) ? null : <>{t("usedIn.none")}</>;
}

function livesIn(c: Creature, intl: ServerIntl) {
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
      !intl.has(`pages.map.places.${p.key}`)
    ) {
      continue;
    }
    const name = intl.format(`pages.map.places.${p.key}`);
    // The anchor from the English name, as the dungeons page makes it.
    seen.set(
      name,
      placeAnchor(englishIntl.format(`pages.map.places.${p.key}`)),
    );
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

// Biomes by their names, joined as a list of parts ("Meadows, Black Forest").
const biomeList = (biomes: string[], intl: ServerIntl) =>
  intl.list(
    [...new Set(biomes)].map((b) => intl.format(`pages.crafting.biome.${b}`)),
    "unit",
  );
const biomeNames = (open: OpenSpawn[], intl: ServerIntl) =>
  biomeList(
    open.flatMap((o) => o.biomes),
    intl,
  );

// A rare open-world spawn with how often it comes: its chance each roll and
// the minutes between rolls.
const every = (o: OpenSpawn, intl: ServerIntl) =>
  words(intl)("sources.openEvery", {
    biomes: biomeNames([o], intl),
    chance: o.chance,
    minutes: Math.round(o.seconds / 60),
  });

// One line: each way the creature comes, then whether it comes back, and what
// the night and the distance from the centre change.
function sourceLine(s: Sources, intl: ServerIntl) {
  const t = words(intl);
  const regular = s.openWorld.filter((o) => !o.rare);
  const rare = s.openWorld.filter((o) => o.rare);
  const minutes = [...new Set(s.respawns.map((r) => r.minutes))].sort(
    (a, b) => a - b,
  );
  // A day entry and a night entry alike read the same: each once.
  const rareParts = [...new Set(rare.map((o) => every(o, intl)))];
  const later = [
    ...rareParts,
    ...(s.raids.length > 0 ? [t("sources.raids")] : []),
  ].join("; ");
  let text: string;
  if (s.verdict === "renews") {
    const parts = [
      // The minutes as a list ("60 or 240"); the last of them sets the
      // noun's plural.
      minutes.length > 0
        ? t("sources.respawns", {
            minutes: intl.list(minutes.map(String), "disjunction"),
            count: minutes[minutes.length - 1],
          })
        : null,
      s.once.length > 0 ? t("sources.once") : null,
      s.areas.length > 0 ? t("sources.areas") : null,
      regular.length > 0
        ? t("sources.open", { biomes: biomeNames(regular, intl) })
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

// A world key in words: a boss by name, the rest in the words they take
// mid-sentence (the raids page starts a table cell with `pages.events.key`).
type WorldKey = { key: string; boss: string | null };
const keyText = (k: WorldKey, name: GameName, intl: ServerIntl) =>
  k.boss ? name(k.boss) : intl.format(`pages.events.keyInline.${k.key}`);
const keyList = (keys: WorldKey[], name: GameName, intl: ServerIntl) =>
  intl.list(
    keys.map((k) => keyText(k, name, intl)),
    "unit",
  );

// When a raid can come: after its keys (or from the start) and until a boss
// ends it (or for good); and whether its creatures have stars.
function raidSpan(
  r: Raid,
  minLevel: number,
  maxLevel: number,
  name: GameName,
  intl: ServerIntl,
) {
  const t = words(intl);
  return intl.list(
    [
      r.opens.length > 0
        ? t("sources.raidAfter", { keys: keyList(r.opens, name, intl) })
        : t("sources.raidFromStart"),
      r.ends.length > 0
        ? t("sources.raidUntil", { keys: keyList(r.ends, name, intl) })
        : t("sources.raidForGood"),
      minLevel > 1
        ? t("sources.raidStars")
        : maxLevel > 1
          ? t("sources.raidMayStar")
          : null,
    ].filter((p) => p !== null),
    "unit",
  );
}

// A creature drops `Random.Range(min, max)` on whole numbers, its max left out
// (`CharacterDrop.GenerateDropList`, Traced): a bear's hide "4–5" is always 4.
const amount = (min: number, max: number) => {
  const top = Math.max(min, max - 1);
  return min === top ? String(min) : `${min}–${top}`;
};

export default async function CreaturesPage() {
  const name = await gameNames();
  const intl = await serverIntl();
  const t = words(intl);
  return (
    <>
      <ArchiveBar />
      <Container
        component="main"
        maxWidth="md"
        sx={{ py: 6, minHeight: "70vh" }}
      >
        <SectionLinks>
          <PageTrail crumb="archive.guideCreatures" />
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
                      {heading(c, name, intl)}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {c.key === KALL ? (
                        <KallPhases />
                      ) : (
                        t("health", { n: c.health })
                      )}
                    </Typography>
                    {c.sees ? (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {t("sight", { n: c.sees })}
                        <br />
                        {c.hears
                          ? t("hearing", { n: c.hears })
                          : t("hearingNoise")}
                      </Typography>
                    ) : null}
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
                                  {modifierText(m, intl)}
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
                    {livesIn(c, intl).length > 0 ? (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {intl.rich("pages.creatures.livesIn", {
                          places: intl.list(
                            livesIn(c, intl).map(([place, anchor]) => (
                              <Link
                                key={anchor}
                                href={`/database/world/dungeons#${anchor}`}
                              >
                                {place}
                              </Link>
                            )),
                            "unit",
                          ),
                        })}
                      </Typography>
                    ) : null}
                    {intl.has(`pages.creatures.notes.${c.key}`) ? (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {t(`notes.${c.key}`, {
                          weaponSets: c.weaponSets?.length ?? 0,
                        })}
                      </Typography>
                    ) : null}
                    {sourcesOf(c).verdict ? (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {sourceLine(sourcesOf(c), intl)}
                      </Typography>
                    ) : null}
                    {sourcesOf(c).raids.some((r) => raidOf.has(r.key)) ? (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {/* Each raid's line holds commas of its own, so the
                          raids are parted by semicolons. */}
                        {intl.rich("pages.creatures.sources.raidList", {
                          raids: sourcesOf(c)
                            .raids.filter((r) => raidOf.has(r.key))
                            .map((r, i) => {
                              const raid = raidOf.get(r.key)!;
                              return (
                                <span key={r.key}>
                                  {i > 0 ? "; " : ""}
                                  {intl.rich("pages.creatures.sources.raid", {
                                    span: raidSpan(
                                      raid,
                                      r.minLevel,
                                      r.maxLevel,
                                      name,
                                      intl,
                                    ),
                                    link: (chunks) => (
                                      <Link
                                        href={`/database/world/events#${r.key.toLowerCase()}`}
                                      >
                                        {chunks}
                                      </Link>
                                    ),
                                    name: name(raid.name),
                                  })}
                                </span>
                              );
                            }),
                        })}
                      </Typography>
                    ) : null}
                    {c.spawnerKinds.length > 0 ? (
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {intl.rich("pages.creatures.map", {
                          link: (chunks) => (
                            <Link
                              href={mapHref(
                                "spawners",
                                c.spawnerKinds,
                                SPAWNERS_AT,
                              )}
                            >
                              {chunks}
                            </Link>
                          ),
                        })}
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
                                    <RowLink item={d.key}>
                                      {name(d.name)}
                                    </RowLink>
                                  </ItemIcon>
                                </TableCell>
                                <TableCell>{amount(d.min, d.max)}</TableCell>
                                <TableCell>
                                  {Math.round(d.chance * 100)}%
                                </TableCell>
                                <TableCell>
                                  {intl.list(
                                    (USED_IN.get(d.key) ?? []).map((u) => (
                                      <RowLink key={u.key} item={u.key}>
                                        {name(u.name)}
                                      </RowLink>
                                    )),
                                    "unit",
                                  )}
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
                                  {intl.list(
                                    s.pieces.map((p) => (
                                      <RowLink key={p.key} item={p.key}>
                                        {name(p.name)}
                                      </RowLink>
                                    )),
                                    "unit",
                                  )}
                                </TableCell>
                                <TableCell>
                                  {/* A set whose quality 1 takes none of this creature's drops needs it only to upgrade. */}
                                  {s.kills > 0
                                    ? t("sets.kills", {
                                        n: s.kills,
                                        drop: name(s.by.name),
                                      })
                                    : "—"}
                                </TableCell>
                                <TableCell>
                                  {t("sets.top", {
                                    n: s.killsTop,
                                    drop: name(s.byTop.name),
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
                      <ItemIcon item={f.key}>{name(f.name)}</ItemIcon>
                    </TableCell>
                    <TableCell>
                      {/* The biomes the game spawns it in, in water this deep or more; or the caves it lies in. */}
                      {f.biomes.length > 0
                        ? t("fish.where", {
                            biomes: biomeList(f.biomes, intl),
                            water: f.water ?? 0,
                          })
                        : intl.list(
                            f.dungeons.map((d) =>
                              intl.format(`pages.map.places.${d}`),
                            ),
                            "unit",
                          )}
                    </TableCell>
                    <TableCell>
                      {f.baits.map((b) => (
                        <ItemIcon key={b.key} item={b.key}>
                          {crafted.has(b.key) ? (
                            <RowLink item={b.key}>{name(b.name)}</RowLink>
                          ) : (
                            <Link
                              href={`/guides/basics/traders#${b.key.toLowerCase()}`}
                            >
                              {name(b.name)}
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
                            <RowLink item={x.key}>{name(x.name)}</RowLink>
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
