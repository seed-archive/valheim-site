"use client";

import Link from "next/link";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FormattedMessage, useIntl } from "react-intl";

import { ArchiveBar } from "@/components/archive/ArchiveBar";
import { ArchiveFooter } from "@/components/archive/ArchiveFooter";
import { BASE_PATH } from "@/lib/site";

// The eight biomes in the order a run meets them, each a tile that opens its
// guide; the pictures are drawn by the Valheim generator as the map draws the
// world (`public/biomes/`). The newest biome wears a badge.
const BIOMES = [
  "meadows",
  "black-forest",
  "swamp",
  "mountain",
  "plains",
  "mistlands",
  "ashlands",
  "deep-north",
];
const NEWEST = "deep-north";

export default function Home() {
  const intl = useIntl();
  return (
    <>
      <ArchiveBar />
      <Container component="main" sx={{ py: 6, minHeight: "70vh" }}>
        <Typography variant="h3" component="h1" gutterBottom>
          <FormattedMessage id="pages.home.title" />
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          <FormattedMessage
            id="pages.home.lead"
            values={{
              deepNorth: (text) => (
                <Link href="/guides/biomes/deep-north">{text}</Link>
              ),
              map: (text) => <Link href="/tools/map">{text}</Link>,
              rating: (text) => (
                <Link href="/tools/how-good-is-my-seed">{text}</Link>
              ),
              challenges: (text) => (
                <Link href="/guides/challenges">{text}</Link>
              ),
              catalog: (text) => <Link href="/catalog">{text}</Link>,
            }}
          />
        </Typography>
        <Grid container spacing={2}>
          {BIOMES.map((slug) => {
            const name = intl.formatMessage({
              id: `pages.home.biome.${slug}.name`,
            });
            return (
              <Grid key={slug} size={{ xs: 6, md: 3 }}>
                <Card variant="outlined" sx={{ height: "100%" }}>
                  <CardActionArea
                    component={Link}
                    href={`/guides/biomes/${slug}`}
                    sx={{ height: "100%" }}
                  >
                    <CardMedia
                      component="img"
                      image={`${BASE_PATH}/biomes/${slug}.png`}
                      alt={name}
                      sx={{ aspectRatio: "1", objectFit: "cover" }}
                    />
                    <CardContent>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center", mb: 0.5 }}
                      >
                        <Typography variant="h6" component="h2">
                          {name}
                        </Typography>
                        {slug === NEWEST ? (
                          <Chip
                            size="small"
                            color="primary"
                            label={intl.formatMessage({ id: "pages.home.new" })}
                          />
                        ) : null}
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        <FormattedMessage
                          id={`pages.home.biome.${slug}.hook`}
                        />
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <ArchiveFooter />
    </>
  );
}
