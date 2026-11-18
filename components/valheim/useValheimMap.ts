"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useIntl } from "react-intl";

import type { Card } from "@seed-archive/map/card";
import { MapClient, type World } from "@seed-archive/map/client";
import type { Ground, Marker } from "@seed-archive/map/viewer";
import { BASE_PATH } from "@/lib/site";
import PLACES_GROUND from "@/lib/valheim/places-ground.json";
import ROOMS_GROUND from "@/lib/valheim/rooms-ground.json";
import {
  type CampRoom,
  decodeCamp,
  decodeMeasures,
  decodePlaces,
  moduleUrl,
  type Place,
} from "@/lib/valheim/generator";
import { placeIcon } from "@/lib/valheim/icons";
import { mapPalette, overlays } from "@/lib/valheim/palette";
import { BIOME_KEYS, compass, type PlaceGroup } from "@/lib/valheim/places";

// Nothing can be built this near the start: the start location's no-build
// radius, its exterior radius (the game's StartTemple prefab, m_noBuild).
const START_NO_BUILD = 25;

// A darker shade of each group's marker colour for the tooltip's label, so it
// reads on white (our own choice).
const KICKER_COLOUR: Record<PlaceGroup, string | undefined> = {
  start: "#424242",
  bosses: "#c62828",
  traders: "#a67c00",
  dungeons: "#7b1fa2",
  resources: "#2e7d32",
  other: undefined,
};

// The kinds of place whose card offers its loot: the dungeons and the
// resource places (the camps, the tar pits, the drake nests).
const LOOT_GROUPS = ["dungeons", "resources"];

// A picture's size in metres and where the place's origin sits in it, from its
// left and bottom edges (the Valheim generator's renders).
type Extent = { cx: number; cz: number; width: number; height: number };
const PLACES_EXTENTS = PLACES_GROUND as Record<string, Extent>;
const ROOMS_EXTENTS = ROOMS_GROUND as Record<string, Extent>;

// A picture's span about the place's origin, in metres.
function span(e: Extent) {
  return { x0: -e.cx, y0: -e.cz, x1: e.width - e.cx, y1: e.height - e.cz };
}

