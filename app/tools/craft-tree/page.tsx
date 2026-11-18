import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { PageTrail } from "@seed-archive/ui/page-trail";
import { CraftTree } from "@/components/tools/craft/CraftTree";
import { serverFormat } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Craft tree in Valheim — Seed Archive",
  description:
    "Switch on what your run will build, biome by biome, and see how much wood, ore and every other raw material it takes.",
  alternates: { canonical: "/tools/craft-tree" },
};

// How to read the tree, one line each, in the page's order.
const HOW = ["bands", "click", "stations", "quality", "column"];

// A full-screen tool: the shared header, no footer (site-text.md).
export default function CraftTreePage() {
  return (
    <>
      <ArchiveBar />
      <Container component="main" maxWidth="xl" sx={{ py: 3 }}>
        <PageTrail
          steps={[
            { name: serverFormat("archive.home"), href: "/" },
            { name: serverFormat("archive.tools"), href: "/tools" },
            { name: serverFormat("archive.craftTree") },
          ]}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          {serverFormat("pages.craftTree.title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>{serverFormat("pages.craftTree.question")}</b>{" "}
          {serverFormat("pages.craftTree.answer")}
        </Typography>
        <Box component="ul" sx={{ mt: 0, mb: 3, pl: 3, color: "text.secondary" }}>
          {HOW.map((id) => (
            <Typography key={id} component="li" variant="body2" sx={{ mb: 0.5 }}>
              {serverFormat(`pages.craftTree.how.${id}`)}
            </Typography>
          ))}
        </Box>
        <CraftTree />
      </Container>
    </>
  );
}
