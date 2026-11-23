import { withSentryConfig } from "@sentry/nextjs/config";

import type { NextConfig } from "next";

import { BASE_PATH } from "./lib/site";

// The domain's root, the portal, and the archive's pages it serves.
const PORTAL = "https://seedarchive.gg";
const PORTAL_PAGES = ["privacy", "terms", "release-notes"];

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
  async redirects() {
    // The archive's own pages live in the portal: with or without this
    // section's prefix, they lead there.
    const portal = PORTAL_PAGES.flatMap((page) =>
      [`/${page}`, `${BASE_PATH}/${page}`].map((from) => ({
        source: from,
        destination: `${PORTAL}/${page}`,
        basePath: false as const,
        permanent: true,
      })),
    );
    const moved = MOVED.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
    return [...portal, ...moved];
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
