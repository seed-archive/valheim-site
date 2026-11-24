import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { PageTrail } from "@/components/PageTrail";
import { CraftTree } from "@/components/tools/craft/CraftTree";
import { serverIntl } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata("pages.craftTree.meta", "/tools/craft-tree");
}

// How to read the tree, one line each, in the page's order.
const HOW = ["bands", "click", "stations", "quality", "column"];

// A full-screen tool: the shared header, no footer (site-text.md).
export default async function CraftTreePage() {
  const intl = await serverIntl();
  return (
    <>
      <ArchiveBar />
      <Container component="main" maxWidth="xl" sx={{ py: 3 }}>
        <PageTrail
          steps={[
            { name: intl.format("archive.home"), href: "/" },
            { name: intl.format("archive.tools"), href: "/tools" },
            { name: intl.format("archive.craftTree") },
          ]}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          {intl.format("pages.craftTree.title")}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>{intl.format("pages.craftTree.question")}</b>{" "}
          {intl.format("pages.craftTree.answer")}
        </Typography>
        <Box
          component="ul"
          sx={{ mt: 0, mb: 3, pl: 3, color: "text.secondary" }}
        >
          {HOW.map((id) => (
            <Typography
              key={id}
              component="li"
              variant="body2"
              sx={{ mb: 0.5 }}
            >
              {intl.format(`pages.craftTree.how.${id}`)}
            </Typography>
          ))}
        </Box>
        <CraftTree />
      </Container>
    </>
  );
}
