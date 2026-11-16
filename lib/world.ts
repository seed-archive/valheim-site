// The Valheim world is a disc of this radius in metres, centred on the start;
// beyond it is the edge of the world (the game's WorldGenerator).
export const WORLD_RADIUS = 10_500;

// What the map can switch on and off, in menu order: places first, then the
// layers drawn over the biomes. The start is always shown.
export const MAP_LAYERS = [
  "bosses",
  "traders",
  "dungeons",
  "other",
  "subBiomes",
  "swampWidth",
  "relief",
] as const;
export type MapLayer = (typeof MAP_LAYERS)[number];

// What a new visitor sees switched on.
export const DEFAULT_LAYERS: Record<MapLayer, boolean> = {
  bosses: true,
  traders: true,
  dungeons: false,
  other: false,
  subBiomes: false,
  swampWidth: false,
  relief: false,
};
