"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { PageTrail } from "@/components/archive/PageTrail";

// The Guides menu item's index: every guide of the section, each in a sentence.
export function GuidesIndex() {
  return (
    <>
      <ArchiveBar />
      <Container component="main" sx={{ py: 6, minHeight: "70vh" }}>
        <PageTrail
          steps={[
            { name: <FormattedMessage id="archive.home" />, href: "/" },
            { name: <FormattedMessage id="archive.guides" /> },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          <FormattedMessage id="pages.guides.title" />
        </Typography>
        <Typography>
          <FormattedMessage
            id="pages.guides.start"
            values={{
              b: (text) => <b>{text}</b>,
              link: (text) => <Link href="/guides/start">{text}</Link>,
            }}
          />
        </Typography>
      </Container>
      <ArchiveFooter />
    </>
  );
}
