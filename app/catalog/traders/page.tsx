import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { PageTrail } from "@seed-archive/ui/page-trail";
import { ItemIcon } from "@/components/catalog/ItemIcon";
import { RowLink } from "@/components/catalog/RowLink";
import { serverFormat, serverMessages } from "@/lib/i18n/server";
import crafting from "@/lib/valheim/crafting.json";
import traders from "@/lib/valheim/traders.json";

export const metadata: Metadata = {
  title: "What to buy from the traders in Valheim — Seed Archive",
  description:
    "Everything Haldor, Hildir and the Bog Witch sell: the price, the boss that unlocks it, and what each item is for.",
  alternates: { canonical: "/catalog/traders" },
};

const t = (id: string, values?: Record<string, string | number>) =>
  serverFormat(`pages.traders.${id}`, values);

// What each item goes into: every recipe and build piece that takes it.
const usedIn = new Map<string, { key: string; name: string }[]>();
for (const r of [...crafting.gear, ...crafting.building]) {
  for (const m of r.resources) {
    const list = usedIn.get(m.key) ?? [];
    if (!list.some((x) => x.key === r.key)) {
      list.push({ key: r.key, name: r.name });
    }
    usedIn.set(m.key, list);
  }
}

type Good = (typeof traders.traders)[number]["goods"][number];

// When a good appears: always, after a boss, or after a step of Hildir's
// quest (a key the page words itself).
function appears(g: Good) {
  if (!g.requires) {
    return t("always");
  }
  if (g.boss) {
    return t("afterBoss", { boss: g.boss });
  }
  const id = `pages.traders.requires.${g.requires}`;
  return id in serverMessages ? serverFormat(id) : g.requires;
}

// What a good is for, the use first: what wearing it does, what it goes into
// (and what that becomes: a mead base in the fermenter), what it places when
// it is a build tool; then the game's own words.
function forWhat(g: Good) {
  const parts: ReactNode[] = [];
  if (g.carry) {
    parts.push(<b key="carry">{t("carry", { weight: g.carry })}</b>);
  } else if (g.effect) {
    parts.push(<b key="effect">{g.effect}</b>);
  }
  if (g.armor) {
    parts.push(<span key="armor">{t("armor", { armor: g.armor })}</span>);
  }
  if (g.places > 0) {
    parts.push(
      <b key="places">
        {t("places", { count: g.places })}{" "}
        <Link href="/catalog/food#feasts">{t("placesWhat")}</Link>
      </b>,
    );
  }
  if (g.usedIn.length > 0) {
    parts.push(
      <span key="into">
        <b>{t("goesInto")}</b>{" "}
        {g.usedIn.map((u, i) => (
          <span key={u.key}>
            {i > 0 ? ", " : ""}
            <RowLink item={u.key}>{u.name}</RowLink>
            {u.then ? (
              <>
                {" → "}
                <RowLink item={u.then.key}>{u.then.name}</RowLink>
              </>
            ) : null}
          </span>
        ))}
      </span>,
    );
  }
  if (g.text) {
    parts.push(
      <Typography
        key="text"
        component="span"
        variant="body2"
        color="text.secondary"
      >
        {g.text}
      </Typography>,
    );
  }
  return parts.map((p, i) => (
    <span key={i}>
      {i > 0 ? ". " : ""}
      {p}
    </span>
  ));
}

// What a run buys (the Valheim generator marks them; the owner's list), one
// row each: the serving tray, the spices of the feasts (seven, one row), the
// squirrel hamstring, Megingjord, the two inventory rows (one row).
const ROW_ORDER = ["tray", "spices", "hamstring", "belt", "pockets"];
const essentials = ROW_ORDER.map((row) => {
  const goods = traders.traders.flatMap((x) =>
    x.goods
      .filter((g) => g.essential === row)
      .map((good) => ({ trader: x.name ?? x.key, good })),
  );
  return {
    row,
    goods,
    trader: goods[0]?.trader ?? "",
    price: goods.reduce((s, e) => s + e.good.price, 0),
  };
}).filter((r) => r.goods.length > 0);
const essentialCoins = essentials.reduce((s, r) => s + r.price, 0);

