import type { Metadata } from "next";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

import NotFoundPage from "@/app/[lang]/not-found";
import { Providers } from "@/components/providers/providers";
import { manrope } from "@/lib/font";
import { INTL_LOCALE, MESSAGES } from "@/lib/i18n";
import { DEFAULT_LOCALE } from "@/lib/i18n/locales";

// An address no route of the section answers, a language the archive does not
// have among them (D20: /valheim/fr/… is 404). The root layout sits under
// [lang], so this page brings its own document, in English.
export const metadata: Metadata = {
  title: "Page not found — Seed Archive",
};

export default function GlobalNotFound() {
  return (
    <html
      lang={DEFAULT_LOCALE}
      className={manrope.variable}
      suppressHydrationWarning
    >
      <body>
        <InitColorSchemeScript attribute="class" />
        <Providers tag={INTL_LOCALE.en} messages={MESSAGES.en}>
          <NotFoundPage />
        </Providers>
      </body>
    </html>
  );
}
