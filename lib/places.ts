// How the map groups the game's locations. Prefab names are the game's own;
// the player's names for them are in lib/i18n (pages.map.places).

export const PLACE_GROUPS = [
  "start",
  "bosses",
  "traders",
  "dungeons",
  "other",
] as const;
export type PlaceGroup = (typeof PLACE_GROUPS)[number];

// Prefab → the key of its player name. A prefab missing here is "other" and
// shows under its own name.
const NAMED: Record<string, { group: PlaceGroup; key: string }> = {
  StartTemple: { group: "start", key: "start" },
  Eikthyrnir: { group: "bosses", key: "eikthyr" },
  GDKing: { group: "bosses", key: "theElder" },
  Bonemass: { group: "bosses", key: "bonemass" },
  Dragonqueen: { group: "bosses", key: "moder" },
  GoblinKing: { group: "bosses", key: "yagluth" },
  Mistlands_DvergrBossEntrance1: { group: "bosses", key: "theQueen" },
  FaderLocation: { group: "bosses", key: "fader" },
  Vendor_BlackForest: { group: "traders", key: "haldor" },
  Hildir_camp: { group: "traders", key: "hildir" },
  BogWitch_Camp: { group: "traders", key: "bogWitch" },
  Crypt2: { group: "dungeons", key: "burialChamber" },
  Crypt3: { group: "dungeons", key: "burialChamber" },
  Crypt4: { group: "dungeons", key: "burialChamber" },
  SunkenCrypt4: { group: "dungeons", key: "sunkenCrypt" },
  TrollCave02: { group: "dungeons", key: "trollCave" },
  MountainCave02: { group: "dungeons", key: "frostCave" },
  Mistlands_DvergrTownEntrance1: { group: "dungeons", key: "infestedMine" },
  Mistlands_DvergrTownEntrance2: { group: "dungeons", key: "infestedMine" },
  CharredFortress: { group: "dungeons", key: "fortress" },
  Hildir_cave: { group: "dungeons", key: "hildirCave" },
  Hildir_crypt: { group: "dungeons", key: "hildirCrypt" },
  Hildir_plainsfortress: { group: "dungeons", key: "hildirFortress" },
};

export function placeKind(prefab: string): {
  group: PlaceGroup;
  key: string | null;
} {
  const named = NAMED[prefab];
  return named ?? { group: "other", key: null };
}

// Marker look per group: radius in pixels and colour. Our own choice, picked
// to read on every biome colour.
export const PLACE_STYLE: Record<
  PlaceGroup,
  { radius: number; colour: string }
> = {
  start: { radius: 8, colour: "#ffffff" },
  bosses: { radius: 7, colour: "#e53935" },
  traders: { radius: 6, colour: "#fdd835" },
  dungeons: { radius: 4, colour: "#8e24aa" },
  other: { radius: 2.5, colour: "#212121" },
};
