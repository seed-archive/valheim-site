import type { Metadata } from "next";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

import { SharedAnalytics } from "@seed-archive/ui/analytics";

import { flattenMessages } from "@seed-archive/ui/localization";

import { LanguageNotice } from "@/components/archive/LanguageNotice";
import { Providers } from "@/components/providers/providers";
import { alternates, SECTION_URL } from "@/lib/alternates";
import { manrope } from "@/lib/font";
import { INTL_LOCALE, MESSAGES, messagesLocale } from "@/lib/i18n";
import { PUBLISHED } from "@/lib/i18n/locales";
import { serverIntl } from "@/lib/i18n/server";
import { BASE_PATH, SHARED_ANALYTICS } from "@/lib/site";

// Every published language is built ahead; any other first segment is no page
// of the section (D20: a language the archive does not have is 404).
export const generateStaticParams = () => PUBLISHED.map((lang) => ({ lang }));
export const dynamicParams = false;

// The section in the page's language is the base of every relative address of
// the metadata: a page's canonical "/tools/wind" is /valheim/<lang>/tools/wind,
// its own address, never the English one (D20).
export async function generateMetadata(
  props: LayoutProps<"/[lang]">,
): Promise<Metadata> {
  const { lang } = await props.params;
  const intl = await serverIntl();
  return {
    metadataBase: new URL(`${SECTION_URL}/${lang}`),
    title: intl.format("pages.home.meta.title"),
    description: intl.format("pages.home.meta.description"),
    // The home page's (a client page, it sets no metadata); every other page
    // sets its own.
    alternates: alternates("/", lang),
    openGraph: {
      siteName: intl.format("archive.title"),
      type: "website",
    },
  };
}

// The offer of each published language, in its own words, for the notice
// that offers the browser's language (D20).
const OFFERS: Record<string, string> = Object.fromEntries(
  PUBLISHED.map((l) => [
    l,
    flattenMessages(MESSAGES[messagesLocale(l)])["archive.languageOffer"],
  ]),
);

export default async function RootLayout(props: LayoutProps<"/[lang]">) {
  const { children, params } = props;
  const { lang } = await params;

  return (
    <html lang={lang} className={manrope.variable} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <Providers
          tag={INTL_LOCALE[messagesLocale(lang)]}
          messages={MESSAGES[messagesLocale(lang)]}
        >
          <LanguageNotice offers={OFFERS} />
          {children}
        </Providers>
        <SharedAnalytics basePath={BASE_PATH} endpoint={SHARED_ANALYTICS} />
      </body>
    </html>
  );
}
