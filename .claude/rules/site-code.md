---
paths:
  - "app/**"
  - "components/**"
  - "lib/**"
  - "next.config.ts"
---

# Site code

The stack is Next.js (App Router), React, Material UI, React Hook Form, and react-intl, each used the way its own
documentation recommends. This Next.js is newer than most examples: read the guide in `node_modules/next/dist/docs/`
before using an API (`01-app/01-getting-started` covers server and client components, data, caching, metadata).

## Principles

- KISS, DRY, YAGNI: the simplest code that does the asked thing, one place for one rule, nothing built for a case that
  does not exist yet. Delete code that nothing uses.
- Name every constant: a number with a meaning (a game value, a threshold, a tolerance) gets a name and a comment on
  where it comes from (a game file, the Valheim generator, or "our own choice"). Layout numbers (spacing, sizes) are exempt.
- The site must stay fast. A page is a server component and static where it can be; `"use client"` goes on the smallest
  component that needs a state, an effect, or a browser API. Data is read on the server. A large client library loads
  lazily where only one page needs it.

## Components

- Material UI for every control and layout; theme tokens over literal colours.
- Every form holds its values in React Hook Form (`useForm`, `Controller`, `useWatch`). Plain `useState` is for what is not a value of a form:
  the open tab or group, a loaded picture, a search result.
- Localization on two levels (the owner, 2026-11-05): every label, button, table head, row label, and short string
  through react-intl and `lib/i18n/<locale>.json`; every long text through Markdown in `content/<locale>/`. A page is
  converted when it is next changed, with the keys the generator writes for it in place of English words. Never
  convert everything at once.

## Data

- A canvas never reads a weight from alpha: a browser zeroes the colour of a pixel of alpha 0.
- The map is computed in the visitor's browser from the Valheim generator built to WebAssembly; the site stores no
  tiles (the owner's decision, the generator's `docs/maps.md`).
