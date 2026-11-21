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
| How to kill each boss | `/catalog/bosses`           | each boss's health, weaknesses, attacks, trophy power, the best weapon by then and another way (moved from the guides 2026-11-19) |
| Challenges (section) | `/guides/challenges`, its guides `/guides/challenges/{a-speedrunners-start,speedrun,other-rules,hardcore,reverse-run}` | the other ways of playing, each told biome by biome: the speedrunner's start and route, no death, no map, no portals, the harder worlds, the reverse run (`docs/guides.md` → The menu) |
| Biomes (section)     | `/guides/biomes`, its guides `/guides/biomes/<biome>`, Meadows to Deep North | a chapter a biome for the player who explores: how the land is explored, how much it gives and how far it lies from his home (`docs/guide-writing.md`) |
| Basics (section)     | `/guides/basics`, its guides `/guides/basics/{where-to-build,how-much-metal,boss-arenas}` | references the chapters send the reader to (2026-11-21) |
| What to break        | `/catalog/breakables`        | the objects worth smashing: metal, hides, jute, chains, coins, moulds, the chance a break gives each, where they stand (Materials group, 2026-11-20) |
| Comfort              | `/catalog/comfort`           | the best piece of each kind, and how long Rested lasts (moved from the guides 2026-11-19) |
| Bugs                 | `/bugs`                      | world generation bugs a player meets on a seed; in the footer |

A page's address names its menu item (`/catalog/<kind>`, `/guides/…`, `/tools/<tool>`), each with an index page and
the breadcrumb Home › item › page (the shared `docs/seo.md`, the owner, 2026-11-16). The section has no Quests menu
(the owner, 2026-11-17): "Where to go first" repeated the Meadows and Black Forest guides and was removed, and the
bosses moved to the guides, then on 2026-11-19 to the catalogue. A
full-screen tool such as the map keeps only the header: no breadcrumb, no footer.

Until the section has its first real pages, every page is `noindex` (`app/layout.tsx`).

## The site map

Taken over from the No Man's Sky section's rules, 2026-11-20, as the owner asked; its own story is in its `docs/seo.md`.

**The story the site tells** (the owner, 2026-11-19, widened 2026-11-20): the usual game as the baseline, each way
of playing in its own section where it needs one, the speedrun among them (`.claude/rules/site-text.md` → The
baseline and the ways of playing). The Guides menu reads as one trip: the Challenges section first,
from a good start through the speedrun to the other rules, then the Biomes in the run's order; each guide's closing
sentence leads to the next (`docs/guides.md` → The story). The Catalog is the reference a guide links to, the Tools
are what a guide sends the player to use.

**The rule of the menu's order.** The Biomes run in the order a run meets them: Meadows, Black Forest, Swamp,
Mountain, Plains, Mistlands, Ashlands, Deep North. A later change of the order keeps it or says why it breaks it.

**Section pages** (the owner, 2026-11-20, as the No Man's Sky menu has): each section of the Guides is a page of its
own, `/guides/challenges` and `/guides/biomes`, a contents list of its guides, and the guides stand under it
(`docs/guides.md` → The menu). A section page's `<title>` is `<Section> guides for Valheim — Seed Archive`.

## The semantic core

Primary and secondary queries by page, the order by judgement, not measured search volume (as in the No Man's Sky
section). To be checked against search suggestions and Search Console once the section is indexed.

| Page | Primary query | Secondary |
|---|---|---|
| `/` | valheim seed map | valheim seeds; best valheim seed |
| `/tools/map` | valheim seed map | valheim world map; boss altar locations; trader locations |
| `/tools/how-good-is-my-seed` | best valheim seed | valheim seed checker; good starting seed |
| `/tools/craft-tree` | valheim progression | what to craft first; valheim crafting order |
| `/guides` | valheim guides | valheim walkthrough |
| a-speedrunners-start (was a-good-start until 2026-11-21) | valheim speedrun seed | starting island; best seed for a speedrun |
| speedrun | valheim speedrun | speedrun route; speedrun seed |
| `/guides/challenges` | valheim challenges | valheim speedrun; hardcore |
| `/guides/biomes` | valheim biomes | valheim biome order; valheim walkthrough |
| other-rules | valheim no map | no portals; hardcore; no death |
| reverse-run | valheim reverse run | deep north first; bosses backwards |
| meadows | eikthyr location | valheim beehive; antler pickaxe |
| black-forest | valheim copper | troll cave; the elder location; haldor location; surtling cores |
| swamp | valheim iron | sunken crypt; abomination; root harness; bonemass location; bog witch |
| mountain | valheim silver | drake nests; dragon eggs; moder location |
| plains | fuling totems | yagluth location; barley and flax |
| mistlands | infested mines | sealbreaker; dvergr extractor; eitr; the queen |
| ashlands | charred fortress | bell fragments; fader; drakkar |
| deep-north | valheim deep north | morkhalla; intricate key; kall summon |
| `/catalog/bosses` | valheim bosses | boss order; how to summon each boss |
| `/catalog/creatures` | valheim creatures | creature drops |
| `/catalog/traders` | valheim traders | haldor items; hildir; bog witch |
| `/catalog/breakables` | valheim what to break | fenris hair; ancient pot; red jute; how to get silver |

**The game's name** once a page, in its `<title>`: `<title> in Valheim — Seed Archive`; the bold question, the
headings and the `fact` do not repeat it (`.claude/rules/site-text.md`).

## The links

- **External.** Only where a page cites a rule (the speedrun's categories on speedrun.com) or credits a player
  (`/credits` on the portal).
- **Tools and guides.** How good is my seed? ↔ a-speedrunners-start, speedrun, how-much-metal and reverse-run;
  the seed map ↔ a-speedrunners-start, where-to-build, reverse-run and every biome whose places it shows; the craft tree ↔ speedrun.
- **Guides and catalogue.** Each biome guide links the bosses page at its boss (`/catalog/bosses#<boss>`), the
  traders page where it names a trader, and the meads, weapons and materials it relies on; the catalogue links back
  from a boss's trophy and a creature's drops.
- **The prefix and the anchors.** `withBase` in `lib/content.ts` prefixes the Markdown's links; `anchorHeadings` gives
  every heading its id, so a guide's question is linkable.

## How to review before a release

The shared steps of the portal's `docs/seo.md` first, with `<slug>` = `valheim`, then:

1. Check each changed page against its row in the core above: the primary query in the title, the lead and the
   description.
2. Check the text rules of `.claude/rules/site-text.md`: the forbidden words, no sample sizes, no named places on
   guides, no typed numbers, every claim proven in the Valheim generator's notes.
3. Add a page's row to the core when a page is added, and its links to the link map.

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