// Hildir's quest: her three chests, each in a dungeon of its own and dropped
// by its guard; each brought back opens more of her goods.
function hildirQuest() {
  return (
    <>
      <Typography
        variant="h5"
        component="h3"
        id="hildir-quest"
        sx={{ mt: 3, mb: 1 }}
      >
        {t("quest.title")}
      </Typography>
      <Typography sx={{ mb: 2 }}>{t("quest.text")}</Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{t("quest.head.chest")}</TableCell>
              <TableCell>{t("quest.head.dungeon")}</TableCell>
              <TableCell>{t("quest.head.biome")}</TableCell>
              <TableCell>{t("quest.head.guard")}</TableCell>
              <TableCell align="right">{t("quest.head.health")}</TableCell>
              <TableCell align="right">{t("quest.head.opens")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {traders.hildir.map((q) => (
              <TableRow key={q.chest}>
                <TableCell>
                  <ItemIcon item={q.chest}>{q.chestName}</ItemIcon>
                </TableCell>
                <TableCell>{q.dungeon}</TableCell>
                <TableCell>
                  {q.biome
                    ? serverFormat(`pages.crafting.biome.${q.biome}`)
                    : "—"}
                </TableCell>
                <TableCell>{q.guard}</TableCell>
                <TableCell align="right">{q.health}</TableCell>
                <TableCell align="right">{q.opens}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default function TradersPage() {
  return (
    <>
      <ArchiveBar />
      <Container
        component="main"
        maxWidth="lg"
        sx={{ py: 6, minHeight: "70vh" }}
      >
        <PageTrail
          steps={[
            { name: serverFormat("archive.home"), href: "/" },
            { name: serverFormat("archive.catalog"), href: "/catalog" },
            { name: serverFormat("archive.guideTraders") },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          {t("title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>{t("question")}</b> {t("answer")}
        </Typography>

        <Typography variant="h4" component="h2" id="buy" sx={{ mt: 5, mb: 1 }}>
          {t("essential.title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          {t("essential.text", { coins: essentialCoins })}
        </Typography>
        <TableContainer sx={{ mb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t("head.item")}</TableCell>
                <TableCell>{t("head.trader")}</TableCell>
                <TableCell align="right">{t("head.price")}</TableCell>
                <TableCell>{t("head.appears")}</TableCell>
                <TableCell>{t("head.for")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {essentials.map(({ row, goods, trader, price }) => {
                const one = goods.length === 1 ? goods[0].good : null;
                return (
                  <TableRow key={row}>
                    <TableCell>
                      {one ? (
                        <ItemIcon item={one.key ?? ""}>
                          <Link href={`#${one.key?.toLowerCase()}`}>
                            {one.name}
                          </Link>
                          {one.stack > 1 ? ` × ${one.stack}` : ""}
                        </ItemIcon>
                      ) : (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.5,
                              mb: 0.5,
                            }}
                          >
                            {goods.map(({ good }) => (
                              <Link
                                key={good.key}
                                href={`#${good.key?.toLowerCase()}`}
                                title={good.name ?? ""}
                              >
                                <ItemIcon item={good.key ?? ""} />
                              </Link>
                            ))}
                          </Box>
                          {t(`essential.row.${row}`)}
                        </>
                      )}
                    </TableCell>
                    <TableCell>{trader}</TableCell>
                    <TableCell align="right">{price}</TableCell>
                    <TableCell>
                      {one
                        ? appears(one)
                        : goods
                            .map(({ good }) => appears(good))
                            .filter((x, i, a) => a.indexOf(x) === i)
                            .join(", ")}
                    </TableCell>
                    <TableCell>
                      {one ? forWhat(one) : t(`essential.for.${row}`)}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={2}>
                  <b>{t("essential.total")}</b>
                </TableCell>
                <TableCell align="right">
                  <b>{essentialCoins}</b>
                </TableCell>
                <TableCell colSpan={2} />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {traders.traders.map((trader) => (
          <section key={trader.key}>
            <Typography
              variant="h4"
              component="h2"
              id={trader.key.toLowerCase()}
              sx={{ mt: 5, mb: 1 }}
            >
              {trader.name}
            </Typography>
            <Typography sx={{ mb: 2 }}>{t(`about.${trader.key}`)}</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{t("head.item")}</TableCell>
                    <TableCell align="right">{t("head.price")}</TableCell>
                    <TableCell>{t("head.appears")}</TableCell>
                    <TableCell>{t("head.for")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trader.goods.map((g) => {
                    return (
                      <TableRow key={g.key} id={g.key?.toLowerCase()}>
                        <TableCell sx={{ whiteSpace: "nowrap" }}>
                          <ItemIcon item={g.key ?? ""}>
                            {g.name}
                            {g.stack > 1 ? ` × ${g.stack}` : ""}
                          </ItemIcon>
                        </TableCell>
                        <TableCell align="right">{g.price}</TableCell>
                        <TableCell>{appears(g)}</TableCell>
                        <TableCell>{forWhat(g)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {trader.key === "Hildir" ? hildirQuest() : null}
            {trader.key === "BogWitch" ? (
              <Typography sx={{ mt: 2 }}>{t("writhan")}</Typography>
            ) : null}
          </section>
        ))}

        <Typography variant="h4" component="h2" id="sell" sx={{ mt: 5, mb: 1 }}>
          {t("sell.title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>{t("sell.text")}</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t("head.item")}</TableCell>
                <TableCell align="right">{t("head.value")}</TableCell>
                <TableCell>{t("head.about")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {traders.valuables.map((v) => (
                <TableRow key={v.key} id={`sell-${v.key.toLowerCase()}`}>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <ItemIcon item={v.key}>{v.name}</ItemIcon>
                  </TableCell>
                  <TableCell align="right">{v.value}</TableCell>
                  <TableCell>
                    {(usedIn.get(v.key) ?? []).length === 0 ? (
                      <b>{t("currency")} </b>
                    ) : null}
                    {v.text}
                    {(usedIn.get(v.key) ?? []).length > 0 ? (
                      <>
                        {" "}
                        {t("goesInto")}{" "}
                        {(usedIn.get(v.key) ?? []).map((u, i) => (
                          <span key={u.key}>
                            {i > 0 ? ", " : ""}
                            <RowLink item={u.key}>{u.name}</RowLink>
                          </span>
                        ))}
                        .
                      </>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <ArchiveFooter />
    </>
  );
}
