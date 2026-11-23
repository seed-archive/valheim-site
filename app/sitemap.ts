import type { MetadataRoute } from "next";

import { CATALOG, GUIDE_GROUPS, GUIDES } from "@/lib/guides";
import { BASE_PATH } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:5020${BASE_PATH}`;
  return [
    "",
    "/tools",
    "/tools/map",
    "/tools/how-good-is-my-seed",
    "/tools/best-seeds",
    "/tools/craft-tree",
    "/tools/nidavellir",
    "/tools/wind",
    "/bugs",
    "/catalog",
    "/guides",
    ...GUIDE_GROUPS.flatMap((group) => (group.href ? [group.href] : [])),
    ...[...CATALOG, ...GUIDES].map((page) => page.href),
  ].map((path) => ({
    url: `${base}${path}`,
  }));
}
