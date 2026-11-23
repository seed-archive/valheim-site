// Everything each item goes into: every recipe and build piece that takes it,
// earliest biome first. One list for every catalogue page (the owner,
// 2026-11-23: a creature's drop names the pieces it builds too, as the
// materials page does).

import crafting from "@/lib/valheim/crafting.json";
import { CONVERSIONS } from "@/lib/valheim/conversions";
import { RUN_ORDER } from "@/lib/valheim/run-order";

export type Use = { key: string; name: string; biome: string | null };

// A biome's place in the run's order; none comes last.
const biomeAt = (b: string | null) => {
  const i = RUN_ORDER.indexOf(b ?? "");
  return i < 0 ? RUN_ORDER.length : i;
};

export const USED_IN = new Map<string, Use[]>();
for (const r of [...crafting.gear, ...crafting.building]) {
  for (const m of r.resources) {
    const list = USED_IN.get(m.key) ?? [];
    if (!list.some((x) => x.key === r.key)) {
      list.push({ key: r.key, name: r.name, biome: r.biome });
    }
    USED_IN.set(m.key, list);
  }
}
// What a station turns it into: an ore its bar, a raw meat its cooked one.
for (const c of CONVERSIONS) {
  const list = USED_IN.get(c.from) ?? [];
  if (!list.some((x) => x.key === c.to)) {
    list.push({ key: c.to, name: c.toName, biome: null });
  }
  USED_IN.set(c.from, list);
}
USED_IN.forEach((list) =>
  list.sort(
    (a, b) =>
      biomeAt(a.biome) - biomeAt(b.biome) || a.name.localeCompare(b.name),
  ),
);
