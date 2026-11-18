import Link from "next/link";

import { serverFormat } from "@/lib/i18n/server";
import traders from "@/lib/valheim/traders.json";

// What any trader pays for each valuable, coins apiece (the Valheim
// generator: every item with a value).
const VALUE = new Map(traders.valuables.map((v) => [v.key, v.value]));

// After an item a trader buys: what it sells for, linked to its row on the
// traders page. Nothing for an item no trader buys.
export function SellNote(props: { item: string }) {
  const value = VALUE.get(props.item);
  if (value === undefined) {
    return null;
  }
  return (
    <>
      {" "}
      <Link href={`/catalog/traders#sell-${props.item.toLowerCase()}`}>
        {serverFormat("pages.traders.sellsFor", { value })}
      </Link>
    </>
  );
}
