// A translated guide keeps the English guide's skeleton (the generator's
// docs/translation.md): the same headings in the same order, so its anchors
// are the English ones (lib/content.ts takes them by position); every number
// the English names, so no figure is typed; and every link, so no page loses
// its way in.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";

const ROOT = new URL("..", import.meta.url).pathname;
const CONTENT = join(ROOT, "content");

const langs = readdirSync(CONTENT).filter((l) => l !== "en");
const cases = langs.flatMap((lang) =>
  readdirSync(join(CONTENT, lang, "guides")).map((file) => [lang, file]),
);

const read = (lang: string, file: string) =>
  readFileSync(join(CONTENT, lang, "guides", file), "utf8");

// Heading levels in order (## and ###; the first line is the title).
const headings = (text: string) =>
  text
    .split("\n")
    .slice(1)
    .filter((l) => /^#{2,4} /.test(l))
    .map((l) => l.match(/^#+/)![0]);

// The names of the numbers, `{{name}}` or `{{name, plural, …}}`.
const numbers = (text: string) =>
  [...text.matchAll(/\{\{\s*(\w+)/g)].map((m) => m[1]).sort();

// Link targets, `](/path#anchor)`.
const links = (text: string) =>
  [...text.matchAll(/\]\(([^)]+)\)/g)].map((m) => m[1]).sort();

// Table and chart markers the page reads (`Figure: …`, `Chart: …`).
const markers = (text: string) =>
  text.split("\n").filter((l) => /^(Figure|Chart): /.test(l));

it.skipIf(cases.length === 0).each(cases)(
  "%s/%s keeps the English skeleton",
  (lang, file) => {
    expect(existsSync(join(CONTENT, "en", "guides", file))).toBe(true);
    const en = read("en", file);
    const tr = read(lang, file);
    expect(headings(tr)).toEqual(headings(en));
    expect(numbers(tr)).toEqual(numbers(en));
    expect(links(tr)).toEqual(links(en));
    expect(markers(tr)).toEqual(markers(en));
  },
);
