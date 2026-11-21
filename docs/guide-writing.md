# Rewriting the guides: the guideline (draft, 2026-11-21, waiting for the owner)

Written after reading all seventeen guides end to end, on the owner's word: "write the guideline first, I approve it,
then you rewrite every page". Once approved, its rules replace the conflicting ones in `.claude/rules/site-text.md`
and `docs/guides.md`, and this file keeps only the process.

## What went wrong, read across every page

1. **A page is a pile of answers, not a story.** `site-text.md` asks for "the questions of `guide-questions.md`, each
   answered in a line or two, then its table". So every section is written as if nothing came before it. The Meadows
   build the first home three times (the bold answer, a tip, its own section). The Basics pages come before the
   Meadows in the menu, yet they open with "You are back from your first walk out" and "Your walls stand by the
   water".
2. **The data came first, and the story bent to fit it.** Every scan measure got a sentence and a table. Most of them
   count from the start, so the text says the home stands "by the stones": in the Meadows, A good start, Where to
   build ("Your home stands in the Meadows by the stones, so every distance runs from the start"), the Mountain
   ("smelt it there, by the stones") and the Deep North ("your home stands by the stones"). No source says players
   build there; `walkthrough.md` has no account of the usual game's first base at all. The data also produced the
   one-row tables (Meadows 2, Black Forest 6, Plains 3, Mountain, Ashlands and Deep North 1 each) and the "% of seeds"
   that a player at his own pace never asks for (A good start 34, Black Forest 29, Swamp 21).
3. **The speedrun leaks into the baseline.** "Without a boat", "on the way to the base cave", "the strip" and
   "reset the seed" turn up in the usual player's text. A good start, meant for the runner, half talks to the usual
   player and sends him to "build by the stones".
4. **Six ways of playing on every page.** Each biome carries a "How do I race" section and up to five footnotes.
   The Black Forest's race section has three subsections and eight tables, against twelve for the whole usual game.
5. **No one owned the whole page.** Personas each wrote a section, a judge reconciled opinions, the style pass changed
   sentences, the SEO pass changed headings. Nobody read the page top to bottom as its reader, so contradictions
   between sections survived every pass.

## The rules

### The reader and his story

- **The baseline reader** plays the usual game at his own pace, the first time or again, with no clock. Every biome
  page is a chapter of his saga, told in the order he lives it.
- **The ledger.** Before writing a page, I write its ledger in the Valheim generator's notes (`walkthrough.md` → The
  usual game). It lists:
  - what the player has when he arrives: bosses down, gear, stations, where his home is, which biomes he knows;
  - what he does here, in order;
  - what he has when he leaves.

  A page starts from the previous page's exit and never contradicts it. Each event happens once: a home is built
  once, a boss dies once, an item is made once.
- **The usual game is sourced before it is told.** Where a player builds, when he takes the bees, what he takes on
  which trip: each comes from the game's own code and data, or from players' guides read by a `web-reader`, and gets
  its row in `walkthrough.md` → Sources. Nothing is claimed because it suits a measure. Where the sources disagree,
  the page names the choice and its consequence ("by the shore, for the boat; inland, for the hills").

### What goes on a page

- **A fact earns its place by a decision.** A number, table or chart stays only if it changes what this reader does
  on this page. A measure that serves only another way of playing goes to that way's page, or nowhere.
- **One value is a sentence.** A table needs at least two rows of the same kind, compared. A chart needs at least
  two points of one thing. At most one table per question, and never two tables of the same rows.
- **Distances from the start** only where the reader stands at the start: Eikthyr, the first walk out, the start
  island. Later distances count from where he actually stands then (the previous altar, his home once he has one),
  or the page gives none.
- **No "% of seeds" in the usual player's text** unless the share decides something he does ("nearly always on your
  island" is said without a table).

### The ways of playing

- **Each way of playing lives on its own page**: Speedrun, A speedrunner's start (now "A good start", renamed), No
  death, no map, no portals, Hard, Very hard and Hardcore, Reverse run. They carry the strip, the base cave, the
  detours, the resets and their tables.
- **A biome page carries none of their sections.** At most one footnote a page, only where a way of playing turns a
  decision on this page around and its own page cannot hold it. For the rest, the biome's closing lines link the
  speedrun's leg once.
- This replaces the rule of 2026-11-20 ("woven into the page's story where they belong"): it is the owner's to
  approve.

### The order of the pages

- The saga starts in the Meadows. The Basics (Where to build your base, How much metal a run takes, Boss arenas) are
  references a chapter sends the reader to; they do not pretend to come before the Meadows in time ("You are back
  from your first walk"). A good start, renamed, moves to the Challenges, before Speedrun.

### The voice

- One author: I write every page myself, whole, from its ledger. Agents only bring facts, never sentences.
- Told to "you", the reader's saga, with stakes and pace. Every sentence gives a reason, a choice or a consequence
  the reader did not know; never what the game shows him or what the heading says.
- A link is the reader's next step, not a citation: one link to a page in a page, at the point he needs it.
- The rest of `site-text.md` stays: the bold question and its answer, the h1, numbers from the data, the words, no
  counts, no named places.

## The check before a page is shown

I read the page whole, top to bottom, after the previous page's ending, and answer each question with no:

1. Does anything happen twice (built, killed, found, made)?
2. Does any sentence assume a state the ledger does not give, or contradict the previous page?
3. Is there any speedrun matter outside the speedrun pages: a boat avoided, a clock, the strip, a detour, a reset,
   the base cave?
4. Is there a table of one row, a chart of one point, or two tables of the same rows?
5. Is there a claim without its source row in `walkthrough.md`?
6. Is there a number that changes no decision of this reader?
7. Does any sentence say what the game already shows, or repeat its heading?
8. Does any link not lead to the reader's next step, or appear twice?
9. Does the bold answer promise what the page then tells, in that order?
10. Does any of the owner's earlier remarks apply (`site-text.md`, `seo.md`)?

A page is shown only when every answer is no. The owner reads it whole; a remark of his becomes a question in this
list, so it is checked on every later page.

## The order of the work

1. The owner approves this guideline; its rules move into `site-text.md` and `docs/guides.md`.
2. `walkthrough.md` → The usual game, sourced: where players settle, in what order they take a biome, what each trip
   brings back.
3. The ledgers of all eight biomes, in order, so the chapters join before any is written.
4. The pages in the saga's order: Meadows to Deep North, then the Basics, then the ways of playing, which take the
   speedrun and mode matter the biomes give up.
5. Each page goes through the check, then to the owner.
