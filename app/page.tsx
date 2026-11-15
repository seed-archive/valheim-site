"use client";

import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";

export default function Home() {
  return (
    <>
      <ArchiveBar />
      <Container component="main" sx={{ py: 6, minHeight: "70vh" }}>
        <Typography variant="h3" component="h1" gutterBottom>
          <FormattedMessage id="pages.home.title" />
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          <FormattedMessage id="pages.home.lead" />
        </Typography>
        <Typography>
          <FormattedMessage
            id="pages.home.toMap"
            values={{ link: (text) => <Link href="/map">{text}</Link> }}
          />
        </Typography>
      </Container>
      <ArchiveFooter />
    </>
  );
}
