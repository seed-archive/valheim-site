"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { PageTrail } from "@seed-archive/ui/page-trail";
import type { Entry } from "@/lib/guides";

// A menu item's index (Guides, Quests): its pages in groups, each page in a
// sentence. A group without a name is a plain list.
export function GuidesIndex(props: {
  name: string;
  title: string;
  groups: { id?: string; entries: Entry[] }[];
}) {
  const { name, title, groups } = props;
  return (
    <>
      <ArchiveBar />
      <Container component="main" sx={{ py: 6, minHeight: "70vh" }}>
        <PageTrail
          steps={[
            { name: <FormattedMessage id="archive.home" />, href: "/" },
            { name: <FormattedMessage id={name} /> },
          ]}
        />
        <Typography variant="h3" component="h1" gutterBottom>
          <FormattedMessage id={title} />
        </Typography>
        {groups.map((group, g) => (
          <div key={group.id ?? g}>
            {group.id ? (
              <Typography variant="h5" component="h2" sx={{ mt: 4 }}>
                <FormattedMessage id={group.id} />
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
