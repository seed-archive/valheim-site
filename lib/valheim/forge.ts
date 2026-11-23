// The Forge of Potential's odds, for the guide's `{{name}}` numbers (the game's
// upgrade idols, `Upgrader0Weapon` to `Upgrader7Armor`: every one has
// `m_upgradeChance` 0.65, `m_breakChance` 1 and
// `m_breakReturnIngreientsAmount` 0.35; `InventoryGui`'s upgrader roll).
const UPGRADE_CHANCE = 0.65;
const BREAK_RETURN = 0.35;

// How much of one material a recipe asks for to reach `level`
// (`Piece.Requirement.GetAmount`): its amount at level 1, else
// `floor(f(level) × perLevel)` with f = level − 1 below 4 and 4 + (level − 4)/2
// from 4 on.
export function amountAt(
  r: { amount: number; perLevel: number },
  level: number,
): number {
  return level <= 1 ? r.amount : Math.floor(multiplier(level) * r.perLevel);
}

// The factor a level's upgrade multiplies the per-level amount by
// (`Requirement.GetAmount`): level − 1 below 4, then 4 + (level − 4)/2, so it
// jumps from 2 to 4 at level 4 and then grows by a half.
export function multiplier(level: number): number {
  return level >= 4 ? 4 + (level - 4) / 2 : level - 1;
}

// What a break at the Forge of Potential gives back of one material, for an
// item at `level` (`InventoryGui`, the upgrader's break; Tested 2026-11-23 on an
// Iron Mace at 4): `ceil((amount at 1 + amount at level) × 0.35)`.
export function breakReturn(
  r: { amount: number; perLevel: number },
  level: number,
): number {
  return Math.ceil((amountAt(r, 1) + amountAt(r, level)) * BREAK_RETURN);
}

// Everything an item at `level` took of one material: its craft and each
// upgrade at a workbench, up to its last level there (`maxQuality`); the Forge
// of Potential's levels take an idol and no material.
export function putIn(
  r: { amount: number; perLevel: number },
  level: number,
  maxQuality: number,
): number {
  let sum = 0;
  for (let l = 1; l <= Math.min(level, maxQuality); l++) {
    sum += amountAt(r, l);
  }
  return sum;
}

// The highest level the Forge name tool raises a piece to (the owner,
// 2026-11-23: the forge has no cap, "пусть 10 заточит и хватит").
export const TOP_LEVEL = 10;

export const FORGE = {
  top: TOP_LEVEL,
  // Percent of tries that raise the item a level.
  success: Math.round(UPGRADE_CHANCE * 100),
  // Percent that shatter it: with a break chance of 1, every try that does
  // not raise the level breaks the item.
  shatter: Math.round((1 - UPGRADE_CHANCE) * 100),
  // Percent of the materials a shattered item gives back.
  returned: Math.round(BREAK_RETURN * 100),
};
