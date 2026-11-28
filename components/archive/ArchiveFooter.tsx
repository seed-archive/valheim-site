"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { FormattedMessage } from "react-intl";

import NextLink from "@/components/LocaleLink";
import { localePath } from "@/lib/i18n/locales";
import generator from "@/lib/valheim/generator.json";

// The game's footer (D12): its own sections, and the archive's legal pages,
// which live in the portal at the domain's root (plain links), in the page's
// language (D20).
export function ArchiveFooter() {
  const { lang } = useParams<{ lang?: string }>();
  const portal = (path: string) => localePath(lang, path);
  return (
    <Box
      component="footer"
      sx={{ borderTop: 1, borderColor: "divider", py: 3 }}
    >
      <Container>
        <Stack direction="row" spacing={3} useFlexGap sx={{ flexWrap: "wrap" }}>
          <Link component={NextLink} href="/tools/map" color="inherit">
            <FormattedMessage id="archive.map" />
          </Link>
          <Link component={NextLink} href="/bugs" color="inherit">
            <FormattedMessage id="archive.bugs" />
          </Link>
          <Link href={portal("/privacy")} color="inherit">
            <FormattedMessage id="archive.privacy" />
          </Link>
          <Link href={portal("/terms")} color="inherit">
            <FormattedMessage id="archive.terms" />
          </Link>
          <Link href={portal("/release-notes")} color="inherit">
            <FormattedMessage id="archive.releaseNotes" />
          </Link>
          <Link href={portal("/support")} color="inherit">
            <FormattedMessage id="archive.support" />
          </Link>
        </Stack>
        {/* The game version the section's data is read from (the owner,
            2026-11-28), written by the Valheim generator. */}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          <FormattedMessage
            id="archive.gameVersion"
            values={{ version: generator.gameVersion }}
          />
        </Typography>
      </Container>
    </Box>
  );
}
