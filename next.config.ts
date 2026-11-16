import { withSentryConfig } from "@sentry/nextjs/config";

import type { NextConfig } from "next";

import { BASE_PATH } from "./lib/site";

// The domain's root, the portal, and the archive's pages it serves.
const PORTAL = "https://seedarchive.gg";
const PORTAL_PAGES = ["privacy", "terms", "release-notes"];

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  // The shared map viewer ships as TypeScript (github:seed-archive/map).
  transpilePackages: ["@seed-archive/map"],
  reactStrictMode: true,
  async redirects() {
    // The archive's own pages live in the portal: with or without this
    // section's prefix, they lead there.
    return PORTAL_PAGES.flatMap((page) =>
      [`/${page}`, `${BASE_PATH}/${page}`].map((from) => ({
        source: from,
        destination: `${PORTAL}/${page}`,
        basePath: false as const,
        permanent: true,
      })),
    );
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
