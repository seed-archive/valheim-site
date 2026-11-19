import tree from "@/lib/valheim/craft-tree.json";
import traders from "@/lib/valheim/traders.json";

// The craft tree as a graph: a vertex is a target the run makes, or a station,
// a station's extension or a converter (smelter, kiln…) some target needs; an
// edge runs from what a vertex needs to the vertex. The Valheim generator
// writes the recipes; the graph follows from them here.

type Resource = { key: string; amount: number; perLevel: number };
type Recipe = {
  amount: number;
  station: string | null;
  level: number;
  resources: Resource[];
  maxQuality: number;
};
type Piece = {
  name: string;
  biome?: string | null;
  tool?: string | null;
  station: string | null;
  resources: Resource[];
};
type Converter = {
  from: string;
  station: string;
  fuel: string | null;
  fuelPerProduct: number | null;
};
type Item = {
  name: string;
  stack: number;
  weight: number;
  type?: number;
  set?: string | null;
  skill?: number;
  eitrRegen?: number;
  biome?: string | null;
};

export const recipes = tree.recipes as Record<string, Recipe>;
export const pieces = tree.pieces as Record<string, Piece>;
const stations = tree.stations as Record<string, { extensions: string[] }>;
const converters = tree.converters as Record<string, Converter>;
export const items = tree.items as Record<string, Item>;

// The tools of the main line by kind, lowest tier first, and the lowest tier
// that gathers each raw material (the Valheim generator, from each rock's and
// tree's `m_minToolTier`).
const tools = tree.tools as Record<string, { key: string; tier: number }[]>;
const gather = tree.gather as Record<string, { tool: string; tier: number }>;
export const BANDS = tree.bands.map((b) => b.biome);

// What traders sell, by key: the trader, the price a piece, and the good's
// name (a player key such as Haldor's inventory rows is no item).
export const OFFER = new Map<string, { trader: string; each: number; name: string }>();
for (const trader of traders.traders) {
  for (const g of trader.goods) {
    if (!g.key) {
      continue;
    }
    const each = g.price / Math.max(1, g.stack);
    const old = OFFER.get(g.key);
    if (!old || each < old.each) {
      OFFER.set(g.key, {
        trader: trader.name ?? trader.key,
        each,
        name: g.name ?? g.key,
      });
    }
  }
}

// The bosses as vertices (the generator's `bosses`, docs/craft-tree.md →
// Bosses): each stands on the line under its band, needs its summon, and is
// needed by what holds a drop only bosses give.
export type Boss = {
  key: string;
  name: string;
  band: number;
  summon: { item: string; count: number; name: string } | null;
  drops: { key: string; name: string }[];
};
export const BOSSES = new Map(
  (tree.bosses as Boss[]).map((b) => [b.key, b]),
);
const BOSS_OF_DROP = new Map(
  [...BOSSES.values()].flatMap((b) => b.drops.map((d) => [d.key, b.key] as const)),
);

export const nameOf = (key: string) =>
  BOSSES.get(key)?.name ??
  items[key]?.name ??
  pieces[key]?.name ??
  OFFER.get(key)?.name ??
  key;

// The station level an item of this quality is made or upgraded at
// (`Recipe.GetRequiredStationLevel`: the recipe's level + quality − 1).
export const levelFor = (key: string, quality: number) =>
  Math.max(1, recipes[key]?.level ?? 1) + quality - 1;

// What one upgrade to a quality level adds of a resource
// (`Piece.Requirement.GetAmount`: the per-level amount times the level − 1,
// and from level 4 on times 4 + (level − 4) / 2).
const upgradeAmount = (perLevel: number, quality: number) =>
  Math.floor(
    (quality >= 4 ? 4 + (quality - 4) / 2 : quality - 1) * perLevel,
  );

// How hard an extension is to get, to build the easiest first: any distinct
// extension raises the station a level (`CraftingStation.GetLevel`), so the
// game's order means nothing. Its raw materials with no known source (a drop
// or a find, such as the bellows' chains) count first, then the highest tool
// tier its materials need, then the game's order.
function hardness(ext: string, index: number): number[] {
  let unknown = 0;
  let tier = 0;
  const seen = new Set<string>();
  const walk = (m: string) => {
    if (seen.has(m)) {
      return;
    }
    seen.add(m);
    const recipe = recipes[m];
    const conv = converters[m];
    if (recipe) {
      recipe.resources.forEach((r) => walk(r.key));
    } else if (conv) {
      walk(conv.from);
    } else if (gather[m]) {
      tier = Math.max(tier, gather[m].tier);
    } else {
      unknown += 1;
    }
  };
  pieces[ext]?.resources.forEach((r) => walk(r.key));
  return [unknown, tier, index];
}

