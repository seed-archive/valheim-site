"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { nameIn, type GameName, type NameTable } from "@/lib/i18n/game-names";

// Each language's table loads on its own, only on a page in that language:
// English has none, so an English page and the bundle carry nothing.
const LOADERS: Record<string, () => Promise<{ default: NameTable }>> = {
  ru: () => import("@/lib/valheim/names/ru.json"),
  es: () => import("@/lib/valheim/names/es.json"),
  de: () => import("@/lib/valheim/names/de.json"),
};

// The tables loaded so far, shared by every component of the page.
const loaded: Record<string, NameTable> = {};

// The game's names in the page's language, for a client component; English
// until the language's table has loaded.
export function useGameName(): GameName {
  const { lang = "" } = useParams<{ lang?: string }>();
  const [table, setTable] = useState<NameTable | undefined>(loaded[lang]);
  useEffect(() => {
    const load = LOADERS[lang];
    if (!load) {
      return;
    }
    let live = true;
    load().then((m) => {
      loaded[lang] = m.default;
      if (live) {
        setTable(m.default);
      }
    });
    return () => {
      live = false;
    };
  }, [lang]);
  return useCallback((english: string) => nameIn(table, english), [table]);
}
