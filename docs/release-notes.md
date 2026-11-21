# Release notes: the draft for the opening

The lines of Valheim's opening, for the portal's `content/release-notes/valheim.md` (D16; the portal's
`docs/releases.md` → What the release notes say). They cannot stand in the portal yet: its build refuses notes for
a section that is not in `GAMES` (`lib/releaseNotes.ts`), and Valheim is still in `COMING`. The coordinator moves
them there in the same commit that moves Valheim into `GAMES`, and writes the heading: the day and the archive's
version (Valheim opens as 2.0).

## Ready on the section's side (2026-11-21)

- `dev` builds (`npm run build`); the built app (`next start` on 5021) passes the portal's `docs/seo.md` → Review
  before a release on every page of the sitemap: each answers 200, carries no robots tag, links nothing outside
  `/valheim/` but the shared pages, has a description of 160 characters or fewer, and every guide and catalogue
  page is linked from the text of two others or more.
- The section is open to search engines: the layout's `robots: { index: false }` is gone, and the sitemap now holds
  the craft tree, Farming and the Forge of Potential, which it lacked.
- Nine guides' bold answers were cut to 160 characters, since a guide's description is its bold answer.
- Left as it was, for the owner: the seed map and How good is my seed? have no `<h1>` in the served HTML (the map
  is a full-screen tool; the seed tool draws its heading in the browser); the home page's description is 41
  characters.

## What the coordinator does (not this repository)

- Moves Valheim from `COMING` to `GAMES` in the portal's `lib/games.ts`, with its zone, the Valheim project's
  production address on Vercel.
- The Valheim project's Production environment: `NEXT_PUBLIC_BASE_URL` (`https://seedarchive.gg/valheim`, which the
  sitemap, robots and canonical addresses read; without it they name localhost) and Sentry's variables
  (`.claude/rules/architecture.md` → Sentry).
- These lines into the portal's `content/release-notes/valheim.md`, with the day and the version.

## The lines

```markdown
## <day Month year>: version 2.0

Valheim opens at [seedarchive.gg/valheim](/valheim).

- The [seed map](/valheim/tools/map): type any seed and see its biomes, every boss altar, the traders and the dungeons, computed in your browser.
- [How good is my seed?](/valheim/tools/how-good-is-my-seed): how a seed's start island, boss altars, traders and dungeons rank against other worlds.
- The [craft tree](/valheim/tools/craft-tree): switch on what you will build, biome by biome, and see how much wood, ore and every other raw material it takes.
- Guides to every [biome](/valheim/guides/biomes), Meadows to Deep North: how to explore each land, what it gives and how far it lies from your home; with [where to build your base](/valheim/guides/basics/where-to-build), [how much metal a run takes](/valheim/guides/basics/how-much-metal) and [boss arenas](/valheim/guides/basics/boss-arenas).
- The [challenges](/valheim/guides/challenges): a speedrunner's start and the speedrun's route, no death, no map, no portals, Hard and Hardcore, and the reverse run from the Deep North.
- The [catalog](/valheim/catalog): creatures and what they drop, how to kill each boss, caves and dungeons, traders, weapons, armour, food, meads, materials and everything the hammer builds.
```
