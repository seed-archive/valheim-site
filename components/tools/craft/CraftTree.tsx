"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";

import { ItemIcon } from "@/components/catalog/ItemIcon";
import tree from "@/lib/valheim/craft-tree.json";

import {
  BANDS,
  BOSSES,
  DEFAULT_ON,
  GRAPH,
  GROUP_OF,
  type Group,
  closure,
  items,
  levelFor,
  maxQualityWith,
  nameOf,
  rawTotals,
  recipes,
  stationAt,
  type Vertex,
} from "./graph";

type Edge = { from: string; to: string; d: string };

// How many of a piece the run builds (five spits on one fire, the owner).
const PIECE_COUNT = tree.pieceCount as Record<string, number>;

// How the raw materials are listed: most first, by name, or by home biome in
// the run's order (most first within a biome).
type Order = "amount" | "name" | "biome";
const ORDERS: Order[] = ["amount", "name", "biome"];

// Milliseconds to wait before jumping to a band named in the address (our own
// choice: past the router's own scroll on load).
const HASH_JUMP_DELAY = 150;

// A band's anchor, the biome's slug as the guides use it (`blackForest` →
// `black-forest`), so a link from outside opens the tree at that biome.
const anchor = (biome: string) =>
  biome.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

// The vertices of each band in rows by depth, what a vertex needs above it;
// each row ordered under the vertices it needs (the mean place of its needs in
// the rows above), so the edges run short and cross little; a group's members
// sit together at their mean place.
const ROWS: Vertex[][][] = (() => {
  const place = new Map<string, number>();
  return BANDS.map((_, b) => {
    // The bosses stand apart, on the line under the band.
    const inBand = [...GRAPH.values()].filter(
      (v) => v.band === b && !BOSSES.has(v.key),
    );
    const depths = [...new Set(inBand.map((v) => v.depth))].sort(
      (x, y) => x - y,
    );
    return depths.map((d) => {
      const mean = (v: Vertex) => {
        const at = v.deps
          .map((k) => place.get(k))
          .filter((x): x is number => x !== undefined);
        return at.length > 0 ? at.reduce((s, x) => s + x, 0) / at.length : 0.5;
      };
      const at = (v: Vertex) => {
        const g = GROUP_OF.get(v.key);
        const ms = g ? g.members.map((k) => GRAPH.get(k)!) : [v];
        return ms.reduce((s, m) => s + mean(m), 0) / ms.length;
      };
      const row = inBand
        .filter((v) => v.depth === d)
        .sort(
          (x, y) =>
            at(x) - at(y) ||
            (GROUP_OF.get(x.key)?.id ?? x.key).localeCompare(
              GROUP_OF.get(y.key)?.id ?? y.key,
            ) ||
            nameOf(x.key).localeCompare(nameOf(y.key)),
        );
      row.forEach((v, i) => place.set(v.key, (i + 0.5) / row.length));
      return row;
    });
  });
})();

// A row cut into runs: a group's members together, every other vertex alone.
function segments(row: Vertex[]) {
  const out: { group: Group | null; items: Vertex[] }[] = [];
  for (const v of row) {
    const g = GROUP_OF.get(v.key) ?? null;
    const last = out[out.length - 1];
    if (g && last?.group === g) {
      last.items.push(v);
    } else {
      out.push({ group: g, items: [v] });
    }
  }
  return out;
}

