import type { MetadataRoute } from "next";

import { BASE_PATH } from "@/lib/site";

const SITE = `https://seedarchive.gg${BASE_PATH}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/map"].map((path) => ({ url: `${SITE}${path}` }));
}
