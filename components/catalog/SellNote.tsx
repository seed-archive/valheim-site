import Link from "@/components/LocaleLink";
import { serverIntl } from "@/lib/i18n/server";
import traders from "@/lib/valheim/traders.json";

// What any trader pays for each valuable, coins apiece (the Valheim
// generator: every item with a value).
const VALUE = new Map(traders.valuables.map((v) => [v.key, v.value]));

// Whether a trader buys this item.
export const sells = (item: string) => VALUE.has(item);

// After an item a trader buys: what it sells for, linked to its row on the
// traders page. Nothing for an item no trader buys.
export async function SellNote(props: { item: string }) {
  const value = VALUE.get(props.item);
  if (value === undefined) {
    return null;
  }
  const intl = await serverIntl();
  return (
    <>
      {" "}
      <Link href={`/guides/basics/traders#sell-${props.item.toLowerCase()}`}>
        {intl.format("pages.traders.sellsFor", { value })}
      </Link>
    </>
  );
}
