// A damage multiplier as every catalogue page writes it (the owner,
// 2026-11-23: a weakness in percent, a true minus, no space before the sign
// of percent; a dash for nothing): 1.5 → "+50%", 0.5 → "−50%", 0 → immune,
// 1 → "—".

import { serverFormat } from "@/lib/i18n/server";

export function modifierText(m: number): string {
  if (m === 1) {
    return "—";
  }
  if (m === 0) {
    return serverFormat("pages.damage.immune");
  }
  const percent = Math.round(Math.abs(m - 1) * 100);
  return `${m > 1 ? "+" : "−"}${percent}%`;
}
