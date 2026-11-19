import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export type ShareRow = { label: string; share: number };

// A table of shares of seeds as bars: a row's words and share on one line,
// under them a bar over the full width on one 0–100 % scale.
export function ShareChart(props: { rows: ShareRow[] }) {
  return (
    <Box sx={{ mb: 2 }}>
      {props.rows.map((row) => (
        <Box key={row.label} sx={{ mb: 2.5 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mb: 0.25 }}>
            <Typography variant="body2">{row.label}</Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold", fontVariantNumeric: "tabular-nums" }}>
              {row.share}%
            </Typography>
          </Box>
          <Box sx={{ height: 14, bgcolor: "action.hover", borderRadius: 0.5 }}>
            <Box sx={{ width: `${row.share}%`, height: 1, bgcolor: "primary.main", borderRadius: 0.5 }} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
