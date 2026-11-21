import type { Metadata } from "next";

import { GearPage } from "@/components/catalog/GearPage";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { serverFormat } from "@/lib/i18n/server";

// The damage table lives on its own page; the weapons page sends there, the
// link's words the page's own h1.
function DamageLink() {
  return (
    <Typography sx={{ mb: 2 }}>
      {serverFormat("pages.weapons.damageLink")}{" "}
      <Link href="/catalog/damage">{serverFormat("archive.guideDamage")}</Link>.
    </Typography>
  );
}

export const metadata: Metadata = {
  title: "Weapons in Valheim — Seed Archive",
  description:
    "Every sword, axe, mace, knife, spear, atgeir, fist weapon and staff by biome: its damage, the station it needs and its materials.",
  alternates: { canonical: "/catalog/weapons" },
};

export default function WeaponsPage() {
  return (
    <GearPage page="weapons" words="weapons" crumb="archive.guideWeapons" before={<DamageLink />} />
  );
}
