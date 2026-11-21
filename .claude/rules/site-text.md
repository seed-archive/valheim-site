---
paths:
  - "content/**"
  - "lib/i18n/**"
  - "app/**/page.tsx"
---

# Site text

The rules of text shared with the No Man's Sky site, with Valheim's own where the games differ.

**The reader and his question** (the owner, 2026-11-21, replacing the rules of 2026-11-19 and 2026-11-20; the
findings and the plan are `docs/guide-writing.md`): a biome guide is a chapter written for the usual player, who
goes through the game at his own pace, and answers his question: **how do I explore this biome?** It is told in
the order he lives it, on one spine (the owner, 2026-11-21): he arrives weak, and everything beats him; he
survives by taking the biome's own resource where it lies at its edge and making the biome's gear from it; at ease
then, he combs the whole land, and what the boss asks for comes by the way; he kills the boss; he leaves with what
the next chapter starts from. Headings stay questions in his words, and each continues the one before. **A choice
is analysed, never made for him**: the page gives each side's reasons with the numbers and leaves the choice to the
reader.

**The ways of playing have their own pages** (the owner, 2026-11-21, as a trial he judges on the Meadows): Speedrun
and A speedrunner's start; No death, no map, no portals; Hard, Very hard and Hardcore; Reverse run. They are told
biome by biome, in the chapters' order. A chapter carries none of their sections, footnotes or "can you skip it":
its last lines link the speedrun's part of that biome once. The speedrun is a large part of the section, never its
main line.

**We do not repeat the raven** (the owner, 2026-11-21): the game's own raven tells a player to pick up flint, build
a workbench, eat and sleep in a bed, and the home page says so. He is part of the game: a page may lean on what he
says, and never repeats him word for word. A page tells what the raven does not: what the land
holds, how much of it, how far it lies, what to expect and what to choose.

**Two homes** (the owner, 2026-11-21): the usual player lives in the Meadows on open ground by the sea, where he
builds his boat; the Meadows chapter places the home once, and later chapters say "your home". It never stands "by
the stones". The speedrunner's base is a small one in the Black Forest by a troll cave with copper. Every distance
on a page is counted from the home of the reader the page is written for.

**A fact earns its place by a decision of this reader.** A number, table or chart that changes nothing he does here
goes to the page of the player it serves, or nowhere. A chapter keeps what the world gives, how much to expect and
how far it lies from the usual home; what only a runner weighs (the strip, a detour, a reset, what shares the start
island) is the runner's pages'.

