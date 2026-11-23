import { slug } from "@/lib/slug";

// How the map groups the game's locations; "other" (ruins, camps, houses) is
// not drawn. The Valheim generator gives each
// location type its group and name key (its `legend`); the player's names are
// in lib/i18n (pages.map.places).

export const PLACE_GROUPS = [
  "start",
  "bosses",
  "traders",
  "dungeons",
  "resources",
  "other",
] as const;
export type PlaceGroup = (typeof PLACE_GROUPS)[number];

// Marker colour per group: our own choice, picked to read on every biome.
export const PLACE_COLOUR: Record<PlaceGroup, string> = {
  start: "#ffffff",
  bosses: "#e53935",
  traders: "#fdd835",
  dungeons: "#ab47bc",
  resources: "#43a047",
  other: "#212121",
};

// Dungeons share a group but not a colour, so each kind reads apart at a
// glance (our own choice, each readable on every biome).
const KIND_COLOUR: Record<string, string> = {
  burialChamber: "#7e57c2",
  sunkenCrypt: "#00897b",
  trollCave: "#795548",
  frostCave: "#29b6f6",
  infestedMine: "#546e7a",
  fortress: "#ef6c00",
  morkhalla: "#ad1457",
  fulingOutpost: "#827717",
  theHole: "#4e342e",
  // Hildir's three chest dungeons share one.
  hildirCave: "#3949ab",
  hildirCrypt: "#3949ab",
  hildirFortress: "#3949ab",
};

// The colour of a place's pin: its kind's own, else its group's.
export function placeColour(group: PlaceGroup, key: string): string {
  return (group === "dungeons" && KIND_COLOUR[key]) || PLACE_COLOUR[group];
}

// The scan's terrain grid indexes biomes (the generator's `places`):
// Meadows 1 … Mistlands 9.
export const BIOME_KEYS = [
  "",
  "meadows",
  "swamp",
  "mountain",
  "blackForest",
  "plains",
  "ashlands",
  "deepNorth",
  "ocean",
  "mistlands",
];

// A place's anchor on the caves and dungeons page, from its name: every
// variant under one name shares it.
export function placeAnchor(name: string): string {
  return slug(name);
}
