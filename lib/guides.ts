// The section's pages by menu item (the shared seo.md, Header and footer: at
// most Catalog, Guides, Quests and Tools; this section has no Quests, the
// owner, 2026-11-17). Each feeds its menu, its index page and the sitemap.
// `id` names the page in the menu, `line` its sentence on the index
// (`pages.guides.<line>`).
export type Entry = { href: string; id: string; line: string };
// A group with an `href` is a section with a contents page of its own (the
// Guides' sections, as in the No Man's Sky section; the owner, 2026-11-20).
export type Group = { id?: string; href?: string; entries: Entry[] };

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
      entry("/catalog/bosses", "archive.guideBosses", "bosses"),
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
      entry("/catalog/breakables", "archive.guideBreakables", "breakables"),
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
      entry("/catalog/comfort", "archive.guideComfort", "comfort"),
      entry("/catalog/deep-north-building", "archive.guideDeepNorthBuilding", "deepNorthBuilding"),
      entry("/catalog/ships", "archive.guideShips", "ships"),
      entry("/catalog/other-pieces", "archive.guideOtherPieces", "otherPieces"),
    ],
  },
];
export const CATALOG = CATALOG_GROUPS.flatMap((group) => group.entries);

// The guides, two stories (the owner, 2026-11-19; `docs/guides.md` → The
// menu): the challenges first, from a good start on, so the menu opens where
// a run opens; then the biomes in the run's order. Farming and the Forge of
// Potential are to be folded into the Plains and the Mountain; until then they
// stay at their addresses, out of the menu.
// Each section is a page of its own, /guides/<section>, and its guides stand
// under it, /guides/<section>/<slug> (the owner, 2026-11-20, as No Man's Sky).
export const GUIDE_GROUPS: Group[] = [
  {
    id: "archive.groupChallenges",
    href: "/guides/challenges",
    entries: [
      entry("/guides/challenges/a-good-start", "archive.guideGoodStart", "goodStart"),
      entry("/guides/challenges/speedrun", "archive.guideSpeedrun", "speedrun"),
      entry("/guides/challenges/other-rules", "archive.guideOtherRules", "otherRules"),
      entry("/guides/challenges/reverse-run", "archive.guideReverseRun", "reverseRun"),
    ],
  },
  {
    id: "archive.groupBiomes",
    href: "/guides/biomes",
    entries: [
      entry("/guides/biomes/meadows", "archive.guideMeadows", "meadows"),
      entry("/guides/biomes/black-forest", "archive.guideBlackForest", "blackForest"),
      entry("/guides/biomes/swamp", "archive.guideSwamp", "swamp"),
      entry("/guides/biomes/mountain", "archive.guideMountain", "mountain"),
      entry("/guides/biomes/plains", "archive.guidePlains", "plains"),
      entry("/guides/biomes/mistlands", "archive.guideMistlands", "mistlands"),
      entry("/guides/biomes/ashlands", "archive.guideAshlands", "ashlands"),
      entry("/guides/biomes/deep-north", "archive.guideDeepNorth", "deepNorth"),
    ],
  },
];
export const GUIDES = GUIDE_GROUPS.flatMap((group) => group.entries);

// A guide's section, by the guide's menu id (its breadcrumb's last step).
export const sectionOf = (id: string) => GUIDE_GROUPS.find((g) => g.entries.some((e) => e.id === id));

// The text of a guide links another by its short path, /guides/<slug>; it is
// made long here, so a guide moved to another section needs no edit of the
// text (the No Man's Sky section's `longGuideLinks`).
const LONG = new Map(GUIDES.map((e) => [e.href.split("/").pop()!, e.href]));
export const longGuideLinks = (markdown: string) =>
  markdown.replace(/\]\(\/guides\/([a-z0-9-]+)([#?][^)\s]*)?\)/g, (link, slug: string, rest?: string) =>
    LONG.has(slug) ? `](${LONG.get(slug)}${rest ?? ""})` : link,
  );
