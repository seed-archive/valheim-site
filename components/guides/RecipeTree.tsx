import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SlotTile } from "@seed-archive/ui/slot-tile";

import { BASE_PATH } from "@/lib/site";
import bosses from "@/lib/valheim/bosses.json";
import crafting from "@/lib/valheim/crafting.json";
import icons from "@/lib/valheim/icons.json";
import materials from "@/lib/valheim/materials.json";
import { recipeHref } from "@/lib/valheim/recipes";

// A recipe drawn as the No Man's Sky section draws one (its `RecipeTree`): what
// you make on top, what it takes under it on bracket lines, down to what no
// recipe makes. Only recipes are followed, not the smelter's or the refinery's
// conversions, whose other inputs the data does not name.

export type TreeNode = {
  key: string;
  name: string;
  amount: number;
  parts: TreeNode[];
};

type Recipe = {
  key: string;
  name: string;
  amount: number;
  resources: { key: string; amount: number }[];
};
// Items' recipes only: the building list also holds pieces keyed like a crop
// (a planted carrot is `Carrot`, made of a carrot), which are no recipe of
// the item.
const RECIPES = new Map<string, Recipe>(
  crafting.gear.map((r) => [r.key, r as Recipe]),
);
const NAMES = new Map<string, string>([
  // The bosses' summons, which no catalogue page holds (dragon eggs, totems).
  ...bosses.flatMap((b) =>
    b.summon?.name ? [[b.summon.item, b.summon.name] as const] : [],
  ),
  ...materials.map((m) => [m.key, m.name] as const),
  ...[...crafting.gear, ...crafting.building].map(
    (r) => [r.key, r.name] as const,
  ),
]);
export const itemName = (key: string) => NAMES.get(key) ?? key;

// The tree of `amount` of `key`: each ingredient times the crafts it takes.
// A branch stops at an item already above it on the path: some recipes come
// back to their own product (a plant's seeds from its crop).
export function recipeTree(
  key: string,
  amount: number,
  above: ReadonlySet<string> = new Set(),
): TreeNode {
  const r = above.has(key) ? undefined : RECIPES.get(key);
  const crafts = r ? Math.ceil(amount / (r.amount || 1)) : 0;
  const path = new Set(above).add(key);
  return {
    key,
    name: itemName(key),
    amount,
    parts: r
      ? r.resources.map((x) => recipeTree(x.key, x.amount * crafts, path))
      : [],
  };
}

const SHEETS = icons.sheets as Record<string, Record<string, number>>;
const GROUP_OF = new Map(
  Object.entries(SHEETS).flatMap(([group, tiles]) =>
    Object.keys(tiles).map((k) => [k, group] as const),
  ),
);

// The room a slot takes with its name over it: a little wider than the slot so
// a name of two words fits (as in the No Man's Sky section).
const NODE_WIDTH = 96;
// The length of each stroke of the bracket lines.
const STEM = 12;
const LINE = "1px solid";

function Slot({ node }: { node: TreeNode }) {
  const group = GROUP_OF.get(node.key);
  const href = recipeHref(node.key);
  const name = (
    <Typography
      variant="caption"
      title={node.name}
      sx={{
        display: "block",
        maxWidth: NODE_WIDTH,
        lineHeight: 1.2,
        textAlign: "center",
      }}
    >
      {node.name}
    </Typography>
  );
  return (
    <Stack spacing={0.5} sx={{ alignItems: "center", width: NODE_WIDTH }}>
      {href ? (
        <Box
          component="a"
          href={`${BASE_PATH}${href}`}
          sx={{ color: "inherit" }}
        >
          {name}
        </Box>
      ) : (
        name
      )}
      <Box sx={{ position: "relative" }}>
        <SlotTile
          basePath={BASE_PATH}
          tile={group ? SHEETS[group][node.key] : undefined}
          sprite={{
            src: `/icons/${group ?? "materials"}.png`,
            columns: icons.columns,
          }}
        />
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            right: 4,
            bottom: 2,
            color: "#fff",
            fontWeight: 600,
            textShadow: "0 0 3px #000, 0 0 2px #000",
          }}
        >
          {node.amount}
        </Typography>
      </Box>
    </Stack>
  );
}

function Node({ node }: { node: TreeNode }) {
  return (
    <Stack sx={{ alignItems: "center" }}>
      <Slot node={node} />
      {node.parts.length ? (
        <>
          <Box
            sx={{ height: STEM, borderLeft: LINE, borderColor: "divider" }}
          />
          <Stack direction="row">
            {node.parts.map((part, at) => (
              <Box
                key={part.key}
                sx={{
                  position: "relative",
                  pt: `${STEM}px`,
                  px: 0.5,
                  // The bracket: a stroke across to the next part, and one down.
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: at === 0 ? "50%" : 0,
                    right: at === node.parts.length - 1 ? "50%" : 0,
                    borderTop: node.parts.length > 1 ? LINE : "none",
                    borderColor: "divider",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    height: STEM,
                    borderLeft: LINE,
                    borderColor: "divider",
                  },
                }}
              >
                <Node node={part} />
              </Box>
            ))}
          </Stack>
        </>
      ) : null}
    </Stack>
  );
}

// One tree, with an optional heading over it (a boss's name).
export function RecipeTree(props: { tree: TreeNode; title?: string }) {
  return (
    <Stack sx={{ alignItems: "center" }}>
      {props.title ? (
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {props.title}
        </Typography>
      ) : null}
      <Node node={props.tree} />
    </Stack>
  );
}

// Several trees in a row that wraps, as a figure of a guide.
export function RecipeTrees(props: {
  trees: { tree: TreeNode; title?: string }[];
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
        alignItems: "flex-start",
        mb: 2,
        pb: 1,
        overflowX: "auto",
      }}
    >
      {props.trees.map((t) => (
        <RecipeTree key={t.tree.key} tree={t.tree} title={t.title} />
      ))}
    </Box>
  );
}
