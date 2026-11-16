"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useIntl } from "react-intl";

import {
  Generator,
  type Legend,
  type Pixels,
  type SeedMeasures,
} from "@/lib/generator";
import { placeIcon } from "@/lib/icons";
import {
  BIOME_KEYS,
  compass,
  PLACE_GROUPS,
  placeKind,
  type PlaceGroup,
} from "@/lib/places";
import { WORLD_RADIUS, type MapLayer } from "@/lib/world";

// Leaflet's flat map: one map unit is one metre, latitude is the world's z
// (north) and longitude its x (east). At zoom z a pixel is 2^−z metres; the
// world fits a screen near zoom −6.
const MIN_ZOOM = -6;
const MAX_ZOOM = 2;
const TILE = 256;

// Beyond the world's edge there is only deep sea: the generator's own colour
// for its deepest water, so those tiles need no computing.
const DEEP_SEA = "rgb(0, 30, 100)";

// The generator's overlay kinds (its `overlay` function).
const OVERLAYS: Partial<Record<MapLayer, number>> = {
  subBiomes: 0,
  swampWidth: 1,
  relief: 2,
};

// Our own choices: own pins and the ruler in colours no biome has.
const PIN_COLOUR = "#00e5ff";
const RULER_COLOUR = "#ff9100";

type Draw = (x0: number, z0: number, step: number) => Promise<Pixels>;

class GeneratedLayer extends L.GridLayer {
  constructor(
    private readonly draw: Draw,
    private readonly opaque: boolean,
  ) {
    // A grid layer draws nothing below its own minZoom, which is 0 by default.
    super({ tileSize: TILE, minZoom: MIN_ZOOM, maxZoom: MAX_ZOOM });
  }

  protected createTile(coords: L.Coords, done: L.DoneCallback): HTMLElement {
    const tile = document.createElement("canvas");
    tile.width = TILE;
    tile.height = TILE;
    const ctx = tile.getContext("2d");
    if (!ctx) {
      done(undefined, tile);
      return tile;
    }
    const step = 2 ** -coords.z;
    // Pixel (col, row) of the tile is centred at x = x0 + col·step,
    // z = z0 − row·step (CRS.Simple: pixel y grows southwards).
    const x0 = (coords.x * TILE + 0.5) * step;
    const z0 = -(coords.y * TILE + 0.5) * step;
    const span = TILE * step;
    const nearX = Math.max(x0, Math.min(0, x0 + span));
    const nearZ = Math.max(z0 - span, Math.min(0, z0));
    if (Math.hypot(nearX, nearZ) > WORLD_RADIUS) {
      if (this.opaque) {
        ctx.fillStyle = DEEP_SEA;
        ctx.fillRect(0, 0, TILE, TILE);
      }
      setTimeout(() => done(undefined, tile));
      return tile;
    }
    this.draw(x0, z0, step).then((pixels) => {
      ctx.putImageData(new ImageData(pixels, TILE, TILE), 0, 0);
      done(undefined, tile);
    });
    return tile;
  }
}

type Pin = { x: number; z: number };

function readPins(seed: string): Pin[] {
  try {
    return JSON.parse(localStorage.getItem(`valheim-pins:${seed}`) ?? "[]");
  } catch {
    return [];
  }
}

function writePins(seed: string, pins: Pin[]) {
  try {
    localStorage.setItem(`valheim-pins:${seed}`, JSON.stringify(pins));
  } catch {
    // Pins are a convenience; a browser without storage just forgets them.
  }
}

export type Focus = { x: number; z: number; at: number };

type Props = {
  seed: string | null;
  layers: Record<MapLayer, boolean>;
  ruler: boolean;
  focus: Focus | null;
  onCursor: (point: { x: number; z: number } | null) => void;
  onLegend: (legend: Legend) => void;
  onMeasures: (measures: SeedMeasures | null) => void;
  onPlacing: (placing: boolean) => void;
};

