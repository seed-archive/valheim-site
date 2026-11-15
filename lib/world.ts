// The Valheim world is a disc of this radius in metres, centred on the start;
// beyond it is the edge of the world (the game's WorldGenerator).
export const WORLD_RADIUS = 10_500;

// What the map can show once the generator runs in the browser, in menu order.
export const MAP_LAYERS = [
  "biomes",
  "bosses",
  "traders",
  "dungeons",
  "subBiomes",
] as const;
export type MapLayer = (typeof MAP_LAYERS)[number];
