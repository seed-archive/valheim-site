import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ChartBlock } from "@seed-archive/ui/chart";
import { chartSpec, type ChartSpec } from "@seed-archive/ui/chart-spec";
import { PageTrail } from "@/components/PageTrail";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { INTL_LOCALE } from "@/lib/i18n";
import { serverIntl, type ServerIntl } from "@/lib/i18n/server";
import { AnchorHeadings } from "@seed-archive/ui/anchor-heading";
import type { Guide } from "@/lib/content";

// A table that gets a chart is followed by a line naming its kind,
// `Chart: share` or `Chart: spread` (the guide forum's marker, the Valheim
// generator's notes → forum.md); the line itself is not shown.
const MARKER = /<p>Chart: (share|spread)<\/p>\s*/g;
// A cell that holds a share: the first percentage of the row. A translated
// guide writes its language's decimal comma (fill.ts), so both signs are read.
const SHARE = /(\d+(?:[.,]\d+)?)\s*%/;
// A cell that holds the middle half of seeds, "low–high" (the generator's
// quartiles), and the number of the cell before it, the median.
const SPREAD = /(-?\d+(?:[.,]\d+)?)\s*–\s*(-?\d+(?:[.,]\d+)?)/;
const NUMBER = /-?\d+(?:[.,]\d+)?/;
const num = (s: string) => Number(s.replace(",", "."));
// A row of a distance in metres: its words end ", m" (the guides' Markdown;
// Russian «м»), and the unit the chart writes in each language.
const METRES = /,\s*[mм]$/;
const METRE: Record<string, string> = { ru: "м" };

// A cell's words: its tags dropped and the entities Markdown writes decoded.
const text = (s: string) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();

// The guides' charts name no thing that has a colour of its own.
const COLORS = { named: {} };

