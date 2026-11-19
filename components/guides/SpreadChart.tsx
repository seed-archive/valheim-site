import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export type SpreadRow = { label: string; median: number; low: number; high: number };

// How many gridlines an axis aims for (our own choice).
const TICKS = 5;

// A round step for an axis up to `max`: 1, 2 or 5 times a power of ten.
function step(max: number): number {
  const raw = max / TICKS;
  const power = 10 ** Math.floor(Math.log10(raw));
  return [1, 2, 5, 10].map((k) => k * power).find((s) => s >= raw) ?? power * 10;
}

const number = (n: number) => n.toLocaleString("en");

// Distances of one table on one axis, so their lengths compare: a row a
// distance, its words and numbers on one line, under them the middle half of
// seeds as a bar and the median as a mark.
export function SpreadChart(props: { rows: SpreadRow[]; unit: string; legend: string }) {
  const max = Math.max(...props.rows.map((r) => r.high));
  const s = step(max);
  const top = Math.ceil(max / s) * s;
  const ticks = Array.from({ length: Math.round(top / s) + 1 }, (_, i) => i * s);
  const at = (v: number) => `${(v / top) * 100}%`;
  return (
    <Box sx={{ mb: 2 }}>
      {props.rows.map((row) => (
        <Box key={row.label} sx={{ mb: 2.5 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 0.25 }}>
            <Typography variant="body2">{row.label}</Typography>
            <Typography variant="body2" sx={{ fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
              <b>{number(row.median)}</b> ({number(row.low)}–{number(row.high)}){props.unit}
            </Typography>
          </Box>
          <Box sx={{ position: "relative", height: 14, bgcolor: "action.hover", borderRadius: 0.5 }}>
            {ticks.slice(1, -1).map((t) => (
              <Box key={t} sx={{ position: "absolute", left: at(t), top: 0, bottom: 0, borderLeft: 1, borderColor: "divider" }} />
            ))}
            <Box
              sx={{
                position: "absolute",
                left: at(row.low),
                width: `calc(${at(row.high)} - ${at(row.low)})`,
                top: 0,
                bottom: 0,
                bgcolor: "primary.light",
                borderRadius: 0.5,
              }}
            />
            <Box sx={{ position: "absolute", left: at(row.median), top: -3, bottom: -3, width: 3, ml: "-1.5px", bgcolor: "primary.dark" }} />
          </Box>
        </Box>
      ))}
      <Box sx={{ position: "relative", height: 20 }}>
        {ticks.map((t, i) => (
          <Typography
            key={t}
            variant="caption"
            color="text.secondary"
            sx={{
              position: "absolute",
              left: at(t),
              transform: i === 0 ? "none" : i === ticks.length - 1 ? "translateX(-100%)" : "translateX(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            {number(t)}
            {i === ticks.length - 1 ? props.unit : ""}
          </Typography>
        ))}
      </Box>
      <Typography variant="caption" color="text.secondary">
        {props.legend}
      </Typography>
    </Box>
  );
}
