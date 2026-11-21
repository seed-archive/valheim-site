# Guides: the structure (draft, 2026-11-17, waiting for the owner)

**Superseded in part, 2026-11-21** (the owner approved the rewrite, `guide-writing.md`): the guides are written
anew. What holds now is `.claude/rules/site-text.md` → The reader and his question, and the menu below as changed
here; "The story" and "A biome guide: one chapter of the run" on this page describe the pages being replaced.

## The menu from 2026-11-21 (to be built with the rewrite)

- **Biomes** first: Meadows … Deep North, the saga of the usual player, each chapter answering "how do I explore
  this biome?".
- **Basics**, references the chapters send to: Where to build your base, How much metal a run takes, Boss arenas.
- **Challenges**, the other ways of playing, each told biome by biome: A speedrunner's start (was A good start),
  Speedrun, No death, no map, no portals, Hard, Very hard and Hardcore, Reverse run.
- Not released, so no redirects from the old addresses.

## The menu: built 2026-11-19 (uncommitted)

Agreed with the owner the same day, after the proposal below: **two guides, two stories**, as sections like the No
Man's Sky menu's; Challenges first (the owner left the order to the session: the menu opens where a run opens, with
A good start), Biomes second.
- **Biomes**: Meadows, Black Forest, Swamp, Mountain, Plains, Mistlands, Ashlands, Deep North; each page answers its
  biome's questions (`guide-questions.md`).
