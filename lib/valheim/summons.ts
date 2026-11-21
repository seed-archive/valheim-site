import bosses from "@/lib/valheim/bosses.json";

// What each boss's altar takes, for the guides' `{{name}}` numbers. The Valheim
// generator reads it from the game (the altar's offering, one item a stand
// where the altar uses stands; the Queen's Sealbreaker recipe) into
// bosses.json; this only names each count for the guides.
const count = (boss: string) =>
  bosses.find((b) => b.key === boss)?.summon?.count ?? 0;

// Fader's bells: the fragments a bell takes, a fortress altar's fragments, and
// how often k fortresses give enough (the generator's `enough`, k = 1, 2, …).
const bell = bosses.find((b) => b.key === "Fader")?.summon;
const enough = bell?.source?.enough ?? [];
const few = enough.findIndex((s) => s > 0) + 1;
const percent = (share: number | undefined) => Math.round((share ?? 0) * 100);

export const SUMMONS = {
  deerTrophies: count("Eikthyr"),
  ancientSeeds: count("gd_king"),
  witheredBones: count("Bonemass"),
  dragonEggs: count("Dragon"),
  goblinTotems: count("GoblinKing"),
  sealbreakerFragments: count("SeekerQueen"),
  bells: count("Fader"),
  bellFragments: bell?.made?.count ?? 0,
  altarFragmentsMin: bell?.source?.min ?? 0,
  altarFragmentsMax: bell?.source?.max ?? 0,
  bellForts: few,
  bellFortsShare: percent(enough[few - 1]),
  bellFortsMore: few + 1,
  bellFortsMoreShare: percent(enough[few]),
  bellFortsAll: enough.findIndex((s) => s >= 1) + 1,
  maliciousBlood: count("FrozenKing"),
};
