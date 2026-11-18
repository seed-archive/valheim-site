import type { On, Switch } from "@seed-archive/map/address";
import { defaults, mapLink } from "@seed-archive/map/address";

import { KINDS, kindKey } from "@/lib/valheim/palette";
import { DEFAULT_LAYERS, MAP_LAYERS, type MapLayer } from "@/lib/world";

// The map's switches as the shared address reads them: each layer, off where a
// new visitor sees it off, with its kinds under it by name key.
export const MAP_SWITCHES: Switch[] = MAP_LAYERS.map((layer) => ({
  id: layer,
  ...(DEFAULT_LAYERS[layer] ? {} : { on: false }),
  ...(KINDS[layer]
    ? { children: KINDS[layer].map((kind) => ({ id: kindKey(kind) })) }
    : {}),
}));

// The map's path; a link is this path and the shared address's query.
const MAP_PATH = "/tools/map";

// The map at a point and zoom with one layer narrowed to some of its kinds and
// the rest as a new visitor sees them: what a catalogue page links to.
export function mapHref(
  layer: MapLayer,
  kinds: string[],
  at: { x: number; y: number; zoom: number },
) {
  const on: Record<string, On> = { ...defaults(MAP_SWITCHES) };
  on[layer] = Object.fromEntries(kinds.map((kind) => [kind, {}]));
  return `${MAP_PATH}?${mapLink(MAP_SWITCHES, { ...at, on })}`;
}
