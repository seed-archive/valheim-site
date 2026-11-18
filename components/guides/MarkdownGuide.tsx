import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ChartBlock } from "@seed-archive/ui/chart";
import { chartSpec, type ChartSpec } from "@seed-archive/ui/chart-spec";
import { PageTrail } from "@seed-archive/ui/page-trail";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { serverFormat } from "@/lib/i18n/server";
import type { Guide } from "@/lib/content";

// The section of a guide whose table gets a chart: its statistics, "How often
// a seed has it" (the heading's anchor).
const STATS_SECTION = 'id="how-often-a-seed-has-it"';
// A cell that holds a share of seeds, as the Valheim generator's numbers fill it.
const SHARE = /(\d+(?:\.\d+)?)% of seeds/;
// The chart's row labels, in pixels.
const STATS_LABEL_WIDTH = 320;

// The guide's HTML cut round its statistics table, with a bar chart of the
// table's shares: one bar a row that gives one, its words the row's first cell.
// No table, or no share in it: no chart.
function statsChart(html: string): { before: string; table: string; after: string; spec: ChartSpec } | null {
  const at = html.indexOf(STATS_SECTION);
  const start = at < 0 ? -1 : html.indexOf("<table", at);
  const end = start < 0 ? -1 : html.indexOf("</table>", start);
  if (end < 0) {
    return null;
  }
  const table = html.slice(start, end + "</table>".length);
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
  const rows = [...table.matchAll(/<tr>([\s\S]*?)<\/tr>/g)]
    .map((r) => [...r[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) => text(c[1])))
    .flatMap((cells) => {
      const share = cells.map((c) => SHARE.exec(c)).find(Boolean);
      return share ? [{ label: cells[0], share: Number(share[1]) }] : [];
    });
  if (rows.length === 0) {
    return null;
  }
  const label = serverFormat("archive.chart.share");
  const spec = chartSpec(
    {
      kind: "bars",
      labels: rows.map((r) => r.label),
      series: [{ label, values: rows.map((r) => r.share / 100), exact: rows.map((r) => `${r.share}%`) }],
      format: "share",
      label,
      whole: true,
      // The guides' row labels are whole phrases ("A troll cave near the start…"): room for them (our own choice).
      labelWidth: STATS_LABEL_WIDTH,
    },
    { named: {} },
  );
  return { before: html.slice(0, start), table, after: html.slice(end + "</table>".length), spec };
}

// A guide written in Markdown (`lib/content.ts`): the header, Home › Guides ›
// the page, its h1, and its body. The body's look follows the theme: h2 as
// the site's section headings, links in the theme's colour, tables framed.
export function MarkdownGuide(props: { guide: Guide; crumb: string }) {
  const stats = statsChart(props.guide.html);
  const html = (__html: string) => <Box dangerouslySetInnerHTML={{ __html }} />;
  return (
    <>
      <ArchiveBar />
      <Container component="main" maxWidth="md" sx={{ py: 6, minHeight: "70vh" }}>
        <PageTrail
          steps={[
            { name: serverFormat("archive.home"), href: "/" },
            { name: serverFormat("archive.guides"), href: "/guides" },
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
          {stats ? (
            <>
              {html(stats.before)}
              <Box sx={{ mb: 2 }}>
                <ChartBlock spec={stats.spec}>{html(stats.table)}</ChartBlock>
              </Box>
              {html(stats.after)}
            </>
          ) : (
            html(props.guide.html)
          )}
        </Box>
      </Container>
      <ArchiveFooter />
    </>
  );
}