// One marked table's chart, built on the server for the shared ChartBlock.
// Shares: a bar a row on the whole 0–100 % scale, from the row's first
// percentage. Spreads: each row's median and middle half ("low–high", the
// cell after the median) on one axis, so their lengths compare; rows ending
// ", m" are metres.
function tableChart(
  table: string,
  kind: string,
  intl: ServerIntl,
): ChartSpec | null {
  const rows = [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((r) =>
    [...r[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) => text(c[1])),
  );
  if (kind === "share") {
    const shares = rows.flatMap((cells) => {
      const share = cells
        .slice(1)
        .map((c) => SHARE.exec(c))
        .find(Boolean);
      return share ? [{ label: cells[0], share: num(share[1]) }] : [];
    });
    if (shares.length < 2) {
      return null;
    }
    return chartSpec(
      {
        kind: "bars",
        labels: shares.map((r) => r.label),
        series: [{ label: "", values: shares.map((r) => r.share / 100) }],
        format: "share",
        whole: true,
        labelPosition: "above",
        locale: INTL_LOCALE[intl.locale],
        label: intl.list(
          shares.map((r) => r.label),
          "unit",
        ),
      },
      COLORS,
    );
  }
  const spreads = rows.flatMap((cells) => {
    const at = cells.findIndex((c) => SPREAD.test(c));
    const span = at > 1 ? SPREAD.exec(cells[at]) : null;
    const median = span ? NUMBER.exec(cells[at - 1]) : null;
    return span && median
      ? [
          {
            label: cells[0],
            median: num(median[0]),
            low: num(span[1]),
            high: num(span[2]),
          },
        ]
      : [];
  });
  if (spreads.length < 2) {
    return null;
  }
  const metres = spreads.every((r) => METRES.test(r.label));
  const metre = METRE[intl.locale] ?? "m";
  const unit = metres ? ` ${metre}` : "";
  const labels = spreads.map((r) => r.label.replace(METRES, ""));
  // A number as the guide's text writes it (fill.ts): no grouping, the
  // language's decimal sign.
  const plain = new Intl.NumberFormat(INTL_LOCALE[intl.locale], {
    useGrouping: false,
    maximumFractionDigits: 20,
  }).format;
  return chartSpec(
    {
      kind: "spread",
      labels,
      series: [
        {
          label: "",
          values: spreads.map((r) => r.median),
          spans: spreads.map((r) => [r.low, r.high] as [number, number]),
          exact: spreads.map(
            (r) =>
              `${plain(r.median)}${unit} (${plain(r.low)}–${plain(r.high)})`,
          ),
        },
      ],
      format: "number",
      unit: metres ? metre : undefined,
      locale: INTL_LOCALE[intl.locale],
      axis: intl.format("pages.guides.spreadLegend"),
      label: intl.list(labels, "unit"),
    },
    COLORS,
  );
}

// The guide's HTML cut round its marked tables, each table with its chart;
// the markers are dropped.
function markedCharts(
  html: string,
  intl: ServerIntl,
): { html: string; chart?: ChartSpec | null }[] {
  const parts: { html: string; chart?: ChartSpec | null }[] = [];
  let from = 0;
  for (const mark of html.matchAll(MARKER)) {
    const end = html.lastIndexOf("</table>", mark.index) + "</table>".length;
    const start = html.lastIndexOf("<table", end);
    if (start < from) {
      continue;
    }
    const table = html.slice(start, end);
    parts.push(
      { html: html.slice(from, start) },
      { html: table, chart: tableChart(table, mark[1], intl) },
    );
    from = mark.index + mark[0].length;
  }
  parts.push({ html: html.slice(from) });
  return parts;
}

// A guide written in Markdown (`lib/content.ts`): the header, Home › Guides ›
// the page, its h1, and its body. The body's look follows the theme: h2 as
// the site's section headings, links in the theme's colour, tables framed.
// A picture the page draws in its text stands on a line of its own,
// `Figure: <name>`, filled from the page's `figures` (the Speedrun page's
// strip, 2026-11-22); the line itself is not shown.
const FIGURE = /<p>Figure: (\w+)<\/p>/;

// `children`: what a page shows after its text, a table no Markdown holds (the
// wind page's hours). `figures`: the pictures its `Figure:` lines name.
export async function MarkdownGuide(props: {
  guide: Guide;
  crumb: string;
  children?: React.ReactNode;
  figures?: Record<string, React.ReactNode>;
}) {
  const intl = await serverIntl();
  const parts = markedCharts(props.guide.html, intl);
  // A part's HTML, each `Figure:` line in it replaced by its picture.
  const html = (__html: string) => {
    const pieces = __html.split(FIGURE);
    return pieces.map((piece, i) =>
      i % 2 === 1 ? (
        <Box key={i} sx={{ mb: 2 }}>
          {props.figures?.[piece]}
        </Box>
      ) : (
        <Box key={i} dangerouslySetInnerHTML={{ __html: piece }} />
      ),
    );
  };
  return (
    <>
      <ArchiveBar />
      <Container
        component="main"
        maxWidth="md"
        sx={{ py: 6, minHeight: "70vh" }}
      >
        {/* Home › Guides › its section › the page. */}
        <PageTrail crumb={props.crumb} />
        <Typography variant="h3" component="h1" gutterBottom>
          {props.guide.title}
        </Typography>
        {/* Every section heading is its own link, copied on a click, as on
            the No Man's Sky section (the owner, 2026-11-23). */}
        <AnchorHeadings
          copied={intl.format("pages.crafting.copied")}
          sx={{
            typography: "body1",
            "& h2": {
              typography: "h5",
              mt: 5,
              mb: 1,
            },
            "& h3": { typography: "h6", mt: 3, mb: 1 },
            "& p, & ul, & ol": { mb: 2, mt: 0 },
            "& li": { mb: 0.5 },
            "& a": { color: "primary.main" },
            // A way of playing's footnote (`> **Speedrunners** …`): set apart from the run's story.
            "& blockquote": {
              borderLeft: 4,
              borderColor: "primary.light",
              bgcolor: "action.hover",
              mx: 0,
              my: 2,
              px: 2,
              py: 1,
              "& p": { m: 0 },
            },
            "& table": { borderCollapse: "collapse", width: "100%", mb: 2 },
            "& th, & td": {
              borderBottom: 1,
              borderColor: "divider",
              textAlign: "left",
              py: 0.75,
              pr: 2,
              verticalAlign: "top",
            },
          }}
        >
          {parts.map((part, at) =>
            part.chart ? (
              <Box key={at} sx={{ mb: 2 }}>
                <ChartBlock spec={part.chart}>{html(part.html)}</ChartBlock>
              </Box>
            ) : (
              <Box key={at}>{html(part.html)}</Box>
            ),
          )}
        </AnchorHeadings>
        {props.children}
      </Container>
      <ArchiveFooter />
    </>
  );
}
