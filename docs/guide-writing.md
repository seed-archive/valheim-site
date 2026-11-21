# Rewriting the guides: the guideline and the plan (draft 2, 2026-11-21, waiting for the owner)

The owner, 2026-11-21, after reading half of the Meadows guide: "write the guideline first, I approve it, then you
rewrite every page"; then, with a new model: "go through the guides again and update the plan". Draft 2 replaces
draft 1. It rests on a full second reading: all seventeen guides with their 167 tables, the list of questions the
guides were built from, and the Valheim generator's notes on how the game is played. Once approved, its rules
replace the conflicting ones in `.claude/rules/site-text.md` and `docs/guides.md`.

## What the owner decides

1. **The chapters are written anew for the usual player**, from a sourced account of the usual game, not edited from
   the present pages (What the reading found, 1).
2. **Which statistics a chapter keeps.** Proposed: those that tell what the world will give and how much to expect
   (enough drake nests, totems, iron in the crypts); those that only tell how long the way is (distance from the
   start, "on the start island", the strip) leave the chapters for the speedrun pages and the seed tool.
3. **The ways of playing leave the biome chapters** for their own pages. This reverses the rule of 2026-11-20
   ("woven into the page's story where they belong").
4. **"Can you skip it?" leaves the chapters** too: skipping is the speedrun's and the reverse run's question.
5. **The order of the menu**: the saga starts in the Meadows; the Basics become references; "A good start" is renamed
   "A speedrunner's start" and moves to the Challenges, before Speedrun.
6. **Two gates before the bulk of the work**: the owner reads the eight ledgers (about ten lines a biome) before any
   chapter is written, and reads the Meadows chapter before the other seven.

## What the reading found

1. **The pages were never written for the usual player.** The questions they answer were written for the speedrun
   (2026-11-19: "a biome is passed, not explored"). The next day the baseline became the usual game, and the pages
   were re-voiced, not re-derived. The generator's notes tell the speedrun stage by stage and the usual game in one
   sentence. So a chapter tells a player at his own pace what a run measures, and leaves out what he lives by:
   - the Meadows chapter has an altar's distance, hive counts and a trader, and no shelter, bed, food or armour; the
     words "bed" and "flint" stand nowhere in the first three chapters;
   - the Black Forest gives its "race" section eight tables and the whole usual game twelve;
   - every chapter asks "What do I need from …?" and "Can you skip …?", a runner's two questions.

   This is why the owner's remarks keep returning: each fix patched a sentence, and the frame stayed the runner's.
2. **The story was bent to fit the data.** The scan measures from the start, so the text settles the player "by the
   stones" on six pages (Meadows, Black Forest, Mountain, Deep North, A good start, Where to build your base). No
   source says players build there. The game's own raven says only "wherever home may be".
3. **A page is a pile of answers, not a story.** The rule asks for "each question answered in a line or two, then
   its table", so every section starts from nothing. The Meadows build the first home three times. The Basics come
   before the Meadows in the menu and open with "You are back from your first walk out".
4. **Tables stand in for telling.** 167 tables on seventeen pages; 14 have one row and 57 have two; "of seeds"
   stands 216 times. Tables are parked under headings they do not answer: the carapace armour's kills under "Does a
   cleared mine stay clear?", the Asksvin's under "How do I build Fader's arena?", the lox's under "Can a cleared
   village be my camp?".
5. **Six ways of playing on every page**: 65 footnotes, and a section for the racer, the reverse run, no map, no
   portals or one life on seven of the eight biomes.
6. **Sentences that do not tell.**
   - A sum left to the reader: "empty it within {{hiveHoneyMax}} × {{hiveSeconds}} s".
   - Wit in place of the fact: "A troll cave's own trolls never got the message"; "it is no chore; it is shopping".
   - An answer that is not one: "Where is Yagluth's altar?" is answered "Expect a long road".
   - A reason made up to carry a number: the home "among the birches and oaks", "since the portal and the Karve will
     want" fine wood.
   - A question no player asks: "Is Hildir worth looking for?", "Where do the Plains meet the Mistlands?".
7. **No one owned the whole page.** Personas wrote sections, a judge reconciled them, a style pass changed
   sentences, an SEO pass changed headings. No one read a page top to bottom as its reader.

## The rules

### The source comes first

- **The usual game is written down before it is told.** For each biome the generator's notes get an account of how
  a player at his own pace lives it, each fact with its source:
  - the game's own guidance, which names the path its makers meant (the raven's texts: arm yourself, eat, shelter by
    a fire and make a bed before the first boss);
  - the game's data, which the catalogue already holds: what each biome gives, what is made from it and at which
    station, what its creatures do and what hurts them, its food;
  - players' written guides and wikis, read as text by a `web-reader`, for what players in fact do: where they
    settle, in what order they take a biome's tasks.
- Nothing is claimed because it suits a measure. Where sources disagree, the chapter gives the choice and what
  follows from each side.

### The ledger

- Before a chapter is written it gets a ledger in the generator's notes:
  - what the player has when he arrives: bosses down, gear, stations, his home, the biomes he knows;
  - what he does here, in order;
  - what he has when he leaves.
- A chapter starts from the previous chapter's exit and never contradicts it. Each event happens once: a home is
  built once, a boss dies once, a thing is made once.
- The owner reads the eight ledgers together before any chapter is written. A wrong turn costs him a line to
  correct, not a page.

### The chapter's spine

A biome chapter follows the order the player lives it. Headings stay questions in the player's words, but each
continues the one before:

