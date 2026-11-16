# Search: the semantic core and the links

What is the Valheim section's own in search: its sections, menu, semantic core and link map. What every section of
Seed Archive shares is the portal's `docs/seo.md` (`../seed-archive/docs/seo.md`); read it first. The section lives at
`seedarchive.gg/valheim/` (`BASE_PATH` in `lib/site.ts`); every path below is under that prefix.

## Sections

| Section              | Path                         | What it is                                                 |
| -------------------- | ---------------------------- | ---------------------------------------------------------- |
| Home                 | `/`                          | the section's start page (being built)                     |
| Tools                | `/tools`                     | the Tools menu item's index                                |
| Map                  | `/tools/map`                 | the world map of a seed, computed in the visitor's browser |
| How good is my seed? | `/tools/how-good-is-my-seed` | a seed's measures set against the seed scan                |
| Guides               | `/guides`                    | the Guides menu item's index                               |
| Where to go first    | `/guides/start`              | Eikthyr, the Black Forest, a copper cave and tin near the start; numbers from the seed scan |
| Bugs                 | `/bugs`                      | world generation bugs a player meets on a seed; in the footer |

A page's address names its menu item (`/guides/…`, `/tools/<tool>`, `/quests/…`), each with an index page and the
breadcrumb Home › item › page; catalog lists stay at `/<kind>` (the shared `docs/seo.md`, the owner, 2026-11-16). A
full-screen tool such as the map keeps only the header: no breadcrumb, no footer.

Until the section has its first real pages, every page is `noindex` (`app/layout.tsx`).
