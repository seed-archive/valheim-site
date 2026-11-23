// Every message the code names by a fixed id is in `lib/i18n/en.json`, so a
// key removed in a clean-up never leaves a page showing its id (the owner,
// 2026-11-23). Ids built at run time (`pages.map.biomes.${b}`) are not seen
// here.

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";
import en from "@/lib/i18n/en.json";

const ROOT = new URL("..", import.meta.url).pathname;
const FOLDERS = ["app", "components", "lib"];

function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const path = join(dir, e.name);
    if (e.isDirectory()) {
      return sources(path);
    }
    return /\.tsx?$/.test(e.name) ? [path] : [];
  });
}

function keys(node: unknown, prefix = ""): string[] {
  if (node && typeof node === "object") {
    return Object.entries(node).flatMap(([k, v]) =>
      keys(v, prefix ? `${prefix}.${k}` : k),
    );
  }
  return [prefix];
}

it("names only messages that exist", () => {
  const known = new Set(keys(en));
  const tops = new Set(Object.keys(en));
  const missing: string[] = [];
  for (const file of FOLDERS.flatMap((f) => sources(join(ROOT, f)))) {
    const text = readFileSync(file, "utf8");
    // `id="a.b"`, `id: "a.b"`, `id={"a.b"}`: a dotted id whose first part is
    // a part of en.json, so HTML ids and anchors are left alone.
    for (const m of text.matchAll(/\bid\s*[=:]\s*\{?\s*["']([\w.]+)["']/g)) {
      const id = m[1];
      if (id.includes(".") && tops.has(id.split(".")[0]) && !known.has(id)) {
        missing.push(`${file.slice(ROOT.length)}: ${id}`);
      }
    }
  }
  expect(missing).toEqual([]);
});
