# Search: the semantic core and the links

What is the Valheim section's own in search: its sections, menu, semantic core and link map. What every section of
Seed Archive shares is the portal's `docs/seo.md` (`../seed-archive/docs/seo.md`); read it first. The section lives at
`seedarchive.gg/valheim/` (`BASE_PATH` in `lib/site.ts`); every path below is under that prefix.

## Sections

| Section              | Path                         | What it is                                                 |
| -------------------- | ---------------------------- | ---------------------------------------------------------- |
| Home                 | `/`                          | the section's start page (being built)                     |
| Tools                | `/tools`                     | the tools' index, reached by breadcrumbs only (not in the menu; the owner, 2026-11-16)                |
| Map                  | `/tools/map`                 | the world map of a seed, computed in the visitor's browser |
| How good is my seed? | `/tools/how-good-is-my-seed` | a seed's measures set against the seed scan                |
| Guides               | `/guides`                    | the guides' index, reached by breadcrumbs only (not in the menu; the owner, 2026-11-16)               |
| How to kill each boss | `/guides/bosses`            | each boss's health, weaknesses, attacks, trophy power, the best weapon by then and another way |
| The Meadows guide    | `/guides/meadows`            | Eikthyr, the antler pickaxe, beehives and fine wood by the start; numbers from the seed scan |
| The Black Forest guide | `/guides/black-forest`     | copper and tin at a troll cave, bronze, the Elder and his swamp key, Haldor; numbers from the seed scan |
| Bugs                 | `/bugs`                      | world generation bugs a player meets on a seed; in the footer |

A page's address names its menu item (`/catalog/<kind>`, `/guides/…`, `/tools/<tool>`), each with an index page and
the breadcrumb Home › item › page (the shared `docs/seo.md`, the owner, 2026-11-16). The section has no Quests menu
(the owner, 2026-11-17): "Where to go first" repeated the Meadows and Black Forest guides and was removed, and the
bosses moved to the guides. A
full-screen tool such as the map keeps only the header: no breadcrumb, no footer.

Until the section has its first real pages, every page is `noindex` (`app/layout.tsx`).

## Regrouping (2026-11-17)

The owner's decisions:
- **Removed:** `/catalog/crafting`, `/catalog/build-pieces`, `/guides/weapons` and `/guides/building`.
- **Weapons:** by biome, by kind within a biome.
- **Tools:** keeps its name.
- **Meads:** a page with each mead's effect and duration.
- **Building:** split, one page per tab of the hammer: crafting stations, wood, stone, furniture, Deep North, the other pieces; ships and carts on a page of their own (a `Ship` or `Vagon` piece).
- **Trophies:** a page.
- **Creatures:** one page, by biome.
- **Guides:** one list, no groups.
- **Every catalogue page:** by biome inside.

**Done:** weapons, bows, armour, tools, meads, the seven piece pages, the menu in groups, and `recipeHref` from the generator's `page`.

**Also done:**
- **Materials:** raw only, by the game's item type: material, fish and misc, 234 rows.
- **`/catalog/trophies`:** every trophy a creature drops, 67, the bosses' first in a section of their own (the owner), each linked to its power.
- **Creatures:** sectioned by the generator's creature biome. 15 variants no spawner places stay under "In dungeons, camps and nests".

### The proposal as written (before the owner's answers)

The owner: the catalogue pages are too long and mix topics. Rows counted from `lib/valheim/*.json`:
- **`/catalog/crafting`** has 428 rows in eight topics: weapons 151, armour 74, shields 19, ammo 31 (fishing baits among them), the cauldron's dishes 39, other 21, and "materials" 88 (mead bases, uncooked dishes, feasts, casts, bronze and nails). Its Deep North table alone has 109 rows.
- **`/catalog/build-pieces`** has 549 rows in five topics: the hammer 398, the serving tray's placed food 120, the cultivator 24 and the hoe 7.
- **`/catalog/materials`** has 397 rows, of which only about 212 are raw materials; the rest are food 85, gear 78, trophies 30 and moulds 29.
- **Food** shows up on four pages.
- **Meads** have no home.

The proposal: one page a players' category, each about 150 rows at most, a search on each, and biome sections where they help.

| Page | What | Rows |
|---|---|---|
| `/catalog/weapons` | melee weapons and staffs, sections by type (swords, axes, clubs and sledges, knives, spears, atgeirs, fists, staffs); the weapons guide's text as its lead | ~112 |
| `/catalog/bows` | bows, crossbows, arrows, bolts, bombs | ~54 |
| `/catalog/armour` | armour, shields, trinkets, by biome | ~108 |
| `/catalog/tools` | pickaxes, hammer, hoe, cultivator, torches, hook, saddles, fishing baits | ~25 |
| `/catalog/food` | as now, the uncooked dishes inside their dish's row | 94 |
| `/catalog/meads` | each mead: base, fermenter, effect and duration (the effects need a data file) | ~21 |
| `/catalog/materials` | raw and smelted materials only | ~194 |
| `/catalog/trophies` | who drops each trophy and what it is for | 30 |
| `/catalog/crafting-stations` | stations and their upgrades by level; the building guide's text as its lead | ~53 |
| `/catalog/building` | wood and stone pieces, two tables | ~180 |
| `/catalog/furniture` | furniture, linking comfort | ~105 |
| `/catalog/misc-pieces` | ships, carts, siege engines, fires, stacks, terrain | ~64 |

- **Removed:** `/catalog/crafting`, `/catalog/build-pieces`, `/guides/weapons`, `/guides/building`. The serving tray's 120 pieces and the cultivator's 24 leave the catalogue.
- **Unchanged:** creatures, dungeons, traders, and the guides for bosses, farming, comfort and the biomes.
- **Code:** each row's page comes from its group, kind or piece category, never a hand list (`recipeHref`).
- **Questions for the owner:**
  - Keep `/catalog/crafting` as a hub?
  - Weapons by type or by biome?
  - Is the name "Tools" acceptable beside the Tools menu?
  - Meads data.
  - One building page or two?
  - The Deep North category and the casts.
  - The Fighting group left with Bosses alone.
  - Trophies as a page or a section.
  - Ships as a page.
  - Creatures split by biome.