1. **Arriving**: what this land does to a newcomer, and what he must have before stepping in.
2. **Living here**: what changes for his home or camp, only where the biome changes it (the first shelter, the
   smelter, the farm, the roofed foothold).
3. **What the land gives**: its materials, what they become, its food. The catalogue holds the lists; the chapter
   says what to make first and why, and links the list once.
4. **The boss**: finding him, his offering, getting ready, the fight in a line, what his trophy and his drop open.
5. **Leaving**: what he carries into the next chapter, and the link to it.

### What goes on a page

- **A fact earns its place by a decision of this reader.** What changes nothing he does here goes to the page of the
  player it serves, or nowhere.
- **One value is a sentence.** A table has three rows or more of one kind, compared; two values are a sentence. A
  chart has two points or more of one thing. One table a question at most, under the heading it answers.
- **Statistics** as decided above (What the owner decides, 2). A share that is all but always or never is a
  sentence without a number.
- **No distance from the start** after the first walk out, and no home "by the stones": the chapter speaks of "your
  home" and never places it.
- **A sum is done for the reader**: the page gives the result, never the formula.

### The ways of playing

- Each lives on its own page: Speedrun, A speedrunner's start, No death, no map, no portals, Hard, Very hard and
  Hardcore, Reverse run. They take the race sections, the "coming from the north" sections, the skipping and the
  footnotes, ordered biome by biome.
- A biome chapter carries none of it. Its last lines link the speedrun's leg of that biome once.

### The voice

- One author: I write every page whole, from its ledger. Agents bring facts, never sentences.
- Told to "you", with stakes and pace. Every sentence gives a reason, a choice or a consequence the reader did not
  know. Wit never replaces the fact it stands on.
- A link is the reader's next step: one link to a page in a page, where he needs it.
- The rest of `site-text.md` stays: the bold question and its answer, one h1, numbers from the data, the words, no
  counts, no named places. The bold questions are asked again for the usual player ("What do I do in …?") and
  checked against the semantic core in `docs/seo.md`.

## The check before a page is shown

I read the page whole, top to bottom, after the previous chapter's ending and beside its ledger. Each answer must be
no:

1. Does anything happen twice (built, killed, found, made)?
2. Does a sentence assume what the ledger does not give, or contradict an earlier chapter?
3. Is there speedrun matter: a boat avoided, a clock, the strip, a detour, a reset, the base cave, a skipped boss?
4. Is the home placed anywhere, or a distance counted from the start after the first walk out?
5. Is there a table under three rows, a chart of one point, a table under a heading it does not answer?
6. Is there a claim without its source in the generator's notes?
7. Is there a number that changes nothing this reader does?
8. Does a sentence say what the game shows, repeat its heading, or leave a sum to the reader?
9. Does a joke or a figure of speech stand where a fact should?
10. Does a link not lead to the reader's next step, or stand twice?
11. Does the bold answer promise what the page then tells, in that order?
12. Does one of the owner's earlier remarks apply (`site-text.md`, `seo.md`)?

Then one independent reader, read-only, gets the page and its ledger and answers the same twelve questions. It
reports; I fix. A page goes to the owner when both readings come back clean. A remark of his becomes a question in
this list, so every later page is checked for it.

## The plan

| Step | What | Gate |
|---|---|---|
| 1 | The owner approves this guideline; the method goes to the coordinator for the other games (`guide-method.md`) | the owner |
| 2 | The rules move into `site-text.md` and `docs/guides.md`; the rules they replace are removed | |
| 3 | The usual game, sourced, in the generator's notes: the raven's texts (read), the game's data by biome, players' written guides | |
| 4 | The eight ledgers | the owner reads them |
| 5 | The Meadows chapter, through the check | the owner reads it |
| 6 | Black Forest to Deep North, in order, each through the check | |
| 7 | The ways of playing: Speedrun and A speedrunner's start take what the chapters gave up; then No death, no map, no portals; Hard, Very hard and Hardcore; Reverse run | |
| 8 | The Basics as references: Where to build your base, How much metal a run takes, Boss arenas; Forge of Potential | |
| 9 | The menu, the links between pages, the measures the generator no longer writes for the guides | |

## Page by page

| Page | What happens to it |
|---|---|
| Meadows … Deep North | Written anew from the ledgers on the chapter's spine. Their race sections, "coming from the north" sections, footnotes and skipping go to the ways of playing; most "of seeds" tables go to Speedrun or leave. |
| A good start | Renamed A speedrunner's start, moved to the Challenges. Its usual-player sections ("Where do I build my home?", "Where are my first nights safe?") leave: the first is Where to build your base's, the second Boss arenas'. |
| Speedrun | Gains each biome's leg from the chapters, biome by biome. Split in two if it grows too long, with the owner. |
| No death, no map, no portals | Gains the chapters' footnotes for its three rules, biome by biome. |
| Hard, Very hard and Hardcore | Stays a reference; its sentences go through the check. |
| Reverse run | Gains the chapters' "coming from the north" sections. |
| Where to build your base | Rewritten from what players weigh when they settle (the sea, the hauls, the raids), without a home "by the stones"; its no-portals half goes to No death, no map, no portals. |
| How much metal a run takes | Stays a reference: the full kit by age for the usual player; the category's least metal goes to Speedrun. |
| Boss arenas | Stays a reference; its opening no longer pretends to follow a chapter. |
| Forge of Potential | Stays; folded into the Mountain chapter's Leaving if the owner still wants it there. |
