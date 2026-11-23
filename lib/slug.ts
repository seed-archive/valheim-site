// A heading's id from its words, so any section can be linked (the shared
// seo.md, Links).
// One style for every anchor of the section (the owner, 2026-11-23): letters
// without their accents (Mörkhalla → morkhalla), an apostrophe dropped
// (Queen's → queens), every other run of signs one hyphen.
export function slug(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
