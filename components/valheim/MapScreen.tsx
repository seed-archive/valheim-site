"use client";

import { useCallback, useMemo, useState } from "react";
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

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { useValheimMap } from "@/components/valheim/useValheimMap";
import { DEEP_SEA } from "@/lib/valheim/palette";
import { PLACE_COLOUR, type PlaceGroup } from "@/lib/valheim/places";
import {
  DEFAULT_LAYERS,
  EXAMPLE_SEED,
  MAP_LAYERS,
  SEED_MAX,
  SEED_PATTERN,
} from "@/lib/world";

// Leaflet touches `window`, so the viewer loads in the browser only.
const Viewer = dynamic(() => import("@seed-archive/map/viewer"), {
  ssr: false,
});

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
  const [layers, setLayers] = useState(DEFAULT_LAYERS);
  const [ruler, setRuler] = useState(false);
  // A phone shows a bar with the seed and a drawer for the layers, closed at
  // first so the map shows; a wide screen a side panel, open at first. Which
  // one shows is CSS's choice (the breakpoint), so it holds from the first paint.
  const [drawer, setDrawer] = useState(false);
  const [panel, setPanel] = useState(true);

  // The seed lives in the address, so a map can be shared.
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  // No seed in the address: the example seed, so the map is never empty.
  const seed = params.get("seed") ?? EXAMPLE_SEED;
  // A link from the seed tool may centre the map on a place.
  const px = params.get("x");
  const pz = params.get("z");
  const at = useMemo(
    () =>
      px !== null && pz !== null
        ? { x: Number(px), y: Number(pz), at: 0 }
        : null,
    [px, pz],
  );
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SeedForm>({
    defaultValues: { seed },
    mode: "onChange",
  });

  const show = handleSubmit(({ seed }) => {
    router.replace(`${pathname}?${new URLSearchParams({ seed })}`, {
      scroll: false,
    });
  });

  const onCursor = useCallback(
    (point: { x: number; y: number } | null) => setCursor(point),
    [],
  );
  const world = useValheimMap(seed);
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
          <Tooltip
            key={layer}
            title={intl.formatMessage({ id: `pages.map.layerHints.${layer}` })}
            placement="right"
          >
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={layers[layer]}
                  onChange={(_, on) =>
                    setLayers((now) => ({ ...now, [layer]: on }))
                  }
                  sx={
                    layer in PLACE_COLOUR
                      ? { color: PLACE_COLOUR[layer as PlaceGroup] }
                      : undefined
                  }
                />
              }
              label={intl.formatMessage({ id: `pages.map.layers.${layer}` })}
            />
          </Tooltip>
        ))}
      </FormGroup>
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
          seed={seed}
          world={world.world}
          palette={world.palette}
          background={DEEP_SEA}
          overlays={world.overlays}
          visible={layers}
          markers={world.markers}
          ruler={ruler}
          focus={at}
          pinsKey="valheim-pins"
          labels={world.labels}
          onCursor={onCursor}
        />
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
                values={{ x: Math.round(cursor.x), z: Math.round(cursor.y) }}
              />
            </Typography>
          </Paper>
        ) : null}
      </Box>
    </Box>
  );
}
