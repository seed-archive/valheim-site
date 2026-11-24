import type { Metadata } from "next";

import { DEFAULT_LOCALE, PUBLISHED } from "@/lib/i18n/locales";
import { BASE_PATH } from "@/lib/site";

// The section's address: production's in NEXT_PUBLIC_BASE_URL, the local
// `next dev` port otherwise (architecture.md → Local ports).
export const SECTION_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:5020${BASE_PATH}`;

// A page's address in a language, in full: hreflang and the sitemap name
// other languages' pages, which no relative address can reach.
export const pageUrl = (lang: string, path: string) =>
  `${SECTION_URL}/${lang}${path === "/" ? "" : path}`;

// A page's alternates (D20): the canonical is its own address, relative to the
// layout's metadataBase, which carries the page's language; hreflang names
// every language it is translated into, and x-default the English page. The
// home page passes its language: a relative "/" would end in a slash.
export function alternates(
  path: string,
  lang?: string,
): Metadata["alternates"] {
  return {
    canonical: lang ? pageUrl(lang, path) : path,
    languages: {
      ...Object.fromEntries(PUBLISHED.map((l) => [l, pageUrl(l, path)])),
      "x-default": pageUrl(DEFAULT_LOCALE, path),
    },
  };
}
