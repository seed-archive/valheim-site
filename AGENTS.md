# Valheim site

The Valheim section of Seed Archive, to be served at https://seedarchive.gg/valheim/ (`basePath` `/valheim`,
`lib/site.ts`); the Valheim generator (`../valheim`) fills its data. How the games and the portal fit together is
`../.claude/rules/architecture.md`; how to work here is `.claude/rules/`.

## Parts

| Part         | What it is                                                                                                                                                                                                                                                                   |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app`        | Next.js routes: the home page, `tools`, `tools/map` (the full-page world map), `tools/how-good-is-my-seed`                                                                                                                                                                   |
| `components` | `archive` (the shared header, the section's footer, the shared analytics), `providers` (theme, intl), `map` (the map and its panels), `tools` (the Tools index and the seed tool)                                                                                            |
| `lib`        | `site.ts` (the section's prefix), `i18n` (messages), `generator.ts` (the workers running the Valheim generator), `places.ts` (marker groups), `scan.ts` (reads the seed scan's ranks, `public/data/seed-ranks.json`, copied from the generator), `tools.ts` (the Tools menu) |
| `public`     | static files; `wasm/` the Valheim generator built to WebAssembly (`map.js`, `map_bg.wasm`, generated) and its worker                                                                                                                                                         |
| `docs`       | `seo.md`: the section's semantic core and link map                                                                                                                                                                                                                           |

## Run

```bash
npm install
npm run dev      # the site on localhost:5020/valheim
npm run lint
npm run build
```
