import type { Metadata } from "next";

import Typography from "@mui/material/Typography";
import Link from "next/link";

import { GearPage } from "@/components/catalog/GearPage";
import { serverFormat } from "@/lib/i18n/server";

// The staffs have a page of their own (the owner, 2026-11-23: what each staff
// casts, told in full). A staff casts on eitr, and eitr comes from food alone,
// so the page sends to the food; the link's words are that page's own h1.
function EitrLink() {
  return (
    <Typography sx={{ mb: 2 }}>
      {serverFormat("pages.staffs.eitr")}{" "}
      <Link href="/catalog/food">{serverFormat("archive.guideFood")}</Link>.
    </Typography>
  );
}

export const metadata: Metadata = {
  title: "Staffs in Valheim — Seed Archive",
  description:
    "Every staff of elemental and blood magic by biome: what it casts or summons, what a cast costs in eitr and health, and its materials.",
  alternates: { canonical: "/catalog/staffs" },
};

export default function StaffsPage() {
  return (
    <GearPage
      page="staffs"
      words="staffs"
      crumb="archive.guideStaffs"
      before={<EitrLink />}
    />
  );
}
