"use client";

import { useState } from "react";
import { useParams, usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FormattedMessage, useIntl } from "react-intl";

import { useAuth } from "@seed-archive/ui/auth";
import { LanguageSwitcher } from "@seed-archive/ui/language-switcher";
import Link from "@/components/LocaleLink";
import { CATALOG_GROUPS, GUIDE_GROUPS, type Entry } from "@/lib/guides";
import { DEFAULT_LOCALE, localePath, PUBLISHED } from "@/lib/i18n/locales";
import { BASE_PATH } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

// The menu items, in the order every game shows them (the shared seo.md,
// Header and footer: at most four; this section has no Quests); a group with a
// name is a bold line over its pages.
const MENUS: {
  key: string;
  id: string;
  groups: { id?: string; href?: string; entries: Entry[] }[];
}[] = [
  { key: "catalog", id: "archive.catalog", groups: CATALOG_GROUPS },
  { key: "guides", id: "archive.guides", groups: GUIDE_GROUPS },
  {
    key: "tools",
    id: "archive.tools",
    groups: [{ entries: TOOLS.map((tool) => ({ ...tool, line: "" })) }],
  },
];

// The archive's one header (D15): "Seed Archive", a plain link to the portal's
// home in the page's language (another zone, so not next/link), then the game's name, a link to this
// section's home, then the section's own menu, then the archive's account (D13).
// The indexes of Tools, Guides and Quests are not in the menu: a page's
// breadcrumbs lead to them.
export function ArchiveBar() {
  const { signOut, user } = useAuth();
  const intl = useIntl();
  const { lang } = useParams<{ lang?: string }>();
  // This page in each language the section is translated into: its path with
  // the language swapped (the switcher's links are plain, another document).
  const pathname = usePathname();
  const rest = pathname.replace(/^\/[^/]+/, "");
  const translations = PUBLISHED.map((l) => ({
    lang: l,
    href: `${BASE_PATH}/${l}${rest}`,
  }));
  const [accountMenu, setAccountMenu] = useState<HTMLElement | null>(null);
  const [drawer, setDrawer] = useState(false);
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
            href={localePath(lang, "/")}
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
        {/* Below md the whole menu is in the drawer (the shared seo.md, Header and footer). */}
        <IconButton
          color="inherit"
          aria-label={intl.formatMessage({ id: "archive.menu" })}
          onClick={() => setDrawer(true)}
          sx={{ display: { xs: "inline-flex", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
          <List sx={{ width: 280 }}>
            {MENUS.flatMap((menu) => [
              // Level one never reads smaller than level two (the owner,
              // 2026-11-28): the subheader's own 0.875rem grey stood under
              // the items' body1; weights 700, 600, 400 down the levels.
              <ListSubheader
                key={menu.key}
                sx={{
                  typography: "subtitle1",
                  fontWeight: 700,
                  color: "text.primary",
                }}
              >
                <FormattedMessage id={menu.id} />
              </ListSubheader>,
              ...menu.groups.flatMap((group) => [
                ...(group.id
                  ? [
                      <ListItemButton
                        key={`${menu.key}-${group.id}`}
                        component={group.href ? Link : "div"}
                        href={group.href}
                        disabled={!group.href}
                        onClick={() => setDrawer(false)}
                        sx={{ "&.Mui-disabled": { opacity: 1 } }}
                      >
                        <ListItemText
                          primary={<FormattedMessage id={group.id} />}
                          slotProps={{ primary: { sx: { fontWeight: 600 } } }}
                        />
                      </ListItemButton>,
                    ]
                  : []),
                ...group.entries.map((entry) => (
                  <ListItemButton
                    key={`${menu.key}-${entry.href}`}
                    component={Link}
                    href={entry.href}
                    onClick={() => setDrawer(false)}
                    sx={group.id ? { pl: 4 } : undefined}
                  >
                    <ListItemText
                      primary={<FormattedMessage id={entry.id} />}
                    />
                  </ListItemButton>
                )),
              ]),
            ])}
          </List>
        </Drawer>
        {MENUS.map((menu) => (
          <Box key={menu.key} sx={{ display: { xs: "none", md: "block" } }}>
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
                      group.href ? (
                        // A section with a page of its own: its name opens it.
                        <MenuItem
                          key={group.id}
                          component={Link}
                          href={group.href}
                          onClick={() => setOpen(null)}
                          sx={{ fontWeight: 700 }}
                        >
                          <FormattedMessage id={group.id} />
                        </MenuItem>
                      ) : (
                        <MenuItem
                          key={group.id}
                          disabled
                          sx={{
                            fontWeight: 700,
                            "&.Mui-disabled": { opacity: 1 },
                          }}
                        >
                          <FormattedMessage id={group.id} />
                        </MenuItem>
                      ),
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
        <LanguageSwitcher
          current={lang ?? DEFAULT_LOCALE}
          translations={translations}
        />
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
