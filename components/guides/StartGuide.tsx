"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { FormattedMessage, useIntl } from "react-intl";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { PageTrail } from "@/components/archive/PageTrail";

// How far the copper cave's surroundings are counted, metres: the Valheim
// generator's reach for tin, oaks and birches around a cave.
const REACH = 300;
// The troll caves looked at for copper: the nearest ones to the start (the
// Valheim generator's choice).
const CAVES = 10;
// An abandoned house's chance to hold a beehive, percent (the game's WoodHouse
// prefabs: the beehive's RandomSpawn).
const HIVE_CHANCE = 25;

type Props = {
  eikthyr: {
    median?: number;
    most?: number;
    island?: number;
    third?: number;
    fourth?: number;
  };
  blackForest: { median?: number; least?: number; island?: number };
  copper: {
    caves?: number;
    nearest?: number;
    walk?: number;
    shore?: number;
    tin?: number;
  };
};

// A heading's id from its words (the shared seo.md, Links).
function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const known = (...v: (number | undefined)[]) => v.every((x) => x !== undefined);

// Where to go first on a new seed, biome by biome: what each stage is for, what
// the seed scan measured of it, and whether a run can skip it.
export function StartGuide({ eikthyr, blackForest, copper }: Props) {
  const intl = useIntl();
  const h2 = (id: string) => {
    const text = intl.formatMessage({ id });
    return (
      <Typography
        variant="h5"
        component="h2"
        id={slug(text)}
        sx={{ mt: 4, mb: 1 }}
      >
        {text}
      </Typography>
    );
  };
  const h3 = (id: string) => {
    const text = intl.formatMessage({ id });
    return (
      <Typography
        variant="h6"
        component="h3"
        id={slug(text)}
        sx={{ mt: 2, mb: 1 }}
      >
        {text}
      </Typography>
    );
  };
  const p = (id: string, values: Record<string, unknown>) => (
    <Typography sx={{ mb: 2 }}>
      <FormattedMessage id={id} values={values as never} />
    </Typography>
  );
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
            { name: <FormattedMessage id="archive.guides" />, href: "/guides" },
            { name: <FormattedMessage id="archive.guideStart" /> },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          <FormattedMessage id="pages.start.title" />
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <FormattedMessage
            id="pages.start.lead"
            values={{ b: (text) => <b>{text}</b> }}
          />
        </Typography>

        {h2("pages.start.meadows.title")}
        {p("pages.start.meadows.why", {})}
        {known(eikthyr.median, eikthyr.most)
          ? p("pages.start.meadows.near", eikthyr)
          : null}
        {eikthyr.island !== undefined
          ? p("pages.start.meadows.island", eikthyr)
          : null}
        {known(eikthyr.third, eikthyr.fourth)
          ? p("pages.start.meadows.bees", { ...eikthyr, chance: HIVE_CHANCE })
          : null}
        {h3("pages.start.meadows.skipTitle")}
        {p("pages.start.meadows.skip", {})}

        {h2("pages.start.blackForest.title")}
        {known(blackForest.median, blackForest.least)
          ? p("pages.start.blackForest.near", blackForest)
          : null}
        {blackForest.island !== undefined
          ? p("pages.start.blackForest.island", blackForest)
          : null}
        {p("pages.start.blackForest.why", {})}
        {known(copper.caves, copper.nearest)
          ? p("pages.start.blackForest.caves", { ...copper, all: CAVES })
          : null}
        {copper.walk !== undefined
          ? p("pages.start.blackForest.walk", copper)
          : null}
        {known(copper.tin, copper.shore)
          ? p("pages.start.blackForest.tin", { ...copper, reach: REACH })
          : null}

        <Typography sx={{ mt: 4 }}>
          <FormattedMessage
            id="pages.start.rate"
            values={{
              link: (text) => (
                <Link href="/tools/how-good-is-my-seed">{text}</Link>
              ),
            }}
          />
        </Typography>
      </Container>
      <ArchiveFooter />
    </>
  );
}
