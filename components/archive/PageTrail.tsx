"use client";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import type { ReactNode } from "react";

export interface PageStep {
  name: ReactNode;
  href?: string;
}

// The way back up: Home › menu item › page. The last step has no link.
export function PageTrail(props: { steps: PageStep[] }) {
  const { steps } = props;
  return (
    <Breadcrumbs sx={{ mb: 2 }}>
      {steps.map((step, index) =>
        step.href ? (
          <MuiLink
            key={index}
            component={Link}
            href={step.href}
            color="inherit"
            underline="hover"
          >
            {step.name}
          </MuiLink>
        ) : (
          <Typography key={index} color="text.primary">
            {step.name}
          </Typography>
        ),
      )}
    </Breadcrumbs>
  );
}
