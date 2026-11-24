// The game's own names in the page's language (the owner, 2026-11-24): the
// Valheim generator writes the data in English and, beside it,
// lib/valheim/names/<locale>.json, the game's translation of each English
// name or term, built from the game's localization by key. A name with no
// entry stays English. Server code reads it with `gameNames()`
// (./names.ts), client code with `useGameName()` (./useGameName.ts).

// One language's table: the English text, the game's text in that language.
export type NameTable = Record<string, string>;

// A name or term of the game in the page's language, from its English text.
export type GameName = (english: string) => string;

// A name in a table's language, or the English one when the table has none
// (English itself has no table).
export const nameIn = (table: NameTable | undefined, english: string) =>
  table?.[english] ?? english;
