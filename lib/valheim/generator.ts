import names from "@/lib/valheim/generator.json";
import { BASE_PATH } from "@/lib/site";
import type { PlaceGroup } from "@/lib/valheim/places";

// What the Valheim generator's numbers mean. The .wasm returns only numbers
// (the shared map interface); generator.json, which the generator writes,
// names them in the same order: place kinds, sub-biomes, and the
// measures of a seed.

// The game's wasm-bindgen glue, as an absolute URL for the map's workers.
export function moduleUrl(): string {
  return `${window.location.origin}${BASE_PATH}/wasm/map.js`;
}

export type Place = {
  group: PlaceGroup;
  key: string;
  x: number;
  y: number;
  biome: number;
  unique: boolean;
};

// `places`: five numbers each — kind, x, y, biome, unique.
export function decodePlaces(raw: Float32Array): Place[] {
  const out: Place[] = [];
  for (let i = 0; i + 4 < raw.length; i += 5) {
    const kind = names.kinds[raw[i]];
    out.push({
      group: kind.group as PlaceGroup,
      key: kind.key,
      x: raw[i + 1],
      y: raw[i + 2],
      biome: raw[i + 3],
      unique: raw[i + 4] === 1,
    });
  }
  return out;
}

// One room of a camp (a Fuling or Draugr village, a farm) as the Valheim
// generator lays it out: its
// prefab, its world position, and its turn in degrees clockwise from above.
export type CampRoom = {
  prefab: string;
  x: number;
  y: number;
  yaw: number;
};

// `camp`: four numbers a room — room, x, y, yaw.
export function decodeCamp(raw: Float32Array): CampRoom[] {
  const out: CampRoom[] = [];
  for (let i = 0; i + 3 < raw.length; i += 4) {
    out.push({
      prefab: names.campRooms[raw[i]],
      x: raw[i + 1],
      y: raw[i + 2],
      yaw: raw[i + 3],
    });
  }
  return out;
}

export type PointInfo = {
  biome: number;
  height: number;
  // Wide enough for crypts and Bonemass, a narrow strip, or no swamp.
  swamp: "wide" | "narrow" | null;
  subBiomes: string[];
};

// `point`: biome, height above the sea, swamp (1, 0, −1), sub-biomes….
export function decodePoint(raw: Float64Array): PointInfo {
  return {
    biome: raw[0],
    height: raw[1],
    swamp: raw[2] === 1 ? "wide" : raw[2] === 0 ? "narrow" : null,
    subBiomes: Array.from(raw.slice(3), (i) => names.subBiomes[i]),
  };
}

export const SUB_BIOMES: string[] = names.subBiomes;

// One place measured from the start.
export type Placed = {
  x: number;
  z: number;
  d: number;
  angle: number;
  offLine: number;
  sea: number;
  island: boolean;
};

export type SeedMeasures = {
  start: { x: number; z: number; fromCentre: number };
  area: Record<string, number>;
  land: Record<string, number>;
  island: {
    area: Record<string, number>;
    interior: Record<string, number>;
  };
  bosses: Record<string, Placed>;
  traders: Record<string, Placed>;
  dungeons: Record<
    string,
    { nearest: number | null; near: number; island: number }
  >;
  highest: number;
  route?: Record<string, Record<string, number>>;
  vegetation?: Record<string, Record<string, number>>;
  sectors?: Record<string, number>;
  bees?: Record<string, number>;
  villages?: Record<string, number>;
  summons?: Record<string, number>;
};

// `measure`: numbers in the order of generator.json's paths, nested by them;
// a NaN (a place the world lacks) is left out; a boss's or trader's `island`
// is a flag. Null when the world was not measured.
export function decodeMeasures(raw: Float32Array): SeedMeasures | null {
  if (raw.length !== names.measures.length) {
    return null;
  }
  const root: Record<string, unknown> = {};
  names.measures.forEach((path, i) => {
    const v = raw[i];
    if (Number.isNaN(v)) {
      return;
    }
    const parts = path.split(".");
    let node = root;
    for (const part of parts.slice(0, -1)) {
      node = (node[part] ??= {}) as Record<string, unknown>;
    }
    const leaf = parts[parts.length - 1];
    node[leaf] =
      leaf === "island" && (parts[0] === "bosses" || parts[0] === "traders")
        ? v === 1
        : v;
  });
  return root as SeedMeasures;
}
