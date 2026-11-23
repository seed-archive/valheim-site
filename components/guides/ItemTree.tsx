import { RecipeTrees, recipeTree } from "@/components/guides/RecipeTree";

// One of the Mistlands' two tools for the cliffs, the feather cape or the
// grappling hook, as its recipe tree (the owner, 2026-11-23: one figure each,
// with its own sentence, so the two read as two recipes).
export function ItemTree(props: { item: string }) {
  return <RecipeTrees trees={[{ tree: recipeTree(props.item, 1) }]} />;
}
