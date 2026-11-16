"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { card, type Card } from "./card";
import type { Bounds, MapClient } from "./client";

// The map viewer every game's site shares: pan, zoom, the generator's tiles
// coloured by the game's palette, its overlays, markers the game describes,
// own pins, a ruler, and what a click reads. It knows no game: everything
// game-specific comes in through its props.
//
// Leaflet's flat map: one map unit is one world unit, latitude is the world's
// y and longitude its x. At zoom z a pixel is 2^−z units.

const TILE = 256;

// Our own choices: pins and the ruler in colours no game's map uses much.
const PIN_COLOUR = "#00e5ff";
const RULER_COLOUR = "#ff9100";

export type Marker = {
  layer: string;
  x: number;
  y: number;
  card: Card;
  // An icon (inline SVG or HTML) or, for the many small places, a dot.
  icon?: { html: string; size: number; front?: boolean };
  dot?: { radius: number; fill: string };
};

export type Overlay = { id: string; kind: number; palette: Uint8ClampedArray };

export type Focus = { x: number; y: number; at: number };

export type ViewerProps = {
  client: MapClient | null;
  seed: string | null;
  bounds: Bounds | null;
  // 256 RGBA entries for the tile's bytes.
  palette: Uint8ClampedArray;
  // What lies beyond the world's edge.
  background: string;
  overlays: Overlay[];
  // Which overlays and marker layers show, by id.
  visible: Record<string, boolean>;
  markers: Marker[];
  // What a click at (x, y) reads; null shows nothing.
  describe: (x: number, y: number) => Promise<Card | null>;
  ruler: boolean;
  focus: Focus | null;
  // Where own pins are kept in the browser, per seed.
  pinsKey: string;
  labels: { pin: string; removePin: string; length: (units: number) => string };
  onCursor?: (point: { x: number; y: number } | null) => void;
  minZoom?: number;
  maxZoom?: number;
};

type Draw = (x0: number, y0: number, step: number) => Promise<Uint8Array>;

class GeneratedLayer extends L.GridLayer {
  constructor(
    private readonly draw: Draw,
    private readonly palette: Uint8ClampedArray,
    private readonly bounds: Bounds,
    private readonly background: string | null,
    zoom: { min: number; max: number },
  ) {
    // A grid layer draws nothing below its own minZoom, which is 0 by default.
    super({ tileSize: TILE, minZoom: zoom.min, maxZoom: zoom.max });
  }

  // Whether a tile lies wholly outside the world.
  private outside(x0: number, y0: number, span: number) {
    const b = this.bounds;
    if (x0 > b.x1 || x0 + span < b.x0 || y0 < b.y0 || y0 - span > b.y1) {
      return true;
    }
    if (b.radius > 0) {
      const nearX = Math.max(x0, Math.min(0, x0 + span));
      const nearY = Math.max(y0 - span, Math.min(0, y0));
      return Math.hypot(nearX, nearY) > b.radius;
    }
    return false;
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
    // y = y0 − row·step (CRS.Simple: pixel rows grow downwards).
    const x0 = (coords.x * TILE + 0.5) * step;
    const y0 = -(coords.y * TILE + 0.5) * step;
    if (this.outside(x0, y0, TILE * step)) {
      if (this.background) {
        ctx.fillStyle = this.background;
        ctx.fillRect(0, 0, TILE, TILE);
      }
      setTimeout(() => done(undefined, tile));
      return tile;
    }
    this.draw(x0, y0, step).then((bytes) => {
      const image = new ImageData(TILE, TILE);
      for (let i = 0; i < bytes.length; i++) {
        const p = bytes[i] * 4;
        image.data[i * 4] = this.palette[p];
        image.data[i * 4 + 1] = this.palette[p + 1];
        image.data[i * 4 + 2] = this.palette[p + 2];
        image.data[i * 4 + 3] = this.palette[p + 3];
      }
      ctx.putImageData(image, 0, 0);
      done(undefined, tile);
    });
    return tile;
  }
}

type Pin = { x: number; y: number };

function readPins(key: string): Pin[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]");
  } catch {
    return [];
  }
}

function writePins(key: string, pins: Pin[]) {
  try {
    localStorage.setItem(key, JSON.stringify(pins));
  } catch {
    // Pins are a convenience; a browser without storage just forgets them.
  }
}

