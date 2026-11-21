# Hard, Very hard and Hardcore

**What does Very hard or the Hardcore preset change?** You hit softer and they hit harder, stars come oftener, raids sooner, and a Hardcore death takes every skill and all you carry. Their health stays put.

## What does each Combat setting change?

Choose a harder world and one slider decides how hard. It turns four dials at once: your damage, theirs, their speed and size, and the odds that each step of a creature's level comes up starred. Here is the catch: health never moves. A troll on Very hard has exactly the health it has on Normal; you just swing at it for longer while it swings back harder. The extra speed and size stay outside, too: in a dungeon's rooms, creatures keep their usual pace.

| Combat setting | Your damage | Their damage | Their speed and size | Star chance a step |
|---|---|---|---|---|
| Very easy | {{combatPlayerDamageVeryEasy}}% | {{combatEnemyDamageVeryEasy}}% | {{combatSpeedSizeVeryEasy}}% | {{combatLevelUpVeryEasy}}% |
| Easy | {{combatPlayerDamageEasy}}% | {{combatEnemyDamageEasy}}% | {{combatSpeedSizeEasy}}% | {{combatLevelUpEasy}}% |
| Normal | {{combatPlayerDamageNormal}}% | {{combatEnemyDamageNormal}}% | {{combatSpeedSizeNormal}}% | {{combatLevelUpNormal}}% |
| Hard | {{combatPlayerDamageHard}}% | {{combatEnemyDamageHard}}% | {{combatSpeedSizeHard}}% | {{combatLevelUpHard}}% |
| Very hard | {{combatPlayerDamageVeryHard}}% | {{combatEnemyDamageVeryHard}}% | {{combatSpeedSizeVeryHard}}% | {{combatLevelUpVeryHard}}% |

Read the two damage columns together. On Very hard your blow lands at {{combatPlayerDamageVeryHard}}% and theirs at {{combatEnemyDamageVeryHard}}%, against {{combatPlayerDamageNormal}}% each on Normal: every fight lasts longer, and every blow you fail to block costs double.

> **Speedrunners** who set Easy or Very easy deal more and take less, and stars come no more often than on Normal.

## What do the presets switch on?

A preset is a handful of sliders pushed at once, and the names hide how different they are. Hard only sharpens the fights and brings raids more often. Hardcore takes all of it: the hardest combat, more raids, the death that keeps nothing, no map and no boss portals. Immersive never touches a sword; it takes your map and your portals away and adds fire hazards.

| Preset | Combat | Raids | Death penalty | Map | Portals |
|---|---|---|---|---|---|
| Normal | Normal | Normal | Normal | On | On |
| Hard | Hard | More | Normal | On | On |
| Hardcore | Very hard | More | Hardcore | Off | No boss portals |
| Immersive | Normal | Normal | Normal | Off | No portals |

None of it is locked. After a preset you can still move any slider by hand, so a world can fight on Very hard and keep its map.

> **With no map** and **With no portals**, the Hardcore and Immersive presets already set them; what playing that way asks of you is on [No death, no map, no portals](/guides/other-rules).

## What does the Hardcore death take?

Everything. Every item on you goes, worn or not, and every skill falls back to nothing. If that is too steep, the Death penalty's Hard setting stops one step short: it burns what you carry but leaves what you wear, and it bleeds your skills faster than Normal does.

> **With no death** the death penalty no longer matters, since the first death ends the run anyway; what matters is the Combat setting above and the stars below.

## How often do raids come?

The world keeps a clock. Every so often it rolls, and a roll may bring a raid to your door. More raids, as Hard and Hardcore set them, turn both screws: the rolls come closer together and each one hits more often. Which raid it will be, and until which boss, is on the [Raids](/catalog/events) page. One small mercy: a raid's creatures come plain, except the Ticks of the Gjall's raid and the escorts of Hildir's.

| Raids setting | Minutes between rolls | Chance a roll brings a raid |
|---|---|---|
| Normal | {{raidIntervalNormal}} | {{raidChanceNormal}}% |
| More | {{raidIntervalMore}} | {{raidChanceMore}}% |
| Much more | {{raidIntervalMuchMore}} | {{raidChanceMuchMore}}% |

On More the world rolls every {{raidIntervalMore}} minutes instead of every {{raidIntervalNormal}}, and a roll hits {{raidChanceMore}}% of the time instead of {{raidChanceNormal}}%. Wall the home from the first day: the first army, Eikthyr's, waits for no boss to fall.

> **At leisure**, a builder who would rather build than defend can set Raids to Less, Much less or None.

## How often do creatures come starred?

