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

type Props = {
  eikthyr: { median?: number; most?: number; island?: number };
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

// Where to go first on a new seed: Eikthyr, the Black Forest, a troll cave with
// copper and the tin below it — each with what the seed scan measured.
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

        {known(eikthyr.median, eikthyr.most) ? (
          <>
            {h2("pages.start.eikthyr.title")}
            {p("pages.start.eikthyr.near", eikthyr)}
            {eikthyr.island !== undefined
              ? p("pages.start.eikthyr.island", eikthyr)
              : null}
          </>
        ) : null}

        {known(blackForest.median, blackForest.least) ? (
          <>
            {h2("pages.start.blackForest.title")}
            {p("pages.start.blackForest.near", blackForest)}
            {blackForest.island !== undefined
              ? p("pages.start.blackForest.island", blackForest)
              : null}
          </>
        ) : null}

        {known(copper.caves, copper.nearest) ? (
          <>
            {h2("pages.start.copper.title")}
            {p("pages.start.copper.why", {})}
            {p("pages.start.copper.caves", { ...copper, all: CAVES })}
            {copper.walk !== undefined
              ? p("pages.start.copper.walk", copper)
              : null}
          </>
        ) : null}

        {known(copper.tin, copper.shore) ? (
          <>
            {h2("pages.start.tin.title")}
            {p("pages.start.tin.near", { ...copper, reach: REACH })}
          </>
        ) : null}

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
