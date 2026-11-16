"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NextLink from "next/link";
import { FormattedMessage } from "react-intl";

// The game's footer (D12): its own sections, and the archive's legal pages,
// which live in the portal at the domain's root (plain links).
export function ArchiveFooter() {
  return (
    <Box
      component="footer"
      sx={{ borderTop: 1, borderColor: "divider", py: 3 }}
    >
      <Container>
        <Stack direction="row" spacing={3}>
          <Link component={NextLink} href="/tools/map" color="inherit">
            <FormattedMessage id="archive.map" />
          </Link>
          <Link component={NextLink} href="/bugs" color="inherit">
            <FormattedMessage id="archive.bugs" />
          </Link>
          <Link href="/privacy" color="inherit">
            <FormattedMessage id="archive.privacy" />
          </Link>
          <Link href="/terms" color="inherit">
            <FormattedMessage id="archive.terms" />
          </Link>
          <Link href="/release-notes" color="inherit">
            <FormattedMessage id="archive.releaseNotes" />
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
