import { catalogHref } from "@/lib/guides";
import crafting from "@/lib/valheim/crafting.json";
import creatures from "@/lib/valheim/creatures.json";
import farming from "@/lib/valheim/farming.json";
import fish from "@/lib/valheim/fish.json";
import food from "@/lib/valheim/food.json";
import materials from "@/lib/valheim/materials.json";

type Material = (typeof materials)[number];

// Made items with a catalogue page of their own (weapons, armour, meads…).
const GEAR_KEYS = new Set(
  crafting.gear.filter((g) => g.page).map((g) => g.key),
);

// The game's item types a materials page keeps to (`ItemDrop.ItemData.ItemType`),
// shared with `MaterialsView`, so a link goes where the row really stands.
export const MATERIAL_KINDS = {
  // Materials, fish and the like, not what a gear page or the food page holds.
  raw: (m: Material) =>
    [1, 16, 21].includes(m.itemType ?? 0) && !GEAR_KEYS.has(m.key),
  trophies: (m: Material) => m.itemType === 13,
};

// Every item and piece that has a row, by key: the page it stands on and the
// row's id there. Built from the same data the pages render their rows from,
// so no link points at a row that is not drawn (the review of 2026-11-20 found
// 175 such links). A key that is on no page gets no link.
const ROW = new Map<string, string>();
const put = (key: string, page: string, id = key) => {
  if (!ROW.has(key)) {
    ROW.set(key, `${page}#${id.toLowerCase()}`);
  }
};
food.forEach((f) => put(f.key, catalogHref("food")));
crafting.gear.forEach((g) => {
  if (g.page === "meads") {
    // A mead's row carries the mead's key; its base links to that row.
    const mead = (g as { mead?: { key: string } | null }).mead;
    put(g.key, catalogHref("meads"), mead?.key ?? g.key);
    if (mead) {
      put(mead.key, catalogHref("meads"));
    }
  } else if (g.page) {
    put(g.key, catalogHref(g.page));
  }
});
crafting.building.forEach((b) => b.page && put(b.key, catalogHref(b.page)));
materials.forEach((m) => {
  if (MATERIAL_KINDS.trophies(m)) {
    put(m.key, catalogHref("trophies"));
  } else if (MATERIAL_KINDS.raw(m)) {
    put(m.key, catalogHref("materials"));
  }
});
// A seed plant (`sapling_seed…`) has no row of its own on the farming page:
// it shares its crop's row (the page's `seedPlantOf`), so it links there.
const firstKey = (x: unknown[]) => (x[0] as { key?: string } | undefined)?.key;
const isSeedPlant = (key: string) =>
  key.toLowerCase().startsWith("sapling_seed");
// The farming guide, where each plant has its row.
const FARMING = "/guides/basics/farming";
farming.forEach((p) => {
  if (!isSeedPlant(p.key)) {
    put(p.key, FARMING);
    const seed = farming.find(
      (s) => isSeedPlant(s.key) && firstKey(s.gives) === firstKey(p.plantWith),
    );
    if (seed) {
      put(seed.key, FARMING, p.key);
    }
  }
});

// Where an item's row stands, or null when no page draws one.
export const recipeHref = (key: string): string | null => ROW.get(key) ?? null;

// The creatures page draws a section for each creature and a row for each
// fish; a spawner, a chest-less variant or a hive has neither, so it gets no
// link (a fish's key is also an item's, so these stay apart from ROW).
const CREATURE_ROW = new Set([
  ...creatures.map((c) => c.key),
  ...fish.map((f) => f.key),
]);
// Hildir's bosses come in a chest-less copy for her raids (the game's
// `…_nochest` prefabs); it links to the creature it copies.
const NO_CHEST = /_nochest$/i;
export const creatureHref = (key: string): string | null => {
  const row = key.replace(NO_CHEST, "");
  return CREATURE_ROW.has(row)
    ? `${catalogHref("creatures")}#${row.toLowerCase()}`
    : null;
};
