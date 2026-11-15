"use client";

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
        <Typography color="text.secondary">
          <FormattedMessage id="pages.home.lead" />
        </Typography>
      </Container>
      <ArchiveFooter />
    </>
  );
}
