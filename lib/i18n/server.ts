import { cache, Children, type ReactNode } from "react";
import type { FormatXMLElementFn, PrimitiveType } from "intl-messageformat";
import { lang } from "next/root-params";
import { createIntl, createIntlCache } from "react-intl/server";

import { flattenMessages } from "@seed-archive/ui/localization";

import {
  INTL_LOCALE,
  MESSAGES,
  messagesLocale,
  type MessagesLocale,
} from "@/lib/i18n";

export type Values = Record<string, PrimitiveType>;

export type RichValues = Record<
  string,
  PrimitiveType | ReactNode | FormatXMLElementFn<ReactNode>
>;

// How a list is joined: "a, b and c", "a, b or c", or "a, b, c" (unit: a
// list of parts with no word before the last).
type ListType = "conjunction" | "disjunction" | "unit";

// A server component's formatter, bound to the page's language: a page whose
// data is too large to send to the browser formats its words here, by the
// same keys the client uses and with react-intl's own formatter, so plurals,
// selects, numbers and lists read as they do in the browser.
export type ServerIntl = {
  // The language of the messages.
  locale: MessagesLocale;
  // Whether a message exists: a note or a name some keys have.
  has: (id: string) => boolean;
  // A message as plain text: for a cell, a title, an attribute.
  format: (id: string, values?: Values) => string;
  // A message with rich-text tags (`<link>…</link>`, `<b>…</b>`): each tag is
  // a function of its words, given with the values.
  rich: (id: string, values: RichValues) => ReactNode;
  // A list joined as the language joins it. Parts may be links; React keys
  // them by place.
  list: {
    (items: string[], type?: ListType): string;
    (items: ReactNode[], type?: ListType): ReactNode;
  };
};

const intlCache = createIntlCache();

function bind(locale: MessagesLocale): ServerIntl {
  const messages = flattenMessages(MESSAGES[locale]);
  const intl = createIntl({ locale: INTL_LOCALE[locale], messages }, intlCache);
  const list = (items: ReactNode[], type: ListType = "conjunction") => {
    const out = intl.formatList(items, { type });
    return Array.isArray(out) ? Children.toArray(out) : out;
  };
  return {
    locale,
    has: (id) => id in messages,
    format: (id, values = {}) => String(intl.formatMessage({ id }, values)),
    rich: (id, values) => intl.formatMessage({ id }, values),
    list: list as ServerIntl["list"],
  };
}

// The English formatter, whatever the page's language: an anchor is made from
// the English words, so a link to a section holds in every language (D20).
export const englishIntl: ServerIntl = bind("en");

// The formatter of the page's language (`lang()` of next/root-params), made
// once a request: `const intl = await serverIntl()`, then
// `intl.format("pages.wind.title")`.
export const serverIntl = cache(async (): Promise<ServerIntl> =>
  bind(messagesLocale(await lang())),
);
