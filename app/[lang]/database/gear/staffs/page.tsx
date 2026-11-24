import Typography from "@mui/material/Typography";

import { GearPage } from "@/components/catalog/GearPage";
import Link from "@/components/LocaleLink";
import { serverIntl } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/metadata";

// The staffs have a page of their own (the owner, 2026-11-23: what each staff
// casts, told in full). A staff casts on eitr, and eitr comes from food alone,
// so the page sends to the food; the link's words are that page's own h1.
async function EitrLink() {
  const intl = await serverIntl();
  return (
    <Typography sx={{ mb: 2 }}>
      {intl.rich("pages.staffs.eitr", {
        link: (chunks) => <Link href="/database/food/food">{chunks}</Link>,
      })}
    </Typography>
  );
}

export function generateMetadata() {
  return pageMetadata("pages.staffs.meta", "/database/gear/staffs");
}

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
