// The section's pages by menu item (the shared seo.md, Header and footer: at
// most Catalog, Guides, Quests and Tools; this section has no Quests, the
// owner, 2026-11-17). Each feeds its menu, its index page and the sitemap.
// `id` names the page in the menu, `line` its sentence on the index
// (`pages.guides.<line>`).
export type Entry = { href: string; id: string; line: string };
// A group with an `href` is a section with a contents page of its own (the
// Guides' sections, as in the No Man's Sky section; the owner, 2026-11-20;
// the catalogue's groups too, 2026-11-24).
export type Group = { id?: string; href?: string; entries: Entry[] };

const entry = (href: string, id: string, line: string): Entry => ({
  href,
  id,
  line,
});

// A page's address follows the menu, level by level (the owner, 2026-11-24;
// the portal's docs/seo.md): /database/<group>/<kind>,
// /guides/<section>/<topic>, /tools/<tool>, and every level is an index page
// of the level below. The menu item Catalog is Database since 2026-11-24 (the
// owner, in every game); its message keys stay `catalog`. The database is one
// page a players' category (the owner, 2026-11-17), in groups, each a bold
// line of the menu with a page of its own. Inside the groups, the order of
// the title review (the owner, 2026-11-24, docs/seo.md): the armour second,
// the ships up and the Deep North last. The bosses, the
// traders and comfort, how-to guides rather than tables, moved to the Basics
// (the owner, 2026-11-25).
const catalogGroup = (
  slug: string,
  id: string,
  entries: [string, string, string][],
): Group => ({
  id,
  href: `/database/${slug}`,
  entries: entries.map(([kind, entryId, line]) =>
    entry(`/database/${slug}/${kind}`, entryId, line),
  ),
});
export const CATALOG_GROUPS: Group[] = [
  catalogGroup("world", "archive.groupWorld", [
    ["creatures", "archive.guideCreatures", "creatures"],
    ["damage", "archive.guideDamage", "damage"],
    ["dungeons", "archive.guideDungeons", "dungeons"],
    ["events", "archive.guideEvents", "events"],
  ]),
  catalogGroup("gear", "archive.groupGear", [
    ["weapons", "archive.guideWeapons", "weapons"],
    ["armour", "archive.guideArmour", "armour"],
    ["bows", "archive.guideBows", "bows"],
    ["staffs", "archive.guideStaffs", "staffs"],
    ["tools", "archive.guideToolsCatalog", "toolsCatalog"],
  ]),
  catalogGroup("food", "archive.groupFood", [
    ["food", "archive.guideFood", "food"],
    ["meads", "archive.guideMeads", "meads"],
  ]),
  catalogGroup("materials", "archive.groupMaterials", [
    ["materials", "archive.guideMaterials", "materials"],
    ["breakables", "archive.guideBreakables", "breakables"],
    ["trophies", "archive.guideTrophies", "trophies"],
  ]),
  catalogGroup("base", "archive.groupBase", [
    ["crafting-stations", "archive.guideStations", "stations"],
    ["ships", "archive.guideShips", "ships"],
    ["wood-building", "archive.guideWoodBuilding", "woodBuilding"],
    ["stone-building", "archive.guideStoneBuilding", "stoneBuilding"],
    ["furniture", "archive.guideFurniture", "furniture"],
    ["other-pieces", "archive.guideOtherPieces", "otherPieces"],
    [
      "deep-north-building",
      "archive.guideDeepNorthBuilding",
      "deepNorthBuilding",
    ],
  ]),
];
export const CATALOG = CATALOG_GROUPS.flatMap((group) => group.entries);

