"use client";

import GlobalStyles from "@mui/material/GlobalStyles";
import { Providers as SharedProviders } from "@seed-archive/ui/providers";
import { PropsWithChildren } from "react";

import { BAR } from "@/components/catalog/BiomeSections";
import { getBrowserSupabase } from "@/lib/db/supabase.browser";
import { EnabledLanguages, i18n } from "@/lib/i18n";

// A jump to an anchor stops below the sticky header, with a little air (the
// owner, 2026-11-23: a heading or a row the address names hid under it). One
// rule for every anchor of the section: the header is the only line that
// sticks.
const AIR = 8;
const anchors = (
  <GlobalStyles
    styles={(theme) => ({
      html: {
        scrollPaddingTop: BAR.xs + AIR,
        [theme.breakpoints.up("sm")]: { scrollPaddingTop: BAR.sm + AIR },
      },
    })}
  />
);

// The archive's shared providers (theme, localization, notices, sign-in) with
// this section's messages and database.
export const Providers = ({ children }: PropsWithChildren) => (
  <SharedProviders
    i18n={i18n}
    defaultLanguage={EnabledLanguages.EN}
    getSupabase={getBrowserSupabase}
    googleClientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
  >
    {anchors}
    {children}
  </SharedProviders>
);
