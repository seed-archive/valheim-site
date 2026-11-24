"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@/components/LocaleLink";
import { FormattedMessage } from "react-intl";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { PageTrail } from "@/components/PageTrail";

// The Tools menu item's index: every tool of the section, each in a sentence.
export function ToolsIndex() {
  return (
    <>
      <ArchiveBar />
      <Container component="main" sx={{ py: 6, minHeight: "70vh" }}>
        <PageTrail
          steps={[
            { name: <FormattedMessage id="archive.home" />, href: "/" },
            { name: <FormattedMessage id="archive.tools" /> },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          <FormattedMessage id="pages.tools.title" />
        </Typography>
        <Typography gutterBottom>
          <FormattedMessage
            id="pages.tools.map"
            values={{
              b: (text) => <b>{text}</b>,
              link: (text) => <Link href="/tools/map">{text}</Link>,
            }}
          />
        </Typography>
        <Typography>
          <FormattedMessage
            id="pages.tools.seedRating"
            values={{
              b: (text) => <b>{text}</b>,
              link: (text) => (
                <Link href="/tools/how-good-is-my-seed">{text}</Link>
              ),
            }}
          />
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <FormattedMessage
            id="pages.tools.bestSeeds"
            values={{
              b: (text) => <b>{text}</b>,
              link: (text) => <Link href="/tools/best-seeds">{text}</Link>,
            }}
          />
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <FormattedMessage
            id="pages.tools.craftTree"
            values={{
              b: (text) => <b>{text}</b>,
              link: (text) => <Link href="/tools/craft-tree">{text}</Link>,
            }}
          />
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <FormattedMessage
            id="pages.tools.forgeName"
            values={{
              b: (text) => <b>{text}</b>,
              link: (text) => <Link href="/tools/nidavellir">{text}</Link>,
            }}
          />
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <FormattedMessage
            id="pages.tools.wind"
            values={{
              b: (text) => <b>{text}</b>,
              link: (text) => <Link href="/tools/wind">{text}</Link>,
            }}
          />
        </Typography>
      </Container>
      <ArchiveFooter />
    </>
  );
}
