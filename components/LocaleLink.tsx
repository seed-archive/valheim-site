"use client";

import NextLink from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps } from "react";

import { localePath } from "@/lib/i18n/locales";

// next/link in the page's own language: a path of the section written as
// "/tools/map" leads to "/<lang>/tools/map" (D20), so no page writes the
// language into its links.
export default function LocaleLink(props: ComponentProps<typeof NextLink>) {
  const { href, ...rest } = props;
  const { lang } = useParams<{ lang?: string }>();
  return (
    <NextLink
      href={typeof href === "string" ? localePath(lang, href) : href}
      {...rest}
    />
  );
}
