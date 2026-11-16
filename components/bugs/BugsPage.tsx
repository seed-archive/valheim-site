"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { FormattedMessage, useIntl } from "react-intl";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";

// How many turns the game picks a location's rotation from, and the step
// between them (ZoneSystem.PlaceLocations: Random.Range(0, 16) · 22.5°).
const YAWS = 16;
const YAW_STEP = 22.5;

// The bugs in the game's world generation a player meets on a seed; each one is
// proven in the Valheim generator's notes.
// A heading's id from its words, so any section can be linked (the shared
// seo.md, Links).
function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function BugsPage() {
  const intl = useIntl();
  const crypts = intl.formatMessage({ id: "pages.bugs.crypts.title" });
  const bold = (text: React.ReactNode) => <strong>{text}</strong>;
  return (
    <>
      <ArchiveBar />
      <Container
        component="main"
        maxWidth="md"
        sx={{ py: 6, minHeight: "70vh" }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          <FormattedMessage id="pages.bugs.title" />
        </Typography>
        <Typography sx={{ mb: 4 }}>
          <FormattedMessage id="pages.bugs.lead" values={{ b: bold }} />
        </Typography>
        <Typography variant="h5" component="h2" id={slug(crypts)} gutterBottom>
          {crypts}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <FormattedMessage
            id="pages.bugs.crypts.how"
            values={{ yaws: YAWS, step: YAW_STEP }}
          />
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <FormattedMessage id="pages.bugs.crypts.cores" />
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <FormattedMessage id="pages.bugs.crypts.others" />
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <FormattedMessage id="pages.bugs.crypts.maps" />
        </Typography>
      </Container>
      <ArchiveFooter />
    </>
  );
}
