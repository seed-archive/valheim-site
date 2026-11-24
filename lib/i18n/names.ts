import { lang } from "next/root-params";

import { nameIn, type GameName, type NameTable } from "@/lib/i18n/game-names";
import de from "@/lib/valheim/names/de.json";
import es from "@/lib/valheim/names/es.json";
import ru from "@/lib/valheim/names/ru.json";

// Every table the Valheim generator writes, imported statically: this module
// runs only on the server (next/root-params), so none of it reaches the
// browser.
const TABLES: Record<string, NameTable> = { ru, es, de };

// The game's names in the page's language: `const name = await gameNames()`,
// then `name("Troll")`. Async because the page's language is (root params).
export async function gameNames(): Promise<GameName> {
  const table = TABLES[await lang()];
  return (english) => nameIn(table, english);
}
