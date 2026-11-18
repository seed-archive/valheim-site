"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import LayersIcon from "@mui/icons-material/Layers";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

import type { Marker, View } from "@seed-archive/map/viewer";
import { MapClient } from "@seed-archive/map/client";
import {
  type On,
  readAddress,
  withSeed,
  withSwitches,
} from "@seed-archive/map/address";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { LootPanel, type LootPlace } from "@/components/valheim/LootPanel";
import { useValheimMap } from "@/components/valheim/useValheimMap";
import { moduleUrl } from "@/lib/valheim/generator";
import {
  DEEP_SEA,
  type Kind,
  KINDS,
  kindKey,
  markColour,
} from "@/lib/valheim/palette";
import { markIcon } from "@/lib/valheim/icons";
import {
  PLACE_COLOUR,
  placeColour,
  type PlaceGroup,
} from "@/lib/valheim/places";
import { MAP_SWITCHES } from "@/lib/valheim/switches";
import {
  EXAMPLE_SEED,
  type MapLayer,
  MAP_LAYERS,
  SEED_MAX,
  SEED_PATTERN,
} from "@/lib/world";

// Leaflet touches `window`, so the viewer loads in the browser only.
const Viewer = dynamic(() => import("@seed-archive/map/viewer"), {
  ssr: false,
});

// The layers whose pins the generator draws, by the overlay layer it draws
// them on.
const PIN_LAYERS: [MapLayer, number][] = [
  ["fineWood", 2],
  ["ore", 3],
  ["resources", 5],
  ["spawners", 7],
];

// The generator computes its marks only this close, metres a pixel (its
// MAX_MARK_STEP): further out a view holds too many zones.
const MAX_MARK_STEP = 4;
// Silver's mark number: its pin is ringed in white.
const SILVER = 18;
// The marks drawn over the rest: silver and swamp iron (a run looks for them
// among dozens of obsidian and tin).
const ON_TOP = [18, 19];
// Workers that compute the marks in view, each a strip of it.
const MARK_WORKERS = 4;

// A kind's checkbox in its pin's colour: a place's, or a mark's.
function kindColour(layer: string, kind: Kind): string {
  return "pin" in kind
    ? placeColour(layer as PlaceGroup, kind.pin)
    : markColour(layer, kind.mark);
}

// The side panel's width: the seed, the layers and the ruler; the other side
// is kept for what a place holds.
const PANEL_WIDTH = 280;

type SeedForm = { seed: string };

