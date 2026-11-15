"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { WORLD_RADIUS } from "@/lib/world";

// Leaflet's flat map: one map unit is one metre, latitude is the world's z
// (north) and longitude its x (east). At zoom 0 a metre is a pixel; the world
// fits a screen near zoom −6.
const MIN_ZOOM = -6;
const MAX_ZOOM = 2;
const TILE = 256;

// Until the generator draws real tiles: land inside the world's disc, the sea
// beyond. Colours of the game's map, our own approximation.
const LAND = "#c8b98a";
const SEA = "#3b5a78";

class PlaceholderLayer extends L.GridLayer {
  constructor(private readonly world: L.Map) {
    // A grid layer draws nothing below its own minZoom, which is 0 by default.
    super({ tileSize: TILE, minZoom: MIN_ZOOM, maxZoom: MAX_ZOOM });
  }

  protected createTile(coords: L.Coords): HTMLElement {
    const tile = document.createElement("canvas");
    tile.width = TILE;
    tile.height = TILE;
    const ctx = tile.getContext("2d");
    if (!ctx) {
      return tile;
    }
    const origin = L.point(coords.x * TILE, coords.y * TILE);
    const centre = this.world.project(L.latLng(0, 0), coords.z);
    const radius =
      this.world.project(L.latLng(0, WORLD_RADIUS), coords.z).x - centre.x;
    ctx.fillStyle = SEA;
    ctx.fillRect(0, 0, TILE, TILE);
    ctx.fillStyle = LAND;
    ctx.beginPath();
    ctx.arc(centre.x - origin.x, centre.y - origin.y, radius, 0, Math.PI * 2);
    ctx.fill();
    return tile;
  }
}

type Props = {
  onCursor: (point: { x: number; z: number } | null) => void;
};

export default function WorldMap({ onCursor }: Props) {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!element.current) {
      return;
    }
    const edge = WORLD_RADIUS * 1.1;
    const map = L.map(element.current, {
      crs: L.CRS.Simple,
      minZoom: MIN_ZOOM,
      maxZoom: MAX_ZOOM,
      zoomControl: false,
      attributionControl: false,
      maxBounds: L.latLngBounds([-edge, -edge], [edge, edge]),
    });
    L.control.zoom({ position: "bottomright" }).addTo(map);
    new PlaceholderLayer(map).addTo(map);
    map.fitBounds(
      L.latLngBounds(
        [-WORLD_RADIUS, -WORLD_RADIUS],
        [WORLD_RADIUS, WORLD_RADIUS],
      ),
    );
    map.on("mousemove", (event: L.LeafletMouseEvent) =>
      onCursor({ x: event.latlng.lng, z: event.latlng.lat }),
    );
    map.on("mouseout", () => onCursor(null));
    return () => {
      map.remove();
    };
  }, [onCursor]);

  return <div ref={element} style={{ position: "absolute", inset: 0 }} />;
}
