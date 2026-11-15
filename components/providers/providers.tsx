"use client";

import { PropsWithChildren } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { LocalizationProvider } from "@/components/providers/LocalizationProvider";
import { theme } from "@/components/providers/theme";
import { EnabledLanguages, i18n } from "@/lib/i18n";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AppRouterCacheProvider options={{ key: "css", enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider i18n={i18n} defaultLanguage={EnabledLanguages.EN}>
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};
