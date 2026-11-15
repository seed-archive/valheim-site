"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { MAP_LAYERS } from "@/lib/world";

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
  const { control, handleSubmit, reset } = useForm<SeedForm>({
    defaultValues: { seed: "" },
  });

  // The seed lives in the address, so a map can be shared.
  useEffect(() => {
    const seed = new URLSearchParams(window.location.search).get("seed");
    if (seed) {
      reset({ seed });
    }
  }, [reset]);

  const show = handleSubmit(({ seed }) => {
    const url = new URL(window.location.href);
    url.searchParams.set("seed", seed);
    window.history.replaceState(null, "", url);
  });

  const onCursor = useCallback(
    (point: { x: number; z: number } | null) => setCursor(point),
    [],
  );

  return (
    <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
      <ArchiveBar />
      <Box component="main" sx={{ flexGrow: 1, position: "relative" }}>
        <Typography variant="h1" sx={{ position: "absolute", left: -10000 }}>
          <FormattedMessage id="pages.map.title" />
        </Typography>
        <WorldMap onCursor={onCursor} />
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            p: 2,
            zIndex: 1000,
            width: 260,
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
            <Button type="submit" variant="contained">
              <FormattedMessage id="pages.map.show" />
            </Button>
            <FormGroup>
              {MAP_LAYERS.map((layer) => (
                <FormControlLabel
                  key={layer}
                  control={<Checkbox size="small" defaultChecked disabled />}
                  label={intl.formatMessage({
                    id: `pages.map.layers.${layer}`,
                  })}
                />
              ))}
            </FormGroup>
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
                values={{ x: Math.round(cursor.x), z: Math.round(cursor.z) }}
              />
            </Typography>
          </Paper>
        ) : null}
      </Box>
    </Box>
  );
}
