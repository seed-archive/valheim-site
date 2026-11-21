"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";

type SearchForm = { query: string };

// A text for a CSS string: its backslashes and quotes escaped.
const cssString = (s: string) => s.replace(/["\\]/g, "\\$&");

// One search over the tables below it. The tables are rendered on the server;
// a row carries `data-search` (its name, kind, station and materials, lower
// case), and the search hides, with one style rule, the rows that do not hold
// the text, and the tables and biomes left empty.
export function TableSearch(props: { children: ReactNode }) {
  const intl = useIntl();
  const { control } = useForm<SearchForm>({ defaultValues: { query: "" } });
  const query = useWatch({ control, name: "query" }).trim().toLowerCase();
  const hit = `[data-search*="${cssString(query)}"]`;
  return (
    <>
      {query ? (
        <style>{`
          .table-search tr[data-search]:not(${hit}) { display: none; }
          .table-search section:not(:has(${hit})) { display: none; }
          .table-search .table-search-none { display: block; }
          .table-search:has(${hit}) .table-search-none { display: none; }
        `}</style>
      ) : null}
      <Controller
        name="query"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            size="small"
            type="search"
            label={intl.formatMessage({ id: "pages.crafting.search" })}
            sx={{ width: "100%", maxWidth: 420, mb: 2 }}
          />
        )}
      />
      <Box className="table-search">
        <Typography className="table-search-none" sx={{ display: "none", my: 4 }}>
          <FormattedMessage id="pages.crafting.nothing" />
        </Typography>
        {props.children}
      </Box>
    </>
  );
}
