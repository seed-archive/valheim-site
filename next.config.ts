import { withSentryConfig } from "@sentry/nextjs/config";

import type { NextConfig } from "next";

import { DEFAULT_LOCALE, LOCALES, PUBLISHED } from "./lib/i18n/locales";
import { BASE_PATH } from "./lib/site";

// The domain's root, the portal, and the archive's pages it serves.
const PORTAL = "https://seedarchive.gg";
const PORTAL_PAGES = ["privacy", "terms", "release-notes"];

// The first segments of the section's pages after the language (app/[lang]).
const SECTIONS = ["tools", "catalog", "guides", "bugs"];

// The icons asked for at the root of the project's own domain (Vercel's
// dashboard takes the project's icon from /favicon.ico there): the section's
// own, under its prefix. On seedarchive.gg the portal serves the root.
const ROOT_ICONS = ["favicon.ico", "icon.svg", "apple-icon.png"];

// Addresses a release served that have moved since (the owner, 2026-11-23:
// redirect every one, indexed or not): the biome chapters into
// /guides/biomes, the ways of playing into /guides/challenges, the bosses and
// comfort into the catalogue, the good start renamed, the map under Tools.
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
  ["/guides/bosses", "/catalog/bosses"],
  ["/guides/comfort", "/catalog/comfort"],
  ["/map", "/tools/map"],
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
    // An old address goes straight to its English page, one hop (D20).
    const moved = MOVED.map(([source, destination]) => ({
      source,
      destination: `/${DEFAULT_LOCALE}${destination}`,
      permanent: true,
    }));
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
