// Every translation of the messages is whole and well formed before a language
// is published (the portal's D20; the archive's site-code.md → Text in several
// languages): each English key has its translation, every placeholder and tag
// of the English message is kept, and each message parses as ICU.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";
import {
  parse,
  TYPE,
  type MessageFormatElement,
} from "@formatjs/icu-messageformat-parser";

import { MESSAGES } from "@/lib/i18n";
import { flattenMessages } from "@seed-archive/ui/localization";

const ROOT = new URL("..", import.meta.url).pathname;
const EN = flattenMessages(MESSAGES.en);

// The names a message's placeholders and tags use, at any depth.
function names(elements: MessageFormatElement[], out = new Set<string>()) {
  for (const e of elements) {
    if (
      e.type === TYPE.argument ||
      e.type === TYPE.number ||
      e.type === TYPE.date ||
      e.type === TYPE.time
    ) {
      out.add(e.value);
    } else if (e.type === TYPE.plural || e.type === TYPE.select) {
      out.add(e.value);
      Object.values(e.options).forEach((o) => names(o.value, out));
    } else if (e.type === TYPE.tag) {
      out.add(`<${e.value}>`);
      names(e.children, out);
    }
  }
  return out;
}

const translated = Object.entries(MESSAGES).filter(([lang]) => lang !== "en");

// Words a translation must never use (the owner, 2026-11-24): Kall is
// «Келл» in Russian, as the game writes him, never «Кал», a vulgar word; a seed
// is «сид», never «Зерно мира». The reader is addressed as the game's own
// voice addresses the player in that language (Infrastructure, 2026-11-24,
// counted in the game's tables): Russian «вы», never «ты»; Spanish «tú», never
// «usted»; German «du» (a capital «Sie» cannot be told from "sie" by a rule,
// so German is read, not tested).
const RU = "а-яё";
const word = (w: string) => new RegExp(`(^|[^${RU}])(${w})([^${RU}]|$)`, "i");
const FORBIDDEN: Record<string, RegExp[]> = {
  ru: [
    word("кал|кала|калу|калом|кале"),
    /зерн[оау]\s+мира/i,
    word("ты|тебя|тебе|тобой|твой|твоя|твоё|твое|твои|твоих|твоим|твоей|твою"),
  ],
  es: [/(^|[^a-záéíóúñ])ustede?s?([^a-záéíóúñ]|$)/i],
};

it.each(translated)("%s uses no forbidden word", (lang, messages) => {
  const rules = FORBIDDEN[lang] ?? [];
  const flat = flattenMessages(messages);
  const guides = join(ROOT, "content", lang, "guides");
  const texts = [
    ...Object.values(flat),
    ...(existsSync(guides)
      ? readdirSync(guides).map((f) => readFileSync(join(guides, f), "utf8"))
      : []),
  ];
  expect(texts.filter((t) => rules.some((r) => r.test(t)))).toEqual([]);
});

it.each(translated)("%s has every English message", (_, messages) => {
  const flat = flattenMessages(messages);
  expect(Object.keys(EN).filter((k) => !(k in flat))).toEqual([]);
  expect(Object.keys(flat).filter((k) => !(k in EN))).toEqual([]);
});

it.each(translated)("%s keeps every placeholder and tag", (_, messages) => {
  const flat = flattenMessages(messages);
  const wrong = Object.keys(EN).filter((k) => {
    if (!(k in flat)) {
      return false;
    }
    const want = [...names(parse(EN[k]))].sort().join();
    let got: string;
    try {
      got = [...names(parse(flat[k]))].sort().join();
    } catch {
      return true;
    }
    return got !== want;
  });
  expect(wrong).toEqual([]);
});
