import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { SectionLinks } from "@/components/catalog/SectionLinks";
import { PageTrail } from "@/components/PageTrail";
import { ItemIcon } from "@/components/catalog/ItemIcon";
import { RowLink } from "@/components/catalog/RowLink";
import Link from "@/components/LocaleLink";
import { serverIntl, type ServerIntl, type Values } from "@/lib/i18n/server";
import type { GameName } from "@/lib/i18n/game-names";
import { gameNames } from "@/lib/i18n/names";
import { pageMetadata } from "@/lib/metadata";
import traders from "@/lib/valheim/traders.json";
import { USED_IN } from "@/lib/valheim/used-in";

export function generateMetadata() {
  return pageMetadata("pages.traders.meta", "/database/world/traders");
}

// The game's whole description of most valuables (`traders.json` text): it
// says nothing the table does not, so the page leaves it out.
const BARE_VALUABLE = "Valuable";

// The page's words, in the page's language.
const words = (intl: ServerIntl) => (id: string, values?: Values) =>
  intl.format(`pages.traders.${id}`, values);

// What each item goes into (`lib/valheim/used-in.ts`).
const usedIn = USED_IN;

type Good = (typeof traders.traders)[number]["goods"][number];

// When a good appears: always, after a boss, or after a step of Hildir's
// quest (a key the page words itself).
function appears(g: Good, name: GameName, intl: ServerIntl) {
  const t = words(intl);
  if (!g.requires) {
    return t("always");
  }
  if (g.boss) {
    return t("afterBoss", { boss: name(g.boss) });
  }
  const id = `pages.traders.requires.${g.requires}`;
  return intl.has(id) ? intl.format(id) : g.requires;
}

// "Goes into" and the items, joined as the language joins a list of parts.
const goesInto = (items: ReactNode[], intl: ServerIntl) =>
  intl.rich("pages.traders.goesInto", {
    b: (chunks) => <b>{chunks}</b>,
    items: intl.list(items, "unit"),
  });

// What a good is for, the use first: what wearing it does, what it goes into
// (and what that becomes: a mead base in the fermenter), what it places when
// it is a build tool; then the game's own words.
function forWhat(g: Good, name: GameName, intl: ServerIntl) {
  const t = words(intl);
  const parts: ReactNode[] = [];
  if (g.carry) {
    parts.push(<b key="carry">{t("carry", { weight: g.carry })}</b>);
  } else if (g.effect) {
    parts.push(<b key="effect">{name(g.effect)}</b>);
  }
  if (g.armor) {
    parts.push(<span key="armor">{t("armor", { armor: g.armor })}</span>);
  }
  if (g.places > 0) {
    parts.push(
      <b key="places">
        {intl.rich("pages.traders.places", {
          count: g.places,
          link: (chunks) => (
            <Link href="/database/food/food#feasts">{chunks}</Link>
          ),
        })}
      </b>,
    );
  }
  if (g.usedIn.length > 0) {
    parts.push(
      <span key="into">
        {goesInto(
          g.usedIn.map((u) => (
            <span key={u.key}>
              <RowLink item={u.key}>{name(u.name)}</RowLink>
              {u.then ? (
                <>
                  {" → "}
                  <RowLink item={u.then.key}>{name(u.then.name)}</RowLink>
                </>
              ) : null}
            </span>
          )),
          intl,
        )}
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
        {name(g.text)}
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
function hildirQuest(name: GameName, intl: ServerIntl) {
  const t = words(intl);
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
                  <ItemIcon item={q.chest}>{name(q.chestName)}</ItemIcon>
                </TableCell>
                <TableCell>{name(q.dungeon)}</TableCell>
                <TableCell>
                  {q.biome
                    ? intl.format(`pages.crafting.biome.${q.biome}`)
                    : "—"}
                </TableCell>
                <TableCell>{name(q.guard)}</TableCell>
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

export default async function TradersPage() {
  const name = await gameNames();
  const intl = await serverIntl();
  const t = words(intl);
  // A valuable's own text in the page's language, unless it is the bare
  // "Valuable" the whole table already says.
  const valuableText = (text: string) =>
    text === BARE_VALUABLE ? "" : name(text);
  return (
    <>
      <ArchiveBar />
      <Container
        component="main"
        maxWidth="lg"
        sx={{ py: 6, minHeight: "70vh" }}
      >
        <SectionLinks>
          <PageTrail crumb="archive.guideTraders" />
          <Typography variant="h3" component="h1" gutterBottom>
            {t("title")}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            <b>{t("question")}</b> {t("answer")}
          </Typography>

          {traders.traders.map((trader) => (
            <section key={trader.key}>
              <Typography
                variant="h4"
                component="h2"
                id={trader.key.toLowerCase()}
                sx={{ mt: 5, mb: 1 }}
              >
                {name(trader.name)}
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
                              {name(g.name)}
                              {g.stack > 1 ? ` × ${g.stack}` : ""}
                            </ItemIcon>
                          </TableCell>
                          <TableCell align="right">{g.price}</TableCell>
                          <TableCell>{appears(g, name, intl)}</TableCell>
                          <TableCell>{forWhat(g, name, intl)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              {trader.key === "Hildir" ? hildirQuest(name, intl) : null}
              {trader.key === "BogWitch" ? (
                <Typography sx={{ mt: 2 }}>{t("writhan")}</Typography>
              ) : null}
            </section>
          ))}

          <Typography
            variant="h4"
            component="h2"
            id="sell"
            sx={{ mt: 5, mb: 1 }}
          >
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
                      <ItemIcon item={v.key}>{name(v.name)}</ItemIcon>
                    </TableCell>
                    <TableCell align="right">{v.value}</TableCell>
                    <TableCell>
                      {(usedIn.get(v.key) ?? []).length === 0 ? (
                        <b>{t("currency")} </b>
                      ) : null}
                      {/* The game's text; when it ends with no full stop, one
                        is added before the next sentence. */}
                      {valuableText(v.text)}
                      {valuableText(v.text) &&
                      !/[.!?]$/.test(valuableText(v.text))
                        ? "."
                        : ""}
                      {(usedIn.get(v.key) ?? []).length > 0 ? (
                        <>
                          {" "}
                          {goesInto(
                            (usedIn.get(v.key) ?? []).map((u) => (
                              <RowLink key={u.key} item={u.key}>
                                {name(u.name)}
                              </RowLink>
                            )),
                            intl,
                          )}
                          .
                        </>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* The runner's shelf comes last: the page is the usual player's, and
            the Speedrun guide links here (`#buy`). */}
          <Typography
            variant="h4"
            component="h2"
            id="buy"
            sx={{ mt: 5, mb: 1 }}
          >
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
                              {name(one.name)}
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
                                  title={name(good.name)}
                                >
                                  <ItemIcon item={good.key ?? ""} />
                                </Link>
                              ))}
                            </Box>
                            {t(`essential.row.${row}`)}
                          </>
                        )}
                      </TableCell>
                      <TableCell>{name(trader)}</TableCell>
                      <TableCell align="right">{price}</TableCell>
                      <TableCell>
                        {one
                          ? appears(one, name, intl)
                          : intl.list(
                              goods
                                .map(({ good }) => appears(good, name, intl))
                                .filter((x, i, a) => a.indexOf(x) === i),
                              "unit",
                            )}
                      </TableCell>
                      <TableCell>
                        {one
                          ? forWhat(one, name, intl)
                          : t(`essential.for.${row}`)}
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
        </SectionLinks>
      </Container>
      <ArchiveFooter />
    </>
  );
}
