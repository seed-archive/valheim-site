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

import { useAuth } from "@/components/providers/AuthProvider";
import { TOOLS } from "@/lib/tools";

// The archive's one header (D15): "Seed Archive", a plain link to the domain's
// root (another zone, so not next/link), then the game's name, a link to this
// section's home, then the section's own menu, then the archive's account (D13).
export function ArchiveBar() {
  const { signOut, user } = useAuth();
  const intl = useIntl();
  const [accountMenu, setAccountMenu] = useState<HTMLElement | null>(null);
  const [toolsMenu, setToolsMenu] = useState<HTMLElement | null>(null);

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
        <Button
          color="inherit"
          onClick={(event) => setToolsMenu(event.currentTarget)}
          id="tools-button"
          aria-haspopup="true"
          aria-controls={toolsMenu ? "tools-menu" : undefined}
          aria-expanded={toolsMenu ? "true" : undefined}
        >
          <FormattedMessage id="archive.tools" />
        </Button>
        <Menu
          id="tools-menu"
          anchorEl={toolsMenu}
          open={Boolean(toolsMenu)}
          onClose={() => setToolsMenu(null)}
          slotProps={{ list: { "aria-labelledby": "tools-button" } }}
        >
          <MenuItem
            component={Link}
            href="/tools"
            onClick={() => setToolsMenu(null)}
          >
            <FormattedMessage id="archive.allTools" />
          </MenuItem>
          {TOOLS.map((tool) => (
            <MenuItem
              key={tool.href}
              component={Link}
              href={tool.href}
              onClick={() => setToolsMenu(null)}
            >
              <FormattedMessage id={tool.id} />
            </MenuItem>
          ))}
        </Menu>
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
