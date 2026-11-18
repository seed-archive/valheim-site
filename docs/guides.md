# Guides: the structure (draft, 2026-11-17, waiting for the owner)

The owner, 2026-11-17: a guide tells the story of a run through the world, focused on speed, quality and quantity
("faster, higher, stronger"). The catalogue is the reference a guide links to; the tools (the map, the seed rating,
the craft tree) are what a guide sends the player to use. First the structure, then the text, then the links.

## The pages, in the order of a run

| Page | Address | Exists | Its question |
|---|---|---|---|
| Meadows | `/guides/meadows` | yes, with scan numbers | What do I need from the Meadows? |
| Black Forest | `/guides/black-forest` | yes, with scan numbers | What do I need from the Black Forest? |
| Swamp | `/guides/swamp` | a stub | What does the Swamp give, and how to get through it? |
| Mountain | `/guides/mountain` | a stub | What does the Mountain give? |
| Plains | `/guides/plains` | a stub | What do the Plains give? |
| Mistlands | `/guides/mistlands` | a stub | What do the Mistlands give? |
| Ashlands | `/guides/ashlands` | a stub | What do the Ashlands give? |
| Deep North | `/guides/deep-north` | a stub | What to bring to the Deep North? |
| How to kill each boss | `/guides/bosses` | yes, data only | How do I kill each boss? |
| Speedrun | `/guides/speedrun` | new | How to finish Valheim fast? |
| Reverse run | `/guides/reverse-run` | new | How to play Valheim backwards? |
| Farming | `/guides/farming` | yes, tables | How to farm? |
| Comfort | `/guides/comfort` | yes, tables | How do I raise comfort? |

## A biome guide: one chapter of the run

Each chapter answers its question in the lead, then goes in the order a player meets things. Each section measures
speed (what saves time), quality (the best a run has by then) and quantity (how much to gather):

1. **Getting there**: how far the biome usually is (scan numbers), what to bring (food, meads, the gear that
   resists its danger). Links: the seed map, the previous chapter.
2. **What to take from it**: the materials that open the next stage, where they stand (places and creatures), how
   many a run needs. Links: Materials, Creatures, Dungeons, the craft tree's band of the biome.
3. **What to make**: the station level, the weapon and the armour worth making, not everything. Links: Weapons,
   Bows, Armour, Crafting stations, the craft tree.
4. **Food and meads** of the biome. Links: Food, Meads.
5. **The boss**: the summon and where it comes from, the altar's distance (scan), the straight fight in one line and
   the other way in one line. Links: How to kill each boss (its anchor), Trophies (its power).
6. **Can you skip it?**: the cost of skipping, never a yes or no (walkthrough.md → Skipping).
7. **Next**: one sentence leading to the next chapter.

## Speedrun

The run as one page, a section a stage:
1. **What a speedrun is in Valheim.** The community's All Bosses categories: Classic, Mistlands, Ashlands and Deep
   North; random or set seed; what glitchless allows, AI tricks yes, clips no. Today's records are about 3 hours for
   Classic and 11 for Deep North; they are a moving fact, so the page links speedrun.com instead of typing them.
2. **Choosing the seed.** What makes a seed fast: the altars near, copper and tin by a troll cave. Links: the seed
   rating, the seed map.
3. **The route, stage by stage.** A few lines a boss on what the stage must give and nothing more, with links into
   the chapters and the craft tree.
4. **Saving time:**
   - creatures as tools, which the rules allow (the troll, the Elder, the Seeker Soldier);
   - what to skip (the bronze pickaxe…);
   - the food budget, at most the run's hours × 3 slots of food.
5. **The craft tree as the plan:** switch on what the run makes, read the raw total.

## Reverse run

1. **What it is.** The bosses backwards, the late biomes first. The one written run is from 2021: every boss from
   Yagluth to Eikthyr in 45 hours. The owner's account of runs straight to the Deep North.
2. **The gates on the way back:**
   - the Drakkar for the Ashlands;
   - black metal and the Mistlands for the Queen's Sealbreaker and Fader's bells;
   - Fader for the Deep North's embers;
   - the Elder's key for Bonemass's bones;
   - Eikthyr's antler for the pickaxe.
   A table: gate, what opens it, how to get round it.
3. **Staying alive with nothing:** the cold (fire and shelter, frost resistance), the first kills, a shelter.
4. **Doing without:** a troll mines before the pickaxe; Yagluth from under the ground; ore through portals only after
   the Ashlands' stone portal.
5. **The seed for it:** the Deep North near the start, a future measure of the seed rating.

## Links

- Every guide links to at least: the seed map, two catalogue pages, the next and the previous chapter.
- Every catalogue page is linked from at least two guides (the shared seo.md: two links in before release).
- A link stands in a sentence; its anchor text is the target's h1 or a row's name; no "see also".

## Where the text lives (the No Man's Sky site's way, its session, 2026-11-17)

- **Markdown.** Each guide is a Markdown file, `content/en/guides/<slug>.md`, rendered by one page component. Short
  strings (labels, table heads) stay react-intl keys.
- **Numbers.** No number is typed: the text holds `{{name}}` placeholders, filled from the generator's data (scan
  numbers, recipes, health), so a recount moves them.
- **Tables.** A table sits under its section by a mark, `<!-- widget:name -->`; the page cuts the HTML at the marks
  and the h2s and puts the table in.
- **Meta description.** A short `fact` (at most 160 characters) answers the question.
- **Headings.** An h2 is named by what the player sees, and its id comes from its words, so other pages can link
  `#its-anchor`.
- **Ending.** The page ends with one sentence linking the next guide.
- **Corrections the owner made most there:**
  - no counts of what was checked;
  - no named places;
  - the tip briefly, the mechanism in the generator's notes;
  - the game's terms, one word for one thing;
  - links only inside sentences;
  - tables sorted by their main value, one size for every picture.
