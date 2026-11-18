"use client";

import { Providers as SharedProviders } from "@seed-archive/ui/providers";
import { PropsWithChildren } from "react";

import { getBrowserSupabase } from "@/lib/db/supabase.browser";
import { EnabledLanguages, i18n } from "@/lib/i18n";

// The archive's shared providers (theme, localization, notices, sign-in) with
// this section's messages and database.
export const Providers = ({ children }: PropsWithChildren) => (
  <SharedProviders
    i18n={i18n}
    defaultLanguage={EnabledLanguages.EN}
    getSupabase={getBrowserSupabase}
    googleClientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
  >
    {children}
  </SharedProviders>
);