**Tables and charts** (the owner, 2026-11-19 and 2026-11-21): one value is a sentence, and so are two. A table has
three rows or more of one kind and stands under the heading it answers; a table of one row is never made. A chart
compares two or more parameters of one thing (the 1st, 3rd and 4th Charred Fortress from Fader's altar), never
different things on one chart (fortresses with Morgen holes). A sum is done for the reader: the page gives the
result, never the formula. A share that is all but always or never is a sentence without a number. **A conclusion
stands under the data** (the owner, 2026-11-21, the archive's `.claude/guides/guide-method.md`): under a table, a
sentence or two say what to take, keep or skip and why, with the numbers that decide it; a number the tables lack
is computed by the Valheim generator, never guessed. A chapter ends with its conclusion, the way into the next
chapter inside it.

**The ledger** (the owner, 2026-11-21): before a chapter is written, the Valheim generator's notes get its ledger:
what the player has when he arrives, what he does in order, what he has when he leaves. A chapter starts from the
previous chapter's exit, and each event happens once: a home is built once, a boss dies once, a thing is made once.
One author writes the whole page from its ledger; agents bring facts, never sentences. Before a page is shown it
passes the check of `docs/guide-writing.md`.

**The voice** (the owner, 2026-11-20, after reading the start island text: "written for complete idiots"): we write
for living people, who come to use the section as a reference and stay for the story; text that explains the
obvious makes them close the site. Even where the facts are tables, the prose must be a pleasure to read: a
gripping story of a Viking running through the biomes one after another, told to the reader as "you", with stakes,
pace and a little wit; every sentence gives a reason, a choice or a consequence the reader did not know, never what
the game already tells them or what the heading already says. Wit never replaces the fact it stands on, and no
reason is made up to carry a number (2026-11-21).

## A page

- Every page has one `<h1>`. A menu label equals the `<h1>` of the page it opens.
- Each page opens with its question in bold, in the words a player types, and answers it in the same line. A
  chapter's sections then follow its spine, in the order the bold answer promised; a reference's sections back the
  answer up, biggest point first.
- A page's `<title>` is `<title> in Valheim — Seed Archive`. The game's name stands once a page, in its `<title>`; the
  bold question and the headings do not repeat it (`docs/seo.md`).
- A full-screen tool (the map) keeps the shared header and drops the footer; it has a title, a description and a
  canonical address, stands in the sitemap, and is linked from at least two pages of the section (the shared
  `seed-archive/docs/seo.md`, "Header and footer").
- No number is typed into a text: numbers come from the data, so a recount moves them.
- Every claim is proven in the Valheim generator's notes. A page states what is known and is silent on the rest: never
  "not researched yet". What only the game can answer stays in the generator's notes and off the page.
- A page gives the player's tip briefly; the mechanism and the data behind it stay in the generator's notes.
- A guide's description is its `fact`: the answer of its bold question, 160 characters or fewer, without the game's
  name (`lib/content.ts` → `readGuide`; from the No Man's Sky section, 2026-11-20).
- A chapter ends with a sentence that links the next chapter, Meadows to Deep North (the owner, 2026-11-21: the saga
  starts in the Meadows). The Basics (Where to build your base, How much metal a run takes, Boss arenas) are
  references a chapter sends the reader to and do not pretend to come before or after one. The Challenges run A
  speedrunner's start → Speedrun → No death, no map, no portals → Hard, Very hard and Hardcore → Reverse run
  (`docs/guides.md` → The menu). A link is the reader's next step: one link to a page in a page, where he needs it.
  Every guide is reached from at least two other pages (from the No Man's Sky section, 2026-11-20).
- **The strip** (the owner, 2026-11-20) is the speedrun's idea: the run goes from the middle south, then north, and
  keeps to one imaginary line through the start so as not to lose time, leaving it only when the boat must round an
  island. It is explained once, on the Speedrun guide (`#what-is-the-strip`); every other page that uses it links the
  word "strip" there. A player who is not running goes wherever he likes, so a guide never treats the strip as the
  only way.
- On a page of one way of playing, a short remark for another is a footnote, a blockquote opening with the mode in
  bold (`> **With no map** …`); a biome chapter has none (The ways of playing have their own pages, above). The
  labels (the owner, 2026-11-20): **Speedrunners**, **With no map**, **With no portals**, **On a reverse run**, **At
  leisure** (the builder who plays the whole game slowly), **With no death** (the hardcore player, safe and on a
  harder world).

## Header and home page

The shared rules (the portal's D15 and `seed-archive/docs/seo.md`, the owner, 2026-11-16):

- The header menu has at most four items, each a visitor's question named the same in every game: Catalog, Guides,
  Tools, Quests — only the ones the section has. The map goes under Tools. More goes into their dropdowns. Below md
  (900 px) the whole menu is in the drawer. About is in the footer, never in the header.
- The home page links About once, inline in the home page's lead (as the No Man's Sky site has it), the anchor text
  as on the About page.

## Links

- A link stands inside a sentence, and its anchor text appears on the page it opens (its `<h1>`, lead, or title). No
  "See also" or "See more" rows.
- No page links to itself in its own text; the header and the footer are the only exception.
- No links to Reddit (they leak rank). External links only where a page cites a rule.
- The rest of the rules of links are the portal's `docs/seo.md`; this section's link map is `docs/seo.md` → The links.

## Words

- **Seed** is the player's word and stays: a seed is what a player types to make a world.
- Never on the site: generator, code; sample sizes, counts of worlds, "none of N". A table note names what was
  measured, never how many.
- Terms as in the game or the community: biome names as the game shows them (Meadows, Black Forest, Swamp, Mountain,
  Plains, Mistlands, Ashlands, Deep North), the bosses' names (Eikthyr, The Elder, Bonemass, Moder, Yagluth, The Queen,
  Fader), Haldor, Hildir, the Bog Witch, Burial Chambers, Sunken Crypts.

When a rule changes, change it here; `docs/seo.md` keeps the semantic core and the review before a release.
