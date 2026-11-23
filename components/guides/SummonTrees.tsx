import { RecipeTrees, itemName } from "@/components/guides/RecipeTree";
import bosses from "@/lib/valheim/bosses.json";

// What the Queen's gate takes is the Sealbreaker the fragments are made into;
// the Valheim generator records her offering as the fragments, the Sealbreaker's
// recipe, so her slot shows the Sealbreaker (the game's `DvergrKey`).
const MADE_INTO: Record<string, string> = { DvergrKeyFragment: "DvergrKey" };

// What each boss's altar takes, one slot a boss in the run's order, without the
// recipes under it (the owner, 2026-11-23: the page is about the keys, not
// the crafting).
export function SummonTrees() {
  return (
    <RecipeTrees
      trees={bosses.flatMap((b) => {
        const s = b.summon;
        if (!s) {
          return [];
        }
        const key = MADE_INTO[s.item] ?? s.item;
        const amount = MADE_INTO[s.item] ? 1 : s.count;
        return [
          {
            tree: { key, name: itemName(key), amount, parts: [] },
            title: b.name,
          },
        ];
      })}
    />
  );
}
