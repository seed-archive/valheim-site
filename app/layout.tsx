import { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

import { SharedAnalytics } from "@seed-archive/ui/analytics";

import { Providers } from "@/components/providers/providers";
import { BASE_PATH, SHARED_ANALYTICS } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:5020${BASE_PATH}`,
  ),
  title: "Valheim seeds — Seed Archive",
  alternates: { canonical: "/" },
  description: "Valheim worlds computed from their seeds.",
  openGraph: {
    siteName: "Seed Archive",
    type: "website",
  },
};

export default function RootLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <Providers>{children}</Providers>
        <SharedAnalytics basePath={BASE_PATH} endpoint={SHARED_ANALYTICS} />
      </body>
    </html>
  );
}