export default function Viewer(props: ViewerProps) {
  const {
    client,
    seed,
    bounds,
    palette,
    background,
    overlays,
    visible,
    markers,
    ruler,
    focus,
    minZoom = -6,
    maxZoom = 2,
  } = props;
  const element = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const layers = useRef<Record<string, L.Layer>>({});
  const markerLayers = useRef<Record<string, L.LayerGroup>>({});
  const now = useRef(props);
  useEffect(() => {
    now.current = props;
  });

  // The map, once the world's extent is known.
  useEffect(() => {
    if (!element.current || !bounds) {
      return;
    }
    const pad = Math.max(bounds.x1 - bounds.x0, bounds.y1 - bounds.y0) * 0.05;
    const world = L.map(element.current, {
      crs: L.CRS.Simple,
      minZoom,
      maxZoom,
      zoomControl: false,
      attributionControl: false,
      preferCanvas: true,
      maxBounds: L.latLngBounds(
        [bounds.y0 - pad, bounds.x0 - pad],
        [bounds.y1 + pad, bounds.x1 + pad],
      ),
    });
    L.control.zoom({ position: "bottomright" }).addTo(world);
    L.control
      .scale({ position: "bottomright", metric: true, imperial: false })
      .addTo(world);
    world.fitBounds(
      L.latLngBounds([bounds.y0, bounds.x0], [bounds.y1, bounds.x1]),
    );
    world.on("mousemove", (event: L.LeafletMouseEvent) =>
      now.current.onCursor?.({ x: event.latlng.lng, y: event.latlng.lat }),
    );
    world.on("mouseout", () => now.current.onCursor?.(null));
    map.current = world;
    return () => {
      world.remove();
      map.current = null;
    };
  }, [bounds, minZoom, maxZoom]);

  // A seed: its tiles, overlays, pins, ruler and clicks.
  useEffect(() => {
    const world = map.current;
    if (!world || !client || !seed || !bounds) {
      return;
    }
    let live = true;
    const zoom = { min: minZoom, max: maxZoom };
    const made: L.Layer[] = [
      new GeneratedLayer(
        (x0, y0, step) => client.tile(seed, x0, y0, step, TILE),
        palette,
        bounds,
        background,
        zoom,
      ).addTo(world),
    ];
    const fresh: Record<string, L.Layer> = {};
    for (const o of overlays) {
      const layer = new GeneratedLayer(
        (x0, y0, step) => client.overlay(seed, o.kind, x0, y0, step, TILE),
        o.palette,
        bounds,
        null,
        zoom,
      );
      fresh[o.id] = layer;
      made.push(layer);
      if (now.current.visible[o.id]) {
        layer.addTo(world);
      }
    }
    layers.current = fresh;

    // Own pins: a right click adds one, its popup removes it.
    const key = `${now.current.pinsKey}:${seed}`;
    const pins = L.layerGroup().addTo(world);
    made.push(pins);
    let saved = readPins(key);
    const drawPins = () => {
      pins.clearLayers();
      const { labels } = now.current;
      saved.forEach((pin, index) => {
        const box = card({
          title: labels.pin,
          meta: `x ${Math.round(pin.x)}, y ${Math.round(pin.y)}`,
          action: {
            label: labels.removePin,
            onClick: () => {
              saved = saved.filter((_, i) => i !== index);
              writePins(key, saved);
              drawPins();
            },
          },
        });
        L.circleMarker([pin.y, pin.x], {
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
      saved = [...saved, { x: event.latlng.lng, y: event.latlng.lat }];
      writePins(key, saved);
      drawPins();
    };
    world.on("contextmenu", addPin);

    // The ruler, or what is at a point.
    const line = L.polyline([], { color: RULER_COLOUR, weight: 3 }).addTo(
      world,
    );
    made.push(line);
    const onClick = (event: L.LeafletMouseEvent) => {
      if (now.current.ruler) {
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
          .bindTooltip(now.current.labels.length(Math.round(length)), {
            permanent: true,
          })
          .openTooltip(event.latlng);
        return;
      }
      now.current.describe(event.latlng.lng, event.latlng.lat).then((c) => {
        if (live && c) {
          L.popup().setLatLng(event.latlng).setContent(card(c)).openOn(world);
        }
      });
    };
    world.on("click", onClick);

    return () => {
      live = false;
      world.off("contextmenu", addPin);
      world.off("click", onClick);
      made.forEach((layer) => layer.remove());
      layers.current = {};
    };
  }, [client, seed, bounds, palette, background, overlays, minZoom, maxZoom]);

  // Markers, grouped by layer.
  useEffect(() => {
    const world = map.current;
    if (!world) {
      return;
    }
    const groups: Record<string, L.LayerGroup> = {};
    for (const m of markers) {
      const group = (groups[m.layer] ??= L.layerGroup());
      const marker = m.icon
        ? L.marker([m.y, m.x], {
            icon: L.divIcon({
              className: "",
              html: m.icon.html,
              iconSize: [m.icon.size, m.icon.size],
              iconAnchor: [m.icon.size / 2, m.icon.size / 2],
              tooltipAnchor: [0, -m.icon.size / 2],
            }),
            zIndexOffset: m.icon.front ? 1000 : 0,
          })
        : L.circleMarker([m.y, m.x], {
            radius: m.dot?.radius ?? 3,
            color: "#000",
            weight: 1,
            fillColor: m.dot?.fill ?? "#fafafa",
            fillOpacity: 0.9,
          });
      marker.bindTooltip(card(m.card), { direction: "top" }).addTo(group);
    }
    for (const [id, group] of Object.entries(groups)) {
      if (now.current.visible[id] ?? true) {
        group.addTo(world);
      }
    }
    markerLayers.current = groups;
    return () => {
      Object.values(groups).forEach((group) => group.remove());
      markerLayers.current = {};
    };
  }, [markers, bounds]);

  // Overlays and marker layers switched on and off.
  useEffect(() => {
    const world = map.current;
    if (!world) {
      return;
    }
    const all = { ...layers.current, ...markerLayers.current };
    for (const [id, on] of Object.entries(visible)) {
      const target = all[id];
      if (!target) {
        continue;
      }
      if (on && !world.hasLayer(target)) {
        target.addTo(world);
      } else if (!on && world.hasLayer(target)) {
        target.remove();
      }
    }
  }, [visible]);

  // The ruler off clears its line.
  useEffect(() => {
    const world = map.current;
    if (!ruler && world) {
      world.eachLayer((layer) => {
        if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
          layer.setLatLngs([]).unbindTooltip();
        }
      });
    }
  }, [ruler]);

  useEffect(() => {
    if (focus && map.current) {
      map.current.setView(
        [focus.y, focus.x],
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
        background,
        cursor: ruler ? "crosshair" : undefined,
      }}
    />
  );
}
