"use client";

import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";

// The archive's one header (D15): "Seed Archive", a plain link to the domain's
// root (another zone, so not next/link), then the game's name, a link to this
// section's home, then the section's own menu.
export function ArchiveBar() {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider" }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            gap: 1,
            flexGrow: 1,
            minWidth: 0,
          }}
        >
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{ color: "inherit", textDecoration: "none", flexShrink: 0 }}
          >
            <FormattedMessage id="archive.title" />
          </Typography>
          <Typography variant="h6" color="text.secondary" aria-hidden>
            /
          </Typography>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            noWrap
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            <FormattedMessage id="archive.game" />
          </Typography>
        </Box>
        <Button component={Link} href="/map" color="inherit">
          <FormattedMessage id="archive.map" />
        </Button>
      </Toolbar>
    </AppBar>
  );
}
