// The Forge of Potential's odds, for the guide's `{{name}}` numbers (the game's
// upgrade idols, `Upgrader0Weapon` to `Upgrader7Armor`: every one has
// `m_upgradeChance` 0.65, `m_breakChance` 1 and
// `m_breakReturnIngreientsAmount` 0.35; `InventoryGui`'s upgrader roll).
const UPGRADE_CHANCE = 0.65;
const BREAK_RETURN = 0.35;

export const FORGE = {
  // Percent of tries that raise the item a level.
  success: Math.round(UPGRADE_CHANCE * 100),
  // Percent that shatter it: with a break chance of 1, every try that does
  // not raise the level breaks the item.
  shatter: Math.round((1 - UPGRADE_CHANCE) * 100),
  // Percent of the materials a shattered item gives back.
  returned: Math.round(BREAK_RETURN * 100),
};
