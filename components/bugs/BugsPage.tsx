"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { FormattedMessage, useIntl } from "react-intl";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";

// The sections' anchors, from their English titles, the same in every
// language (D20: a link to a section holds across translations; other pages
// and the guides link them).
export const BUG_ANCHORS = {
  crypts: "burial-chambers-and-sunken-crypts-differ-on-the-same-seed",
  loot: "why-the-maps-loot-is-an-average",
  protector: "the-helmet-of-the-protector-never-reaches-the-forge-of-potential",
};

// How many turns the game picks a location's rotation from, and the step
// between them (ZoneSystem.PlaceLocations: Random.Range(0, 16) · 22.5°).
const YAWS = 16;
const YAW_STEP = 22.5;
// The Helmet of the Protector's last level (`HelmetDNHeavy`, m_maxQuality).
const PROTECTOR_MAX = 4;

// The bugs in the game's world generation a player meets on a seed; each one is
// proven in the Valheim generator's notes.
export function BugsPage() {
  const intl = useIntl();
  const crypts = intl.formatMessage({ id: "pages.bugs.crypts.title" });
  const loot = intl.formatMessage({ id: "pages.bugs.loot.title" });
  const protector = intl.formatMessage({ id: "pages.bugs.protector.title" });
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
        <Typography
          variant="h5"
          component="h2"
          id={BUG_ANCHORS.crypts}
          gutterBottom
        >
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
        <Typography
          variant="h5"
          component="h2"
          id={BUG_ANCHORS.loot}
          gutterBottom
          sx={{ mt: 4 }}
        >
          {loot}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <FormattedMessage id="pages.bugs.loot.why" values={{ yaws: YAWS }} />
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <FormattedMessage id="pages.bugs.loot.exact" values={{ b: bold }} />
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <FormattedMessage
            id="pages.bugs.loot.overYaws"
            values={{ b: bold, yaws: YAWS }}
          />
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <FormattedMessage id="pages.bugs.loot.atPlay" values={{ b: bold }} />
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          id={BUG_ANCHORS.protector}
          gutterBottom
          sx={{ mt: 4 }}
        >
          {protector}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <FormattedMessage id="pages.bugs.protector.why" />
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <FormattedMessage
            id="pages.bugs.protector.what"
            values={{ max: PROTECTOR_MAX }}
          />
        </Typography>
      </Container>
      <ArchiveFooter />
    </>
  );
}