// The easiest first: the earliest by the extension's home biome (the Tanning
// Rack's deer hide before the Adze's bronze), then by `hardness`.
const easiestFirst = (list: string[]) =>
  list
    .map((e, i) => {
      const home = BANDS.indexOf(pieces[e]?.biome ?? "");
      return { e, h: [home < 0 ? BANDS.length : home, ...hardness(e, i)] };
    })
    .sort(
      (a, b) =>
        a.h[0] - b.h[0] || a.h[1] - b.h[1] || a.h[2] - b.h[2] || a.h[3] - b.h[3],
    )
    .map((x) => x.e);

const ORDERED = Object.fromEntries(
  Object.entries(stations).map(([s, v]) => [s, easiestFirst(v.extensions)]),
);

// A station at a level: the station and as many of its easiest extensions as
// the level needs above the first (`CraftingStation.GetLevel`: 1 + the
// distinct extensions attached).
export const stationAt = (station: string | null, level: number) =>
  station
    ? [station, ...(ORDERED[station] ?? []).slice(0, Math.max(0, level - 1))]
    : [];

// The tool a raw material needs beyond the start kit (the first tool of each
// kind): the cheapest of the main line that reaches its tier.
function toolFor(material: string): string | null {
  const g = gather[material];
  const line = g ? tools[g.tool] : undefined;
  if (!g || !line || g.tier <= line[0].tier) {
    return null;
  }
  return line.find((t) => t.tier >= g.tier)?.key ?? null;
}

// What a vertex needs directly: the stations of its own recipe or piece, and
// of every material made on the way down to raw ones (a bronze axe needs the
// forge, and the smelter and the kiln for its bronze).
function needs(key: string): Set<string> {
  const out = new Set<string>();
  const seen = new Set<string>();
  const material = (m: string) => {
    if (seen.has(m)) {
      return;
    }
    seen.add(m);
    const recipe = recipes[m];
    const conv = converters[m];
    if (recipe) {
      stationAt(recipe.station, recipe.level).forEach((s) => out.add(s));
      recipe.resources.forEach((r) => material(r.key));
    } else if (conv) {
      out.add(conv.station);
      material(conv.from);
      if (conv.fuel && conv.fuelPerProduct) {
        material(conv.fuel);
      }
    } else if (BOSS_OF_DROP.has(m)) {
      out.add(BOSS_OF_DROP.get(m)!);
    } else {
      const tool = toolFor(m);
      if (tool) {
        out.add(tool);
      }
    }
  };
  // A boss needs its summon, made with whatever that takes.
  const boss = BOSSES.get(key);
  if (boss) {
    if (boss.summon) {
      material(boss.summon.item);
    }
    out.delete(key);
    return out;
  }
  const piece = pieces[key];
  // An extension serves only its station, whatever station it is built by.
  for (const [station, s] of Object.entries(stations)) {
    if (s.extensions.includes(key)) {
      out.add(station);
    }
  }
  if (piece) {
    // A piece placed with a bought tool needs the tool (a feast, the serving
    // tray); the hammer and the other made tools are taken as had.
    if (piece.tool && OFFER.has(piece.tool)) {
      out.add(piece.tool);
    }
    // A station that works only over a fire needs one (the cauldrons, the
    // spits): the generator names the fire.
    if (tree.needsFire.includes(key)) {
      out.add(tree.fire);
    }
    stationAt(piece.station, 1).forEach((s) => out.add(s));
    piece.resources.forEach((r) => material(r.key));
  } else {
    material(key);
  }
  out.delete(key);
  return out;
}

export type Vertex = {
  key: string;
  band: number;
  depth: number;
  deps: string[];
  dependents: string[];
};