// The map page: the map fills everything under the header, its controls sit on
// it, and there is no footer (the owner, 2026-11-15, as valheim.tools does it;
// the coordinator allowed the exception: seed-archive/docs/seo.md, Header and footer).
export function MapScreen() {
  const intl = useIntl();
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  // The seed, the place and what is on live in the address (the shared
  // package's form), so a map can be shared and a page can link to a view.
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const address = useMemo(() => readAddress(params, MAP_SWITCHES), [params]);
  const [on, setOn] = useState<On>(() => address.on);
  // Each layer on or off, and the kinds turned off under the layers that are
  // on, by name key.
  const layers = useMemo(
    () =>
      Object.fromEntries(
        MAP_LAYERS.map((layer) => [layer, Object.hasOwn(on, layer)]),
      ) as Record<MapLayer, boolean>,
    [on],
  );
  const hidden = useMemo(
    () =>
      new Set(
        Object.entries(KINDS).flatMap(([layer, kinds]) =>
          Object.hasOwn(on, layer)
            ? kinds.map(kindKey).filter((key) => !Object.hasOwn(on[layer], key))
            : [],
        ),
      ) as ReadonlySet<string>,
    [on],
  );
  // A layer's kinds by name, in the visitor's alphabet.
  const kindName = (kind: Kind) =>
    intl.formatMessage({
      id:
        "pin" in kind
          ? `pages.map.places.${kind.pin}`
          : `pages.map.legend.${kind.key}`,
    });
  const sortedKinds = (layer: string) =>
    [...(KINDS[layer] ?? [])].sort((a, b) =>
      kindName(a).localeCompare(kindName(b), intl.locale),
    );
  // The layers whose kinds are shown under them: all folded at first, so the
  // list stays short.
  const [unfolded, setUnfolded] = useState<ReadonlySet<string>>(new Set());
  const toggleFold = (layer: string) =>
    setUnfolded((now) => {
      const next = new Set(now);
      if (next.has(layer)) {
        next.delete(layer);
      } else {
        next.add(layer);
      }
      return next;
    });
  // A change of the switches goes into the address too, keeping the rest.
  const write = (next: Record<string, On>) => {
    setOn(next);
    router.replace(
      `${pathname}?${withSwitches(params, MAP_SWITCHES, next)}`,
      { scroll: false },
    );
  };
  // A layer turned on comes back with all its kinds.
  const setLayer = (layer: MapLayer, turnOn: boolean) => {
    const next: Record<string, On> = { ...on };
    if (turnOn) {
      next[layer] = Object.fromEntries(
        (KINDS[layer] ?? []).map((kind) => [kindKey(kind), {}]),
      );
    } else {
      delete next[layer];
    }
    write(next);
  };
  const toggleKind = (key: string, turnOn: boolean) => {
    const layer = Object.keys(KINDS).find((l) =>
      KINDS[l].some((kind) => kindKey(kind) === key),
    );
    if (!layer || !Object.hasOwn(on, layer)) {
      return;
    }
    const kinds: Record<string, On> = { ...on[layer] };
    if (turnOn) {
      kinds[key] = {};
    } else {
      delete kinds[key];
    }
    write({ ...on, [layer]: kinds });
  };
  const [ruler, setRuler] = useState(false);
  // A phone shows a bar with the seed and a drawer for the layers, closed at
  // first so the map shows; a wide screen a side panel, open at first. Which
  // one shows is CSS's choice (the breakpoint), so it holds from the first paint.
  const [drawer, setDrawer] = useState(false);
  const [panel, setPanel] = useState(true);

  // No seed in the address: the example seed, so the map is never empty.
  const seed = address.seed ?? EXAMPLE_SEED;
  // A link may centre the map on a place: x east, y north (the game's x and
  // z), and z the zoom.
  const at = address.focus;
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SeedForm>({
    defaultValues: { seed },
    mode: "onChange",
  });

  const show = handleSubmit(({ seed }) => {
    // A new seed keeps the switches; the place belonged to the old world.
    router.replace(`${pathname}?${withSeed(params, seed)}`, { scroll: false });
  });

  const onCursor = useCallback(
    (point: { x: number; y: number } | null) => setCursor(point),
    [],
  );
  // The place whose loot the panel shows (the owner, 2026-11-17).
  const [loot, setLoot] = useState<LootPlace | null>(null);
  const world = useValheimMap(seed, hidden, setLoot);
  // Clicks get a worker of their own: the map's workers queue tiles, and a
  // click should not wait behind them.
  const picker = useRef<MapClient | null>(null);
  useEffect(() => {
    const client = new MapClient(moduleUrl(), MARK_WORKERS);
    picker.current = client;
    return () => client.close();
  }, []);
  // The generator's marks in view (ore, resources, fine wood) as markers like
  // the places': on each settled view, the objects of that square.
  const [view, setView] = useState<View | null>(null);
  const [marks, setMarks] = useState<{ key: string; marker: Marker }[]>([]);
  const mask = PIN_LAYERS.reduce(
    (m, [key, n]) => (layers[key] ? m | (1 << n) : m),
    0,
  );
  const wanted =
    Boolean(seed) &&
    mask !== 0 &&
    view !== null &&
    view.unitsPerPixel <= MAX_MARK_STEP;
  useEffect(() => {
    const client = picker.current;
    if (!client || !seed || !view || !wanted) {
      return;
    }
    let live = true;
    // The view in strips, one a worker, computed side by side.
    const width = (view.x1 - view.x0) / MARK_WORKERS;
    Promise.all(
      Array.from({ length: MARK_WORKERS }, (_, k) =>
        client.call<Float32Array>(
          "marks_in",
          [
            seed,
            mask,
            view.x0 + k * width,
            view.y0,
            view.x0 + (k + 1) * width,
            view.y1,
            view.unitsPerPixel,
          ],
          k,
        ),
      ),
    ).then((parts) => {
      const raw = parts.flatMap((p) => Array.from(p));
      if (!live) {
        return;
      }
      const out: { key: string; marker: Marker }[] = [];
      for (let i = 0; i + 4 < raw.length; i += 5) {
        const [n, mark, x, y, count] = [
          raw[i],
          raw[i + 1],
          raw[i + 2],
          raw[i + 3],
          raw[i + 4],
        ];
        const key = PIN_LAYERS.find(([, k]) => k === n)?.[0];
        const entry = key
          ? KINDS[key]?.find((e) => "mark" in e && e.mark === mark)
          : undefined;
        if (!key || !entry || !("mark" in entry)) {
          continue;
        }
        out.push({
          key: entry.key,
          marker: {
            layer: key,
            x,
            y,
            icon: markIcon(
              markColour(key, mark),
              mark === SILVER ? "#fff" : undefined,
              ON_TOP.includes(mark),
            ),
            card: {
              kicker: intl.formatMessage({ id: `pages.map.layers.${key}` }),
              title: intl.formatMessage({
                id: `pages.map.legend.${entry.key}`,
              }),
              meta: `x ${Math.round(x)}, y ${Math.round(y)}`,
              lines:
                count > 1
                  ? [
                      intl.formatMessage(
                        {
                          id: `pages.map.pickCount.${key === "spawners" ? "spawners" : entry.key}`,
                        },
                        { n: count },
                      ),
                    ]
                  : // A dungeon's spawners stand in its rooms, not counted.
                    key === "spawners" && count === 0
                    ? [intl.formatMessage({ id: "pages.map.spawnersInRooms" })]
                    : [],
            },
          },
        });
      }
      setMarks(out);
    });
    return () => {
      live = false;
    };
  }, [view, seed, mask, wanted, intl]);
  const allMarkers = useMemo(
    () =>
      wanted
        ? [
            ...world.markers,
            ...marks.filter((m) => !hidden.has(m.key)).map((m) => m.marker),
          ]
        : world.markers,
    [world.markers, marks, wanted, hidden],
  );
  const visible = layers;
  const placing = world.placing;

  // The seed and its button: in a row on a phone's bar, one over the other in
  // the side panel.
  const seedForm = (direction: "row" | "column") => (
    <Stack
      component="form"
      onSubmit={show}
      direction={direction}
      spacing={1}
      sx={{ flexGrow: 1 }}
    >
      <Controller
        name="seed"
        control={control}
        rules={{ required: true, maxLength: SEED_MAX, pattern: SEED_PATTERN }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            error={Boolean(fieldState.error)}
            helperText={
              fieldState.error
                ? intl.formatMessage({ id: "pages.map.seedRule" })
                : undefined
            }
            size="small"
            label={intl.formatMessage({ id: "pages.map.seed" })}
            sx={{ flexGrow: direction === "row" ? 1 : 0, minWidth: 0 }}
            slotProps={{
              htmlInput: { maxLength: SEED_MAX, spellCheck: false },
              inputLabel: { shrink: true },
            }}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!isValid}
        sx={{ whiteSpace: "nowrap", flexShrink: 0, alignSelf: "flex-start" }}
      >
        <FormattedMessage
          id={direction === "row" ? "pages.map.showShort" : "pages.map.show"}
        />
      </Button>
    </Stack>
  );

  const layerList = (
    <Stack spacing={1.5}>
      <Typography variant="subtitle2">
        <FormattedMessage id="pages.map.layersTitle" />
      </Typography>
      <FormGroup>
        {MAP_LAYERS.map((layer) => (
          <Box key={layer}>
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Tooltip
                title={intl.formatMessage({
                  id: `pages.map.layerHints.${layer}`,
                })}
                placement="right"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={layers[layer]}
                      onChange={(_, on) => setLayer(layer, on)}
                      sx={
                        layer in PLACE_COLOUR
                          ? { color: PLACE_COLOUR[layer as PlaceGroup] }
                          : undefined
                      }
                    />
                  }
                  label={intl.formatMessage({
                    id: `pages.map.layers.${layer}`,
                  })}
                />
              </Tooltip>
              {KINDS[layer] ? (
                <IconButton
                  size="small"
                  onClick={() => toggleFold(layer)}
                  aria-expanded={unfolded.has(layer)}
                  aria-label={intl.formatMessage({
                    id: unfolded.has(layer)
                      ? "pages.map.foldKinds"
                      : "pages.map.unfoldKinds",
                  })}
                >
                  {unfolded.has(layer) ? (
                    <ExpandLessIcon fontSize="small" />
                  ) : (
                    <ExpandMoreIcon fontSize="small" />
                  )}
                </IconButton>
              ) : null}
            </Stack>
            {KINDS[layer] ? (
              <Collapse in={unfolded.has(layer)}>
                <Box
                  sx={{
                    pl: 3.5,
                    display: "flex",
                    flexDirection: "column",
                    // Under a layer that is off, its kinds fade with it.
                    opacity: layers[layer] ? 1 : 0.4,
                  }}
                >
                  {sortedKinds(layer).map((kind) => {
                    const key = kindKey(kind);
                    return (
                      <FormControlLabel
                        key={key}
                        disabled={!layers[layer]}
                        sx={{ my: -0.25, alignItems: "flex-start" }}
                        control={
                          <Checkbox
                            size="small"
                            checked={!hidden.has(key)}
                            onChange={(_, on) => toggleKind(key, on)}
                            sx={{
                              color: kindColour(layer, kind),
                              "&.Mui-checked": {
                                color: kindColour(layer, kind),
                              },
                            }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ pt: 0.75 }}>
                            <FormattedMessage
                              id={
                                "pin" in kind
                                  ? `pages.map.places.${kind.pin}`
                                  : `pages.map.legend.${kind.key}`
                              }
                            />
                          </Typography>
                        }
                      />
                    );
                  })}
                </Box>
              </Collapse>
            ) : null}
          </Box>
        ))}
      </FormGroup>
      <Typography variant="caption" color="text.secondary">
        <FormattedMessage id="pages.map.zoomIn" />
      </Typography>
      {placing ? (
        <Typography variant="caption" color="text.secondary">
          <FormattedMessage id="pages.map.report.placing" />
        </Typography>
      ) : null}
      <Divider />
      <ToggleButton
        value="ruler"
        size="small"
        selected={ruler}
        onChange={() => setRuler((on) => !on)}
      >
        <FormattedMessage id="pages.map.ruler" />
      </ToggleButton>
      <Typography variant="caption" color="text.secondary">
        <FormattedMessage id="pages.map.help" />
      </Typography>
    </Stack>
  );

  return (
    <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
      <ArchiveBar />
      <Box component="main" sx={{ flexGrow: 1, position: "relative" }}>
        <Typography variant="h1" sx={{ position: "absolute", left: -10000 }}>
          <FormattedMessage id="pages.map.title" />
        </Typography>
        <Viewer
          client={world.client}
          onView={setView}
          seed={seed}
          world={world.world}
          palette={world.palette}
          background={DEEP_SEA}
          overlays={world.overlays}
          visible={visible}
          markers={allMarkers}
          ground={world.ground}
          onMarkerClick={world.onMarkerClick}
          ruler={ruler}
          focus={at}
          pinsKey="valheim-pins"
          labels={world.labels}
          onCursor={onCursor}
        />
        <LootPanel client={world.client} seed={seed} place={loot} onClose={() => setLoot(null)} />
        <Paper
          elevation={3}
          sx={{
            display: { xs: "block", md: "none" },
            position: "absolute",
            top: 8,
            left: 8,
            right: 8,
            p: 1,
            zIndex: 1000,
          }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <IconButton
              onClick={() => setDrawer(true)}
              aria-label={intl.formatMessage({ id: "pages.map.layersTitle" })}
            >
              <LayersIcon />
            </IconButton>
            {seedForm("row")}
          </Stack>
        </Paper>
        <Drawer
          anchor="left"
          open={drawer}
          onClose={() => setDrawer(false)}
          sx={{ display: { md: "none" } }}
          slotProps={{ paper: { sx: { width: PANEL_WIDTH, p: 2 } } }}
        >
          {layerList}
        </Drawer>
        {panel ? (
          <Paper
            elevation={3}
            square
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: PANEL_WIDTH,
              p: 2,
              zIndex: 1000,
              overflowY: "auto",
            }}
          >
            <Stack spacing={2}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "flex-start" }}
              >
                {seedForm("column")}
                <IconButton
                  onClick={() => setPanel(false)}
                  aria-label={intl.formatMessage({ id: "pages.map.hidePanel" })}
                >
                  <ChevronLeftIcon />
                </IconButton>
              </Stack>
              {layerList}
            </Stack>
          </Paper>
        ) : (
          <Paper
            elevation={3}
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 1000,
            }}
          >
            <IconButton
              onClick={() => setPanel(true)}
              aria-label={intl.formatMessage({ id: "pages.map.showPanel" })}
            >
              <LayersIcon />
            </IconButton>
          </Paper>
        )}
        {cursor ? (
          <Paper
            elevation={2}
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              px: 1.5,
              py: 0.5,
              zIndex: 1000,
            }}
          >
            <Typography variant="body2">
              <FormattedMessage
                id="pages.map.cursor"
                values={{ x: Math.round(cursor.x), y: Math.round(cursor.y) }}
              />
            </Typography>
          </Paper>
        ) : null}
      </Box>
    </Box>
  );
}
