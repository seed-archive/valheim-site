"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useIntl } from "react-intl";

import wind from "@/lib/valheim/wind.json";

// A week of game days a page (the owner, 2026-11-23: seven days, weeks 1–52).
const WEEK = 7;
const WEEKS = Math.floor(wind.days.length / WEEK);
// The game's hours a day, the table's rows (the Valheim generator's wind.json).
const HOURS = wind.days[0]?.length ?? 0;
const [DAY_FROM, DAY_TO] = wind.dayHours as [number, number];

// Where the wind comes from at the start of each game hour of one week, a day
// to a column, from the Valheim generator's year of wind (the same in every
// world). The night's hours grey; the hours of day 1 before a new world
// begins empty.
export function WindTool() {
  const intl = useIntl();
  const t = (id: string, values?: Record<string, number>) =>
    intl.formatMessage({ id: `pages.wind.${id}` }, values);
  const { control, setValue } = useForm<{ week: number }>({
    defaultValues: { week: 1 },
  });
  const week = useWatch({ control, name: "week" });
  const days = Array.from(
    { length: WEEK },
    (_, i) => (week - 1) * WEEK + i + 1,
  );
  const step = (by: number) =>
    setValue("week", Math.min(WEEKS, Math.max(1, week + by)));
  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
        <IconButton
          aria-label={t("previous")}
          disabled={week <= 1}
          onClick={() => step(-1)}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Controller
          name="week"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              size="small"
              label={t("week")}
              onChange={(e) => field.onChange(Number(e.target.value))}
              sx={{ minWidth: 220 }}
            >
              {Array.from({ length: WEEKS }, (_, i) => i + 1).map((w) => (
                <MenuItem key={w} value={w}>
                  {t("weekDays", {
                    week: w,
                    from: (w - 1) * WEEK + 1,
                    to: w * WEEK,
                  })}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <IconButton
          aria-label={t("next")}
          disabled={week >= WEEKS}
          onClick={() => step(1)}
        >
          <ChevronRightIcon />
        </IconButton>
      </Stack>
      <TableContainer sx={{ mb: 2 }}>
        <Table
          size="small"
          sx={{ "& td, & th": { px: 0.75, textAlign: "center" } }}
        >
          <TableHead>
            <TableRow>
              <TableCell>{t("hour")}</TableCell>
              {days.map((d) => (
                <TableCell key={d}>{t("day", { day: d })}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: HOURS }, (_, h) => {
              const daylight = h >= DAY_FROM && h <= DAY_TO;
              return (
                <TableRow key={h}>
                  <TableCell>{`${String(h).padStart(2, "0")}:00`}</TableCell>
                  {days.map((d) => (
                    <TableCell
                      key={d}
                      sx={{
                        color: daylight ? "text.primary" : "text.disabled",
                        bgcolor: daylight ? undefined : "action.hover",
                      }}
                    >
                      {d === 1 && h < wind.startHour
                        ? ""
                        : wind.compass[Number(wind.days[d - 1][h])]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
