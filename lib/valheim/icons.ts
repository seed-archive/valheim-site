import { PLACE_COLOUR, type PlaceGroup } from "@/lib/valheim/places";

// The map's own marker icons, inline SVGs (our own drawings): a pin in the
// group's colour, so a boss reads as a boss at a glance, and in its head a
// sign of its own for each kind of place. Signs are drawn on a 28-unit grid.
const W = "#fff";
// The dark of a sign's details: holes, doors, eyes.
const D = "#1b1b1b";

const line = (d: string, width = 1.8) =>
  `<path d="${d}" fill="none" stroke="${W}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
const chest = `<path d="M8 14 L20 14 L20 20 L8 20 Z M8 14 C8 9.5 20 9.5 20 14 Z" fill="${W}"/><rect x="13" y="13" width="2" height="3" fill="${D}"/>`;

// One sign per name key (the generator's kinds).
const SIGNS: Record<string, string> = {
  start: `<circle cx="14" cy="14" r="3.5" fill="#111"/>`,
  // Antlers.
  eikthyr: line(
    "M11 21 L11 14 L8 9 M11 14 L11 8 M11 14 L13.5 10 M17 21 L17 14 L20 9 M17 14 L17 8 M17 14 L14.5 10",
  ),
  // A tree.
  theElder: `<path d="M14 6.5 L19.5 14 L16.5 14 L20 19 L8 19 L11.5 14 L8.5 14 Z" fill="${W}"/><rect x="13" y="19" width="2" height="2.5" fill="${W}"/>`,
  // A skull.
  bonemass: `<circle cx="14" cy="13" r="5.5" fill="${W}"/><rect x="11.5" y="16.5" width="5" height="3.5" rx="1" fill="${W}"/><circle cx="12" cy="13" r="1.4" fill="${D}"/><circle cx="16" cy="13" r="1.4" fill="${D}"/>`,
  // Wings.
  moder: `<path d="M14 12 C11 8 7 8 5.5 10.5 C8 11 9 13 9 15.5 C11 13.5 12 14.5 14 18 C16 14.5 17 13.5 19 15.5 C19 13 20 11 22.5 10.5 C21 8 17 8 14 12 Z" fill="${W}"/>`,
  // A crown.
  yagluth: `<path d="M8 19 L8 11 L11 14 L14 8.5 L17 14 L20 11 L20 19 Z" fill="${W}"/>`,
  // A bug.
  theQueen: `<ellipse cx="14" cy="16" rx="3.5" ry="4.5" fill="${W}"/><circle cx="14" cy="10" r="2.2" fill="${W}"/>${line("M10.5 14 L7.5 12.5 M10.5 17 L7 17.5 M17.5 14 L20.5 12.5 M17.5 17 L21 17.5", 1.4)}`,
  // A flame.
  fader: `<path d="M14 6.5 C17.5 10.5 19.5 13 19.5 16 A5.5 5.5 0 0 1 8.5 16 C8.5 13 10.5 11.5 11.8 9.8 C12.8 11.8 13 13 14 14.2 C15.2 12.2 15.2 9.8 14 6.5 Z" fill="${W}"/>`,
  // A bag of coins.
  haldor: `<path d="M11 8.5 L17 8.5 L15.5 11 C19 12.8 20.2 15.8 19.2 18.2 C18.2 20.4 9.8 20.4 8.8 18.2 C7.8 15.8 9 12.8 12.5 11 Z" fill="${W}"/>`,
  // A shirt (the game's own sign for her).
  hildir: `<path d="M10.5 7.5 L12.3 7 C13 8.4 15 8.4 15.7 7 L17.5 7.5 L21 11 L19 13 L18 12 L18 21 L10 21 L10 12 L9 13 L7 11 Z" fill="${W}"/>`,
  // A cauldron.
  bogWitch: `<path d="M8 12.5 L20 12.5 C20 17.5 18 20.5 14 20.5 C10 20.5 8 17.5 8 12.5 Z" fill="${W}"/><rect x="7" y="11" width="14" height="1.8" rx=".9" fill="${W}"/><circle cx="12" cy="8.5" r="1.1" fill="${W}"/><circle cx="15.5" cy="7.5" r="1.4" fill="${W}"/>`,
  // A tombstone.
  burialChamber: `<path d="M9.5 21 L9.5 11.5 A4.5 4.5 0 0 1 18.5 11.5 L18.5 21 Z" fill="${W}"/>${line("M14 11 L14 17 M11.8 13 L16.2 13", 1.6).replaceAll(W, D)}`,
  // An arch over water.
  sunkenCrypt: `${line("M9 17 L9 12 A5 5 0 0 1 19 12 L19 17", 2)}${line("M6.5 20 Q9 18.4 11.5 20 T16.5 20 T21.5 20", 1.6)}`,
  // A cave mouth.
  trollCave: `<path d="M6.5 21 C6.5 12.5 10 7.5 14 7.5 C18 7.5 21.5 12.5 21.5 21 Z" fill="${W}"/><path d="M11 21 C11 16.5 12.5 14 14 14 C15.5 14 17 16.5 17 21 Z" fill="${D}"/>`,
  // A snowflake.
  frostCave: line(
    "M14 7.5 L14 20.5 M8.4 10.8 L19.6 17.2 M8.4 17.2 L19.6 10.8 M12.3 8.5 L14 10 L15.7 8.5 M12.3 19.5 L14 18 L15.7 19.5",
    1.6,
  ),
  // A pickaxe.
  infestedMine: `${line("M7.5 11.5 Q14 6 20.5 11.5", 2.2)}${line("M14 9 L14 21.5", 2)}`,
  // A tower.
  fortress: `<path d="M10 21 L10 10.5 L8.8 10.5 L8.8 7.5 L11 7.5 L11 9 L13 9 L13 7.5 L15 7.5 L15 9 L17 9 L17 7.5 L19.2 7.5 L19.2 10.5 L18 10.5 L18 21 Z" fill="${W}"/><rect x="12.8" y="16" width="2.4" height="5" fill="${D}"/>`,
  // Hildir's chests: a chest.
  hildirCave: chest,
  hildirCrypt: chest,
  hildirFortress: chest,
  // A drop of tar.
  tarPit: `<path d="M14 7 C14 7 9 13 9 16.2 A5 5 0 0 0 19 16.2 C19 13 14 7 14 7 Z" fill="${D}" stroke="${W}" stroke-width="1.4"/>`,
  // A tent.
  fulingVillage: `<path d="M14 7 L21.5 20.5 L6.5 20.5 Z" fill="${W}"/><path d="M14 13.5 L16.8 20.5 L11.2 20.5 Z" fill="${D}"/>`,
  // A bone.
  giantRemains: `${line("M10.5 10.5 L17.5 17.5", 2.6)}<circle cx="9" cy="10.8" r="1.9" fill="${W}"/><circle cx="10.8" cy="9" r="1.9" fill="${W}"/><circle cx="19" cy="17.2" r="1.9" fill="${W}"/><circle cx="17.2" cy="19" r="1.9" fill="${W}"/>`,
  // An egg.
  drakeNest: `<ellipse cx="14" cy="14.8" rx="4.6" ry="6" fill="${W}"/>`,
};

// Every marker is a classic map pin — a drop in its group's colour, its point
// on the place — with the place's own sign in its head. The viewer centres an
// icon on its place, so the pin is drawn in the top half of a square twice
// its height and its point lands in the square's middle.
// The pin's size on screen: the 26 × 36 drop below, scaled (our own choice).
const PIN_SCALE = 1.2;
const PIN_W = 26 * PIN_SCALE;
const PIN_H = 36 * PIN_SCALE;
const BOX = Math.round(PIN_H * 2);
// The drop, on a 26 × 36 grid: a round head (centre 13, 13; radius 12) and a
// point at the bottom.
const DROP =
  "M13 1 C6.4 1 1 6.3 1 12.9 C1 21.5 13 35 13 35 C13 35 25 21.5 25 12.9 C25 6.3 19.6 1 13 1 Z";
// The sign (drawn on a 28-unit grid around 14, 14) scaled into the head.
const SIGN_SCALE = 0.8;
// Signs dark where the pin is light (our own choice).
const INK: Partial<Record<PlaceGroup, string>> = {
  traders: "#3e2723",
  start: "#111",
};

// The icon of a place: a pin in its group's colour with its own sign.
export function placeIcon(
  group: PlaceGroup,
  key: string,
): { html: string; size: number; front: boolean } {
  const k = SIGN_SCALE;
  const ink = INK[group];
  const sign = ink ? (SIGNS[key] ?? "").replaceAll(W, ink) : (SIGNS[key] ?? "");
  const left = (BOX - PIN_W) / 2;
  return {
    html:
      `<svg xmlns="http://www.w3.org/2000/svg" width="${BOX}" height="${BOX}" viewBox="0 0 ${BOX} ${BOX}" ` +
      `style="pointer-events:none;filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.55))">` +
      `<g transform="translate(${left} 0) scale(${PIN_SCALE})" style="pointer-events:auto">` +
      `<path d="${DROP}" fill="${PLACE_COLOUR[group]}" stroke="#111" stroke-width="1.3"/>` +
      `<g transform="translate(${13 - 14 * k} ${13 - 14 * k}) scale(${k})">${sign}</g>` +
      `</g></svg>`,
    size: BOX,
    front: group === "start",
  };
}
