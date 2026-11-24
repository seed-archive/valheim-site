import type { ServerIntl } from "@/lib/i18n/server";

// What a status effect does, in words: a boss's power on the start altar, a
// mead's effect. The Valheim generator writes each effect as a key and a
// number (`catalog::power`); the words are `pages.effects.<key>`, in the
// language of the formatter given.
export type Effect = { key: string; value: unknown };

const effects =
  (intl: ServerIntl) =>
  (id: string, values?: Record<string, string | number>) =>
    intl.format(`pages.effects.${id}`, values);

const signed = (v: number) => `${v > 0 ? "+" : "−"}${Math.abs(v)}`;

// One effect in words.
export function effectText(e: Effect, intl: ServerIntl) {
  const t = effects(intl);
  // A list of damage types in words: "Chop and Mining".
  const types = (list: string[]) =>
    intl.list(list.map((k) => intl.format(`pages.crafting.damage.${k}`)));
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
      return t("skill", {
        skill: t(`skillName.${v.skill}`),
        v: signed(v.levels),
      });
    }
    case "healthUpFront":
    case "staminaUpFront":
    case "eitrUpFront":
    case "slowFall":
    case "shield":
    case "missingHealth":
      return t(e.key, { v: e.value as number });
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

// A piece of gear's effects, each with when it holds (the Valheim generator's
// `gear_effects`): while worn, with the set, at full adrenaline, on a hit.
export type GearEffect = {
  when: "equip" | "set" | "adrenaline" | "hit" | "attack";
  name: string | null;
  seconds: number | null;
  chance: number | null;
  effects: Effect[];
};

// When a gear effect holds, in words.
export function gearWhen(g: GearEffect, intl: ServerIntl) {
  const t = effects(intl);
  if (g.when === "hit") {
    return g.chance !== null && g.chance < 100
      ? t("when.hitChance", { name: g.name ?? "", chance: g.chance })
      : t("when.hit", { name: g.name ?? "" });
  }
  // A trinket whose effect is given at once (Brimstone's health and stamina)
  // lasts the game's one second: no time is said.
  if (g.when === "adrenaline" && (g.seconds ?? 0) <= 1) {
    return t("when.adrenalineNow");
  }
  return t(`when.${g.when}`, { seconds: g.seconds ?? 0 });
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
