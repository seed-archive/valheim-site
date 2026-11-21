import BOSSES from "./bosses.json";

// The bosses' powers as the Valheim generator read them from the game, as the
// values the biome guides name. The guides never type these numbers.
const SECONDS_A_MINUTE = 60;

type Effect = { key: string; value: unknown };

function powerOf(boss: string) {
  return BOSSES.find((entry) => entry.key === boss)?.power;
}

// The size of one effect, always positive: a plain number, the percent of a
// damage or resistance effect, or the levels of a skill effect. `type` picks
// among several effects of one key (a resistance to one kind of damage).
function effect(boss: string, key: string, type?: string): number {
  const effects = (powerOf(boss)?.effects ?? []) as Effect[];
  const found = effects.find((entry) => {
    const types = (entry.value as { types?: string[] } | null)?.types;
    return entry.key === key && (type === undefined || types?.includes(type));
  });
  const value = found?.value;
  if (typeof value === "number") {
    return Math.abs(value);
  }
  const sized = value as { percent?: number; levels?: number } | null;
  return Math.abs(Number(sized?.percent ?? sized?.levels));
}

// Every power lasts and recharges alike; Eikthyr's stands for all.
export const POWERS = {
  powerMinutes: Number(powerOf("Eikthyr")?.seconds) / SECONDS_A_MINUTE,
  powerCooldownMinutes: Number(powerOf("Eikthyr")?.cooldown) / SECONDS_A_MINUTE,
  eikthyrPowerPercent: effect("Eikthyr", "runStamina"),
  elderPowerPercent: effect("gd_king", "damage"),
  bonemassPowerPercent: effect("Bonemass", "resist", "blunt"),
  moderPowerSpeed: effect("Dragon", "speed"),
  moderPowerCarry: effect("Dragon", "carry"),
  moderPowerFrost: effect("Dragon", "resist", "frost"),
  yagluthPowerDamage: effect("GoblinKing", "damageAll"),
  yagluthPowerFarming: effect("GoblinKing", "skill"),
  yagluthPowerLightning: effect("GoblinKing", "resist", "lightning"),
  queenPowerEitr: effect("SeekerQueen", "eitrRegen"),
  queenPowerPoison: effect("SeekerQueen", "resist", "poison"),
};
