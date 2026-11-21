import { flattenMessages } from "@seed-archive/ui/localization";

import { EnabledLanguages, i18n } from "@/lib/i18n";

// The messages for a server component, by the same keys the client uses: a
// page whose data is too large to send to the browser formats its words here.
// react-intl runs only in the browser, so this fills plain `{name}` holes and
// nothing more (no plurals, no tags).
export const serverMessages = flattenMessages(i18n[EnabledLanguages.EN]);

export function serverFormat(
  id: string,
  values: Record<string, string | number> = {},
): string {
  const message = serverMessages[id] ?? id;
  return message.replace(/\{(\w+)\}/g, (hole, name: string) =>
    name in values ? String(values[name]) : hole,
  );
}
