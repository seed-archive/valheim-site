"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
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
import { SeedReport } from "@/components/map/SeedReport";
import type { Focus } from "@/components/map/WorldMap";
import type { Legend, SeedMeasures } from "@/lib/generator";
import { PLACE_COLOUR, type PlaceGroup } from "@/lib/places";
import { DEFAULT_LAYERS, MAP_LAYERS } from "@/lib/world";

// Leaflet touches `window`, so the map loads in the browser only.
const WorldMap = dynamic(() => import("@/components/map/WorldMap"), {
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
  const [cursor, setCursor] = useState<{ x: number; z: number } | null>(null);
  const [layers, setLayers] = useState(DEFAULT_LAYERS);
  const [ruler, setRuler] = useState(false);
  const [focus, setFocus] = useState<Focus | null>(null);
  const [legend, setLegend] = useState<Legend | null>(null);
  const [measures, setMeasures] = useState<SeedMeasures | null>(null);
  const [placing, setPlacing] = useState(false);
  // On a narrow screen both panels start closed, so the map shows; a choice
  // the visitor makes holds.
  const narrow = useMediaQuery(useTheme().breakpoints.down("md"));
  const [reportOpen, setReportOpen] = useState<boolean | null>(null);
  const [toolsOpen, setToolsOpen] = useState<boolean | null>(null);
  const report = reportOpen ?? !narrow;
  const tools = toolsOpen ?? !narrow;

  // The seed lives in the address, so a map can be shared.
  const router = useRouter();
  const pathname = usePathname();
  const seed = useSearchParams().get("seed");
  const { control, handleSubmit } = useForm<SeedForm>({
    defaultValues: { seed: seed ?? "" },
  });

  const show = handleSubmit(({ seed }) => {
    router.replace(`${pathname}?${new URLSearchParams({ seed })}`, {
      scroll: false,
    });
  });

  const onCursor = useCallback(
    (point: { x: number; z: number } | null) => setCursor(point),
    [],
  );
  const onFocus = useCallback(
    (p: { x: number; z: number }) => setFocus({ ...p, at: Date.now() }),
    [],
  );

  return (
    <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
      <ArchiveBar />
      <Box component="main" sx={{ flexGrow: 1, position: "relative" }}>
        <Typography variant="h1" sx={{ position: "absolute", left: -10000 }}>
          <FormattedMessage id="pages.map.title" />
        </Typography>
        <WorldMap
          seed={seed}
          layers={layers}
          ruler={ruler}
          focus={focus}
          onCursor={onCursor}
          onLegend={setLegend}
          onMeasures={setMeasures}
          onPlacing={setPlacing}
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
                {layers.swampWidth ? (
                  <Typography variant="caption">
                    <FormattedMessage id="pages.map.swampLegend" />
                  </Typography>
                ) : null}
                {layers.subBiomes && legend ? (
                  <Box sx={{ maxHeight: 160, overflowY: "auto" }}>
                    {legend.subBiomes.map((s) => (
                      <Stack
                        key={s.name}
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center" }}
                      >
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            bgcolor: s.colour,
                            flexShrink: 0,
                          }}
                        />
                        <Typography variant="caption">{s.name}</Typography>
                      </Stack>
                    ))}
                  </Box>
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
        {seed ? (
          <Paper
            elevation={3}
            sx={{
              position: "absolute",
              top: { md: 16 },
              bottom: { xs: 8, md: "auto" },
              right: { xs: report ? 8 : "auto", md: 16 },
              left: { xs: 8, md: "auto" },
              zIndex: 1000,
              width: { md: report ? 380 : "auto" },
              maxHeight: { xs: "50%", md: "calc(100% - 96px)" },
              overflowY: "auto",
              p: report ? 2 : 0.5,
            }}
          >
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              {report ? (
                <Typography variant="h6" component="h2">
                  <FormattedMessage
                    id="pages.map.report.title"
                    values={{ seed }}
                  />
                </Typography>
              ) : null}
              <IconButton
                size="small"
                onClick={() => setReportOpen(!report)}
                aria-label={intl.formatMessage({
                  id: report
                    ? "pages.map.report.hide"
                    : "pages.map.report.show",
                })}
              >
                {report ? "×" : "☰"}
              </IconButton>
            </Stack>
            {report ? (
              <SeedReport
                measures={measures}
                placing={placing}
                onFocus={onFocus}
              />
            ) : null}
          </Paper>
        ) : null}
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
                values={{ x: Math.round(cursor.x), z: Math.round(cursor.z) }}
              />
            </Typography>
          </Paper>
        ) : null}
      </Box>
    </Box>
  );
}
