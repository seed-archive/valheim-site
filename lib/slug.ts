// A heading's id from its words, so any section can be linked (the shared
// seo.md, Links).
export function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
