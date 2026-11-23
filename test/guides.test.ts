// Every number a guide's text names (`{{name}}`) has a value, so a number
// dropped from the Valheim generator's data never leaves a page showing its
// name (the owner, 2026-11-23: the clean-up dropped the numbers no page
// read). A guide is filled from `guide-values.json`, the bosses' powers, and
// its page's own values: `seed-stats.json`, the summons, and anything the page
// names itself (`readGuide("<slug>", …)` in `app/`).

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";
import { POWERS } from "@/lib/valheim/boss-power";
import { FORGE } from "@/lib/valheim/forge";
import GUIDE_VALUES from "@/lib/valheim/guide-values.json";
import SEED_STATS from "@/lib/valheim/seed-stats.json";
import { SUMMONS } from "@/lib/valheim/summons";

const ROOT = new URL("..", import.meta.url).pathname;
const GUIDES = join(ROOT, "content/en/guides");

function pages(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? pages(join(dir, e.name))
      : e.name === "page.tsx"
        ? [join(dir, e.name)]
        : [],
  );
}

it("fills every number its guides name", () => {
  const shared = new Set([
    ...Object.keys(GUIDE_VALUES),
    ...Object.keys(POWERS),
    ...Object.keys(SUMMONS),
    ...Object.keys(SEED_STATS),
    // The Forge of Potential's own numbers, which its page passes whole.
    ...Object.keys(FORGE),
  ]);
  const sources = pages(join(ROOT, "app")).map((f) => readFileSync(f, "utf8"));
  const missing: string[] = [];
  for (const file of readdirSync(GUIDES)) {
    const slug = file.replace(/\.md$/, "");
    // The page that reads this guide: a name it sets itself counts.
    const page = sources.find((s) => s.includes(`readGuide("${slug}"`)) ?? "";
    for (const m of readFileSync(join(GUIDES, file), "utf8").matchAll(
      /\{\{(\w+)\}\}/g,
    )) {
      const name = m[1];
      if (!shared.has(name) && !new RegExp(`\\b${name}\\b`).test(page)) {
        missing.push(`${file}: ${name}`);
      }
    }
  }
  expect(missing).toEqual([]);
});
