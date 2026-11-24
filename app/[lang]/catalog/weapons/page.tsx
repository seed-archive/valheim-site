import { GearPage } from "@/components/catalog/GearPage";
import Link from "@/components/LocaleLink";
import Typography from "@mui/material/Typography";

import { serverIntl } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/metadata";

// The damage table lives on its own page; the weapons page sends there, the
// link's words the page's own h1. The staffs have a page of their own too
// (2026-11-23).
async function DamageLink() {
  const intl = await serverIntl();
  return (
    <Typography sx={{ mb: 2 }}>
      {intl.rich("pages.weapons.damageLink", {
        link: (chunks) => <Link href="/catalog/damage">{chunks}</Link>,
      })}{" "}
      {intl.rich("pages.weapons.staffsLink", {
        link: (chunks) => <Link href="/catalog/staffs">{chunks}</Link>,
      })}
    </Typography>
  );
}

export function generateMetadata() {
  return pageMetadata("pages.weapons.meta", "/catalog/weapons");
}

export default function WeaponsPage() {
  return (
    <GearPage
      page="weapons"
      words="weapons"
      crumb="archive.guideWeapons"
      before={<DamageLink />}
    />
  );
}
