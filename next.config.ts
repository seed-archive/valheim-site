import { withSentryConfig } from "@sentry/nextjs/config";

import type { NextConfig } from "next";

import { CATALOG, catalogHref, FROM_DATABASE } from "./lib/guides";
import { DEFAULT_LOCALE, LOCALES, PUBLISHED } from "./lib/i18n/locales";
import { BASE_PATH } from "./lib/site";

// The domain's root, the portal, and the archive's pages it serves.
const PORTAL = "https://seedarchive.gg";
const PORTAL_PAGES = ["privacy", "terms", "release-notes"];

// The first segments of the section's pages after the language (app/[lang]).
const SECTIONS = ["tools", "database", "guides", "bugs"];

// The icons asked for at the root of the project's own domain (Vercel's
// dashboard takes the project's icon from /favicon.ico there): the section's
// own, under its prefix. On seedarchive.gg the portal serves the root.
const ROOT_ICONS = ["favicon.ico", "icon.svg", "apple-icon.png"];

// Addresses a release served that have moved since (the owner, 2026-11-23:
// redirect every one, indexed or not), each straight to where it stands now:
// the biome chapters into /guides/biomes, the ways of playing into
// /guides/challenges, the good start renamed, the map under Tools. Since
// 2026-11-24 an address follows the menu level by level (the portal's
// docs/seo.md): Farming and the Forge of Potential under the Basics, and the
// catalogue, renamed the Database, in its groups (/database/<group>/<kind>);
// its groups' addresses under /catalog, never released, follow the last
// rule. The bosses and comfort went from the guides to the database on
// 2026-11-19 and, with the traders, to the Basics on 2026-11-25
// (`catalogHref` resolves the three there: `FROM_DATABASE`).
const BIOMES = [
  "meadows",
  "black-forest",
  "swamp",
  "mountain",
  "plains",
  "mistlands",
  "ashlands",
  "deep-north",
];
const MOVED: [string, string][] = [
  ...BIOMES.map((b): [string, string] => [
    `/guides/${b}`,
    `/guides/biomes/${b}`,
  ]),
  ["/guides/speedrun", "/guides/challenges/speedrun"],
  ["/guides/reverse-run", "/guides/challenges/reverse-run"],
  ["/guides/start", "/guides/challenges/a-speedrunners-start"],
  ["/guides/basics/a-good-start", "/guides/challenges/a-speedrunners-start"],
  [
    "/guides/challenges/a-good-start",
    "/guides/challenges/a-speedrunners-start",
  ],
  ["/guides/bosses", catalogHref("bosses")],
  ["/guides/comfort", catalogHref("comfort")],
  ["/map", "/tools/map"],
  ["/guides/farming", "/guides/basics/farming"],
  ["/guides/forge-of-potential", "/guides/basics/forge-of-potential"],
  ["/catalog", "/database"],
  ...[...CATALOG, ...FROM_DATABASE].map((page): [string, string] => [
    `/catalog/${page.href.split("/").pop()}`,
    page.href,
  ]),
  ["/catalog/:path+", "/database/:path+"],
  // The bosses, the traders and comfort left the database for the Basics
  // (the owner, 2026-11-25).
  ["/database/world/bosses", catalogHref("bosses")],
  ["/database/world/traders", catalogHref("traders")],
  ["/database/base/comfort", catalogHref("comfort")],
];

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  reactStrictMode: true,
  // The root layout sits under [lang], so an address no route answers gets
  // app/global-not-found.tsx (D20).
  experimental: { globalNotFound: true },
  async redirects() {
    // The archive's own pages live in the portal: with or without this
    // section's prefix, they lead there, in the address's language or in
    // English when it names none (D20).
    const langs = LOCALES.join("|");
    const portal = PORTAL_PAGES.flatMap((page) => [
      ...[`/${page}`, `${BASE_PATH}/${page}`].map((from) => ({
        source: from,
        destination: `${PORTAL}/${DEFAULT_LOCALE}/${page}`,
        basePath: false as const,
        permanent: true,
      })),
      {
        source: `${BASE_PATH}/:lang(${langs})/${page}`,
        destination: `${PORTAL}/:lang/${page}`,
        basePath: false as const,
        permanent: true,
      },
    ]);
    // An old address goes straight to its new page in one hop, in its own
    // language, or in English when it names none (D20).
    const published = PUBLISHED.join("|");
    const moved = MOVED.flatMap(([source, destination]) => [
      {
        source: `/:lang(${published})${source}`,
        destination: `/:lang${destination}`,
        permanent: true,
      },
      {
        source,
        destination: `/${DEFAULT_LOCALE}${destination}`,
        permanent: true,
      },
    ]);
    // An address without a language: the same page in English, always (D20),
    // never by the browser's language. Only the section's own first segments
    // count, so an unknown language (/valheim/fr/…) stays a 404.
    const sections = SECTIONS.join("|");
    const bare = [
      { source: "/", destination: `/${DEFAULT_LOCALE}` },
      {
        source: `/:section(${sections})/:path*`,
        destination: `/${DEFAULT_LOCALE}/:section/:path*`,
      },
    ].map((r) => ({ ...r, permanent: true }));
    // A language the section is not translated into yet: the English page,
    // for now (307, D20).
    const later = LOCALES.filter((l) => !PUBLISHED.includes(l)).join("|");
    const untranslated = later
      ? [
          { source: `/:lang(${later})`, destination: `/${DEFAULT_LOCALE}` },
          {
            source: `/:lang(${later})/:path+`,
            destination: `/${DEFAULT_LOCALE}/:path+`,
          },
        ].map((r) => ({ ...r, permanent: false }))
      : [];
    const icons = ROOT_ICONS.map((file) => ({
      source: `/${file}`,
      destination: `${BASE_PATH}/${file}`,
      basePath: false as const,
      permanent: true,
    }));
    return [...icons, ...portal, ...moved, ...bare, ...untranslated];
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  webpack: {
    automaticVercelMonitors: false,
  },
});
