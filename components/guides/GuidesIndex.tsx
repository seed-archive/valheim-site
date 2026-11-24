"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@/components/LocaleLink";
import { FormattedMessage } from "react-intl";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { PageTrail } from "@/components/PageTrail";
import type { Entry } from "@/lib/guides";

// A menu item's index (Guides, Catalog), or a group's contents page (`name`
// the group's menu id, its breadcrumbs every level above it): its pages in
// groups, each page in a sentence. A group without a name is a plain list; a
// group with an `href` names its own page.
export function GuidesIndex(props: {
  name: string;
  title: string;
  groups: { id?: string; href?: string; entries: Entry[] }[];
}) {
  const { name, title, groups } = props;
  return (
    <>
      <ArchiveBar />
      <Container component="main" sx={{ py: 6, minHeight: "70vh" }}>
        <PageTrail crumb={name} />
        <Typography variant="h3" component="h1" gutterBottom>
          <FormattedMessage id={title} />
        </Typography>
        {groups.map((group, g) => (
          <div key={group.id ?? g}>
            {group.id ? (
              <Typography variant="h5" component="h2" sx={{ mt: 4 }}>
                {group.href ? (
                  <Link href={group.href}>
                    <FormattedMessage id={group.id} />
                  </Link>
                ) : (
                  <FormattedMessage id={group.id} />
                )}
              </Typography>
            ) : null}
            {group.entries.map((entry) => (
              <Typography key={entry.href} sx={{ mt: 2 }}>
                <FormattedMessage
                  id={`pages.guides.${entry.line}`}
                  values={{
                    b: (text) => <b>{text}</b>,
                    link: (text) => <Link href={entry.href}>{text}</Link>,
                  }}
                />
              </Typography>
            ))}
          </div>
        ))}
      </Container>
      <ArchiveFooter />
    </>
  );
}
