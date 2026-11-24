import type { Metadata } from "next";

import { alternates } from "@/lib/alternates";
import { serverIntl } from "@/lib/i18n/server";

// A page's title and description in the page's language, the messages
// `<key>.title` and `<key>.description`, with its alternates. A guide passes
// its own description, the answer of its bold question (`readGuide`'s fact).
export async function pageMetadata(
  key: string,
  path: string,
  description?: string,
): Promise<Metadata> {
  const intl = await serverIntl();
  return {
    title: intl.format(`${key}.title`),
    description: description ?? intl.format(`${key}.description`),
    alternates: alternates(path),
  };
}
