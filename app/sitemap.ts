import type { MetadataRoute } from "next";

import { pageUrl } from "@/lib/alternates";
import { CATALOG, CATALOG_GROUPS, GUIDE_GROUPS, GUIDES } from "@/lib/guides";
import { DEFAULT_LOCALE, PUBLISHED } from "@/lib/i18n/locales";

// Every page in every language it is translated into, each with its
// alternates (D20).
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/tools",
    "/tools/map",
    "/tools/how-good-is-my-seed",
    "/tools/best-seeds",
    "/tools/craft-tree",
    "/tools/nidavellir",
    "/tools/wind",
    "/bugs",
    "/database",
    "/guides",
    ...[...CATALOG_GROUPS, ...GUIDE_GROUPS].flatMap((group) =>
      group.href ? [group.href] : [],
    ),
    ...[...CATALOG, ...GUIDES].map((page) => page.href),
  ];
  return paths.flatMap((path) => {
    const languages = {
      ...Object.fromEntries(PUBLISHED.map((l) => [l, pageUrl(l, path)])),
      "x-default": pageUrl(DEFAULT_LOCALE, path),
    };
    return PUBLISHED.map((lang) => ({
      url: pageUrl(lang, path),
      alternates: { languages },
    }));
  });
}
