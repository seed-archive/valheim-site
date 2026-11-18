"use client";

import { useState } from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FormattedMessage, useIntl } from "react-intl";

import { useAuth } from "@seed-archive/ui/auth";
import { CATALOG_GROUPS, GUIDE_GROUPS, type Entry } from "@/lib/guides";
import { TOOLS } from "@/lib/tools";

// The menu items, in the order every game shows them (the shared seo.md,
// Header and footer: at most four; this section has no Quests); a group with a
// name is a bold line over its pages.
const MENUS: {
  key: string;
  id: string;
  groups: { id?: string; entries: Entry[] }[];
}[] = [
  { key: "catalog", id: "archive.catalog", groups: CATALOG_GROUPS },
  { key: "guides", id: "archive.guides", groups: GUIDE_GROUPS },
  {
    key: "tools",
    id: "archive.tools",
    groups: [{ entries: TOOLS.map((tool) => ({ ...tool, line: "" })) }],
  },
];

// The archive's one header (D15): "Seed Archive", a plain link to the domain's
// root (another zone, so not next/link), then the game's name, a link to this
// section's home, then the section's own menu, then the archive's account (D13).
// The indexes of Tools, Guides and Quests are not in the menu: a page's
// breadcrumbs lead to them.
export function ArchiveBar() {
  const { signOut, user } = useAuth();
  const intl = useIntl();
  const [accountMenu, setAccountMenu] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState<{ key: string; anchor: HTMLElement } | null>(
    null,
  );

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider" }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            gap: 1,
            flexGrow: 1,
            minWidth: 0,
          }}
        >
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{ color: "inherit", textDecoration: "none", flexShrink: 0 }}
          >
            <FormattedMessage id="archive.title" />
          </Typography>
          <Typography variant="h6" color="text.secondary" aria-hidden>
            /
          </Typography>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            noWrap
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            <FormattedMessage id="archive.game" />
          </Typography>
        </Box>
        {MENUS.map((menu) => (
          <Box key={menu.key}>
            <Button
              color="inherit"
              onClick={(event) =>
                setOpen({ key: menu.key, anchor: event.currentTarget })
              }
              id={`${menu.key}-button`}
              aria-haspopup="true"
              aria-controls={
                open?.key === menu.key ? `${menu.key}-menu` : undefined
              }
              aria-expanded={open?.key === menu.key ? "true" : undefined}
            >
              <FormattedMessage id={menu.id} />
            </Button>
            <Menu
              id={`${menu.key}-menu`}
              anchorEl={open?.key === menu.key ? open.anchor : null}
              open={open?.key === menu.key}
              onClose={() => setOpen(null)}
              slotProps={{
                list: { "aria-labelledby": `${menu.key}-button` },
              }}
            >
              {menu.groups.flatMap((group) => [
                ...(group.id
                  ? [
                      <MenuItem
                        key={group.id}
                        disabled
                        sx={{ fontWeight: 700, "&.Mui-disabled": { opacity: 1 } }}
                      >
                        <FormattedMessage id={group.id} />
                      </MenuItem>,
                    ]
                  : []),
                ...group.entries.map((entry) => (
                  <MenuItem
                    key={entry.href}
                    component={Link}
                    href={entry.href}
                    onClick={() => setOpen(null)}
                    sx={group.id ? { pl: 4 } : undefined}
                  >
                    <FormattedMessage id={entry.id} />
                  </MenuItem>
                )),
              ])}
            </Menu>
          </Box>
        ))}
        {user ? (
          <>
            <IconButton
              id="account-button"
              aria-label={intl.formatMessage({ id: "archive.account" })}
              aria-haspopup="true"
              aria-controls={accountMenu ? "account-menu" : undefined}
              aria-expanded={accountMenu ? "true" : undefined}
              onClick={(event) => setAccountMenu(event.currentTarget)}
              sx={{ p: 0.5 }}
            >
              {/* Google's picture; the first letter of the name without one. */}
              <Avatar
                src={user.user_metadata.avatar_url as string | undefined}
                alt={user.user_metadata.full_name as string | undefined}
                slotProps={{ img: { referrerPolicy: "no-referrer" } }}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
            <Menu
              id="account-menu"
              anchorEl={accountMenu}
              open={Boolean(accountMenu)}
              onClose={() => setAccountMenu(null)}
              slotProps={{ list: { "aria-labelledby": "account-button" } }}
            >
              <MenuItem
                onClick={() => {
                  setAccountMenu(null);
                  void signOut();
                }}
              >
                <FormattedMessage id="archive.signOut" />
              </MenuItem>
            </Menu>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}
