"use client";

import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { useValheimMap } from "@/components/valheim/useValheimMap";
import { DEEP_SEA } from "@/lib/valheim/palette";
import { PLACE_COLOUR, type PlaceGroup } from "@/lib/valheim/places";
import { DEFAULT_LAYERS, MAP_LAYERS } from "@/lib/world";

// Leaflet touches `window`, so the viewer loads in the browser only.
const Viewer = dynamic(() => import("@/components/map/Viewer"), {
  ssr: false,
});

// The longest seed the game's new-world dialog accepts (World.GenerateSeed
// makes ten characters; a player may type up to this many).
const SEED_MAX = 10;

type SeedForm = { seed: string };

// The map page: the map fills everything under the header, its controls sit on
// it, and there is no footer (the owner, 2026-11-15, as valheim.tools does it;
// the coordinator allowed the exception: seed-archive/docs/seo.md, Header and footer).
export function MapScreen() {
  const intl = useIntl();
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [layers, setLayers] = useState(DEFAULT_LAYERS);
  const [ruler, setRuler] = useState(false);
  // On a narrow screen both panels start closed, so the map shows; a choice
  // the visitor makes holds.
  const narrow = useMediaQuery(useTheme().breakpoints.down("md"));
  const [toolsOpen, setToolsOpen] = useState<boolean | null>(null);
  const tools = toolsOpen ?? !narrow;

  // The seed lives in the address, so a map can be shared.
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const seed = params.get("seed");
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
  const { control, handleSubmit } = useForm<SeedForm>({
    defaultValues: { seed: seed ?? "" },
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
          describe={world.describe}
          ruler={ruler}
          focus={at}
          pinsKey="valheim-pins"
          labels={world.labels}
          onCursor={onCursor}
        />
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: { xs: 8, md: 16 },
            left: { xs: 8, md: 16 },
            right: { xs: 8, md: "auto" },
            p: 2,
            zIndex: 1000,
            width: { md: 260 },
            maxHeight: { xs: "45%", md: "calc(100% - 32px)" },
            overflowY: "auto",
          }}
        >
          <Stack component="form" onSubmit={show} spacing={1.5}>
            <Controller
              name="seed"
              control={control}
              rules={{ required: true, maxLength: SEED_MAX }}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  label={intl.formatMessage({ id: "pages.map.seed" })}
                  slotProps={{
                    htmlInput: { maxLength: SEED_MAX, spellCheck: false },
                    inputLabel: { shrink: true },
                  }}
                />
              )}
            />
            <Stack direction="row" spacing={1}>
              <Button type="submit" variant="contained" sx={{ flexGrow: 1 }}>
                <FormattedMessage id="pages.map.show" />
              </Button>
              {narrow ? (
                <Button
                  variant="outlined"
                  onClick={() => setToolsOpen(!tools)}
                  aria-expanded={tools}
                >
                  <FormattedMessage id="pages.map.tools" />
                </Button>
              ) : null}
            </Stack>
            {tools ? (
              <>
                <FormGroup>
                  {MAP_LAYERS.map((layer) => (
                    <FormControlLabel
                      key={layer}
                      control={
                        <Checkbox
                          size="small"
                          checked={layers[layer]}
                          onChange={(_, on) =>
                            setLayers((now) => ({ ...now, [layer]: on }))
                          }
                          sx={
                            layer in PLACE_COLOUR
                              ? {
                                  color: PLACE_COLOUR[layer as PlaceGroup],
                                }
                              : undefined
                          }
                        />
                      }
                      label={intl.formatMessage({
                        id: `pages.map.layers.${layer}`,
                      })}
                    />
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
              </>
            ) : null}
          </Stack>
        </Paper>
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