// Every vertex: the targets of each band and everything they need, each
// needed vertex in the earliest band that needs it; the edges reduced to the
// direct ones (an edge implied by a longer path is dropped).
function build(): Map<string, Vertex> {
  const band = new Map<string, number>();
  tree.bands.forEach((b, i) => b.targets.forEach((t) => band.set(t, i)));
  // Every boss stands in the tree, on the line under its own band.
  BOSSES.forEach((b) => band.set(b.key, b.band));
  const all = new Map<string, Set<string>>();
  // Every extension of a station the targets use stands in the graph too, for
  // the quality levels that need it; it needs its station.
  const queue = [...band.keys()];
  const extensionsOf = (key: string) => stations[key]?.extensions ?? [];
  while (queue.length > 0) {
    const key = queue.pop()!;
    if (all.has(key)) {
      continue;
    }
    const deps = needs(key);
    all.set(key, deps);
    deps.forEach((d) => queue.push(d));
    extensionsOf(key).forEach((e) => queue.push(e));
  }
  // A needed vertex stands in the earliest band of what needs it, counting
  // only what the targets need at their first quality.
  let changed = true;
  while (changed) {
    changed = false;
    for (const [key, deps] of all) {
      const b = band.get(key);
      if (b === undefined) {
        continue;
      }
      for (const d of deps) {
        if ((band.get(d) ?? Infinity) > b) {
          band.set(d, b);
          changed = true;
        }
      }
    }
  }
  // An extension only higher qualities need stands no earlier than what it
  // needs, and pulls nothing earlier.
  changed = true;
  while (changed) {
    changed = false;
    for (const [key, deps] of all) {
      if (band.has(key)) {
        continue;
      }
      const at = [...deps].map((d) => band.get(d));
      if (at.every((x) => x !== undefined)) {
        band.set(key, Math.max(0, ...(at as number[])));
        changed = true;
      }
    }
  }
  // A vertex stands where it can first be made: its home biome (the Valheim
  // generator's), when the data knows it; never before what it needs. So the
  // forge's Anvils (bronze) stand in the Black Forest even though iron gear
  // first needs them, and its Bellows (chains) in the Swamp.
  for (const key of all.keys()) {
    const home = BANDS.indexOf(pieces[key]?.biome ?? items[key]?.biome ?? "");
    if (home >= 0) {
      band.set(key, home);
    }
  }
  // A boss stands on the line under its band, so what needs it comes in the
  // band after.
  BOSSES.forEach((b) => band.set(b.key, b.band));
  changed = true;
  while (changed) {
    changed = false;
    for (const [key, deps] of all) {
      const need = Math.max(
        -1,
        ...[...deps].map((d) => (band.get(d) ?? -1) + (BOSSES.has(d) ? 1 : 0)),
      );
      if ((band.get(key) ?? 0) < need) {
        band.set(key, need);
        changed = true;
      }
    }
  }
  const ancestors = (key: string, acc = new Set<string>()) => {
    for (const d of all.get(key) ?? []) {
      if (!acc.has(d)) {
        acc.add(d);
        ancestors(d, acc);
      }
    }
    return acc;
  };
  const graph = new Map<string, Vertex>();
  for (const [key, deps] of all) {
    const direct = [...deps].filter(
      (d) => ![...deps].some((o) => o !== d && ancestors(o).has(d)),
    );
    graph.set(key, {
      key,
      band: band.get(key) ?? 0,
      depth: 0,
      deps: direct,
      dependents: [],
    });
  }
  for (const v of graph.values()) {
    v.deps.forEach((d) => graph.get(d)?.dependents.push(v.key));
  }
  const depth = (key: string): number => {
    const v = graph.get(key)!;
    if (v.depth === 0 && v.deps.length > 0) {
      v.depth = 1 + Math.max(...v.deps.map(depth));
    }
    return v.depth;
  };
  graph.forEach((v) => depth(v.key));
  return graph;
}

export const GRAPH = build();

// `ItemDrop.ItemType` of what a station makes as gear: armour (Helmet 6, Chest
// 7, Legs 11, Shoulder 17, and Shield 5 with the cape: the owner, 2026-11-17)
// and tools and weapons (OneHandedWeapon 3, Bow 4, TwoHandedWeapon 14, Torch
// 15: fire damage, good against Greydwarf roots, Tool 19, Attach_Atgeir 20,
// TwoHandedWeaponLeft 22). Arrows, food and materials are no gear.
const ARMOUR_TYPES = [5, 6, 7, 11, 17];
const GEAR_TYPES = [3, 4, 14, 15, 19, 20, 22];


// The Galdr table's tools and weapons are the mage's staffs.
const MAGE_TABLE = "piece_magetable";

export type Group = {
  id: string;
  kind: "armour" | "weapons" | "staffs";
  station: string | null;
  members: string[];
};

