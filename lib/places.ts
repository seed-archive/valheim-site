// How the map groups and names the game's locations. Prefab names are the
// game's own and never shown; the player's names are in lib/i18n
// (pages.map.places).

export const PLACE_GROUPS = [
  "start",
  "bosses",
  "traders",
  "dungeons",
  "other",
] as const;
export type PlaceGroup = (typeof PLACE_GROUPS)[number];

// One prefab exactly.
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
  SunkenCrypt4: { group: "dungeons", key: "sunkenCrypt" },
  TrollCave02: { group: "dungeons", key: "trollCave" },
  MountainCave02: { group: "dungeons", key: "frostCave" },
  CharredFortress: { group: "dungeons", key: "fortress" },
  Hildir_cave: { group: "dungeons", key: "hildirCave" },
  Hildir_crypt: { group: "dungeons", key: "hildirCrypt" },
  Hildir_plainsfortress: { group: "dungeons", key: "hildirFortress" },
};

// Families of prefabs, by the start of their name; the first match wins.
const FAMILIES: [string, PlaceGroup, string][] = [
  ["Crypt", "dungeons", "burialChamber"],
  ["Mistlands_DvergrTownEntrance", "dungeons", "infestedMine"],
  ["WoodHouse", "other", "abandonedHouse"],
  ["AbandonedLogCabin", "other", "abandonedHouse"],
  ["WoodFarm", "other", "abandonedFarm"],
  ["WoodVillage", "other", "draugrVillage"],
  ["StoneTower", "other", "stoneTower"],
  ["StoneHouse", "other", "stoneHouse"],
  ["Ruin", "other", "ruins"],
  ["CombatRuin", "other", "ruins"],
  ["SwampRuin", "other", "ruins"],
  ["FortressRuins", "other", "ruins"],
  ["Runestone", "other", "runestone"],
  ["DrakeLorestone", "other", "runestone"],
  ["Greydwarf_camp", "other", "greydwarfCamp"],
  ["GoblinCamp", "other", "fulingVillage"],
  ["StoneHenge", "other", "standingStones"],
  ["StoneCircle", "other", "standingStones"],
  ["Dolmen", "other", "dolmen"],
  ["Grave", "other", "grave"],
  ["MountainGrave", "other", "grave"],
  ["ShipWreck", "other", "shipwreck"],
  ["ShipSetting", "other", "shipSetting"],
  ["FrozenShip", "other", "frozenShip"],
  ["SwampHut", "other", "swampHut"],
  ["SwampWell", "other", "well"],
  ["MountainWell", "other", "well"],
  ["TarPit", "other", "tarPit"],
  ["DrakeNest", "other", "drakeNest"],
  ["InfestedTree", "other", "guckTree"],
  ["BearCave", "other", "bearDen"],
  ["Mistlands_Giant", "other", "giantRemains"],
  ["Mistlands_Excavation", "other", "excavation"],
  ["Mistlands_", "other", "dvergrRuins"],
  ["CharredTowerRuins", "other", "charredRuins"],
  ["CharredRuins", "other", "charredRuins"],
  ["AshlandRuins", "other", "charredRuins"],
  ["CharredStone_Spawner", "other", "charredSpawner"],
  ["FireHole", "other", "fireHole"],
  ["SulfurArch", "other", "sulfurArch"],
  ["LeviathanLava", "other", "lavaLeviathan"],
  ["VoltureNest", "other", "voltureNest"],
  ["MorgenHole", "other", "morgenHole"],
  ["PlaceofMystery", "other", "placeOfMystery"],
  ["AncientUpgradeStation", "other", "ancientForge"],
  ["DN_", "other", "northRuins"],
  ["NorthVillage", "other", "northVillage"],
  ["NorthMemorialPlace", "other", "northMemorial"],
  ["IcePond", "other", "icePond"],
  ["Waymarker", "other", "waymarker"],
  ["LumberCamp", "other", "lumberCamp"],
  ["BigRockClearing", "other", "rockClearing"],
  ["TheHole", "other", "theHole"],
];

export function placeKind(prefab: string): {
  group: PlaceGroup;
  key: string;
} {
  const named = NAMED[prefab];
  if (named) {
    return named;
  }
  const family = FAMILIES.find(([start]) => prefab.startsWith(start));
  return family
    ? { group: family[1], key: family[2] }
    : { group: "other", key: "unnamed" };
}

// Marker colour per group: our own choice, picked to read on every biome.
export const PLACE_COLOUR: Record<PlaceGroup, string> = {
  start: "#ffffff",
  bosses: "#e53935",
  traders: "#fdd835",
  dungeons: "#ab47bc",
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
