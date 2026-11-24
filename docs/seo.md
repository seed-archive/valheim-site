# Search: the semantic core and the links

What is the Valheim section's own in search: its sections, menu, semantic core and link map. What every section of
Seed Archive shares is the portal's `docs/seo.md` (`../seed-archive/docs/seo.md`); read it first. The section lives at
`seedarchive.gg/valheim/` (`BASE_PATH` in `lib/site.ts`), each page under its language, `/valheim/<lang>/…` (the
portal's D20; `lib/i18n/locales.ts`): every path below is under that prefix and a language, and is written without
the language in code and texts (`components/LocaleLink.tsx`, `lib/content.ts` add it). An address without a language
answers 308 to `/en/…`, a language not yet translated 307 to English, an unknown one 404 (`next.config.ts`); each
page's hreflang and canonical come from `lib/alternates.ts`.

## Sections

| Section              | Path                         | What it is                                                 |
| -------------------- | ---------------------------- | ---------------------------------------------------------- |
| Home                 | `/`                          | the section's start page (being built)                     |
| Tools                | `/tools`                     | the tools' index, reached by breadcrumbs only (not in the menu; the owner, 2026-11-16)                |
| Seed map             | `/tools/map`                 | the world map of a seed, computed in the visitor's browser (was "Map" in the menu and footer until 2026-11-24) |
| How good is my seed? | `/tools/how-good-is-my-seed` | a seed's measures set against the seed scan                |
| Best seeds           | `/tools/best-seeds`          | the best seeds by the seed rating, each biome's score in a column to sort by (2026-11-23) |
| Nidavellir           | `/tools/nidavellir`          | an idol, an item and a step: the character names whose first Forge of Potential try raises it (2026-11-23; was Forge at `/tools/forge`, never released: named after the dwarves' Nidavellir, where Mjölnir was forged, so its title differs from the guide's) |
| Wind                 | `/tools/wind`                | where the wind comes from, hour by hour, a week at a time over 52 weeks, the same in every world (2026-11-23, was the guide `/guides/basics/wind`) |
| Forge of Potential   | `/guides/basics/forge-of-potential` | what goes to the forge, what a try takes, why a name decides it, the way with a fresh character (Basics; at `/guides/forge-of-potential` until 2026-11-24) |
| Guides               | `/guides`                    | the guides' index, reached by breadcrumbs only (not in the menu; the owner, 2026-11-16)               |
| Database             | `/database`                  | the database's index (the menu item Catalog, at `/catalog`, until 2026-11-24; «Справочник» in Russian, «Base de datos», «Datenbank»): its groups, each linking its own page, and every page in a sentence |
| Database groups      | `/database/{world,gear,food,materials,base}` | a contents page a group of the menu: World, Gear, Food and drink, Materials, Your base (2026-11-24) |
| How to kill each boss | `/database/world/bosses`    | each boss's health, weaknesses, attacks, trophy power, the best weapon by then and another way (moved from the guides 2026-11-19) |
| Challenges (section) | `/guides/challenges`, its guides `/guides/challenges/{a-speedrunners-start,speedrun,other-rules,hardcore,reverse-run}` | the other ways of playing, each told biome by biome: the speedrunner's start and route, no death, no map, no portals, the harder worlds, the reverse run (`docs/guides.md` → The menu) |
| Biomes (section)     | `/guides/biomes`, its guides `/guides/biomes/<biome>`, Meadows to Deep North | a chapter a biome for the player who explores: how the land is explored, how much it gives and how far it lies from his home (`docs/guide-writing.md`) |
| Basics (section)     | `/guides/basics`, its guides `/guides/basics/{where-to-build,farming,taming,how-much-metal,boss-arenas,forge-of-potential}` | references the chapters send the reader to (2026-11-21; Taming animals 2026-11-23; Farming and the Forge of Potential moved under it from `/guides/<slug>` 2026-11-24) |
| Staffs               | `/database/gear/staffs`      | every staff by biome with what a cast does and costs: the blast, the splinters, the summons with their health and blows, the shield (Gear group, 2026-11-23) |
| What to break        | `/database/materials/breakables` | the objects worth smashing: metal, hides, jute, chains, coins, moulds, the chance a break gives each, where they stand (Materials group, 2026-11-20) |
| Comfort              | `/database/base/comfort`     | the best piece of each kind, and how long Rested lasts (moved from the guides 2026-11-19) |
| Bugs                 | `/bugs`                      | the game's bugs a player meets: world generation on a seed, and the Helmet of the Protector the forge never takes (2026-11-23); in the footer |

**A page's address follows the menu, level by level** (the owner, 2026-11-24; the shared `docs/seo.md`):
`/database/<group>/<kind>`, `/guides/<section>/<slug>`, `/tools/<tool>`. Every level is a page of its own, an index
of the level below (`/database`, `/database/gear`, `/guides`, `/guides/basics`, `/tools`), and the breadcrumbs name
every level as a link: Home › Database › Gear › Weapons. The menu is `lib/guides.ts` (`CATALOG_GROUPS`,
`GUIDE_GROUPS`) and `lib/tools.ts`; the breadcrumbs come from it (`trailOf`, `components/PageTrail.tsx`'s `crumb`),
so a page names only its menu id. The database's groups and their slugs: World `world`, Gear `gear`, Food and drink
`food`, Materials `materials`, Your base `base`. Every old address answers 308 in one hop to the new one, the
language kept, or to `/en/…` without one (`MOVED` in `next.config.ts`): `/catalog/<kind>` →
`/database/<group>/<kind>`, `/catalog` → `/database`, `/guides/farming` → `/guides/basics/farming`,
`/guides/forge-of-potential` → `/guides/basics/forge-of-potential`, and every older move straight to its final
address. The section has no Quests menu (the owner, 2026-11-17): "Where to go first" repeated the Meadows and Black
Forest guides and was removed, and the bosses moved to the guides, then on 2026-11-19 to the catalogue. A
full-screen tool such as the map keeps only the header: no breadcrumb, no footer.

Until the section has its first real pages, every page is `noindex` (`app/layout.tsx`).

## The site map

Taken over from the No Man's Sky section's rules, 2026-11-20, as the owner asked; its own story is in its `docs/seo.md`.

**The story the site tells** (the owner, 2026-11-19, widened 2026-11-20): the usual game as the baseline, each way
of playing in its own section where it needs one, the speedrun among them (`.claude/rules/site-text.md` → The
baseline and the ways of playing). The Guides menu reads as one trip: the Challenges section first,
from a good start through the speedrun to the other rules, then the Biomes in the run's order; each guide's closing
sentence leads to the next (`docs/guides.md` → The story). The Database is the reference a guide links to, the Tools
are what a guide sends the player to use.

**The rule of the menu's order.** The Biomes run in the order a run meets them: Meadows, Black Forest, Swamp,
Mountain, Plains, Mistlands, Ashlands, Deep North. A later change of the order keeps it or says why it breaks it.

**Section pages** (the owner, 2026-11-20, as the No Man's Sky menu has): each section of the Guides is a page of its
own, `/guides/challenges` and `/guides/biomes`, a contents list of its guides, and the guides stand under it
(`docs/guides.md` → The menu). A section page's `<title>` is `<Section>: <what it holds> in Valheim — Seed
Archive` ("Basics: base, metal, taming, farming, the forge in Valheim"; the owner, 2026-11-24), like every other
page; "Biomes in order: a guide to each land in Valheim" is its Biomes form.

## The semantic core

Primary and secondary queries by page, the order by judgement, not measured search volume (as in the No Man's Sky
section). To be checked against search suggestions and Search Console once the section is indexed.

| Page | Primary query | Secondary |
|---|---|---|
| `/` | valheim guide (2026-11-24; was valheim seed map) | valheim tips; valheim seeds |
| `/tools` | valheim seed tools | valheim seed rating; valheim craft tree |
| `/tools/map` | valheim seed map (this page alone) | valheim world map; boss altar locations; trader locations |
| `/tools/how-good-is-my-seed` | valheim seed checker (2026-11-24; was best valheim seed) | best valheim seed; good starting seed |
| `/tools/craft-tree` | valheim progression | what to craft first; valheim crafting order |
| `/tools/best-seeds` | best valheim seeds | seed list; good seed to start |
| `/database/gear/staffs` | valheim staffs | what does each staff do; dead raiser; staff of protection; eitr cost |
| `/guides/basics/taming` | valheim taming | how to tame a lox; asksvin saddle; breeding |
| `/tools/wind` | valheim wind | wind direction; sailing; moder power |
| `/tools/nidavellir` | valheim forge of potential without breaking | upgrade without breaking; refinement; character name; idol |
| `/guides/basics/forge-of-potential` | valheim forge of potential | upgrade past level 4; idols; break chance |
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
| `/database/world/bosses` | valheim bosses | boss order; how to summon each boss |
| `/database/world/creatures` | valheim creatures | creature drops |
| `/database/world/traders` | valheim traders | haldor items; hildir; bog witch |
| `/database/materials/breakables` | valheim what to break | fenris hair; ancient pot; red jute; how to get silver |
| `/database` | valheim items | valheim database; valheim creatures; build pieces |
| `/bugs` | valheim same seed different dungeon | burial chamber layout |

**The game's name** once a page, in its `<title>`: `<title> in Valheim — Seed Archive`; the bold question, the
headings, the description and the `fact` do not repeat it (`.claude/rules/site-text.md`). A title answers the
player's question and holds the page's primary query ("What to break for silver, iron and Fenris hair in Valheim").

**The exceptions** (the owner, 2026-11-24):
- the home page and the seed map lead with the game's name, since their queries do: "Valheim guide: what the game
  never tells you", "Valheim seed map: bosses, traders, crypts and ore";
- the two indexes reached by breadcrumbs say "for Valheim": "Tools for Valheim: seed map, seed rating, craft tree,
  wind", "Guides for Valheim: biomes, basics and challenge runs";
- Nidavellir's title names the forge, not the tool: "Forge of Potential without breaking: pick a name in Valheim".

## The links

- **External.** Only where a page cites a rule (the speedrun's categories on speedrun.com) or credits a player
  (`/credits` on the portal).
- **Tools and guides.** How good is my seed? ↔ a-speedrunners-start, speedrun, how-much-metal and reverse-run;
  the seed map ↔ a-speedrunners-start, where-to-build, reverse-run and every biome whose places it shows; the craft tree ↔ speedrun;
  Nidavellir ↔ forge-of-potential (the tool links the guide twice: the lead, and the steps' section
  `#how-do-i-raise-an-item-without-breaking-it`; the guide links the tool where the name decides and in its steps),
  Nidavellir → the database (`/database`, the recipes' ingredients; the See ingredients button is a button,
  not a link, and leads to the chosen item's row), forge-of-potential → `/bugs` (the Helmet of the Protector) and
  the seed map. The idols' rows in the materials catalogue link forge-of-potential. Best seeds ↔ How good is my
  seed? (each links the other in its lead), a-speedrunners-start → Best seeds. Wind ← the bosses page (Moder's
  power), the Mountain chapter and Speedrun.
- **The new pages of 2026-11-23.** Taming animals ← the Plains chapter (the lox) and the Ashlands chapter (the
  Asksvin on lava); it links the weapons it names (the Abyssal Harpoon, the Butcher Knife), the traders, Yagluth
  and Hildir's Sealed Tower. Staffs ← Weapons, the Mistlands chapter and forge-of-potential; it links Food and
  feasts (eitr comes from food alone). Bugs ← forge-of-potential, the map's loot panel and the footer.
- **Guides and database.** Each biome guide links the bosses page at its boss (`/database/world/bosses#<boss>`),
  the traders page where it names a trader, and the meads, weapons and materials it relies on; the database links
  back from a boss's trophy and a creature's drops.
- **Index pages.** The database's index links each group's page and every page; each group's page links its pages;
  the header's group names link the group pages too.
- **The prefix and the anchors.** `withBase` in `lib/content.ts` prefixes the Markdown's links; `anchorHeadings` gives
  every heading its id, so a guide's question is linkable.
- **Short links in the Markdown.** A guide's text links a page by its short path, `/guides/<slug>` or
  `/catalog/<kind>`, the same in every language (`test/guide-translations.test.ts` compares them);
  `longGuideLinks` in `lib/guides.ts` makes it the page's full address from the menu (`/guides/basics/farming`,
  `/database/world/bosses`), so a move needs no edit of the texts. Code links the full address
  (`catalogHref(kind)` where the page comes from the data, as `recipeHref` and `creatureHref` do).

## Titles reviewed (2026-11-24, applied 2026-11-24)

**Applied 2026-11-24** in `en` and `ru` (`lib/i18n/en.json`, `lib/i18n/ru/`; the Mistlands fact in
`content/en/guides/mistlands.md`), with the home page as the owner chose it and the menu order below
(`lib/guides.ts`, `lib/tools.ts`); `es` and `de` are re-translated from the changed keys. Where the table below
differs from what was applied, the claim was checked against its page and fixed:
- `/database/world/bosses`: "the way round a straight fight" became "the other way players win": for the Queen and Kall
  the page's other way is no way round a fight (the Queen's safe vestibule, Kall's phases);
- `/database/world/dungeons`: "how likely each is on your seed" became "the chance each stands there": the chance is the
  spawner's, the same on every seed;
- `/database/materials/breakables`: "pots break into silver, gates into iron, hangings into Fenris hair" became "pots for
  silver, gates for iron, hangings for Fenris hair": an Ashlands pot gives silver in one break of seven, beside
  bronze, iron and meads, and a frost cave gate iron in one break of three (`lib/valheim/breakables.json`);
- `/database/food/food`: "in each biome" became "biome by biome": no dish gives eitr before the Mistlands;
- `/guides/basics`: "what every biome chapter sends you to" became "what the biome chapters send you to";
- Meadows and Ashlands titles take an "and" ("…beehives and home…", "…bells and Fader…");
- the Base group's "ships up" is read as the ships right after the crafting stations, the other pieces before the
  Deep North;
- the wind's "set by the world's clock, not the seed" stands: `lib/valheim/wind.json` is one year's table for every
  world, and the page says so; the how-much-metal fact fills to well under 160 characters.

The labels changed with it: "Seed map" (menu, footer, the Tools index's line, the map's hidden h1, the creatures'
link), "Pickaxes and tools" (the h1 and label of `/database/gear/tools` and its line on the database's index). The top
level: Catalog became Database (the owner, 2026-11-24, in every game; «Справочник» in Russian, «Base de datos»,
«Datenbank»), at `/database`.

The review as it stood before it was applied:

The owner found the home page's "Valheim seeds" too blunt: a player comes for a head start, the mechanics the game
never explains and the fastest way to farm what he needs; seeds are our method, not his reason. The titles of this
section and RimWorld's are rewritten after both sections' translations are committed, by a Fable subagent
Infrastructure raises (the owner, 2026-11-24); until then nothing here changes. A reading of every title against the
rules found, as input for it:
- **Home**: h1 without the game's name ("Worlds compared, seed by seed", "Seed by seed", "Know your world before you
  sail"); `<title>` "Valheim seeds compared: map, ratings and guides — Seed Archive"; the core's primary query of the
  home page becomes "valheim seeds", leaving "valheim seed map" to the map (today both pages target it, and three
  pages "best valheim seed").
- **Primary query missing from the `<title>`** (How to review, step 4): seven biome chapters ("Swamp guide: iron,
  crypts and Bonemass in Valheim"…), A speedrunner's start ("Speedrun seeds: …"), the craft tree ("Craft tree and
  progression").
- **Rule breaks**: the game's name twice on the home page and the map (its hidden h1); the game's name in the
  descriptions of home, Tools, the map, How good is my seed?; the map's menu label "Map" against its h1; the title
  pattern broken on How good is my seed?, Catalog ("Catalog of Valheim") and Nidavellir (deliberate, to be written as
  an exception with the map's); /tools and /catalog/tools both "Tools"; "Basics guides" and "Challenges guides"
  ungrammatical; the Basics description lacks Taming, Farming and the Forge of Potential.

**The Fable review's proposal** (Infrastructure, 2026-11-24; not applied: the owner chooses the home page and the
top-level menu order first, then the change is made in en and carried into ru, es, de):
- Home: primary query "valheim guide" (freeing "valheim seed map" for the map); title "Valheim guide: what the game
  never tells you", h1 "What the game never tells you"; description "From the first beehive in the Meadows to Kall in
  the Deep North: what each land asks of you, what it gives, and the odds the game never shows." (the chicken-egg
  line only if the home lead names it).
- Map: title "Valheim seed map: bosses, traders, crypts and ore"; h1, menu and footer label "Seed map".
- How good is my seed?: title "Seed checker: how good is my seed in Valheim", query "valheim seed checker".
- /catalog/tools: h1 and label "Pickaxes and tools".
- Biome chapters: "<Biome> guide: <primary query items> in Valheim" ("Swamp guide: iron, Sunken Crypts and
  Bonemass in Valheim", "Mountain guide: silver, drake nests and Moder in Valheim"); the Mistlands fact names
  "Infested Mines".
- Indexes: "Basics: base, metal, taming, farming, the forge in Valheim", "Challenges: speedrun, no map, Hardcore,
  reverse in Valheim".
- No description names the game; titles answer the player's question ("What to break for silver, iron and Fenris
  hair in Valheim", "Best food for melee, archer and mage in Valheim", "Wind direction, hour by hour, for every world
  in Valheim").
- Menu order (the owner's call): Basics: base, farming, taming, metal, boss arenas, forge; Tools: Seed map, Craft
  tree, Wind, How good is my seed?, Best seeds, Nidavellir; Catalog: World with bosses first, Gear with armour second,
  Base with ships up and Deep North last.
- Exceptions to write down: home and map titles lead with "Valheim"; /tools and /guides use "for Valheim"; the
  "<Section> guides for Valheim" line here reworded.
- To check on the served page: how-much-metal's fact may exceed 160 characters once filled; "armour" or "armor" as
  the query.

The per-page proposal (each title ends " — Seed Archive"; "keep" leaves the description as it is; every claim checked
against its page before it is applied, e.g. the wind "set by the world's clock, not the seed", the breakables' loot,
the bosses' "two ways"):

| Route | Primary query | Title | Description |
|---|---|---|---|
| / | valheim guide | Valheim guide: what the game never tells you (h1 "What the game never tells you") | the owner's pick |
| /tools | valheim seed tools | Tools for Valheim: seed map, seed rating, craft tree, wind | See a seed's whole world, rate it, count the wood and ore your build takes, read the wind for any hour, and find the name that raises an item at the forge. |
| /tools/map | valheim seed map | Valheim seed map: bosses, traders, crypts and ore (h1, label "Seed map") | Type a seed and see its world before you sail: every boss altar, trader, crypt and cave, the copper, tin and silver, and what each place holds. |
| /tools/how-good-is-my-seed | valheim seed checker | Seed checker: how good is my seed in Valheim | Seed checker: type a seed and get a score from 0 to 100 for how near its boss altars, traders, crypts, copper and silver lie, biome by biome. |
| /tools/best-seeds | best valheim seeds | Best seeds in Valheim, rated biome by biome | The best seeds we have rated, each biome scored from 0 to 100: sort by the biome you care about and open any seed on the map. |
| /tools/craft-tree | valheim progression | Progression tree: what your crafting costs in Valheim | A progression tree, biome by biome: switch on the gear and stations you will make and get the wood, ore and every raw material they take. |
| /tools/nidavellir | valheim forge of potential without breaking | Forge of Potential without breaking: pick a name in Valheim | keep |
| /tools/wind | valheim wind | Wind direction, hour by hour, for every world in Valheim | Wind direction is set by the world's clock, not the seed: see which way it blows at any hour of the year and pick the hour to cross under sail. |
| /bugs | valheim same seed different dungeon | Bugs: why one seed gives different crypts in Valheim | keep |
| /database | valheim items | Database of items, creatures and build pieces in Valheim (h1, label "Database", 2026-11-24) | Every creature, weapon, armour piece, dish, mead, material and build piece: what it does, what it takes and where to find it. |
| /database/world | | World: bosses, creatures, dungeons, traders and raids in Valheim (2026-11-24) | Every boss and creature, the damage each takes, the dungeons and camps, the traders and the raids: what the world sets against you and what it gives. |
| /database/gear | | Gear: weapons, armour, bows, staffs and tools in Valheim (2026-11-24) | Every weapon, armour piece, bow, staff and tool: what it does and what it takes to make. |
| /database/food | | Food and drink: dishes and meads in Valheim (2026-11-24) | Every dish and mead: what it gives you and what it takes to make. |
| /database/materials | | Materials: resources, breakables and trophies in Valheim (2026-11-24) | Every material and trophy, where it comes from and what it goes into, and the objects worth breaking for what they drop. |
| /database/base | | Your base: stations, ships, building and comfort in Valheim (2026-11-24) | Crafting stations, ships, wood, stone and Deep North building pieces, furniture and comfort: what each piece takes and what it gives your base. |
| /database/world/bosses | valheim bosses | All bosses and how to kill each in Valheim | Two ways to beat every boss: the hardest-hitting weapon you can make by then, and the way round a straight fight. With health, weaknesses and attacks. |
| /database/world/damage | | Damage types: what hurts each creature in Valheim | keep |
| /database/world/dungeons | | Dungeons and caves: who waits inside in Valheim | Know what waits inside before you walk in: the creatures of every cave, dungeon and camp, how many stand there, and how likely each is on your seed. |
| /database/world/events | | Raids: what starts each and what ends it in Valheim | keep |
| /database/gear/weapons | | Weapons: which to use, biome by biome, in Valheim | A sword when you attack, a mace when you hold your ground, an atgeir against crowds: every melee weapon by biome, with its damage, station and materials. |
| /database/gear/bows | | Bows, crossbows and arrows: which to pick in Valheim | The arrow, not the bow, sets the damage type. Every bow, crossbow, arrow, bolt and bomb by biome, with its damage, station and materials. |
| /database/gear/staffs | | Staffs: what each one casts and costs in Valheim | keep |
| /database/gear/armour | | Armour, shields and capes: which to wear in Valheim | Every helmet, chest and leg piece, cape, shield and trinket by biome: its armour, block and effects, and which pieces slow you or make you faster. |
| /database/gear/tools | | Pickaxes and tools in Valheim (h1, label "Pickaxes and tools") | keep |
| /database/food/food | | Best food for melee, archer and mage in Valheim | The best food for a melee fighter, an archer and a mage in each biome, and every dish and feast with its health, stamina and eitr. |
| /database/food/meads | | Meads and potions: what each does, how long in Valheim | keep |
| /database/materials/materials | | Materials: where to find each, what it makes in Valheim | keep |
| /database/materials/breakables | | What to break for silver, iron and Fenris hair in Valheim | Ashlands pots break into silver, frost cave gates into iron, hangings into Fenris hair: every object worth smashing, what it gives and how often. |
| /database/materials/trophies | | Trophies: who drops each and what it is for in Valheim | keep |
| /database/base/crafting-stations | | Crafting stations: what to build first in Valheim | keep |
| /database/base/wood-building | | Wood building pieces and what each costs in Valheim | keep |
| /database/base/stone-building | | Stone building pieces and what each costs in Valheim | keep |
| /database/base/furniture | | Furniture: every piece and what it costs in Valheim | keep |
| /database/base/comfort | | Comfort: how to raise it, how long Rested lasts in Valheim | keep |
| /database/base/deep-north-building | | Deep North building pieces in Valheim | keep |
| /database/base/ships | | Ships and carts: which to build, what it takes in Valheim | keep |
| /database/base/other-pieces | | Portals, fires and other build pieces in Valheim | keep |
| /guides | | Guides for Valheim: biomes, basics and challenge runs | Every biome in the order you meet it, the basics the game never explains, and the challenge runs: speedrun, no map, Hardcore and the reverse run. |
| /guides/biomes | | Biomes in order: a guide to each land in Valheim | Meadows to Deep North in the order you meet them: what each land asks of you, where it hides it, how much there is and how far it lies from home. |
| /guides/basics | | Basics: base, metal, taming, farming, the forge in Valheim | Where to build your base, how much metal a run takes, boss arenas, taming, farming and the Forge of Potential: what every biome chapter sends you to. |
| /guides/challenges | | Challenges: speedrun, no map, Hardcore, reverse in Valheim | keep |

Creatures and traders keep theirs. Guides (descriptions are their facts, kept unless noted): Meadows "Meadows guide:
Eikthyr location, beehives, home in Valheim"; Black Forest "…copper, tin and the Elder…"; Swamp "…iron, Sunken
Crypts and Bonemass…"; Mountain "…silver, drake nests and Moder…"; Plains "…Fuling totems, barley and Yagluth…";
Mistlands "…Infested Mines and the Queen…", its fact "Land where the mist is thin, let the Dvergr kill your first
Seekers, then comb the mist for Infested Mines, giants' remains and sap; the Queen's citadel last."; Ashlands
"…Charred Fortress, bells, Fader…"; Deep North "…Bloodgold, keys and Kall…"; where-to-build keep; how-much-metal "How
much iron and silver you need in Valheim" (check the filled fact's length); boss-arenas "Boss arenas: how to stop
spawns at the altar in Valheim"; taming "Taming animals: food, breeding, eggs and mounts in Valheim"; farming "Farming:
every crop, where it grows, how long in Valheim"; forge-of-potential "Forge of Potential: where it is and the odds in
Valheim"; a-speedrunners-start "Speedrun seed: what to check, when to reset in Valheim"; speedrun "Speedrun route, boss
by boss, in Valheim"; other-rules "No map, no portals, no death: how to play each in Valheim"; hardcore "Hard, Very hard
and Hardcore: what each changes in Valheim"; reverse-run "Reverse run: Deep North first, bosses backwards in Valheim".
All other h1s and labels stay.

## How to review before a release

The shared steps of the portal's `docs/seo.md` first, with `<slug>` = `valheim`, then:

1. Check each changed page against its row in the core above: the primary query in the title, the lead and the
   description.
2. Check the text rules of `.claude/rules/site-text.md`: the forbidden words, no sample sizes, no named places on
   guides, no typed numbers, every claim proven in the Valheim generator's notes.
3. Add a page's row to the core when a page is added, and its links to the link map.
4. Over every address of `sitemap.xml`, from the served HTML (done for the release of 2026-11-23): status 200, one
   `<h1>`, a description of 160 characters or fewer, no address twice in the sitemap; every `href` with a `#` inside
   `<main>` lands on an `id` of its page; every page counts two pages or more that link it from `<main>` (an index
   page's sentence counts; the map's panels link from the browser and are counted by hand: Bugs).
5. A new guide's tables each have their conclusion under them, and a new catalogue page's lead answers its question
   (`.claude/rules/site-text.md` → Tables and charts).

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
| `/catalog/weapons` | melee weapons, sections by type (swords, axes, clubs and sledges, knives, spears, atgeirs, fists); the weapons guide's text as its lead; links Staffs | ~112 |
| `/catalog/staffs` | staffs by biome (2026-11-23), what each casts in its stats: eitr or health a cast, projectiles, summons, the shield's effect; linked from Weapons, the Mistlands guide and the Forge of Potential guide | ~16 |
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
