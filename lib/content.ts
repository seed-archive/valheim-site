import { readFile } from "node:fs/promises";
import path from "node:path";

import { marked } from "marked";

import { longGuideLinks } from "@/lib/guides";
import { BASE_PATH } from "@/lib/site";
import GUIDE_VALUES from "@/lib/valheim/guide-values.json";

// Long text lives in content/<locale>/<name>.md (site-code.md: long texts in
// Markdown), in the No Man's Sky site's way. These files are ours, so the
// HTML is rendered as is. The first line is the page's h1 (`# Title`), the
// second its bold question with the answer.

export type Guide = { title: string; html: string; fact: string };

// A number of the text: `{{name}}`, filled from the generator's data so no
// number is typed. A name with no value stays visible, to be caught in review.
function fill(text: string, values: Record<string, string | number>) {
  return text.replace(/\{\{(\w+)\}\}/g, (hole, name: string) =>
    name in values ? String(values[name]) : hole,
  );
}

// The archive's own pages, served by the portal at the domain's root
// (architecture.md → Pages that belong to the whole archive): a link to one
// keeps its path as written.
const ARCHIVE_PAGES = ["privacy", "terms", "release-notes", "credits"];

// A path of this site written into the HTML: Next.js prefixes only its own
// links, so a link of the text gets the section's prefix here.
const withBase = (html: string) =>
  html.replace(
    new RegExp(`(href|src)="\\/(?!\\/|(?:${ARCHIVE_PAGES.join("|")})(?:["#?]))`, "g"),
    `$1="${BASE_PATH}/`,
  );

// A section heading gets an id from its words, so a page can link to it.
function anchorHeadings(html: string) {
  const used = new Map<string, number>();
  return html.replace(/<h([2-4])>(.*?)<\/h\1>/g, (_, level: string, inner: string) => {
    const base = inner
      .replace(/<[^>]+>/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const seen = (used.get(base) ?? 0) + 1;
    used.set(base, seen);
    const id = seen === 1 ? base : `${base}-${seen}`;
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
}

// A guide: its title (the h1), its body as HTML, and its fact, the meta
// description (the answer after the bold question, without the markup).
export async function readGuide(
  slug: string,
  values: Record<string, string | number> = {},
  locale = "en",
): Promise<Guide> {
  const file = path.join(process.cwd(), "content", locale, "guides", `${slug}.md`);
  // GUIDE_VALUES: the game's own numbers the guides' text names (what a recipe
  // takes, a crypt chest's iron), written by the Valheim generator; the page's
  // values come after them.
  const text = fill(await readFile(file, "utf8"), { ...GUIDE_VALUES, ...values });
  const [first, ...rest] = text.split("\n");
  const body = rest.join("\n");
  const lead = body.trim().split("\n")[0] ?? "";
  const fact = lead
    .replace(/\*\*[^*]*\*\*/, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .trim();
  return {
    title: first.replace(/^#\s*/, ""),
    html: withBase(anchorHeadings(await marked.parse(longGuideLinks(body)))),
    fact,
  };
}
