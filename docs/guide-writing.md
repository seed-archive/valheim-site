# Rewriting the guides: the guideline and the plan (approved by the owner, 2026-11-21)

The owner, 2026-11-21, after reading half of the Meadows guide: "write the guideline first, I approve it, then you
rewrite every page". Draft 2 followed a full second reading: all seventeen guides with their 167 tables, the
questions the guides were built from, and the Valheim generator's notes on how the game is played. Draft 3 is that
plan as the owner and the session agreed it the same day, point by point. Once approved, its rules replace the
conflicting ones in `.claude/rules/site-text.md` and `docs/guides.md`.

## Agreed with the owner

1. **The frame changes.** The guides were built from the speedrun's questions ("a biome is passed, not explored")
   and only re-voiced for the usual player. The chapters are derived again from the usual player's question: **how
   do I explore this biome?**
2. **The speedrun stays a large part of the section, not its main line.** The site has a tool for the runner, and
   his run is the minimum every other way of playing is measured against. It gets its own pages, as do no death, no
   map, no portals, a harder world and the reverse run.
3. **We do not repeat the raven.** The game's own raven tells a player to pick up flint, build a workbench, eat,
   sleep in a bed. The home page already says it: the raven gives the hints, we give the odds. A chapter tells what
   the raven does not: what the land holds, how much of it, how far it lies, what to expect and what to choose.
4. **Two homes, two sets of distances.**
   - The usual player settles in the Meadows on open ground by the water, where he later builds his boat and sails
     from. For the measures, his home is the sea shore nearest the Sacrificial Stones. Not the stones themselves:
     nothing is gained by building there.
   - The speedrunner's base is a small one in the Black Forest, by a troll cave with copper.

   Every "how far" is counted from the home of the reader it is written for.
5. **Tables.** A table of one row is never made. A table of two rows becomes a sentence. A table has three rows or
   more of one kind, under the heading it answers.
6. **The other ways of playing leave the chapters** and are told on their own pages, biome by biome. This is a
   trial the owner agreed to ("let us try"): the Speedrun page must cover all eight biomes without drowning in
   tables. With the one-row and two-row tables gone, it may hold. If it does not, the page is split, or the notes
   return to the chapters, on the owner's word after he has read the first sample.
7. **"Can you skip it?" leaves the chapters**: it is the speedrun's and the reverse run's question.
8. **The menu.** The saga starts in the Meadows. The Basics become references. "A good start" is renamed
   "A speedrunner's start" and moves to the Challenges, before Speedrun.
9. **Two readings by the owner before the bulk of the work.**
   - First the eight ledgers: for each biome about ten lines saying what the player arrives with, what he does there
     in order, and what he leaves with. They are cheap to read, and a wrong turn in them costs a line to fix, not a
     page.
   - Then the Meadows chapter, together with the Meadows' part of the speedrun and the other ways of playing, so the
     trial of point 6 is judged on a real page.

   The other seven biomes are written only after both.

## What the reading found

1. **The pages were never written for the usual player.** Their questions were the speedrun's (2026-11-19). The
   next day the baseline became the usual game, and the pages were re-voiced, not derived again. The generator's
   notes tell the speedrun stage by stage and the usual game in one sentence. Every chapter still asks the runner's
   two questions, "What do I need from …?" and "Can you skip …?", and the Black Forest gives its "race" section
   eight tables against twelve for the whole usual game. So each of the owner's remarks fixed a sentence, and the
   frame stayed the runner's.
2. **The story was bent to fit the data.** The scan measured from the start, so the text settled the player "by the
   stones" on six pages (Meadows, Black Forest, Mountain, Deep North, A good start, Where to build your base). No
   source says players build there.
3. **A page is a pile of answers, not a story.** The rule asked for "each question answered in a line or two, then
   its table", so every section starts from nothing. The Meadows build the first home three times. The Basics come
   before the Meadows in the menu and open with "You are back from your first walk out".
4. **Tables stand in for telling.** 167 tables on seventeen pages; 14 have one row and 57 have two; "of seeds"
   stands 216 times. Tables are parked under headings they do not answer: the carapace armour's kills under "Does a
   cleared mine stay clear?", the Asksvin's under "How do I build Fader's arena?".
