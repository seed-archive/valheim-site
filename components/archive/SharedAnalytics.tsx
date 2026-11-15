"use client";

import { Analytics } from "@vercel/analytics/react";
import { useParams, usePathname } from "next/navigation";

import { BASE_PATH, SHARED_ANALYTICS } from "@/lib/site";

// The page's route, as the Next.js flavour of the package computes it: each
// segment that is a value of a dynamic parameter stands as `[name]`.
function routeOf(
  pathname: string,
  params: Record<string, string | string[] | undefined>,
) {
  const names = new Map<string, string>();
  for (const [name, value] of Object.entries(params)) {
    for (const one of Array.isArray(value) ? value : [value]) {
      if (one) {
        names.set(one, `[${name}]`);
      }
    }
  }
  return pathname
    .split("/")
    .map((segment) => names.get(decodeURIComponent(segment)) ?? segment)
    .join("/");
}

const prefixed = (path: string) => `${BASE_PATH}${path === "/" ? "" : path}`;

// The one counter of Seed Archive. Every path is given: the project's own config
// would send views, events, and sessions to this project's counter instead of the
// shared one. The page's path and route carry the section's prefix, since the
// pathname Next.js reports leaves it out and the shared report must tell this
// section's pages from the portal's and the other games'.
export function SharedAnalytics() {
  const pathname = usePathname();
  const params = useParams() ?? {};
  return (
    <Analytics
      framework="next"
      scriptSrc={`${SHARED_ANALYTICS}/script.js`}
      endpoint={SHARED_ANALYTICS}
      viewEndpoint={`${SHARED_ANALYTICS}/view`}
      eventEndpoint={`${SHARED_ANALYTICS}/event`}
      sessionEndpoint={`${SHARED_ANALYTICS}/session`}
      path={prefixed(pathname)}
      route={prefixed(routeOf(pathname, params))}
    />
  );
}