// The craft tree: a graph of what the run makes, one band a biome. Switching
// a vertex off switches off everything that needs it; switching one on
// switches on everything it needs; raising an item's quality switches on the
// station level it needs. The column sums the raw materials.
export function CraftTree() {
  const [on, setOn] = useState<Set<string>>(() => new Set(DEFAULT_ON));
  const [quality, setQuality] = useState<Map<string, number>>(new Map());
  const [hover, setHover] = useState<string | null>(null);
  const [edges, setEdges] = useState<Edge[]>([]);
  const box = useRef<HTMLDivElement>(null);
  const cards = useRef(new Map<string, HTMLElement>());

  // Each item at the quality chosen, never above what the stations on allow.
  const effective = useMemo(() => {
    const out = new Map<string, number>();
    quality.forEach((q, k) => out.set(k, Math.min(q, maxQualityWith(k, on))));
    return out;
  }, [quality, on]);
  const raw = useMemo(() => rawTotals(on, effective), [on, effective]);
  const [order, setOrder] = useState<Order>("amount");
  const biomeAt = (k: string) => {
    const i = BANDS.indexOf(items[k]?.biome ?? "");
    return i < 0 ? BANDS.length : i;
  };
  const byName = (a: string, b: string) => nameOf(a).localeCompare(nameOf(b));
  const rows = [...raw.entries()].sort((a, b) =>
    order === "name"
      ? byName(a[0], b[0])
      : order === "biome"
        ? biomeAt(a[0]) - biomeAt(b[0]) || b[1] - a[1] || byName(a[0], b[0])
        : b[1] - a[1] || byName(a[0], b[0]),
  );
  const slots = rows.reduce(
    (s, [k, n]) => s + Math.ceil(n / (items[k]?.stack || 1)),
    0,
  );
  const weight = rows.reduce((s, [k, n]) => s + n * (items[k]?.weight ?? 0), 0);
  // The coins for what only a trader sells (the serving tray, the spices).

  // Vertices off with everything that needs them, or on with everything they
  // need.
  const switchAll = (keys: string[], to: boolean) =>
    setOn((prev) => {
      const next = new Set(prev);
      keys.forEach((key) =>
        to
          ? [key, ...closure(key, "deps")].forEach((k) => next.add(k))
          : [key, ...closure(key, "dependents")].forEach((k) => next.delete(k)),
      );
      return next;
    });
  // What a quality raise switched on by itself; a vertex the user switches
  // leaves this set and stays as the user left it.
  const autoOn = useRef(new Set<string>());
  const toggle = (key: string) => {
    autoOn.current.delete(key);
    switchAll([key], !on.has(key));
  };
  // A group's label: all of it off when all of it is on, otherwise all on.
  const toggleGroup = (g: Group) => {
    g.members.forEach((k) => autoOn.current.delete(k));
    switchAll(g.members, !g.members.every((k) => on.has(k)));
  };

  // A quality chosen on a card: the item and the station level it needs come
  // on. Lowering it switches off the extensions the raise brought that nothing
  // else on still needs.
  const choose = (key: string, q: number) => {
    const station = recipes[key]?.station ?? null;
    const now = stationAt(station, levelFor(key, q));
    const old = stationAt(station, levelFor(key, effective.get(key) ?? 1));
    now.filter((k) => !on.has(k)).forEach((k) => autoOn.current.add(k));
    setQuality((prev) => new Map(prev).set(key, q));
    switchAll([key, ...now], true);
    const dropped = old.filter((k) => !now.includes(k) && autoOn.current.has(k));
    if (dropped.length === 0) {
      return;
    }
    setOn((prev) => {
      const needed = new Set(now);
      prev.forEach((k) => {
        if (dropped.includes(k)) {
          return;
        }
        closure(k, "deps").forEach((d) => needed.add(d));
        if (k !== key && recipes[k]) {
          stationAt(recipes[k].station ?? null, levelFor(k, effective.get(k) ?? 1)).forEach(
            (d) => needed.add(d),
          );
        }
      });
      const next = new Set(prev);
      dropped
        .filter((k) => !needed.has(k))
        .forEach((k) => {
          next.delete(k);
          autoOn.current.delete(k);
        });
      return next;
    });
  };

  // The edges, drawn from the bottom of what is needed to the top of what
  // needs it, measured after layout and on every resize.
  useLayoutEffect(() => {
    const measure = () => {
      const root = box.current?.getBoundingClientRect();
      if (!root) {
        return;
      }
      const out: Edge[] = [];
      for (const v of GRAPH.values()) {
        const to = cards.current.get(v.key)?.getBoundingClientRect();
        for (const dep of v.deps) {
          const from = cards.current.get(dep)?.getBoundingClientRect();
          if (!from || !to) {
            continue;
          }
          const x1 = from.left + from.width / 2 - root.left;
          const y1 = from.bottom - root.top;
          const x2 = to.left + to.width / 2 - root.left;
          const y2 = to.top - root.top;
          const bend = Math.max(30, (y2 - y1) / 2);
          out.push({
            from: dep,
            to: v.key,
            d: `M${x1},${y1} C${x1},${y1 + bend} ${x2},${y2 - bend} ${x2},${y2}`,
          });
        }
      }
      setEdges(out);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (box.current) {
      observer.observe(box.current);
    }
    return () => observer.disconnect();
  }, []);

  // A link from outside to a biome's band: the browser jumps before the tree
  // is laid out and the router scrolls back to the top, so jump again after
  // both.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) {
      return;
    }
    const timer = window.setTimeout(
      () => document.getElementById(id)?.scrollIntoView(),
      HASH_JUMP_DELAY,
    );
    return () => window.clearTimeout(timer);
  }, []);

  const lit = (e: Edge) => hover !== null && (e.from === hover || e.to === hover);

  // One vertex: its icon and name, a click switches it; an upgradable item has
  // its quality buttons.
  const card = (v: Vertex) => {
    const isOn = on.has(v.key);
    const max = recipes[v.key]?.maxQuality ?? 1;
    const q = effective.get(v.key) ?? 1;
    return (
      <Box
        key={v.key}
        ref={(el: HTMLElement | null) => {
          if (el) {
            cards.current.set(v.key, el);
          } else {
            cards.current.delete(v.key);
          }
        }}
        role="button"
        tabIndex={0}
        onClick={() => toggle(v.key)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggle(v.key);
          }
        }}
        onMouseEnter={() => setHover(v.key)}
        onMouseLeave={() => setHover(null)}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          p: 0.75,
          pr: 1.5,
          border: "1px solid",
          borderColor: isOn ? "primary.main" : "divider",
          borderRadius: 1,
          bgcolor: isOn ? "#eef3fb" : "background.paper",
          opacity: isOn ? 1 : 0.45,
          cursor: "pointer",
        }}
      >
        <ItemIcon item={v.key}>
          {nameOf(v.key)}
          {(PIECE_COUNT[v.key] ?? 1) > 1 ? ` × ${PIECE_COUNT[v.key]}` : ""}
        </ItemIcon>
        {max > 1 ? (
          <Box
            sx={{ display: "flex", gap: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {Array.from({ length: max }, (_, i) => i + 1).map((level) => (
              <Box
                key={level}
                component="button"
                type="button"
                aria-label={`+${level}`}
                onClick={() => choose(v.key, level)}
                sx={{
                  minWidth: 22,
                  height: 22,
                  p: 0,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 0.5,
                  font: "inherit",
                  fontSize: 12,
                  cursor: "pointer",
                  bgcolor: isOn && level <= q ? "primary.main" : "background.paper",
                  color: isOn && level <= q ? "primary.contrastText" : "text.secondary",
                }}
              >
                {level}
              </Box>
            ))}
          </Box>
        ) : null}
      </Box>
    );
  };

  // A boss on the line under its band: its summon above, its name in the
  // bosses' red, its own drops below; a click switches it and what needs it.
  const bossCard = (key: string) => {
    const boss = BOSSES.get(key)!;
    const isOn = on.has(key);
    return (
      <Box
        key={key}
        ref={(el: HTMLElement | null) => {
          if (el) {
            cards.current.set(key, el);
          } else {
            cards.current.delete(key);
          }
        }}
        role="button"
        tabIndex={0}
        onClick={() => toggle(key)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggle(key);
          }
        }}
        onMouseEnter={() => setHover(key)}
        onMouseLeave={() => setHover(null)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
          px: 1.5,
          py: 0.75,
          border: "2px solid",
          borderColor: isOn ? "#c62828" : "divider",
          borderRadius: 2,
          // Opaque even when off, so the dashed line does not show through.
          bgcolor: isOn ? "#fdecea" : "background.paper",
          color: isOn ? "text.primary" : "text.disabled",
          cursor: "pointer",
        }}
      >
        {boss.summon ? (
          <ItemIcon item={boss.summon.item}>
            {boss.summon.name} × {boss.summon.count}
          </ItemIcon>
        ) : null}
        <Typography sx={{ fontWeight: 700, color: isOn ? "#c62828" : "#e57373" }}>{boss.name}</Typography>
        {boss.drops.length > 0 ? (
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
            {boss.drops.map((d) => (
              <ItemIcon key={d.key} item={d.key}>
                {d.name}
              </ItemIcon>
            ))}
          </Box>
        ) : null}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 320px" },
        gap: 4,
        alignItems: "start",
      }}
    >
      <Box ref={box} sx={{ position: "relative" }}>
        <Box
          component="svg"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            overflow: "visible",
          }}
        >
          {edges.map((e) => (
            <Box
              component="path"
              key={`${e.from}>${e.to}`}
              d={e.d}
              fill="none"
              sx={{
                stroke: (t) =>
                  lit(e) ? t.palette.primary.main : t.palette.text.secondary,
                strokeWidth: lit(e) ? 2.5 : 1.25,
                opacity: lit(e) ? 1 : on.has(e.to) ? 0.45 : 0.12,
              }}
            />
          ))}
        </Box>
        {BANDS.map((biome, b) => (
          <Box
            key={biome}
            id={anchor(biome)}
            component="section"
            sx={{
              position: "relative",
              borderTop: b > 0 ? "2px dashed" : "none",
              borderColor: "divider",
              pt: 2,
              pb: 4,
              scrollMarginTop: 72,
            }}
          >
            <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
              <Box
                component="a"
                href={`#${anchor(biome)}`}
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                <FormattedMessage id={`pages.craftTree.biome.${biome}`} />
              </Box>
            </Typography>
            {ROWS[b].map((row, r) => (
              <Box
                key={r}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  columnGap: 4,
                  rowGap: 3,
                  mb: 7,
                }}
              >
                {segments(row).map((seg) =>
                  seg.group ? (
                    <Box
                      key={seg.group.id}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.75,
                        p: 1.25,
                        pt: 0.5,
                        borderRadius: 2,
                        bgcolor: "#f2f4f7",
                      }}
                    >
                      <Box
                        component="button"
                        type="button"
                        onClick={() => toggleGroup(seg.group!)}
                        sx={{
                          border: "none",
                          bgcolor: "transparent",
                          font: "inherit",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "text.secondary",
                          cursor: "pointer",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {seg.group.station ? (
                          <FormattedMessage
                            id={`pages.craftTree.group.${seg.group.kind}`}
                            values={{ station: nameOf(seg.group.station) }}
                          />
                        ) : (
                          <FormattedMessage id="pages.craftTree.group.byHand" />
                        )}
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                          justifyContent: "center",
                        }}
                      >
                        {seg.items.map(card)}
                      </Box>
                    </Box>
                  ) : (
                    card(seg.items[0])
                  ),
                )}
              </Box>
            ))}
            {/* The band's bosses, straddling the dashed line below it. */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 4,
                mb: -9,
                position: "relative",
                zIndex: 1,
              }}
            >
              {[...BOSSES.values()].filter((x) => x.band === b).map((x) => bossCard(x.key))}
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        component="aside"
        sx={{ position: { md: "sticky" }, top: { md: 80 }, pt: 2 }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
          <FormattedMessage id="pages.craftTree.resources" />
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          <FormattedMessage
            id="pages.craftTree.carry"
            values={{ slots, weight: Math.round(weight) }}
          />
        </Typography>
        <Box sx={{ display: "flex", gap: 0.5, mb: 2 }}>
          {ORDERS.map((o) => (
            <Box
              key={o}
              component="button"
              type="button"
              onClick={() => setOrder(o)}
              sx={{
                px: 1.25,
                py: 0.25,
                border: "1px solid",
                borderColor: order === o ? "primary.main" : "divider",
                borderRadius: 1,
                bgcolor: order === o ? "primary.main" : "background.paper",
                color: order === o ? "primary.contrastText" : "text.secondary",
                font: "inherit",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              <FormattedMessage id={`pages.craftTree.order.${o}`} />
            </Box>
          ))}
        </Box>
        {rows.map(([key, n], i) => {
          const biome = items[key]?.biome ?? null;
          const heading =
            order === "biome" && (i === 0 || (items[rows[i - 1][0]]?.biome ?? null) !== biome);
          return (
            <Box key={key}>
              {heading ? (
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mt: i === 0 ? 0 : 2, mb: 1 }}
                >
                  <FormattedMessage
                    id={biome ? `pages.craftTree.biome.${biome}` : "pages.craftTree.noBiome"}
                  />
                </Typography>
              ) : null}
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <ItemIcon item={key}>
                  <b>{n}</b> {nameOf(key)}
                </ItemIcon>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
