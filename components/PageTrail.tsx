"use client";

import { useParams } from "next/navigation";
import { FormattedMessage } from "react-intl";
import {
  PageTrail as SharedPageTrail,
  type PageStep,
} from "@seed-archive/ui/page-trail";

import { trailOf } from "@/lib/guides";

// The shared breadcrumbs in the page's language (D20): the package puts the
// language in front of each step's path; the page's language is read here,
// so a server page passes only its steps. A page of the menu passes its menu
// id as `crumb` instead, and gets every level of the menu (`trailOf`).
export function PageTrail(props: { steps: PageStep[] } | { crumb: string }) {
  const { lang } = useParams<{ lang?: string }>();
  const steps =
    "crumb" in props
      ? trailOf(props.crumb).map((s) => ({
          name: <FormattedMessage id={s.id} />,
          href: s.href,
        }))
      : props.steps;
  return <SharedPageTrail lang={lang} steps={steps} />;
}
