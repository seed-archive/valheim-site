// The section's pages by menu item (the shared seo.md, Header and footer: at
// most Catalog, Guides, Quests and Tools; this section has no Quests, the
// owner, 2026-11-17). Each feeds its menu, its index page and the sitemap.
// `id` names the page in the menu, `line` its sentence on the index
// (`pages.guides.<line>`).
export type Entry = { href: string; id: string; line: string };
export type Group = { id?: string; entries: Entry[] };

const entry = (href: string, id: string, line: string): Entry => ({ href, id, line });

// Every page stands under its menu item's address, as in its breadcrumb:
// /catalog/<kind>, /guides/<topic>, /tools/<tool>. The catalogue is one page a
// players' category (the owner, 2026-11-17), in groups, each a bold line of
// the menu.
export const CATALOG_GROUPS: Group[] = [
  {
    id: "archive.groupWorld",
    entries: [
      entry("/catalog/creatures", "archive.guideCreatures", "creatures"),
      entry("/catalog/damage", "archive.guideDamage", "damage"),
      entry("/catalog/dungeons", "archive.guideDungeons", "dungeons"),
      entry("/catalog/traders", "archive.guideTraders", "traders"),
      entry("/catalog/events", "archive.guideEvents", "events"),
    ],
  },
  {
    id: "archive.groupGear",
    entries: [
      entry("/catalog/weapons", "archive.guideWeapons", "weapons"),
      entry("/catalog/bows", "archive.guideBows", "bows"),
      entry("/catalog/armour", "archive.guideArmour", "armour"),
      entry("/catalog/tools", "archive.guideToolsCatalog", "toolsCatalog"),
    ],
  },
  {
    id: "archive.groupFood",
    entries: [
      entry("/catalog/food", "archive.guideFood", "food"),
      entry("/catalog/meads", "archive.guideMeads", "meads"),
    ],
  },
  {
    id: "archive.groupMaterials",
    entries: [
      entry("/catalog/materials", "archive.guideMaterials", "materials"),
      entry("/catalog/trophies", "archive.guideTrophies", "trophies"),
    ],
  },
  {
    id: "archive.groupBase",
    entries: [
      entry("/catalog/crafting-stations", "archive.guideStations", "stations"),
      entry("/catalog/wood-building", "archive.guideWoodBuilding", "woodBuilding"),
      entry("/catalog/stone-building", "archive.guideStoneBuilding", "stoneBuilding"),
      entry("/catalog/furniture", "archive.guideFurniture", "furniture"),
      entry("/catalog/deep-north-building", "archive.guideDeepNorthBuilding", "deepNorthBuilding"),
      entry("/catalog/ships", "archive.guideShips", "ships"),
      entry("/catalog/other-pieces", "archive.guideOtherPieces", "otherPieces"),
    ],
  },
];
export const CATALOG = CATALOG_GROUPS.flatMap((group) => group.entries);

// The guides, one list (the owner, 2026-11-17: no groups): the biomes in the
// run's order, then the rest.
export const GUIDE_GROUPS: Group[] = [
  {
    entries: [
      entry("/guides/meadows", "archive.guideMeadows", "meadows"),
      entry("/guides/black-forest", "archive.guideBlackForest", "blackForest"),
      entry("/guides/swamp", "archive.guideSwamp", "swamp"),
      entry("/guides/mountain", "archive.guideMountain", "mountain"),
      entry("/guides/plains", "archive.guidePlains", "plains"),
      entry("/guides/mistlands", "archive.guideMistlands", "mistlands"),
      entry("/guides/ashlands", "archive.guideAshlands", "ashlands"),
      entry("/guides/deep-north", "archive.guideDeepNorth", "deepNorth"),
      entry("/guides/bosses", "archive.guideBosses", "bosses"),
      entry("/guides/forge-of-potential", "archive.guideForge", "forge"),
      entry("/guides/challenges", "archive.guideChallenges", "challenges"),
      entry("/guides/speedrun", "archive.guideSpeedrun", "speedrun"),
      entry("/guides/reverse-run", "archive.guideReverseRun", "reverseRun"),
      entry("/guides/farming", "archive.guideFarming", "farming"),
      entry("/guides/comfort", "archive.guideComfort", "comfort"),
    ],
  },
];
export const GUIDES = GUIDE_GROUPS.flatMap((group) => group.entries);
