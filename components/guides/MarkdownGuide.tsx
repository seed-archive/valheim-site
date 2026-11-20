import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ChartBlock } from "@seed-archive/ui/chart";
import { chartSpec, type ChartSpec } from "@seed-archive/ui/chart-spec";
import { PageTrail } from "@seed-archive/ui/page-trail";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { sectionOf } from "@/lib/guides";
import { serverFormat } from "@/lib/i18n/server";
import type { Guide } from "@/lib/content";

// A table that gets a chart is followed by a line naming its kind,
// `Chart: share` or `Chart: spread` (the guide forum's marker, the Valheim
// generator's notes → forum.md); the line itself is not shown.
const MARKER = /<p>Chart: (share|spread)<\/p>\s*/g;
// A cell that holds a share: the first percentage of the row.
const SHARE = /(\d+(?:\.\d+)?)\s*%/;
// A cell that holds the middle half of seeds, "low–high" (the generator's
// quartiles), and the number of the cell before it, the median.
const SPREAD = /(-?\d+(?:\.\d+)?)\s*–\s*(-?\d+(?:\.\d+)?)/;
const NUMBER = /-?\d+(?:\.\d+)?/;
// A row of a distance in metres: its words end ", m" (the guides' Markdown).
const METRES = /,\s*m$/;

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
function tableChart(table: string, kind: string): ChartSpec | null {
  const rows = [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((r) =>
    [...r[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) => text(c[1])),
  );
  if (kind === "share") {
    const shares = rows.flatMap((cells) => {
      const share = cells
        .slice(1)
        .map((c) => SHARE.exec(c))
        .find(Boolean);
      return share ? [{ label: cells[0], share: Number(share[1]) }] : [];
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
        label: shares.map((r) => r.label).join(", "),
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
            median: Number(median[0]),
            low: Number(span[1]),
            high: Number(span[2]),
          },
        ]
      : [];
  });
  if (spreads.length < 2) {
    return null;
  }
  const metres = spreads.every((r) => METRES.test(r.label));
  const unit = metres ? " m" : "";
  const labels = spreads.map((r) => r.label.replace(METRES, ""));
  return chartSpec(
    {
      kind: "spread",
      labels,
      series: [
        {
          label: "",
          values: spreads.map((r) => r.median),
          spans: spreads.map((r) => [r.low, r.high] as [number, number]),
          exact: spreads.map((r) => `${r.median}${unit} (${r.low}–${r.high})`),
        },
      ],
      format: "number",
      unit: metres ? "m" : undefined,
      axis: serverFormat("pages.guides.spreadLegend"),
      label: labels.join(", "),
    },
    COLORS,
  );
}

// The guide's HTML cut round its marked tables, each table with its chart;
// the markers are dropped.
function markedCharts(
  html: string,
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
      { html: table, chart: tableChart(table, mark[1]) },
    );
    from = mark.index + mark[0].length;
  }
  parts.push({ html: html.slice(from) });
  return parts;
}

// A guide written in Markdown (`lib/content.ts`): the header, Home › Guides ›
// the page, its h1, and its body. The body's look follows the theme: h2 as
// the site's section headings, links in the theme's colour, tables framed.
export function MarkdownGuide(props: { guide: Guide; crumb: string }) {
  const parts = markedCharts(props.guide.html);
  // Home › Guides › its section › the page; a guide out of the menu has no section.
  const section = sectionOf(props.crumb);
  const html = (__html: string) => <Box dangerouslySetInnerHTML={{ __html }} />;
  return (
    <>
      <ArchiveBar />
      <Container
        component="main"
        maxWidth="md"
        sx={{ py: 6, minHeight: "70vh" }}
      >
        <PageTrail
          steps={[
            { name: serverFormat("archive.home"), href: "/" },
            { name: serverFormat("archive.guides"), href: "/guides" },
            ...(section?.id && section.href
              ? [{ name: serverFormat(section.id), href: section.href }]
              : []),
            { name: serverFormat(props.crumb) },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          {props.guide.title}
        </Typography>
        <Box
          sx={{
            typography: "body1",
            "& h2": {
              typography: "h5",
              mt: 5,
              mb: 1,
              scrollMarginTop: { xs: 64, sm: 72 },
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
        </Box>
      </Container>
      <ArchiveFooter />
    </>
  );
}
