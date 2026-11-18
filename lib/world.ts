// The Valheim world is a disc of this radius in metres, centred on the start;
// beyond it is the edge of the world (the game's WorldGenerator).
export const WORLD_RADIUS = 10_500;

// What the map can switch on and off, in menu order: places and pins first,
// then the trees and the contour lines drawn over the map. The start is always shown; the game's
// other small places (ruins, camps, houses) are not drawn.
export const MAP_LAYERS = [
  "bosses",
  "traders",
  "dungeons",
  "resources",
  "ore",
  "fineWood",
  "spawners",
  "trees",
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
  trees: true,
  fineWood: false,
  spawners: false,
  relief: true,
};

// The seed the map and the seed tool show when none is given: the game's own
// example, the one other seed maps open with too.
export const EXAMPLE_SEED = "Valheim";

// What the game's new-world dialog lets a player type as a seed: up to ten
// letters and digits (the start scene's seed field: alphanumeric, a limit of
// 10; World.GenerateSeed makes ten characters).
export const SEED_MAX = 10;
export const SEED_PATTERN = /^[A-Za-z0-9]*$/;
