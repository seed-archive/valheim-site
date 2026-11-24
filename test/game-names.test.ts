// The game's names in the page's language: the table's text when it has one,
// the English text otherwise, and English itself, which has no table.

import { expect, it } from "vitest";

import { nameIn } from "@/lib/i18n/game-names";
import ru from "@/lib/valheim/names/ru.json";

it("gives the game's own translation", () => {
  expect(nameIn(ru, "Troll")).toBe("Тролль");
  expect(nameIn({ Forge: "Кузница" }, "Forge")).toBe("Кузница");
});

it("keeps the English text when the table has no entry", () => {
  expect(nameIn({ Forge: "Кузница" }, "Troll")).toBe("Troll");
});

it("keeps the English text on an English page", () => {
  expect(nameIn(undefined, "Troll")).toBe("Troll");
});
