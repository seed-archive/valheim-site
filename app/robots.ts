import type { MetadataRoute } from "next";

import { SECTION_URL } from "@/lib/alternates";

// Served at /valheim/robots.txt; the domain's own /robots.txt is the portal's.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SECTION_URL}/sitemap.xml`,
  };
}
