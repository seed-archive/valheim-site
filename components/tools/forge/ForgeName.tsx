"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Controller, useForm, useWatch } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { MapClient } from "@seed-archive/map/client";

import { ItemIcon } from "@/components/catalog/ItemIcon";
import { moduleUrl } from "@/lib/valheim/generator";
import FORGE_ITEMS from "@/lib/valheim/forge-items.json";
import { TOP_LEVEL } from "@/lib/valheim/forge";
import { recipeHref } from "@/lib/valheim/recipes";

type Item = (typeof FORGE_ITEMS)[number];
type ForgeForm = { idol: string; item: string; from: number };

// How many names a step shows; our own choice.
const NAMES_SHOWN = 6;

// The idols in the game's tier order (`Upgrader0Weapon` … `Upgrader7Armor`):
// the tier is the number, Battle before Protection.
const tier = (idol: string) => Number(idol.match(/\d+/)?.[0] ?? 0);
const IDOLS = [...new Set(FORGE_ITEMS.map((i) => i.idol.key))].sort(
  (a, b) => tier(a) - tier(b) || b.localeCompare(a),
);
const idolName = (idol: string) =>
  FORGE_ITEMS.find((i) => i.idol.key === idol)!.idol.name;
const ofIdol = (idol: string) =>
  FORGE_ITEMS.filter((i) => i.idol.key === idol).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
const byKey = (key: string) => FORGE_ITEMS.find((i) => i.key === key);
// The steps from the item's last level at a workbench up to TOP_LEVEL.
const steps = (item: Item | undefined) =>
  item
    ? Array.from(
        { length: TOP_LEVEL - item.maxQuality },
        (_, i) => item.maxQuality + i,
      )
    : [];

// The forge tool: an idol, an item it raises, one step up, and the names whose
// first try at the Forge of Potential takes that step. The names are computed
// in the browser by the Valheim generator's WebAssembly.
export function ForgeName() {
  const intl = useIntl();
  const router = useRouter();
  const generator = useRef<MapClient | null>(null);
  const first = ofIdol(IDOLS[0])[0];
  const { control, handleSubmit, setValue } = useForm<ForgeForm>({
    defaultValues: { idol: IDOLS[0], item: first.key, from: first.maxQuality },
  });
  const idol = useWatch({ control, name: "idol" });
  const item = byKey(useWatch({ control, name: "item" }));
  const [found, setFound] = useState<{ to: number; names: string[] } | null>(
    null,
  );
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // One worker: a step is one quick call.
    const gen = new MapClient(moduleUrl(), 1);
    generator.current = gen;
    return () => gen.close();
  }, []);

  const find = async ({ item: key, from }: ForgeForm) => {
    const gen = generator.current;
    if (!gen) {
      return;
    }
    setBusy(true);
    const text = await gen.call<string>("forgeNames", [
      key,
      from,
      from + 1,
      NAMES_SHOWN,
    ]);
    setFound({ to: from + 1, names: text ? text.split("\n") : [] });
    setBusy(false);
  };

  const label = (id: string) =>
    intl.formatMessage({ id: `pages.forgeName.${id}` });
  const ingredients = item ? recipeHref(item.key) : null;
  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
      <Box
        component="form"
        onSubmit={(e) => void handleSubmit(find)(e)}
        noValidate
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Controller
            name="idol"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label={label("idol")}
                sx={{ minWidth: 260 }}
                onChange={(e) => {
                  field.onChange(e);
                  const next = ofIdol(e.target.value)[0];
                  setValue("item", next.key);
                  setValue("from", next.maxQuality);
                  setFound(null);
                }}
              >
                {IDOLS.map((i) => (
                  <MenuItem key={i} value={i}>
                    <ItemIcon item={i}>{idolName(i)}</ItemIcon>
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="item"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label={label("item")}
                sx={{ minWidth: 260 }}
                onChange={(e) => {
                  field.onChange(e);
                  setValue("from", byKey(e.target.value)!.maxQuality);
                  setFound(null);
                }}
              >
                {ofIdol(idol).map((i) => (
                  <MenuItem key={i.key} value={i.key}>
                    <ItemIcon item={i.key}>{i.name}</ItemIcon>
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="from"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label={label("step")}
                sx={{ minWidth: 120 }}
                onChange={(e) => {
                  field.onChange(Number(e.target.value));
                  setFound(null);
                }}
              >
                {steps(item).map((l) => (
                  <MenuItem key={l} value={l}>
                    <FormattedMessage
                      id="pages.forgeName.stepLevel"
                      values={{ from: l, to: l + 1 }}
                    />
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ mt: 2, flexWrap: "wrap" }}
        >
          <Button type="submit" variant="contained" disabled={busy}>
            {label(busy ? "finding" : "find")}
          </Button>
          {ingredients ? (
            <Button variant="outlined" onClick={() => router.push(ingredients)}>
              {label("ingredients")}
            </Button>
          ) : null}
        </Stack>
      </Box>
      {found ? (
        <Box sx={{ mt: 2 }}>
          <Typography gutterBottom>
            <FormattedMessage
              id="pages.forgeName.names"
              values={{ to: found.to }}
            />
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: "wrap" }}
          >
            {found.names.map((n) => (
              <Typography
                key={n}
                component="code"
                sx={{
                  px: 1,
                  py: 0.5,
                  bgcolor: "action.hover",
                  borderRadius: 1,
                }}
              >
                {n}
              </Typography>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Paper>
  );
}