// Gear a run makes or skips together (the owner, 2026-11-17): what one station
// makes in one biome, armour apart from tools and weapons. A piece of armour has
// an armour slot and deals no damage; everything else with a damage or a tool's
// use is a tool or weapon (a weapon's own armour is its block). On the Galdr
// table the weapons are staffs. A group of one is no group; its members share
// a row and a band.
function groups(): Map<string, Group> {
  const byId = new Map<string, Group>();
  for (const v of GRAPH.values()) {
    const item = items[v.key] as Item & { damage?: number };
    // A fired item (the Deep North's gold weapons and staffs) is made as its
    // blank: the blank's station names its group.
    const blank = Object.keys(recipes).find(
      (k) => k.toLowerCase() === `${v.key}Uncooked`.toLowerCase(),
    );
    const recipe = recipes[v.key] ?? (blank ? recipes[blank] : undefined);
    if (!item || !recipe) {
      continue;
    }
    // Armour is what goes in an armour slot (a helmet carries a small damage of
    // its own in the data, so damage cannot tell it).
    const armour = ARMOUR_TYPES.includes(item.type ?? -1);
    if (!armour && !GEAR_TYPES.includes(item.type ?? -1)) {
      continue;
    }
    // What is made by hand, with no station (the club, the torch), is a group
    // of its own (the owner, 2026-11-17).
    const station = recipe.station;
    const kind = armour ? "armour" : station === MAGE_TABLE ? "staffs" : "weapons";
    const id = `${kind}:${station}:${v.band}`;
    const g = byId.get(id) ?? { id, kind, station, members: [] };
    g.members.push(v.key);
    byId.set(id, g);
  }
  const out = new Map<string, Group>();
  for (const g of byId.values()) {
    if (g.members.length < 2) {
      continue;
    }
    const depth = Math.max(...g.members.map((k) => GRAPH.get(k)!.depth));
    const band = Math.min(...g.members.map((k) => GRAPH.get(k)!.band));
    g.members.forEach((k) => {
      GRAPH.get(k)!.depth = depth;
      GRAPH.get(k)!.band = band;
      out.set(k, g);
    });
  }
  return out;
}

// Each grouped item's group.
export const GROUP_OF = groups();

// Everything a vertex needs, all the way up; and everything that needs it,
// all the way down.
export function closure(key: string, way: "deps" | "dependents") {
  const out = new Set<string>();
  const walk = (k: string) =>
    GRAPH.get(k)?.[way].forEach((n) => {
      if (!out.has(n)) {
        out.add(n);
        walk(n);
      }
    });
  walk(key);
  return out;
}

// What is on at first: the Valheim generator's short list (the campfire, the
// spits, the torch, the club, the workbench and the hammer) and everything it
// needs at its first quality; the rest is the visitor's to switch on (the
// owner, 2026-11-19).
export const DEFAULT_ON = new Set(
  tree.onByDefault.flatMap((t) => [t, ...closure(t, "deps")]),
);

// The highest quality an item can reach with the vertices on: each level needs
// the station one level higher.
export function maxQualityWith(key: string, on: Set<string>) {
  const recipe = recipes[key];
  if (!recipe) {
    return 1;
  }
  let q = 1;
  while (
    q < recipe.maxQuality &&
    stationAt(recipe.station, levelFor(key, q + 1)).every((s) => on.has(s))
  ) {
    q += 1;
  }
  return q;
}

// The raw materials the switched-on vertices take: each piece built once, each
// item crafted once and upgraded to its quality, down through crafted
// materials and converters to what is gathered.
export function rawTotals(on: Iterable<string>, quality: Map<string, number>) {
  const raw = new Map<string, number>();
  const add = (key: string, qty: number) => {
    // A resource only the upgrades take (the club's bone fragments) costs
    // nothing at the first quality.
    if (qty <= 0) {
      return;
    }
    const recipe = recipes[key];
    const conv = converters[key];
    if (recipe) {
      const crafts = Math.ceil(qty / recipe.amount);
      recipe.resources.forEach((r) => add(r.key, r.amount * crafts));
    } else if (conv) {
      add(conv.from, qty);
      if (conv.fuel && conv.fuelPerProduct) {
        add(conv.fuel, qty * conv.fuelPerProduct);
      }
    } else {
      raw.set(key, (raw.get(key) ?? 0) + qty);
    }
  };
  for (const key of on) {
    const piece = pieces[key];
    const boss = BOSSES.get(key);
    if (boss) {
      // A boss costs its summon (two deer trophies; three bells, forged).
      if (boss.summon) {
        add(boss.summon.item, boss.summon.count);
      }
    } else if (piece) {
      // How many of it a run builds (five spits on one fire, the owner).
      const count = (tree.pieceCount as Record<string, number>)[key] ?? 1;
      piece.resources.forEach((r) => add(r.key, r.amount * count));
    } else {
      add(key, 1);
      const q = quality.get(key) ?? 1;
      for (let level = 2; level <= q; level += 1) {
        recipes[key]?.resources.forEach((r) => {
          const n = upgradeAmount(r.perLevel, level);
          if (n > 0) {
            add(r.key, n);
          }
        });
      }
    }
  }
  return raw;
}
