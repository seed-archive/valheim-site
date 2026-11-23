// What the converting stations turn into what (the smelter, the kiln, the
// cooking station, the oven…), as the Valheim generator writes each piece's
// "converter" use (`crafting.json`). The catalogue reads it so a raw material
// names what it goes into and a cooked dish where it is made (the owner,
// 2026-11-23).

import crafting from "@/lib/valheim/crafting.json";

export type Conversion = {
  from: string;
  fromName: string;
  to: string;
  toName: string;
  station: string;
  stationName: string;
};

type ConverterUse = {
  use: string;
  conversions?: Omit<Conversion, "station" | "stationName">[];
};

export const CONVERSIONS: Conversion[] = crafting.building.flatMap((p) =>
  (p.uses as ConverterUse[])
    .filter((u) => u.use === "converter")
    .flatMap((u) =>
      (u.conversions ?? []).map((c) => ({
        ...c,
        station: p.key,
        stationName: p.name,
      })),
    ),
);

// The station that turns something into this item, if any.
export const madeBy = (item: string) => CONVERSIONS.find((c) => c.to === item);