// The guides, three sections (the owner, 2026-11-19 and 2026-11-20;
// `docs/guides.md` → The menu), in the order of 2026-11-21: the biomes, the
// Basics, the challenges.
// Each section is a page of its own, /guides/<section>, and its guides stand
// under it, /guides/<section>/<slug> (the owner, 2026-11-20, as No Man's Sky).
export const GUIDE_GROUPS: Group[] = [
  // The owner, 2026-11-21: the saga starts in the Meadows, so the biomes come
  // first, a chapter each for the player who explores; the Basics are
  // references the chapters send to; the challenges, the other ways of
  // playing, come last, the speedrunner's start opening them.
  {
    id: "archive.groupBiomes",
    href: "/guides/biomes",
    entries: [
      entry("/guides/biomes/meadows", "archive.guideMeadows", "meadows"),
      entry(
        "/guides/biomes/black-forest",
        "archive.guideBlackForest",
        "blackForest",
      ),
      entry("/guides/biomes/swamp", "archive.guideSwamp", "swamp"),
      entry("/guides/biomes/mountain", "archive.guideMountain", "mountain"),
      entry("/guides/biomes/plains", "archive.guidePlains", "plains"),
      entry("/guides/biomes/mistlands", "archive.guideMistlands", "mistlands"),
      entry("/guides/biomes/ashlands", "archive.guideAshlands", "ashlands"),
      entry("/guides/biomes/deep-north", "archive.guideDeepNorth", "deepNorth"),
    ],
  },
  {
    id: "archive.groupBasics",
    href: "/guides/basics",
    // The owner, 2026-11-23: no guide stays out of the menu. Never folded
    // into the Plains and the Mountain as planned, Farming and the Forge of
    // Potential join the Basics, and since 2026-11-24 stand under its
    // address; "Как приручить животных" in the Basics (2026-11-23). Comfort,
    // the traders and the bosses, how-to guides, came from the database
    // (2026-11-25). The order is by search demand, by judgement (the owner,
    // 2026-11-25).
    entries: [
      entry("/guides/basics/bosses", "archive.guideBosses", "bosses"),
      entry("/guides/basics/traders", "archive.guideTraders", "traders"),
      entry("/guides/basics/comfort", "archive.guideComfort", "comfort"),
      entry("/guides/basics/taming", "archive.guideTaming", "taming"),
      entry("/guides/basics/farming", "archive.guideFarming", "farming"),
      entry(
        "/guides/basics/where-to-build",
        "archive.guideWhereToBuild",
        "whereToBuild",
      ),
      entry(
        "/guides/basics/how-much-metal",
        "archive.guideHowMuchMetal",
        "howMuchMetal",
      ),
      entry("/guides/basics/forge-of-potential", "archive.guideForge", "forge"),
      entry(
        "/guides/basics/boss-arenas",
        "archive.guideBossArenas",
        "bossArenas",
      ),
    ],
  },
  {
    id: "archive.groupChallenges",
    href: "/guides/challenges",
    entries: [
      entry(
        "/guides/challenges/a-speedrunners-start",
        "archive.guideSpeedrunnersStart",
        "speedrunnersStart",
      ),
      entry("/guides/challenges/speedrun", "archive.guideSpeedrun", "speedrun"),
      entry(
        "/guides/challenges/other-rules",
        "archive.guideOtherRules",
        "otherRules",
      ),
      entry("/guides/challenges/hardcore", "archive.guideHardcore", "hardcore"),
      entry(
        "/guides/challenges/reverse-run",
        "archive.guideReverseRun",
        "reverseRun",
      ),
    ],
  },
];
export const GUIDES = GUIDE_GROUPS.flatMap((group) => group.entries);

// The menu items whose pages stand in groups, each an index page of its own.
const MENUS = [
  { id: "archive.catalog", href: "/database", groups: CATALOG_GROUPS },
  { id: "archive.guides", href: "/guides", groups: GUIDE_GROUPS },
];

// A page's breadcrumbs by its menu id, every level of the menu a link (the
// portal's docs/seo.md): Home › the menu item › its group › the page; a
// menu item's or a group's own index ends at its own level. The last step,
// the page itself, has no link.
export type Step = { id: string; href?: string };
const HOME: Step = { id: "archive.home", href: "/" };
export function trailOf(id: string): Step[] {
  for (const menu of MENUS) {
    const top: Step = { id: menu.id, href: menu.href };
    if (menu.id === id) {
      return [HOME, { id }];
    }
    for (const group of menu.groups) {
      if (group.id === id) {
        return [HOME, top, { id }];
      }
      if (group.entries.some((e) => e.id === id)) {
        const level: Step[] =
          group.id && group.href ? [{ id: group.id, href: group.href }] : [];
        return [HOME, top, ...level, { id }];
      }
    }
  }
  return [HOME, { id }];
}

// The text of a guide links a page by its short path, /guides/<slug> or
// /catalog/<kind> (the database's first name); it is made long here, so a
// page moved to another group needs no edit of the text in any language (the
// No Man's Sky section's `longGuideLinks`).
const slugOf = (e: Entry) => e.href.split("/").pop()!;
const longOf = (entries: Entry[]) =>
  new Map(entries.map((e) => [slugOf(e), e.href]));
// The database's pages that became Basics guides (the owner, 2026-11-25):
// the texts still link them as /catalog/<kind>, and their old addresses
// redirect here (next.config.ts).
export const FROM_DATABASE = GUIDES.filter((e) =>
  ["bosses", "traders", "comfort"].includes(slugOf(e)),
);
const LONG: Record<string, Map<string, string>> = {
  guides: longOf(GUIDES),
  catalog: longOf([...CATALOG, ...FROM_DATABASE]),
};
export const longGuideLinks = (markdown: string) =>
  markdown.replace(
    /\]\(\/(guides|catalog)\/([a-z0-9-]+)([#?][^)\s]*)?\)/g,
    (link, menu: string, slug: string, rest?: string) => {
      const long = LONG[menu].get(slug);
      return long ? `](${long}${rest ?? ""})` : link;
    },
  );

// A database page's address by its kind, the last part of its path
// (`weapons` → /database/gear/weapons), for links built from the game's data;
// a page that left the database answers its new address (`FROM_DATABASE`).
export function catalogHref(kind: string): string {
  const href = LONG.catalog.get(kind);
  if (!href) {
    throw new Error(`No database page "${kind}"`);
  }
  return href;
}