Every creature is born plain and climbs one star at a time. Each step is a fresh roll at its source's chance, and the first miss ends the climb; a second star waits only for creatures whose range allows it. Hard and Very hard tilt every source alike: the open world, a placed spawner, a nest. And the sources are far from equal. A nest stars its creatures more often than the open world does, the Charred spawners less often, and the starred Ticks' spawners most of all.

On Normal:

| Where it comes from | One star | Two stars |
|---|---|---|
| The open world | {{starOneOpenWorldNormal}}% | {{starTwoOpenWorldNormal}}% |
| A placed spawner | {{starOneSpawnerNormal}}% | {{starTwoSpawnerNormal}}% |
| A nest or bone pile | {{starOneNestNormal}}% | {{starTwoNestNormal}}% |
| A Charred spawner | {{starOneCharredNormal}}% | {{starTwoCharredNormal}}% |
| A starred Ticks' spawner | {{starOneTicksNormal}}% | {{starTwoTicksNormal}}% |

Chart: share

On Hard:

| Where it comes from | One star | Two stars |
|---|---|---|
| The open world | {{starOneOpenWorldHard}}% | {{starTwoOpenWorldHard}}% |
| A placed spawner | {{starOneSpawnerHard}}% | {{starTwoSpawnerHard}}% |
| A nest or bone pile | {{starOneNestHard}}% | {{starTwoNestHard}}% |
| A Charred spawner | {{starOneCharredHard}}% | {{starTwoCharredHard}}% |
| A starred Ticks' spawner | {{starOneTicksHard}}% | {{starTwoTicksHard}}% |

Chart: share

On Very hard:

| Where it comes from | One star | Two stars |
|---|---|---|
| The open world | {{starOneOpenWorldVeryHard}}% | {{starTwoOpenWorldVeryHard}}% |
| A placed spawner | {{starOneSpawnerVeryHard}}% | {{starTwoSpawnerVeryHard}}% |
| A nest or bone pile | {{starOneNestVeryHard}}% | {{starTwoNestVeryHard}}% |
| A Charred spawner | {{starOneCharredVeryHard}}% | {{starTwoCharredVeryHard}}% |
| A starred Ticks' spawner | {{starOneTicksVeryHard}}% | {{starTwoTicksVeryHard}}% |

Chart: share

Some ground is meaner on any setting. Darker stretches of the Meadows, the rocky and pine stretches of the Black Forest, the Mountain's wolf and drake ground, stretches of the Plains, the Fulings' ground among them, all roll stars more often, and a Mountain fortress worst of all. Hildir plays by her own rules: in her Smouldering Tomb and Howling Cavern, and among the escorts of her raids, every creature wears at least one star, whatever the setting. Night does not change the roll, and neither does a fallen boss. Some creatures, though, keep a night spawn of their own that allows more stars; the [Creatures](/catalog/creatures) page names them under each creature.

## What does a star do?

A star is a second creature hiding in the first. Each one adds the creature's whole health again and half its damage on top, and the Combat setting multiplies over that: a two-star creature on Very hard hits harder than either would alone.

| Stars | Health | Damage |
|---|---|---|
| None | {{starHealth0}}% | {{starDamage0}}% |
| One | {{starHealth1}}% | {{starDamage1}}% |
| Two | {{starHealth2}}% | {{starDamage2}}% |

What a star does not give is speed: a starred troll lumbers like a plain one, and stepping out of its reach still works. Meet each danger with its resistance on: the [meads](/catalog/meads) list them, and [How to kill each boss](/catalog/bosses) shows each boss the way that keeps you out of its reach. Most bosses hit with pierce, and the Swamp's [Root Harnesk](/guides/swamp#how-do-i-get-the-roots-for-the-root-harnesk) halves it.

## Where does the open world bring no stars?

Close to the world's centre you get a grace zone. A few creatures of the open world never come starred there, however hard the world is; past their distance they roll like everyone else. Every other creature of the open world can come starred anywhere, and spawners and nests ignore distance altogether.

| Creature | No star within, m of the centre |
|---|---|
| Troll | {{starMinDistanceTroll}} |
| Greydwarf Brute, by night | {{starMinDistanceBrute}} |
| Boar | {{starMinDistanceBoar}} |
| Neck | {{starMinDistanceNeck}} |

> **On a reverse run**, the far north lies well beyond every one of these distances: there every creature of the open world can come starred from the first night.

A harder world asks for a safer fight, and the safest is the one where nothing else joins in: ring the altar first, as [Boss arenas](/guides/boss-arenas) shows. One road is left untried: the whole saga told backwards, the late biomes first and Eikthyr last, in the [Reverse run](/guides/reverse-run).
