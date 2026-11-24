import en from "./en.json";
import { DEFAULT_LOCALE } from "./locales";
import deA from "./de/a.json";
import deB from "./de/b.json";
import deC from "./de/c.json";
import esA from "./es/a.json";
import esB from "./es/b.json";
import esC from "./es/c.json";
import ruA from "./ru/a.json";
import ruB from "./ru/b.json";
import ruC from "./ru/c.json";

export type NestedMessages = {
  [key: string]: string | NestedMessages;
};

// A translation is written in parts, each a few of en.json's groups at the
// same paths (lib/i18n/<locale>/*.json; the generator's docs/translation.md):
// the parts are joined into one tree.
function joined(...parts: NestedMessages[]): NestedMessages {
  const out: NestedMessages = {};
  for (const part of parts) {
    for (const [key, value] of Object.entries(part)) {
      const here = out[key];
      out[key] =
        typeof value === "object" && typeof here === "object"
          ? joined(here, value)
          : value;
    }
  }
  return out;
}

// The messages of every language that has them, by the language of the
// address. A language is shown only once it is in PUBLISHED (locales.ts).
export const MESSAGES = {
  en,
  ru: joined(ruA, ruB, ruC),
  es: joined(esA, esB, esC),
  de: joined(deA, deB, deC),
} satisfies Record<string, NestedMessages>;
export type MessagesLocale = keyof typeof MESSAGES;

// The tag each language formats with (lists, numbers, plurals). English is
// British, as the section writes it ("armour"): a list reads "a, b and c",
// with no comma before the last word (our own choice, as the pages were
// written before the lists went through Intl).
export const INTL_LOCALE: Record<MessagesLocale, string> = {
  en: "en-GB",
  ru: "ru",
  es: "es",
  de: "de",
};

// The language of the messages for an address's language: its own when it
// has messages, else the default.
export const messagesLocale = (lang: string | undefined): MessagesLocale =>
  lang !== undefined && lang in MESSAGES
    ? (lang as MessagesLocale)
    : (DEFAULT_LOCALE as MessagesLocale);
