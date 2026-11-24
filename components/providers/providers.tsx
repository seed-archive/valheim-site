"use client";

import GlobalStyles from "@mui/material/GlobalStyles";
import { Providers as SharedProviders } from "@seed-archive/ui/providers";
import { PropsWithChildren } from "react";

import { getBrowserSupabase } from "@/lib/db/supabase.browser";
import type { NestedMessages } from "@/lib/i18n";

// The shared header's height (Material UI's toolbar: 56 px on a phone, 64 px
// wider): an anchor scrolls below it.
const BAR = { xs: 56, sm: 64 };

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
// this section's messages in the page's language, and its database. The
// shared provider formats in the language it is keyed by, so the messages go
// under the language's Intl tag (en-GB for English). The server layout passes
// only the page's language's messages, so no other language reaches the
// browser.
export function Providers({
  children,
  tag,
  messages,
}: PropsWithChildren<{ tag: string; messages: NestedMessages }>) {
  return (
    <SharedProviders
      i18n={{ [tag]: messages }}
      defaultLanguage={tag}
      getSupabase={getBrowserSupabase}
      googleClientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
    >
      {anchors}
      {children}
    </SharedProviders>
  );
}
