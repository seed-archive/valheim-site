import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import { serverFormat } from "@/lib/i18n/server";
import seedStats from "@/lib/valheim/seed-stats.json";
import map from "@/public/guides/strip-valheim.png";

// The map the Valheim generator draws of a seed (`vh map Valheim`): its 2048
// pixels a side cover the world's grid, 12 m a pixel, the world's centre in
// the middle (the game's `WorldGenerator` grid; the generator's notes, maps.md).
const PIXELS = 2048;
const METRES_A_PIXEL = 12;
// The strip, metres wide (the generator's `stripM`), through the start, which
// stands by the world's centre.
const HALF = seedStats.stripM / 2 / METRES_A_PIXEL;
const LEFT = PIXELS / 2 - HALF;
const RIGHT = PIXELS / 2 + HALF;
// The edges' width, map pixels (a layout number).
const EDGE = 10;

// The strip on a seed's map (the owner, 2026-11-22: a red line on each side,
// the hatching of everything else was too much).
export function StripFigure() {
  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Box
        sx={{ position: "relative", width: "100%", maxWidth: 640, mx: "auto" }}
      >
        <Image
          src={map}
          alt={serverFormat("pages.speedrun.stripMap")}
          sizes="(max-width: 700px) 100vw, 640px"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <Box
          component="svg"
          viewBox={`0 0 ${PIXELS} ${PIXELS}`}
          aria-hidden
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          {[LEFT, RIGHT].map((x) => (
            <line
              key={x}
              x1={x}
              y1={0}
              x2={x}
              y2={PIXELS}
              stroke="#d32f2f"
              strokeWidth={EDGE}
            />
          ))}
        </Box>
      </Box>
      <Typography
        component="figcaption"
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, textAlign: "center" }}
      >
        {serverFormat("pages.speedrun.stripCaption", { m: seedStats.stripM })}
      </Typography>
    </Box>
  );
}
