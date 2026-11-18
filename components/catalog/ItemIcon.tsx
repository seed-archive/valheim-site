import Box from "@mui/material/Box";
import type { ReactNode } from "react";

import { SlotTile } from "@seed-archive/ui/slot-tile";

import { BASE_PATH } from "@/lib/site";
import icons from "@/lib/valheim/icons.json";

// One sheet a group, the Valheim generator's (buildings with buildings,
// weapons with weapons, resources with resources): an icon is drawn from its
// group's sheet, so a page makes the browser fetch only the sheets it uses.
const SHEETS = icons.sheets as Record<string, Record<string, number>>;
const GROUP_OF = new Map(
  Object.entries(SHEETS).flatMap(([group, tiles]) =>
    Object.keys(tiles).map((key) => [key, group] as const),
  ),
);

// An item or a piece with its inventory slot before its name, in one row.
export function ItemIcon(props: { item: string; children?: ReactNode }) {
  const group = GROUP_OF.get(props.item);
  return (
    <Box
      component="span"
      sx={{ display: "inline-flex", alignItems: "center", gap: 1, mr: 1.5 }}
    >
      <SlotTile
        basePath={BASE_PATH}
        tile={group ? SHEETS[group][props.item] : undefined}
        sprite={{ src: `/icons/${group ?? "materials"}.png`, columns: icons.columns }}
      />
      <span>{props.children}</span>
    </Box>
  );
}
