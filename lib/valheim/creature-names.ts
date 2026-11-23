// How a creature is named on every catalogue page, and which variants are
// left out (the owner, 2026-11-23: twins never read alike, and a page lists
// only what a world holds).

import { serverFormat, serverMessages } from "@/lib/i18n/server";
import creatures from "@/lib/valheim/creatures.json";
import events from "@/lib/valheim/events.json";
import places from "@/lib/valheim/places-spawners.json";

type Creature = (typeof creatures)[number];

// A creature's name, and for a variant that shares it, what tells it apart
// (the game's prefab says it: an archer, sleeping, the Deep North's).
export function creatureName(key: string, name: string): string {
  return `pages.creatures.variant.${key}` in serverMessages
    ? `${name} (${serverFormat(`pages.creatures.variant.${key}`)})`
    : name;
}

// The creatures some place's spawners or rooms, or some raid, make: each by
// its own prefab (a creature's `sources` sum every prefab of its name, so
// they cannot tell twins apart).
const PLACED = new Set([
  ...places.flatMap((p) => [
    ...p.spawners.flatMap((s) => s.creatures),
    ...p.roomCreatures,
  ]),
  ...events.events.flatMap((e) => e.spawn.map((s) => s.key)),
]);

// Names more than one prefab carries.
const SHARED = new Set(
  creatures.map((c) => c.name).filter((n, i, all) => all.indexOf(n) !== i),
);

// A variant no world makes: it shares its name with another prefab, and no
// place, open-world spawn, raid or boss fight brings it (the Skeletons
// `_NoArcher`, `_Meadows`, `_Mountains_noarcher`, `_Swamps_noarcher`). A
// boss's phase is no such variant.
export function unmetTwin(c: Creature): boolean {
  return (
    SHARED.has(c.name) &&
    !c.boss &&
    !c.key.startsWith("FrozenKing") &&
    !PLACED.has(c.key) &&
    (c.spawns as unknown[]).length === 0
  );
}

// The keys of those variants, for pages that list creatures by key.
export const UNMET = new Set(creatures.filter(unmetTwin).map((c) => c.key));
