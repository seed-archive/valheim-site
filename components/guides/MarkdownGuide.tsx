import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import { PageTrail } from "@seed-archive/ui/page-trail";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { ShareChart } from "@/components/guides/ShareChart";
import { SpreadChart, type SpreadRow } from "@/components/guides/SpreadChart";
import { sectionOf } from "@/lib/guides";
import { serverFormat } from "@/lib/i18n/server";
import type { Guide } from "@/lib/content";

// The section of a guide whose tables get charts: its statistics, "How often
// a seed has it" (the heading's anchor), up to the next heading.
const STATS_SECTION = 'id="how-often-a-seed-has-it"';
// A cell that holds a share of seeds, as the Valheim generator's numbers fill it.
const SHARE = /(\d+(?:\.\d+)?)% of seeds/;
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

// One statistics table's chart. A table of shares of seeds: a bar a row on
// one 0–100 % scale. A table of medians and middle halves: the distances (a
// row ending ", m") on one axis in metres, so their lengths compare. Counts of
// different things share no scale, so they stay in the table alone.
function tableChart(table: string): ReactNode {
  const rows = [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((r) =>
    [...r[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) => text(c[1])),
  );
  const shares = rows.flatMap((cells) => {
    const share = cells.map((c) => SHARE.exec(c)).find(Boolean);
    return share ? [{ label: cells[0], share: Number(share[1]) }] : [];
  });
  if (shares.length > 0) {
    return <ShareChart rows={shares} />;
  }
  const spreads: SpreadRow[] = rows.flatMap((cells) => {
    const at = cells.findIndex((c) => SPREAD.test(c));
    const span = at > 1 ? SPREAD.exec(cells[at]) : null;
    const median = span ? NUMBER.exec(cells[at - 1]) : null;
    return span && median
      ? [{ label: cells[0], median: Number(median[0]), low: Number(span[1]), high: Number(span[2]) }]
      : [];
  });
  const metres = spreads.filter((r) => METRES.test(r.label)).map((r) => ({ ...r, label: r.label.replace(METRES, "") }));
  if (metres.length === 0) {
    return null;
  }
  return <SpreadChart rows={metres} unit=" m" legend={serverFormat("pages.guides.spreadLegend")} />;
}

// The guide's HTML cut round the tables of its statistics section, each table
// with its chart.
function statsCharts(html: string): { html: string; chart?: ReactNode }[] {
  const at = html.indexOf(STATS_SECTION);
  if (at < 0) {
    return [{ html }];
  }
  const next = html.indexOf("<h2", at);
  const stop = next < 0 ? html.length : next;
  const parts: { html: string; chart?: ReactNode }[] = [];
  let from = 0;
  let start = html.indexOf("<table", at);
  while (start >= 0 && start < stop) {
    const end = html.indexOf("</table>", start) + "</table>".length;
    const table = html.slice(start, end);
    const chart = tableChart(table);
    if (chart) {
      parts.push({ html: html.slice(from, start) }, { html: table, chart });
      from = end;
    }
    start = html.indexOf("<table", end);
  }
  parts.push({ html: html.slice(from) });
  return parts;
}

// A guide written in Markdown (`lib/content.ts`): the header, Home › Guides ›
// the page, its h1, and its body. The body's look follows the theme: h2 as
// the site's section headings, links in the theme's colour, tables framed.
export function MarkdownGuide(props: { guide: Guide; crumb: string }) {
  const parts = statsCharts(props.guide.html);
  // Home › Guides › its section › the page; a guide out of the menu has no section.
  const section = sectionOf(props.crumb);
  const html = (__html: string) => <Box dangerouslySetInnerHTML={{ __html }} />;
  return (
    <>
      <ArchiveBar />
      <Container component="main" maxWidth="md" sx={{ py: 6, minHeight: "70vh" }}>
        <PageTrail
          steps={[
            { name: serverFormat("archive.home"), href: "/" },
            { name: serverFormat("archive.guides"), href: "/guides" },
            ...(section?.id && section.href ? [{ name: serverFormat(section.id), href: section.href }] : []),
            { name: serverFormat(props.crumb) },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          {props.guide.title}
        </Typography>
        <Box
          sx={{
            typography: "body1",
            "& h2": { typography: "h5", mt: 5, mb: 1, scrollMarginTop: { xs: 64, sm: 72 } },
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
          {parts.map((part, at) => (
            <Box key={at}>
              {part.chart}
              {html(part.html)}
            </Box>
          ))}
        </Box>
      </Container>
      <ArchiveFooter />
    </>
  );
}
