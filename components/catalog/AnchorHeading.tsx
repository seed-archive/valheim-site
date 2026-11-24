import { AnchorHeading as SharedAnchorHeading } from "@seed-archive/ui/anchor-heading";
import type { TypographyProps } from "@mui/material/Typography";
import type { ReactNode } from "react";

import { serverIntl } from "@/lib/i18n/server";

// The shared anchor heading (`@seed-archive/ui`: a chain icon, a click copies
// the section's address) with this section's "Link copied".
export async function AnchorHeading(props: {
  id: string;
  children: ReactNode;
  sx?: TypographyProps["sx"];
}) {
  const intl = await serverIntl();
  return (
    <SharedAnchorHeading
      id={props.id}
      sx={props.sx}
      copied={intl.format("pages.crafting.copied")}
    >
      {props.children}
    </SharedAnchorHeading>
  );
}
