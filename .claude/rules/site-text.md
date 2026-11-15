---
paths:
  - "content/**"
  - "lib/i18n/**"
  - "app/**/page.tsx"
---

# Site text

The rules of text shared with the No Man's Sky site, with Valheim's own where the games differ. The one question the
section answers is not set yet; it is the owner's, when the first pages are written.

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

## Links

- A link stands inside a sentence, and its anchor text appears on the page it opens (its `<h1>`, lead, or title). No
  "See also" or "See more" rows.
- No page links to itself in its own text; the header and the footer are the only exception.
- No links to Reddit (they leak rank). External links only where a page cites a rule.

## Words

- **Seed** is the player's word and stays: a seed is what a player types to make a world.
- Never on the site: generator, code; sample sizes, counts of worlds, "none of N". A table note names what was
  measured, never how many.
- Terms as in the game or the community: biome names as the game shows them (Meadows, Black Forest, Swamp, Mountain,
  Plains, Mistlands, Ashlands, Deep North), the bosses' names (Eikthyr, The Elder, Bonemass, Moder, Yagluth, The Queen,
  Fader), Haldor, Hildir, the Bog Witch, Burial Chambers, Sunken Crypts.

When a rule changes, change it here; `docs/seo.md` keeps the semantic core and the review before a release.
