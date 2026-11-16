"use client";

import { useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { PageTrail } from "@/components/archive/PageTrail";
import { SeedReport } from "@/components/tools/seed/SeedReport";
import { MapClient } from "@seed-archive/map/client";
import {
  decodeMeasures,
  moduleUrl,
  type SeedMeasures,
} from "@/lib/valheim/generator";

// The seed a visitor can rate without typing one: the game's own example.
const EXAMPLE_SEED = "Valheim";

// The longest seed the game's new-world dialog accepts (World.GenerateSeed
// makes ten characters; a player may type up to this many).
const SEED_MAX = 10;

type SeedForm = { seed: string };

// How good is my seed: the visitor types a seed, the Valheim generator in the
// browser measures that world, and each measure is set against the seed scan.
export function SeedRating() {
  const intl = useIntl();
  const router = useRouter();
  const pathname = usePathname();
  // The seed lives in the address, so a rating can be shared.
  const seed = useSearchParams().get("seed");
  const { control, handleSubmit } = useForm<SeedForm>({
    defaultValues: { seed: seed ?? "" },
  });
  const generator = useRef<MapClient | null>(null);
  const [measured, setMeasured] = useState<{
    seed: string;
    measures: SeedMeasures;
  } | null>(null);

  useEffect(() => {
    // One worker: a seed is measured once, and no map is drawn here.
    const gen = new MapClient(moduleUrl(), 1);
    generator.current = gen;
    return () => gen.close();
  }, []);

  useEffect(() => {
    const gen = generator.current;
    if (!gen || !seed) {
      return;
    }
    let live = true;
    gen.call<Float32Array>("measure", [seed]).then((raw) => {
      const measures = decodeMeasures(raw);
      if (live && measures) {
        setMeasured({ seed, measures });
      }
    });
    return () => {
      live = false;
    };
  }, [seed]);

  const rate = handleSubmit(({ seed }) => {
    const text = seed.trim() || EXAMPLE_SEED;
    router.replace(`${pathname}?${new URLSearchParams({ seed: text })}`, {
      scroll: false,
    });
  });

  const current = measured && measured.seed === seed ? measured.measures : null;

  return (
    <>
      <ArchiveBar />
      <Container
        component="main"
        maxWidth="md"
        sx={{ py: 6, minHeight: "70vh" }}
      >
        <PageTrail
          steps={[
            { name: <FormattedMessage id="archive.home" />, href: "/" },
            { name: <FormattedMessage id="archive.tools" />, href: "/tools" },
            { name: <FormattedMessage id="archive.seedRating" /> },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          <FormattedMessage id="pages.seedRating.title" />
        </Typography>
        <Typography gutterBottom>
          <FormattedMessage
            id="pages.seedRating.lead"
            values={{ b: (text) => <b>{text}</b> }}
          />
        </Typography>
        <Stack
          component="form"
          onSubmit={rate}
          direction="row"
          spacing={1}
          sx={{ my: 3, maxWidth: 420 }}
        >
          <Controller
            name="seed"
            control={control}
            rules={{ maxLength: SEED_MAX }}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                fullWidth
                label={intl.formatMessage({ id: "pages.map.seed" })}
                placeholder={EXAMPLE_SEED}
                slotProps={{
                  htmlInput: { maxLength: SEED_MAX, spellCheck: false },
                  inputLabel: { shrink: true },
                }}
              />
            )}
          />
          <Button type="submit" variant="contained">
            <FormattedMessage id="pages.seedRating.rate" />
          </Button>
        </Stack>
        {seed ? (
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h5" component="h2" gutterBottom>
              <FormattedMessage id="pages.map.report.title" values={{ seed }} />
            </Typography>
            <Typography gutterBottom>
              <FormattedMessage
                id="pages.seedRating.toMap"
                values={{
                  link: (text) => (
                    <Link
                      component={NextLink}
                      href={`/tools/map?${new URLSearchParams({ seed })}`}
                    >
                      {text}
                    </Link>
                  ),
                }}
              />
            </Typography>
            <SeedReport seed={seed} measures={current} />
          </Paper>
        ) : null}
      </Container>
      <ArchiveFooter />
    </>
  );
}
