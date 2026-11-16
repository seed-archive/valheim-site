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

// Eight compass points, clockwise from north, for "2 km north-east".
export const COMPASS = [
  "north",
  "northEast",
  "east",
  "southEast",
  "south",
  "southWest",
  "west",
  "northWest",
];

export function compass(dx: number, dz: number): string {
  const angle = (Math.atan2(dx, dz) * 180) / Math.PI;
  return COMPASS[Math.round((angle + 360) / 45) % 8];
}
