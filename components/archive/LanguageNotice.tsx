"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import { LANGUAGE_KEY } from "@seed-archive/ui/language-switcher";

import { BASE_PATH } from "@/lib/site";

// The notice that offers this page in the browser's language (the portal's
// D20): never a redirect, only an offer, shown when the reader has not chosen
// a language yet (the one key of the whole domain, LANGUAGE_KEY). Each offer
// is written in its own language, so a reader who cannot read the page's can
// read it. Taking the offer or closing it is the choice, kept for every
// section.
export function LanguageNotice(props: { offers: Record<string, string> }) {
  const { lang } = useParams<{ lang?: string }>();
  const pathname = usePathname();
  const [offer, setOffer] = useState<string | null>(null);

  useEffect(() => {
    let chosen: string | null = null;
    try {
      chosen = window.localStorage.getItem(LANGUAGE_KEY);
    } catch {
      return;
    }
    if (chosen) {
      return;
    }
    const wanted = navigator.languages
      .map((l) => l.slice(0, 2).toLowerCase())
      .find((l) => l in props.offers);
    if (wanted && wanted !== lang) {
      // The browser's language is read only in the browser, after the page
      // is drawn, so the notice appears then.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOffer(wanted);
    }
  }, [lang, props.offers]);

  const choose = (value: string) => {
    try {
      window.localStorage.setItem(LANGUAGE_KEY, value);
    } catch {
      // A choice that cannot be kept is asked again next time.
    }
  };

  if (!offer || !lang) {
    return null;
  }
  const href = `${BASE_PATH}/${offer}${pathname.replace(/^\/[^/]+/, "")}`;
  return (
    <Alert
      severity="info"
      lang={offer}
      onClose={() => {
        choose(lang);
        setOffer(null);
      }}
      sx={{ borderRadius: 0 }}
    >
      <Link href={href} onClick={() => choose(offer)}>
        {props.offers[offer]}
      </Link>
    </Alert>
  );
}
