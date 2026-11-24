import type { ReactNode } from "react";

import Link from "@/components/LocaleLink";
import { creatureHref, recipeHref } from "@/lib/valheim/recipes";

// An item's name (or a creature's, with `creature`), linked to its row in the
// catalogue when a page draws one; plain text when none does, never a link to
// a row that is not there.
export function RowLink(props: {
  item: string;
  creature?: boolean;
  children: ReactNode;
}) {
  const href = props.creature
    ? creatureHref(props.item)
    : recipeHref(props.item);
  return href ? (
    <Link href={href}>{props.children}</Link>
  ) : (
    <>{props.children}</>
  );
}
