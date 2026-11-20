---
paths:
  - "content/**"
  - "lib/i18n/**"
  - "app/**/page.tsx"
---

# Site text

The rules of text shared with the No Man's Sky site, with Valheim's own where the games differ.

**The baseline and the ways of playing** (the owner, 2026-11-20, replacing "the one question" of 2026-11-19): a
guide tells the usual game first, the path the developers meant, as its baseline. Each other way of playing (the
speedrun, no death on a harder world, no map, no portals, the reverse run, the builder at leisure) needs its own
information, not only a remark: where it needs it, it gets a section of its own with a heading in its player's
words, a short description and its table. Those sections are woven into the page's story where they belong, never
told as "everyone does this, and the speedrunner does otherwise". A short remark stays a footnote; never a pile of
footnotes under one table: when several gather, they become a section. A number, table or chart that helps no way of
playing does not go on the page.

**Charts** (the owner, 2026-11-19): a chart compares two or more parameters of one thing (the 1st, 3rd and 4th
Charred Fortress from Fader's altar), never different things on one chart (fortresses with Morgen holes). One
value is a sentence of text; several unrelated values are a table.

**The voice** (the owner, 2026-11-20, after reading the start island text: "written for complete idiots"): we write
for living people, who come to use the section as a reference and stay for the story; text that explains the
obvious makes them close the site. Even where the facts are tables, the prose must be a pleasure to read: a
gripping story of a Viking running through the biomes one after another, told to the reader as "you", with stakes,
pace and a little wit; every sentence gives a reason, a choice or a consequence the reader did not know, never what
the game already tells them or what the heading already says. The facts, the numbers, the tables and the structure
stay; only the telling changes.

## A page

- Every page has one `<h1>`. A menu label equals the `<h1>` of the page it opens.
- Each page opens with its question in bold, in the words a player types, and answers it in the same line. The sections
  back the answer up, biggest point first.
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
- A guide's sections are the questions of `docs/guide-questions.md`, each a heading in the player's words, answered in
  a line or two, then its table: how often (a share of seeds) or how far (a median and its middle half).
- A guide ends with a sentence that links the next guide (`docs/guides.md` → The menu; the owner, 2026-11-20, three
  sections): Basics (A good start → Where to build your base → How much metal a run takes → Boss arenas) → Biomes
  (Meadows … → Deep North) → Challenges (Speedrun → No death, no map, no portals → Hard, Very hard and Hardcore →
  Reverse run, which leads back to A good start). It links in its
  text to the guides it relies on, the tool that acts on it, and the catalogue list it describes. Every guide is
  reached from at least two other pages (from the No Man's Sky section, 2026-11-20).
- **The strip** (the owner, 2026-11-20) is the speedrun's idea: the run goes from the middle south, then north, and
  keeps to one imaginary line through the start so as not to lose time, leaving it only when the boat must round an
  island. It is explained once, on the Speedrun guide (`#what-is-the-strip`); every other page that uses it links the
  word "strip" there. A player who is not running goes wherever he likes, so a guide never treats the strip as the
  only way.
- A short remark for one way of playing is a footnote, a blockquote opening with the mode in bold
  (`> **With no map** …`); what a way of playing needs beyond a remark is a section (The baseline and the ways of
  playing, above; `docs/guides.md` → The story). The labels (the owner,
  2026-11-20, adding the last two from the guide forum): **Speedrunners**, **With no map**, **With no portals**,
  **On a reverse run**, **At leisure** (the builder who plays the whole game slowly), **With no death** (the
  hardcore player, safe and on a harder world).

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
