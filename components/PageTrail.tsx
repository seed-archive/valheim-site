"use client";

import { useParams } from "next/navigation";
import {
  PageTrail as SharedPageTrail,
  type PageStep,
} from "@seed-archive/ui/page-trail";

// The shared breadcrumbs in the page's language (D20): the package puts the
// language in front of each step's path; the page's language is read here,
// so a server page passes only its steps.
export function PageTrail(props: { steps: PageStep[] }) {
  const { lang } = useParams<{ lang?: string }>();
  return <SharedPageTrail lang={lang} steps={props.steps} />;
}
