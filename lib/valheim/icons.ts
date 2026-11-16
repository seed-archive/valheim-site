import { PLACE_COLOUR, type PlaceGroup } from "@/lib/valheim/places";

// The map's own marker icons: small inline SVGs, one shape per group, so a
// boss reads as a boss at a glance. Sizes in pixels, our own choice.
const SIZE = 22;

const SHAPES: Partial<Record<PlaceGroup, string>> = {
  // The start: a ringed white disc.
  start: `<circle cx="11" cy="11" r="9" fill="${PLACE_COLOUR.start}" stroke="#111" stroke-width="2.5"/><circle cx="11" cy="11" r="3" fill="#111"/>`,
  // A boss altar: a red diamond with a crown of three points.
  bosses: `<path d="M11 1 L21 11 L11 21 L1 11 Z" fill="${PLACE_COLOUR.bosses}" stroke="#111" stroke-width="1.5"/><path d="M6.5 13 L6.5 8.5 L9 10.5 L11 7 L13 10.5 L15.5 8.5 L15.5 13 Z" fill="#fff"/>`,
  // A trader: a gold coin.
  traders: `<circle cx="11" cy="11" r="9" fill="${PLACE_COLOUR.traders}" stroke="#111" stroke-width="1.5"/><circle cx="11" cy="11" r="5" fill="none" stroke="#8d6e00" stroke-width="2"/>`,
  // A resource: a green drop.
  resources: `<path d="M11 2 C11 2 4 10 4 14 A7 7 0 0 0 18 14 C18 10 11 2 11 2 Z" fill="${PLACE_COLOUR.resources}" stroke="#111" stroke-width="1.5"/><circle cx="9" cy="14" r="2" fill="#fff" opacity=".7"/>`,
  // A dungeon: a purple mound with a dark door.
  dungeons: `<path d="M2 19 Q11 0 20 19 Z" fill="${PLACE_COLOUR.dungeons}" stroke="#111" stroke-width="1.5"/><path d="M8.5 19 L8.5 13 Q11 10 13.5 13 L13.5 19 Z" fill="#111"/>`,
};

// The icon of a group's marker, faded for a trader's candidate place.
export function placeIcon(
  group: PlaceGroup,
  faded: boolean,
): { html: string; size: number; front: boolean } {
  return {
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 22 22" style="opacity:${faded ? 0.6 : 1};filter:drop-shadow(0 1px 1px rgba(0,0,0,.5))">${SHAPES[group] ?? ""}</svg>`,
    size: SIZE,
    front: group === "start",
  };
}