- **Challenges**: A good start (new, `/guides/a-good-start`: the start island's table moved out of the Meadows and
  the first run out), Speedrun, Challenges (no death, no map, no portals, your own rules; one page or one a
  challenge is still the owner's to say), Reverse run.
- **Three sections** (the owner, 2026-11-20: A good start, where to build and the metal are not challenges):
  **Basics** (`/guides/basics`: A good start, Where to build your base, How much metal a run takes, Boss arenas),
  **Biomes**, **Challenges** (Speedrun, No death no map no portals, Hard Very hard and Hardcore, Reverse run), in
  that order in `GUIDE_GROUPS` and in the story; not released, so no redirects from the old addresses.
- **Four new Challenges pages** (now three in Basics and Boss arenas there too) (the owner, 2026-11-20: "All four", from the guide forum's menu step, drafts in the
  Valheim generator's notes): the chain is A good start → Where to build your base → How much metal a run takes →
  Speedrun → No death, no map, no portals → Hard, Very hard and Hardcore → Boss arenas → Reverse run. In the menu
  (`GUIDE_GROUPS`) and routed under `/guides/challenges/`; their text is in `content/en/guides/`, checked against
  the drafts' Unproven notes (unproven lines and rows without data left out), every number from the generator.
- **Moved to the catalogue**: Bosses (`/catalog/bosses`, World group) and Comfort (`/catalog/comfort`, Your base
  group); every link to them follows. Not released, so no redirects.
- **Out of the menu, to be folded in**: Farming into the Plains, the Forge of Potential into the Mountain; their pages
  stay at their addresses until then.
- `lib/guides.ts` → `GUIDE_GROUPS` (`archive.groupBiomes`, `archive.groupChallenges`).
- **Section pages** (the owner, 2026-11-20, as No Man's Sky): each section is a contents page, `/guides/challenges` and
  `/guides/biomes`, its guides under it (`/guides/biomes/swamp`); breadcrumb Home › Guides › section › guide
  (`sectionOf` in `lib/guides.ts`, used by `MarkdownGuide`); a section's name in the menu opens its page. The text
  keeps short links, `/guides/<slug>`, made long by `longGuideLinks` when a guide is read. The old Challenges guide
  (no death, no map, no portals) took the slug `other-rules`, since its section took `/guides/challenges`. Farming and
  the Forge of Potential stay at `/guides/<slug>` until they are folded in.

## The story: rebuilt 2026-11-19 (uncommitted)

The owner, 2026-11-19: the story runs from the Challenges through the Biomes; each page answers its questions
(`guide-questions.md`), each question a heading in the player's words, its answer in a line or two, then its table:
how often (a share of seeds) or how far (a median and its middle half). The chain: A good start → Speedrun →
Challenges → Reverse run → Meadows → … → Deep North, which ends back at the Challenges.

- **Every number from the Valheim generator** (wired 2026-11-20, the owner; the draft file is gone). The scan's
  shares and spreads come from `vh guides` (`lib/valheim/seed-stats.json`); the game's own numbers the text names
  (what a recipe or piece takes, a Sunken Crypt chest's iron) from `vh site` (`lib/valheim/guide-values.json`), merged
  into every guide by `readGuide`. Rows the generator cannot measure honestly were dropped: what rests on random
  spawns (birds and Seekers near the Queen), on luck (an extractor stolen), on no measure yet (the copper base to
  Moder, stone towers by the start, a "big" Swamp, totems within 1 km, villages without water, a root at the Plains'
  edge) or on judgement (how many meads, how many core stands). "From the north–south line through the start" is the
  generator's `offLine`.
- **"never" on A good start** (the owner, 2026-11-19): the Mistlands, Ashlands and Deep North rows read "never"
  instead of 0 %. The Valheim generator's notes trace why it is the game's rule, not chance: the Mistlands begin
  6,000 m from the world's centre, the Ashlands and the Deep North far beyond, and the start stands at the centre.
- **Where do I go first** (the owner, 2026-11-19): Eikthyr, then the Elder, and only then Bonemass and Moder, the
  scouting done along the way; its table gives all four altars from the start.
- **Footnotes by way of playing** (the owner, 2026-11-19): a blockquote opening with the mode in bold
  (`> **Speedrunners** …`), drawn as a side note by `MarkdownGuide`, at the end of a biome's questions. Speedrun notes
  are on all eight biomes; No map, No portals and Reverse run follow from the research
  (the Valheim generator's notes, play modes), the reverse run only where it differs, above all the Deep North.
  **At leisure** and **With no death** added by the owner on 2026-11-20, from the guide forum's drafts
  (`.claude/rules/site-text.md` → A page).
- **Charts by marker** (2026-11-20): a table followed by a line `Chart: share` or `Chart: spread` gets its chart
  with its table in the shared `ChartBlock` of `@seed-archive/ui` (from 1.4.0, the owner: chart and table in one,
  with a switch), its spec built on the server by `MarkdownGuide` → `tableChart`; the line is not shown. Share: kind
  "bars", the row's first percentage on the whole 0–100 scale; spread: kind "spread", the median and middle half on
  one axis. The guide forum writes the markers.
- **No charts yet** (superseded by the markers above). No page has the "How often a seed has it" section any more, so `MarkdownGuide`'s charts draw
  nothing; the next pass decides the charts by the owner's rule (several values of one thing, `site-text.md`), then
  `ShareChart` and `SpreadChart` are kept or deleted.

### The proposal as written (superseded)

The owner, 2026-11-19: the menu first, then the pages. The guides tell one story, the run, answering the site's one
question ("how do I reach the end fastest", `.claude/rules/site-text.md`) with the questions of each biome
(`guide-questions.md`): "I went looking for this, it was there on so many seeds at such a distance, it was or was not
mine, I went on". Modelled on the No Man's Sky section's menu (its `docs/seo.md` → The story the site tells): the
menu reads as one trip, each group is a bold line, each page's last sentence leads to the next page of its group.

| Group | Pages, in order | What it is |
|---|---|---|
| **The run** | Speedrun (the overview: what a run is, the route boss by boss, the run-wide odds), A good start (new: the start island and the scouting run, taken out of the Meadows guide), Meadows, Black Forest, Swamp, Mountain, Plains, Mistlands, Ashlands, Deep North | the story; each biome page answers its questions in order, each with its table or chart; the Deep North's last line leads back to the overview |
| **Other ways to play** | Reverse run, Challenges (no death, no map, no portals, your own rules) | out of the story: they change the rules of the run |
| **Topics** | Bosses, Forge of Potential, Farming, Comfort | reference the chapters link to; no part of the story |

Open for the owner: the Speedrun page first as the overview, or last as the summary; the name "A good start".

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
6. **Can you skip it?**: the cost of skipping, never a yes or no (the Valheim generator's notes on skipping).
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
