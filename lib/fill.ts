import { createIntl } from "react-intl/server";

// A number as the guides write it, in the page's language: no thousands
// separator (the pages were written so), the language's decimal sign.
const PLAIN = {
  useGrouping: false,
  maximumFractionDigits: 20,
} as const;

// The end of a `{{…}}` whose inside starts at `start`: its braces counted, so
// an ICU form inside (`one {# hive}`) does not end it early; -1 when it is not
// closed by `}}`.
function closing(text: string, start: number): number {
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    if (text[i] === "{") {
      depth++;
    } else if (text[i] === "}") {
      if (depth === 0) {
        return text[i + 1] === "}" ? i : -1;
      }
      depth--;
    }
  }
  return -1;
}

// The numbers of a guide's text, filled from the generator's data so no number
// is typed (the archive's site-code.md → Text in several languages):
// `{{name}}` is the number; `{{name, plural, one {# hive} other {# hives}}}`
// is ICU, formatted by react-intl in the page's language, so the word agrees
// with the number. Only these marked expressions go through ICU, never the
// whole text, whose braces and apostrophes are not ICU. A name with no value,
// or a form that does not parse, stays visible, to be caught in review.
export function fill(
  text: string,
  values: Record<string, string | number>,
  locale: string,
): string {
  const number = new Intl.NumberFormat(locale, PLAIN);
  let out = "";
  let at = 0;
  for (;;) {
    const open = text.indexOf("{{", at);
    if (open < 0) {
      return out + text.slice(at);
    }
    const end = closing(text, open + 2);
    if (end < 0) {
      out += text.slice(at, open + 2);
      at = open + 2;
      continue;
    }
    const hole = text.slice(open, end + 2);
    const inner = text.slice(open + 2, end).trim();
    out += text.slice(at, open);
    at = end + 2;
    if (/^\w+$/.test(inner)) {
      const value = values[inner];
      out +=
        value === undefined
          ? hole
          : typeof value === "number"
            ? number.format(value)
            : value;
      continue;
    }
    // `#` printed as the plain number, not the grouped one ICU prints.
    const name = inner.split(",")[0].trim();
    const message = `{${inner.replace(/#/g, `{${name}, number, plain}`)}}`;
    let failed = false;
    const intl = createIntl({
      locale,
      messages: { hole: message },
      formats: { number: { plain: PLAIN } },
      onError: () => {
        failed = true;
      },
    });
    const formatted = intl.formatMessage({ id: "hole" }, values);
    out += failed || !(name in values) ? hole : formatted;
  }
}
