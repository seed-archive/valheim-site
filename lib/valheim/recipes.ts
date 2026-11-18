import crafting from "@/lib/valheim/crafting.json";

// The catalogue page each made item and build piece stands on (the Valheim
// generator's `page`: weapons, bows, armour, tools, meads, and the hammer's
// tabs); a dish goes to the food page, anything else to the materials page.
const PAGE = new Map<string, string>([
  ...crafting.gear.map((g) => [g.key, g.page ?? (g.group === "consumables" ? "food" : "materials")] as [string, string]),
  ...crafting.building.flatMap((b) => (b.page ? [[b.key, b.page] as [string, string]] : [])),
]);

export const recipeHref = (key: string) =>
  `/catalog/${PAGE.get(key) ?? "materials"}#${key.toLowerCase()}`;
