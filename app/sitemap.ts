import type { MetadataRoute } from "next";

import { BASE_PATH } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:5020${BASE_PATH}`;
  return [
    "",
    "/tools",
    "/tools/map",
    "/tools/how-good-is-my-seed",
    "/bugs",
  ].map((path) => ({
    url: `${base}${path}`,
  }));
}
