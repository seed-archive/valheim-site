import crafting from "@/lib/valheim/crafting.json";
import names from "@/lib/valheim/generator.json";
import materials from "@/lib/valheim/materials.json";

// The loot of one place, as the Valheim generator's `loot` export gives it
// (the generator's `docs/dungeons.md` → The loot of a place): six numbers a
// line — the item, what stands once the place is built (`fixed`), that plus
// what the game rolls at play (`expected`), the least and the most of it over
// every generation the place can have, and how certain the line is.

export type Certainty = "exact" | "overYaws" | "atPlay";

export type LootLine = {
  key: string;
  fixed: number;
  expected: number;
  least: number;
  most: number;
  certainty: Certainty;
};

// The catalogue's names of the game's items: the materials and the crafted
// gear. The rest are named by `pages.map.loot.items.<key>` in the messages;
// an item named nowhere keeps its game key.
export const NAMES = new Map<string, string>([
  ...crafting.gear.map((g) => [g.key, g.name] as [string, string]),
  ...(materials as { key: string; name: string }[]).map((m) => [m.key, m.name] as [string, string]),
]);

const LINE = 6;

export function decodeLoot(raw: Float32Array): LootLine[] {
  const out: LootLine[] = [];
  for (let i = 0; i + LINE - 1 < raw.length; i += LINE) {
    const key = names.lootItems[raw[i]];
    out.push({
      key,
      fixed: raw[i + 1],
      expected: raw[i + 2],
      least: raw[i + 3],
      most: raw[i + 4],
      certainty: names.lootCertainty[raw[i + 5]] as Certainty,
    });
  }
  return out;
}
