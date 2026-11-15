# Search: the semantic core and the links

What is the Valheim section's own in search: its sections, menu, semantic core and link map. What every section of
Seed Archive shares is the portal's `docs/seo.md` (`../seed-archive/docs/seo.md`); read it first. The section lives at
`seedarchive.gg/valheim/` (`BASE_PATH` in `lib/site.ts`); every path below is under that prefix.

## Sections

| Section | Path   | What it is                                                 |
| ------- | ------ | ---------------------------------------------------------- |
| Home    | `/`    | the section's start page (being built)                     |
| Map     | `/map` | the world map of a seed, computed in the visitor's browser |

Until the section has its first real pages, every page is `noindex` (`app/layout.tsx`).
