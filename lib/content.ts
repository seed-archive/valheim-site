import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { marked } from "marked";
import { lang } from "next/root-params";

import { fill } from "@/lib/fill";
import { longGuideLinks } from "@/lib/guides";
import { INTL_LOCALE, messagesLocale, type MessagesLocale } from "@/lib/i18n";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";
import { BASE_PATH } from "@/lib/site";
import { slug } from "@/lib/slug";
import { POWERS } from "@/lib/valheim/boss-power";
import GUIDE_VALUES from "@/lib/valheim/guide-values.json";

// Long text lives in content/<locale>/<name>.md (site-code.md: long texts in
// Markdown), in the No Man's Sky site's way. These files are ours, so the
// HTML is rendered as is. The first line is the page's h1 (`# Title`), the
// second its bold question with the answer.

export type Guide = { title: string; html: string; fact: string };

// The archive's own pages, served by the portal at the domain's root
// (architecture.md → Pages that belong to the whole archive): a link to one
// keeps its path as written.
const ARCHIVE_PAGES = ["privacy", "terms", "release-notes", "credits"];

// A path written into the HTML: Next.js prefixes only its own links, so a
// link of the text gets the page's language here (D20), and a path of this
// site the section's prefix too; a picture gets the prefix alone.
const ARCHIVE_PAGE = new RegExp(
  `href="\\/((?:${ARCHIVE_PAGES.join("|")})(?:["#?]))`,
  "g",
);
const withBase = (html: string, lang: string) =>
  html
    .replace(ARCHIVE_PAGE, `href="/${lang}/$1`)
    .replace(
      new RegExp(
        `href="\\/(?!\\/|${lang}\\/|(?:${ARCHIVE_PAGES.join("|")})(?:["#?]))`,
        "g",
      ),
      `href="${BASE_PATH}/${lang}/`,
    )
    .replace(/src="\/(?!\/)/g, `src="${BASE_PATH}/`);

const HEADING = /<h([2-4])>(.*?)<\/h\1>/g;

// A section heading gets an id from its words, so a page can link to it. A
// translation takes its ids from the English guide, heading by heading (a
// translation keeps the English headings' order): an anchor is the same in
// every language, and the section's anchor style keeps only Latin letters.
function anchorHeadings(html: string, ids?: string[]) {
  const used = new Map<string, number>();
  let at = 0;
  return html.replace(HEADING, (_, level: string, inner: string) => {
    // The heading's words, its HTML entities back to signs (Markdown writes
    // an apostrophe as &#39;), in the section's one anchor style.
    const base = slug(
      inner
        .replace(/<[^>]+>/g, "")
        .replace(/&#39;|&apos;|&rsquo;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"'),
    );
    const seen = (used.get(base) ?? 0) + 1;
    used.set(base, seen);
    const own = seen === 1 ? base : `${base}-${seen}`;
    const id = ids ? (ids[at] ?? own) : own;
    at++;
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
}

// The ids its headings get, in order.
const headingIds = (html: string) =>
  [...html.matchAll(/<h[2-4] id="([^"]*)">/g)].map((m) => m[1]);

// A guide's text in one language, its numbers filled: the first line is the
// title, the rest the body.
async function guideText(
  slug: string,
  locale: MessagesLocale,
  values: Record<string, string | number>,
) {
  const file = path.join(
    process.cwd(),
    "content",
    locale,
    "guides",
    `${slug}.md`,
  );
  // GUIDE_VALUES: the game's own numbers the guides' text names (what a recipe
  // takes, a crypt chest's iron), written by the Valheim generator, and POWERS,
  // the bosses' powers from the same data; the page's values come after them.
  const text = fill(
    await readFile(file, "utf8"),
    { ...GUIDE_VALUES, ...POWERS, ...values },
    INTL_LOCALE[locale],
  );
  const [first, ...rest] = text.split("\n");
  return { title: first.replace(/^#\s*/, ""), body: rest.join("\n") };
}

const toHtml = async (body: string) => marked.parse(longGuideLinks(body));

// A guide in the page's language: its title (the h1), its body as HTML, and
// its fact, the meta description (the answer after the bold question,
// without the markup).
export async function readGuide(
  slug: string,
  values: Record<string, string | number> = {},
): Promise<Guide> {
  const page = await lang();
  // The guide in the page's language once it is translated, English until
  // then.
  const own = messagesLocale(page);
  const locale = existsSync(
    path.join(process.cwd(), "content", own, "guides", `${slug}.md`),
  )
    ? own
    : messagesLocale(DEFAULT_LOCALE);
  const { title, body } = await guideText(slug, locale, values);
  const ids =
    locale === DEFAULT_LOCALE
      ? undefined
      : headingIds(
          anchorHeadings(
            await toHtml(
              (await guideText(slug, messagesLocale(DEFAULT_LOCALE), values))
                .body,
            ),
          ),
        );
  const lead = body.trim().split("\n")[0] ?? "";
  const fact = lead
    .replace(/\*\*[^*]*\*\*/, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .trim();
  return {
    title,
    html: withBase(anchorHeadings(await toHtml(body), ids), page),
    fact,
  };
}