5. **Six ways of playing on every page**: 65 footnotes, and a section for the racer, the reverse run, no map, no
   portals or one life on seven of the eight biomes. The owner asked for the notes; on the page they outgrew the
   story they were notes to.
6. **Sentences that do not tell.**
   - A sum left to the reader: "empty it within {{hiveHoneyMax}} × {{hiveSeconds}} s".
   - Wit in place of the fact: "A troll cave's own trolls never got the message"; "it is no chore; it is shopping".
   - An answer that is not one: "Where is Yagluth's altar?" is answered "Expect a long road".
   - A reason made up to carry a number: the home "among the birches and oaks", "since the portal and the Karve will
     want" fine wood.
7. **No one owned the whole page.** Personas wrote sections, a judge reconciled them, a style pass changed
   sentences, an SEO pass changed headings. No one read a page top to bottom as its reader.

## The rules

### The source comes first

- **The usual game is written down before it is told.** The generator's notes keep the speedrun's account under its
  own name and get a new account of the usual game, biome by biome: how a player at his own pace explores the land.
  Each fact has its source:
  - the game's data, which the catalogue already holds: what each biome gives, what is made from it and at which
    station, what its creatures do and what hurts them;
  - players' written guides and wikis, read as text by a `web-reader`: where players settle, in what order they take
    a biome's tasks.
- The raven's texts are read too, as the list of what a chapter leaves out (Agreed, 3).
- Nothing is claimed because it suits a measure. Where sources disagree, the chapter gives the choice and what
  follows from each side.

### The ledger

- Before a chapter is written it gets a ledger in the generator's notes:
  - what the player has when he arrives: bosses down, gear, stations, his home, the biomes he knows;
  - what he does here, in order;
  - what he has when he leaves.
- A chapter starts from the previous chapter's exit and never contradicts it. Each event happens once: a home is
  built once, a boss dies once, a thing is made once.

### The chapter's spine

A biome chapter follows the order the player lives it. Headings stay questions in the player's words, but each
continues the one before:

The owner gave the spine on reading the ledgers (2026-11-21):

1. **Arriving weak**: everything here beats a newcomer; what this land does to him, and where he camps.
2. **Surviving**: the biome's own resource where it lies at the edge, and the biome's gear made from it.
3. **Combing the land**, now at ease: its places, materials and food; how much the world gives and how far from
   home; what the boss asks for comes by the way. The catalogue holds the lists; the chapter says what matters
   first and why, and links the list once.
4. **The boss**: finding him, getting ready, the fight, what his trophy and his drop open.
5. **Leaving**: the chapter's conclusion, with what he carries into the next chapter and the way into it.

A choice is analysed, never made for the reader: each side's reasons with the numbers, and the choice left to him
(bronze or troll leather; the camp on the crypt or outside the Swamp; Yagluth by blade or by bow).

### What goes on a page

- **A fact earns its place by a decision of this reader.** What changes nothing he does here goes to the page of the
  player it serves, or nowhere.
- **Numbers are the site's part of the bargain**, so a chapter keeps them: what the world gives, how much to expect,
  how far it lies from the usual player's home. What only a runner weighs (the strip, a detour, a reset, what shares
  the start island) is told on the runner's pages.
- **One value is a sentence, two values are a sentence.** Tables as agreed (Agreed, 5). A chart has two points or
  more of one thing.
- **A share that is all but always or never** is a sentence without a number.
- **A sum is done for the reader**: the page gives the result, never the formula.
- **A conclusion stands under the data** (the owner, 2026-11-21, first said for No Man's Sky; the archive's
  `.claude/guides/guide-method.md`, point 6): under a table, a sentence or two say what to take, keep or skip, and
  why, with the numbers that decide it. A number the tables do not hold is computed by the generator, never
  guessed.
- **A chapter ends with its conclusion**, and the way into the next chapter is inside it, not a bare "next is X".
- **The home is placed once**, in the Meadows chapter: open ground by the sea. Later chapters say "your home".

### The ways of playing

- Each has its own pages: Speedrun and A speedrunner's start; No death, no map, no portals; Hard, Very hard and
  Hardcore; Reverse run. They take the race sections, the "coming from the north" sections, the skipping and the
  footnotes, told biome by biome in the same order as the chapters.
- The Speedrun page is the runner's own saga through the eight biomes, on the same rules as a chapter: his base, his
  distances, his tables of three rows or more.
- A chapter's last lines link the speedrun's part of that biome once.

