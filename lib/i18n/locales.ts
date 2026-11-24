// The archive's languages (the portal's docs/architecture.md, D20, the owner,
// 2026-11-24): every address of the section names one, English included,
// right after the section's prefix: /valheim/en/tools/wind.
export const LOCALES = ["en", "ru", "es", "de"] as const;
export type Locale = (typeof LOCALES)[number];

// The language of an address that names none, and of x-default (D20).
export const DEFAULT_LOCALE: Locale = "en";

// The languages the section is translated into. A page answers in these; an
// address in another of LOCALES answers 307 to the English page until its
// translation lands (next.config.ts), and stays out of hreflang.
export const PUBLISHED: Locale[] = ["en", "ru", "es", "de"];

export const isLocale = (value: string | undefined): value is Locale =>
  LOCALES.includes(value as Locale);

// A path of this section in a language: "/tools/map" → "/en/tools/map",
// "/" → "/en". An anchor, a query alone or a full address is left as it is.
export function localePath(lang: string | undefined, href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) {
    return href;
  }
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}
