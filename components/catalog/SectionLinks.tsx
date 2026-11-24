import type { ReactNode } from "react";

import { serverIntl } from "@/lib/i18n/server";
import { AnchorHeadings } from "@seed-archive/ui/anchor-heading";

// A catalogue page's content with every section heading (an h2 with an id)
// turned into its own link, copied on a click: the same as the pages built
// with AnchorHeading and the guides (the owner, 2026-11-23).
export async function SectionLinks(props: { children: ReactNode }) {
  const intl = await serverIntl();
  return (
    <AnchorHeadings copied={intl.format("pages.crafting.copied")}>
      {props.children}
    </AnchorHeadings>
  );
}
