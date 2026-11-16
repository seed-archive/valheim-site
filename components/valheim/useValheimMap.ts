"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useIntl } from "react-intl";

import type { Card } from "@seed-archive/map/card";
import { MapClient, type World } from "@seed-archive/map/client";
import type { Marker } from "@seed-archive/map/viewer";
import {
  decodeMeasures,
  decodePlaces,
  moduleUrl,
  type Place,
} from "@/lib/valheim/generator";
import { placeIcon } from "@/lib/valheim/icons";
import { mapPalette, overlays } from "@/lib/valheim/palette";
import { BIOME_KEYS, compass, type PlaceGroup } from "@/lib/valheim/places";

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

// Everything the shared viewer needs for a Valheim seed: the generator's
// workers, the world's extent, the palettes, the markers with their cards, and
// what a click reads — in the player's words.
export function useValheimMap(seed: string | null) {
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
    const start = current.places.find((p) => p.group === "start");
    // Ruins, camps, houses: not drawn (the owner, 2026-11-16).
    return current.places
      .filter((p) => p.group !== "other")
      .map((p) => {
        const lines: string[] = [];
        if (p.unique) {
          lines.push(t("pages.map.possiblePlace"));
        }
        if (start && p.group !== "start") {
          const dx = p.x - start.x;
          const dy = p.y - start.y;
          lines.push(
            t("pages.map.fromStart", {
              km: (Math.hypot(dx, dy) / 1000).toFixed(1),
              way: t(`pages.map.compass.${compass(dx, dy)}`),
            }),
          );
        }
        const sea = current.nearest.get(`${p.x},${p.y}`);
        const card: Card = {
          kicker: t(`pages.map.kinds.${p.group}`),
          kickerColour: KICKER_COLOUR[p.group],
          title: t(`pages.map.places.${p.key}`),
          meta: `${t(`pages.map.biomes.${BIOME_KEYS[p.biome]}`)} · x ${p.x}, z ${p.y}`,
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
  }, [current, t]);

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
    labels,
    placing: Boolean(seed) && !current,
  };
}
