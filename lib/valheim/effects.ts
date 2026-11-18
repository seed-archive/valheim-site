import { serverFormat } from "@/lib/i18n/server";

// What a status effect does, in words: a boss's power on the start altar, a
// mead's effect. The Valheim generator writes each effect as a key and a
// number (`catalog::power`); the words are `pages.effects.<key>`.
export type Effect = { key: string; value: unknown };

const t = (id: string, values?: Record<string, string | number>) =>
  serverFormat(`pages.effects.${id}`, values);
const damage = (k: string) => serverFormat(`pages.crafting.damage.${k}`);

// A list of damage types in words: "Chop and Mining".
const types = (list: string[]) => {
  const names = list.map(damage);
  return names.length > 1
    ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`
    : names.join("");
};
const signed = (v: number) => `${v > 0 ? "+" : "−"}${Math.abs(v)}`;

// One effect in words.
export function effectText(e: Effect) {
  switch (e.key) {
    case "tailwind":
    case "taming":
      return t(e.key);
    case "stagger":
      return t("stagger", { v: signed(-(e.value as number)) });
    case "damage":
    case "damageAll":
    case "resist": {
      const v = e.value as { types: string[]; percent: number };
      return t(e.key, { types: types(v.types), v: signed(v.percent) });
    }
    case "skill": {
      const v = e.value as { skill: string; levels: number };
      return t("skill", { skill: t(`skillName.${v.skill}`), v: signed(v.levels) });
    }
    case "healthOverTime":
    case "staminaOverTime":
    case "eitrOverTime": {
      const v = e.value as { amount: number; seconds: number };
      return t(e.key, { v: v.amount, seconds: v.seconds });
    }
    default:
      return t(e.key, { v: signed(e.value as number) });
  }
}

// Effects with their resistances of one size joined: "Blunt, Slash and
// Pierce damage taken −25 %" in one line.
export function joined(list: Effect[]) {
  const out: Effect[] = [];
  for (const e of list) {
    const v = e.value as { types: string[]; percent: number };
    const same = out.find(
      (o) =>
        o.key === "resist" &&
        e.key === "resist" &&
        (o.value as { percent: number }).percent === v.percent,
    );
    if (same) {
      const s = same.value as { types: string[]; percent: number };
      same.value = { ...s, types: [...s.types, ...v.types] };
    } else {
      out.push({ ...e });
    }
  }
  return out;
}
