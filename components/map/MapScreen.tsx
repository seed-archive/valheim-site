"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";

import { ArchiveBar } from "@/components/archive/ArchiveBar";

// The map page: the map fills everything under the header, its controls sit on
// it, and there is no footer (the owner, 2026-11-15, as valheim.tools does it;
// the coordinator allowed the exception: seed-archive/docs/seo.md, Header and footer).
export function MapScreen() {
  return (
    <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
      <ArchiveBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.200",
        }}
      >
        <Typography color="text.secondary">
          <FormattedMessage id="pages.map.placeholder" />
        </Typography>
      </Box>
    </Box>
  );
}