### The voice

- One author: I write every page whole, from its ledger. Agents bring facts, never sentences.
- Told to "you", with stakes and pace. Every sentence gives a reason, a choice or a consequence the reader did not
  know. Wit never replaces the fact it stands on.
- A link is the reader's next step: one link to a page in a page, where he needs it.
- The rest of `site-text.md` stays: the bold question and its answer, one h1, numbers from the data, the words, no
  counts, no named places. The bold questions are asked again for the usual player ("How do I explore …?") and
  checked against the semantic core in `docs/seo.md`.

## The check before a page is shown

I read the page whole, top to bottom, after the previous chapter's ending and beside its ledger. Each answer must be
no:

1. Does anything happen twice (built, killed, found, made)?
2. Does a sentence assume what the ledger does not give, or contradict an earlier chapter?
3. Is there another reader's matter: a clock, the strip, a detour, a reset, the base cave, a skipped boss?
4. Is the home placed anywhere but the Meadows chapter, or a distance counted from anywhere but the reader's home?
5. Is there a table under three rows, a chart of one point, a table under a heading it does not answer?
6. Is there a claim without its source in the generator's notes?
7. Is there a number that changes nothing this reader does?
8. Does a sentence say what the raven or the game's screen already tells, repeat its heading, or leave a sum to the
   reader?
9. Does a joke or a figure of speech stand where a fact should?
10. Does a link not lead to the reader's next step, or stand twice?
11. Does the bold answer promise what the page then tells, in that order?
12. Does a table stand without its conclusion under it, or the chapter end on a bare "next is X"?
13. Does one of the owner's earlier remarks apply (`site-text.md`, `seo.md`)?

Then one independent reader, read-only, gets the page and its ledger and answers the same thirteen questions. It
reports; I fix. A page goes to the owner when both readings come back clean. A remark of his becomes a question in
this list, so every later page is checked for it.

## The plan

| Step | What | The owner |
|---|---|---|
| 1 | This plan approved; the method goes to the coordinator for the other games (`guide-method.md`) | approves |
| 2 | The rules move into `site-text.md` and `docs/guides.md`; the rules they replace are removed | |
| 3 | The generator's notes: the speedrun's account takes its own name; the usual game is written anew, biome by biome, with its sources | |
| 4 | The eight ledgers | reads them |
| 5 | The measures: the usual player's home becomes the sea shore nearest the stones, and every "from home" is counted from it; the runner's stay counted from his copper base; recounted on the trial worlds | starts the big recount on M1 when he chooses |
| 6 | The Meadows chapter, with the Meadows' part of Speedrun, A speedrunner's start and the other ways of playing, through the check | reads them, and judges the trial of separate pages |
| 7 | Black Forest to Deep North, in order, each with its part of the other pages, each through the check | |
| 8 | The pages of the ways of playing made whole: Speedrun and A speedrunner's start; No death, no map, no portals; Hard, Very hard and Hardcore; Reverse run | |
| 9 | The Basics as references: Where to build your base, How much metal a run takes, Boss arenas; Forge of Potential | |
| 10 | The menu, the links between pages, the measures the guides no longer use | |

## Page by page

| Page | What happens to it |
|---|---|
| Meadows … Deep North | Written anew from the ledgers on the chapter's spine, for the player who explores. Their race sections, "coming from the north" sections, footnotes and skipping go to the ways of playing. Their distances are counted from the usual home. |
| A good start | Renamed A speedrunner's start, moved to the Challenges. It keeps what the start island holds and the first loop; its usual-player sections leave. |
| Speedrun | Becomes the runner's saga through the eight biomes, with each biome's leg from the chapters. Split if it grows too long, on the owner's word. |
| No death, no map, no portals | Gains the chapters' notes for its three rules, biome by biome. |
| Hard, Very hard and Hardcore | Stays a reference; its sentences go through the check. |
| Reverse run | Gains the chapters' "coming from the north" sections. |
| Where to build your base | Rewritten from what players weigh when they settle (open ground, the sea, the hauls, the raids); its no-portals half goes to No death, no map, no portals. |
| How much metal a run takes | Stays a reference: the full kit by age; the category's least metal goes to Speedrun. |
| Boss arenas | Stays a reference; its opening no longer pretends to follow a chapter. |
| Forge of Potential | Stays as it is. |
