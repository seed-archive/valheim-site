# Repository and release

- Work and commit on `dev`; every pull request, Renovate's included, targets `dev`, the default branch on GitHub (`seed-archive/docs/releases.md`). `main` holds
  releases: the coordinator merges `dev` into `main` on the owner's word, which deploys production together with the
  portal. Only generators commit to `main` (`../.claude/rules/architecture.md`, Repositories).
- **The Valheim session owns this repository**: pages, texts, data, the map, components (the owner, 2026-11-15).
- **The coordinating session owns what the games share**: the domain and DNS, the Vercel project and its environment
  variables, the portal's routing of `/valheim/*`, and the zone contract — `basePath` stays `/valheim`
  (`lib/site.ts`), the domain and sign-in stay shared. A change to any of these goes through the coordinator.
- The site is public: nothing from the generator's private repository — no paths, file or function names, or methods
  — reaches it. It says "the Valheim generator".
- Every word a visitor reads goes through `react-intl` (`lib/i18n/*.json`); long texts will be Markdown.
- No migrations here: the coordinator moves the migration history into the portal first; the first Valheim table
  (schema `valheim`) is asked of it then. So there is no `supabase/` and no production workflow.
- Release notes live in the portal (`content/release-notes/valheim.md`, D16), not here.
- The theme is light only, in the No Man's Sky site's colours (Material UI's default light theme), until D14.
