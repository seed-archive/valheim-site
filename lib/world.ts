// The Valheim world is a disc of this radius in metres, centred on the start;
// beyond it is the edge of the world (the game's WorldGenerator).
export const WORLD_RADIUS = 10_500;

// What the map can switch on and off, in menu order: places first, then the
// contour lines drawn over the map. The start is always shown; the game's
// other small places (ruins, camps, houses) are not drawn.
export const MAP_LAYERS = [
  "bosses",
  "traders",
  "dungeons",
  "resources",
  "ore",
  "trees",
  "fineWood",
  "berries",
  "relief",
] as const;
export type MapLayer = (typeof MAP_LAYERS)[number];

// What a new visitor sees switched on.
export const DEFAULT_LAYERS: Record<MapLayer, boolean> = {
  bosses: true,
  traders: true,
  dungeons: false,
  resources: false,
  ore: false,
  trees: false,
  fineWood: false,
  berries: false,
  relief: false,
};