export default function WorldMap({
  seed,
  layers,
  ruler,
  focus,
  onCursor,
  onLegend,
  onMeasures,
  onPlacing,
}: Props) {
  const intl = useIntl();
  const element = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const generator = useRef<Generator | null>(null);
  const overlays = useRef<Partial<Record<MapLayer, L.Layer>>>({});
  const groups = useRef<Partial<Record<PlaceGroup, L.LayerGroup>>>({});
  const layersNow = useRef(layers);
  const rulerNow = useRef(ruler);

  const text = (id: string, values?: Record<string, string | number>) =>
    intl.formatMessage({ id }, values);
  const textNow = useRef(text);
  useEffect(() => {
    textNow.current = text;
  });

  // The map and the generator, once.
  useEffect(() => {
    if (!element.current) {
      return;
    }
    const edge = WORLD_RADIUS * 1.1;
    const world = L.map(element.current, {
      crs: L.CRS.Simple,
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      zoomControl: false,
      attributionControl: false,
      preferCanvas: true,
      maxBounds: L.latLngBounds([-edge, -edge], [edge, edge]),
    });
    L.control.zoom({ position: "bottomright" }).addTo(world);
    L.control
      .scale({ position: "bottomright", metric: true, imperial: false })
      .addTo(world);
    world.fitBounds(
      L.latLngBounds(
        [-WORLD_RADIUS, -WORLD_RADIUS],
        [WORLD_RADIUS, WORLD_RADIUS],
      ),
    );
    world.on("mousemove", (event: L.LeafletMouseEvent) =>
      onCursor({ x: event.latlng.lng, z: event.latlng.lat }),
    );
    world.on("mouseout", () => onCursor(null));
    map.current = world;
    const gen = new Generator();
    generator.current = gen;
    gen.legend().then(onLegend);
    return () => {
      world.remove();
      gen.close();
      map.current = null;
      generator.current = null;
    };
  }, [onCursor, onLegend]);

  // A seed: its map, its places, its measures, its pins, its point popups.
  useEffect(() => {
    const world = map.current;
    const gen = generator.current;
    if (!world || !gen || !seed) {
      return;
    }
    let live = true;
    const base = new GeneratedLayer(
      (x0, z0, step) => gen.tile(seed, x0, z0, step, TILE),
      true,
    ).addTo(world);
    const made: L.Layer[] = [base];
    for (const [layer, kind] of Object.entries(OVERLAYS) as [
      MapLayer,
      number,
    ][]) {
      const overlay = new GeneratedLayer(
        (x0, z0, step) => gen.overlay(seed, kind, x0, z0, step, TILE),
        false,
      );
      overlays.current[layer] = overlay;
      made.push(overlay);
      if (layersNow.current[layer]) {
        overlay.addTo(world);
      }
    }

    // Places: every location, grouped; traders as all their candidate places.
    onPlacing(true);
    onMeasures(null);
    const fresh: Partial<Record<PlaceGroup, L.LayerGroup>> = {};
    PLACE_GROUPS.forEach((g) => (fresh[g] = L.layerGroup()));
    groups.current = fresh;
    Promise.all([gen.legend(), gen.places(seed)]).then(([l, items]) => {
      if (!live) {
        return;
      }
      const start = items.find(
        ([t]) => l.locations[t].prefab === "StartTemple",
      );
      const t = textNow.current;
      // What a marker says: its name, its biome, how far and which way from
      // the start; the nearest boss altars and traders add the sea on the way
      // once the seed is measured.
      const tip = (lines: string[]) => {
        const box = document.createElement("div");
        lines.forEach((line, i) => {
          const row = document.createElement(i === 0 ? "strong" : "div");
          row.textContent = line;
          box.append(row);
          if (i === 0) {
            box.append(document.createElement("br"));
          }
        });
        return box;
      };
      const byPlace = new Map<string, { marker: L.Layer; lines: string[] }>();
      for (const [type, x, z, biome] of items) {
        const { prefab, unique } = l.locations[type];
        const { group, key } = placeKind(prefab);
        const name = t(`pages.map.places.${key}`);
        const lines = [
          unique ? t("pages.map.candidate", { name }) : name,
          t(`pages.map.biomes.${BIOME_KEYS[biome]}`),
        ];
        if (start && group !== "start") {
          const dx = x - start[1];
          const dz = z - start[2];
          lines.push(
            t("pages.map.fromStart", {
              km: (Math.hypot(dx, dz) / 1000).toFixed(1),
              way: t(`pages.map.compass.${compass(dx, dz)}`),
            }),
          );
        }
        const marker =
          group === "other"
            ? L.circleMarker([z, x], {
                radius: 3,
                color: "#000",
                weight: 1,
                fillColor: "#fafafa",
                fillOpacity: 0.9,
              })
            : L.marker([z, x], {
                icon: placeIcon(group, unique),
                zIndexOffset: group === "start" ? 1000 : 0,
              });
        marker
          .bindTooltip(tip(lines), { direction: "top" })
          .addTo(fresh[group]!);
        byPlace.set(`${x},${z}`, { marker, lines });
      }
      PLACE_GROUPS.forEach((g) => {
        if (g === "start" || layersNow.current[g as MapLayer]) {
          fresh[g]!.addTo(world);
        }
      });
      onPlacing(false);
      gen.measure(seed).then((m) => {
        if (!live) {
          return;
        }
        onMeasures(m);
        // The nearest altar of each boss and the nearest place of each trader:
        // how much of the straight way is sea.
        for (const placed of [
          ...Object.values(m.bosses ?? {}),
          ...Object.values(m.traders ?? {}),
        ]) {
          const found = byPlace.get(`${placed.x},${placed.z}`);
          if (found) {
            found.marker.setTooltipContent(
              tip([
                ...found.lines,
                placed.sea > 0
                  ? t("pages.map.nearest", {
                      sea: (placed.sea / 1000).toFixed(1),
                    })
                  : t("pages.map.nearestDry"),
              ]),
            );
          }
        }
      });
    });
    PLACE_GROUPS.forEach((g) => made.push(fresh[g]!));

    // Own pins: a right click adds one, its popup removes it.
    const pins = L.layerGroup().addTo(world);
    made.push(pins);
    let saved = readPins(seed);
    const drawPins = () => {
      pins.clearLayers();
      saved.forEach((pin, index) => {
        const button = document.createElement("button");
        button.textContent = textNow.current("pages.map.removePin");
        button.onclick = () => {
          saved = saved.filter((_, i) => i !== index);
          writePins(seed, saved);
          drawPins();
        };
        const box = document.createElement("div");
        box.append(
          `${textNow.current("pages.map.pin")}: x ${Math.round(pin.x)}, z ${Math.round(pin.z)} `,
          button,
        );
        L.circleMarker([pin.z, pin.x], {
          radius: 7,
          color: "#000",
          weight: 2,
          fillColor: PIN_COLOUR,
          fillOpacity: 1,
        })
          .bindPopup(box)
          .addTo(pins);
      });
    };
    drawPins();
    const addPin = (event: L.LeafletMouseEvent) => {
      saved = [...saved, { x: event.latlng.lng, z: event.latlng.lat }];
      writePins(seed, saved);
      drawPins();
    };
    world.on("contextmenu", addPin);

    // The ruler, or what is at a point.
    const line = L.polyline([], { color: RULER_COLOUR, weight: 3 }).addTo(
      world,
    );
    made.push(line);
    const onClick = (event: L.LeafletMouseEvent) => {
      if (rulerNow.current) {
        line.addLatLng(event.latlng);
        const points = line.getLatLngs() as L.LatLng[];
        let length = 0;
        for (let i = 1; i < points.length; i++) {
          length += Math.hypot(
            points[i].lng - points[i - 1].lng,
            points[i].lat - points[i - 1].lat,
          );
        }
        line
          .bindTooltip(
            textNow.current("pages.map.length", { m: Math.round(length) }),
            {
              permanent: true,
            },
          )
          .openTooltip(event.latlng);
        return;
      }
      const { lng: x, lat: z } = event.latlng;
      gen.point(seed, x, z).then((info) => {
        if (!live) {
          return;
        }
        const t = textNow.current;
        const rows = [
          t(`pages.map.biomes.${info.biome}`),
          t("pages.map.height", { m: info.height }),
          ...(info.biome === "swamp"
            ? [
                t(
                  info.wideSwamp
                    ? "pages.map.swampWide"
                    : "pages.map.swampNarrow",
                ),
              ]
            : []),
          ...(info.subBiomes.length
            ? [t("pages.map.subBiomeIs", { names: info.subBiomes.join(", ") })]
            : []),
          `x ${Math.round(x)}, z ${Math.round(z)}`,
        ];
        const box = document.createElement("div");
        rows.forEach((row) => {
          const p = document.createElement("div");
          p.textContent = row;
          box.append(p);
        });
        L.popup().setLatLng(event.latlng).setContent(box).openOn(world);
      });
    };
    world.on("click", onClick);

    return () => {
      live = false;
      world.off("contextmenu", addPin);
      world.off("click", onClick);
      made.forEach((layer) => layer.remove());
      overlays.current = {};
      groups.current = {};
    };
  }, [seed, onMeasures, onPlacing]);

  // Layers switched on and off.
  useEffect(() => {
    layersNow.current = layers;
    const world = map.current;
    if (!world) {
      return;
    }
    for (const [layer, on] of Object.entries(layers) as [MapLayer, boolean][]) {
      const target =
        overlays.current[layer] ?? groups.current[layer as PlaceGroup];
      if (!target) {
        continue;
      }
      if (on && !world.hasLayer(target)) {
        target.addTo(world);
      } else if (!on && world.hasLayer(target)) {
        target.remove();
      }
    }
  }, [layers]);

  useEffect(() => {
    rulerNow.current = ruler;
    const world = map.current;
    if (!ruler && world) {
      world.eachLayer((layer) => {
        if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
          (layer as L.Polyline).setLatLngs([]).unbindTooltip();
        }
      });
    }
  }, [ruler]);

  useEffect(() => {
    if (focus && map.current) {
      map.current.setView(
        [focus.z, focus.x],
        Math.max(map.current.getZoom(), -2),
      );
    }
  }, [focus]);

  return (
    <div
      ref={element}
      style={{
        position: "absolute",
        inset: 0,
        background: DEEP_SEA,
        cursor: ruler ? "crosshair" : undefined,
      }}
    />
  );
}
