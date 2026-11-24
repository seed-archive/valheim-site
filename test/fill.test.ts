// A guide's numbers: `{{name}}` plain, `{{name, plural, …}}` declined in the
// page's language (the archive's site-code.md → Text in several languages),
// and the rest of the text left alone.

import { expect, it } from "vitest";

import { fill } from "@/lib/fill";

const HIVES =
  "{{bees, plural, one {# улей} few {# улья} many {# ульев} other {# улья}}}";

it("fills a plain number in the page's language", () => {
  expect(fill("{{m}} m", { m: 2430 }, "en-GB")).toBe("2430 m");
  expect(fill("{{m}} m", { m: 3.5 }, "en-GB")).toBe("3.5 m");
  expect(fill("{{m}} м", { m: 3.5 }, "ru")).toBe("3,5 м");
  expect(fill("{{m}} м", { m: 12430 }, "ru")).toBe("12430 м");
});

it("declines the word by the number", () => {
  expect(fill(HIVES, { bees: 1 }, "ru")).toBe("1 улей");
  expect(fill(HIVES, { bees: 3 }, "ru")).toBe("3 улья");
  expect(fill(HIVES, { bees: 12 }, "ru")).toBe("12 ульев");
  expect(fill(HIVES, { bees: 21 }, "ru")).toBe("21 улей");
  expect(fill(HIVES, { bees: 1250 }, "ru")).toBe("1250 ульев");
});

it("leaves the text's own braces and apostrophes alone", () => {
  expect(fill("Moder's altar, {{m}} m {away}", { m: 5 }, "en-GB")).toBe(
    "Moder's altar, 5 m {away}",
  );
});

it("keeps a hole visible when its value is missing or its form is broken", () => {
  expect(fill("{{gone}} m", {}, "en-GB")).toBe("{{gone}} m");
  expect(fill(HIVES, {}, "ru")).toBe(HIVES);
  expect(fill("{{bees, plural, one {# hive}}}", { bees: 2 }, "en-GB")).toBe(
    "{{bees, plural, one {# hive}}}",
  );
});