// Everything the shared viewer needs for a Valheim seed: the generator's
// workers, the world's extent, the palettes, the markers with their cards, and
// what a click reads — in the player's words.
export function useValheimMap(
  seed: string | null,
  hidden: ReadonlySet<string>,
  // A click on a dungeon opens its loot in the panel on the right.
  onLoot?: (place: { x: number; y: number; key: string }) => void,
) {
  const intl = useIntl();
  const t = useCallback(
    (id: string, values?: Record<string, string | number>) =>
      intl.formatMessage({ id }, values),
    [intl],
  );
  const [client, setClient] = useState<MapClient | null>(null);
  // Valheim is one world, number 0, the same disc for every seed.
  const [world, setWorld] = useState<{ index: number; bounds: World } | null>(
    null,
  );
  const [placed, setPlaced] = useState<{
    seed: string;
    places: Place[];
    // The nearest altar of each boss and place of each trader: sea on the way.
    nearest: Map<string, number>;
  } | null>(null);
  // Every Fuling village's rooms as the Valheim generator lays them out.
  const [camps, setCamps] = useState<{ seed: string; rooms: CampRoom[] } | null>(null);
  const palette = useMemo(() => mapPalette(), []);
  const layers = useMemo(() => overlays(), []);

  useEffect(() => {
    const c = new MapClient(moduleUrl());
    let live = true;
    // The viewer starts once the generator answers.
    c.worlds("").then(([bounds]) => {
      if (live) {
        setWorld({ index: 0, bounds });
        setClient(c);
      }
    });
    return () => {
      live = false;
      c.close();
    };
  }, []);

  // A seed's places, then its measures for the nearest ones.
  const asked = useRef<string | null>(null);
  useEffect(() => {
    if (!client || !seed) {
      return;
    }
    asked.current = seed;
    client.places(seed, 0).then((raw) => {
      if (asked.current !== seed) {
        return;
      }
      const places = decodePlaces(raw);
      setPlaced({ seed, places, nearest: new Map() });
      Promise.all(
        places
          .filter((p) => p.key === "fulingVillage")
          .map((p) => client.call<Float32Array>("camp", [seed, 0, p.x, p.y])),
      ).then((all) => {
        if (asked.current === seed) {
          setCamps({ seed, rooms: all.flatMap(decodeCamp) });
        }
      });
      client.call<Float32Array>("measure", [seed]).then((m) => {
        const measures = decodeMeasures(m);
        if (asked.current !== seed || !measures) {
          return;
        }
        const nearest = new Map<string, number>();
        for (const p of [
          ...Object.values(measures.bosses),
          ...Object.values(measures.traders),
        ]) {
          nearest.set(`${p.x},${p.z}`, p.sea);
        }
        setPlaced({ seed, places, nearest });
      });
    });
  }, [client, seed]);

  const current = placed && placed.seed === seed ? placed : null;

  const markers = useMemo<Marker[]>(() => {
    if (!current) {
      return [];
    }
    // The start's group also holds the Forge of Potential, so the start is found by its key.
    const start = current.places.find((p) => p.key === "start");
    // Ruins, camps, houses: not drawn (the owner, 2026-11-16).
    return current.places
      .filter((p) => p.group !== "other" && !hidden.has(p.key))
      .map((p) => {
        const lines: string[] = [];
        if (p.unique) {
          lines.push(t("pages.map.possiblePlace"));
        }
        if (p === start) {
          lines.push(t("pages.map.startNoBuild", { m: START_NO_BUILD }));
        }
        if (start && p !== start) {
          const dx = p.x - start.x;
          const dy = p.y - start.y;
          lines.push(
            t("pages.map.fromStart", {
              km: (Math.hypot(dx, dy) / 1000).toFixed(1),
              way: t(`pages.map.compass.${compass(dx, dy)}`),
            }),
          );
        }
        if (LOOT_GROUPS.includes(p.group)) {
          lines.push(t("pages.map.loot.open"));
        }
        const sea = current.nearest.get(`${p.x},${p.y}`);
        const card: Card = {
          kicker: t(`pages.map.kinds.${p === start || p.group !== "start" ? p.group : "landmark"}`),
          kickerColour: KICKER_COLOUR[p.group],
          title: t(`pages.map.places.${p.key}`),
          meta: `${t(`pages.map.biomes.${BIOME_KEYS[p.biome]}`)} · x ${p.x}, y ${p.y}`,
          lines,
          note:
            sea === undefined
              ? undefined
              : {
                  tone: sea > 0 ? "info" : "good",
                  lines: [
                    t("pages.map.nearestTitle"),
                    sea > 0
                      ? t("pages.map.seaOnWay", {
                          sea: (sea / 1000).toFixed(1),
                        })
                      : t("pages.map.noSea"),
                  ],
                },
        };
        return {
          layer: p.group,
          x: p.x,
          y: p.y,
          card,
          icon: placeIcon(p.group, p.key),
        };
      });
  }, [current, t, hidden]);

  // A click on a dungeon or a resource place opens its loot in the panel.
  const onMarkerClick = useCallback(
    (m: Marker) => {
      const p = current?.places.find(
        (q) => q.x === m.x && q.y === m.y && q.group === m.layer,
      );
      if (onLoot && p && LOOT_GROUPS.includes(p.group)) {
        onLoot({ x: p.x, y: p.y, key: p.key });
      }
    },
    [current, onLoot],
  );

  // The altars, the traders' camps, the start and the Forge of Potential as the
  // game builds them, rendered from above by the Valheim generator, laid under
  // their pins at true size; unturned, since a seed does not fix a place's turn.
  // The Fuling villages, whose rooms the seed does lay out, are drawn room by room.
  const ground = useMemo<Ground[]>(() => {
    if (!current) {
      return [];
    }
    const places = current.places
      .filter((p) => PLACES_EXTENTS[p.key] && !hidden.has(p.key))
      .map((p) => {
        const e = PLACES_EXTENTS[p.key];
        return {
          url: `${BASE_PATH}/places/${p.key}.png`,
          x: p.x,
          y: p.y,
          ...span(e),
          // The start and the Forge are always drawn; the rest follow their layer.
          layer: p.group === "start" ? undefined : p.group,
        };
      });
    // Each Fuling village room by room, turned as the village lays it out.
    const rooms =
      camps && camps.seed === current.seed && !hidden.has("fulingVillage")
        ? camps.rooms
            .filter((r) => ROOMS_EXTENTS[r.prefab])
            .map((r) => ({
              url: `${BASE_PATH}/places/rooms/${r.prefab}.png`,
              x: r.x,
              y: r.y,
              ...span(ROOMS_EXTENTS[r.prefab]),
              angle: r.yaw,
              layer: "resources",
            }))
        : [];
    return [...places, ...rooms];
  }, [current, camps, hidden]);

  const labels = useMemo(
    () => ({
      pin: t("pages.map.pin"),
      removePin: t("pages.map.removePin"),
      length: (m: number) => t("pages.map.length", { m }),
    }),
    [t],
  );

  return {
    client,
    world,
    palette,
    overlays: layers,
    markers,
    ground,
    onMarkerClick,
    labels,
    placing: Boolean(seed) && !current,
  };
}
