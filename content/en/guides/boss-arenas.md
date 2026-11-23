# Boss arenas

**How do I build a boss arena that nothing spawns into?** Walls count for nothing: ring the altar with fires and stations and break every nest inside. A ring stops all but a nest.

## Which pieces make the ground a base?

A boss fights you on the ground you choose for it. The game never counts your walls, your floors or how much you built: a base is only the ground inside the areas certain pieces carry. A fire carries one lit or cold, so an unlit campfire rings an altar as well as a roaring one. Keep it all on the ground: a station's area is a tall column, but a fire's, a bed's or a torch's is a sphere. The [crafting stations](/catalog/crafting-stations) and the fires on [Other build pieces](/catalog/other-pieces) give their materials.

| Piece | Rings the ground round it, m | To cover an arena of {{arenaRadius}} m, about |
|---|---|---|
| Hearth, bonfire | {{baseRadiusHearth}} | {{ringPiecesHearth}} |
| Campfire | {{baseRadiusCampfire}} | {{ringPiecesCampfire}} |
| Workbench, forge, every station and smelter | {{baseRadiusWorkbench}} | {{ringPiecesWorkbench}} |
| Bed, standing torch, brazier | {{baseRadiusBed}} | {{ringPiecesBed}} |
| Ward, portal | {{baseRadiusPortal}} | {{ringPiecesPortal}} |
| Sap extractor, resin candle | {{baseRadiusCandle}} | {{ringPiecesCandle}} |

The last column is our own sum: the fewest circles that cover the arena's disc. Where the ground bends, add a few.

## What does a ring stop?

A creature has four doors into the world. Three of them check whether they open onto a base and stay shut if they do; the fourth, a nest, never checks.

| Where a creature comes from | Inside the ring |
|---|---|
| The open world's spawns | stopped; they never come within {{spawnMinM}} m of you anyway |
| A raid's spawns | stopped |
| A placed spawner (a camp's, a tower's, a crypt's door) | silent while the ring covers it, back once the ring is gone |
| A nest (a Greydwarf nest, a bone pile, a Charred spawner) | keeps spawning |

A ring keeps spawns out, not walkers. Raiders appear {{raidMinM}}–{{raidMaxM}} m from you and simply stroll in. And {{raidBasePieces}} base pieces within {{raidBaseM}} m of you are what lets a near-base raid start at all ([Raids](/catalog/events)): the ring you build is a base, and a base is an invitation. Fight inside it, and keep one eye on what comes from beyond it.

> **Speedrunners** skip the arena: one workbench by the altar, built before the summon, keeps the open world's spawns off its ground for the whole fight, and the run walks on.

## What does a ring never stop, by each altar?

A nest spawns inside a base as if you had built nothing, so break every one in reach before you lay the first piece. The world plants them by two altars. A Greydwarf nest stands within {{arenaReach}} m of [the Elder](/catalog/bosses#the-elder)'s altar on {{altarNestElder}}% of seeds, the nearest {{altarNestElderM}} m off as a rule ({{altarNestElderMLow}}–{{altarNestElderMHigh}} m on the middle half of seeds). A Charred spawner stands within {{arenaReach}} m of [Fader](/catalog/bosses#fader)'s, in the [Ashlands](/guides/ashlands), on {{altarNestFader}}% of seeds, the nearest {{altarNestFaderM}} m off ({{altarNestFaderMLow}}–{{altarNestFaderMHigh}} m).

Bonemass has his own: a bone pile stands within {{arenaReach}} m of his altar on all but {{bonemassNoPileReach}}% of seeds. The [seed map](/tools/map) shows what waits round your own altars. And a Greydwarf nest breaks into the very ancient seeds the Elder is summoned with, so smashing it is no chore; it is shopping.

> **With no death**, the order is the whole plan: nests, then the ring, then the summon, on a day you can spare. On a [harder world](/guides/hardcore) whatever crawls out of a nest you missed hits harder than on Normal.

## Which placed spawners does the ring silence?

Everything else that lives by an altar comes out of a placed spawner, and a ring over one keeps it quiet for as long as the ring stands. The closer it sits, the more of your arena it claims.

| From the altar, m | As a rule | Middle half of seeds |
|---|---|---|
| [Bonemass](/catalog/bosses#bonemass): the nearest Sunken Crypt, in the [Swamp](/guides/swamp) | {{bonemassCryptM}} | {{bonemassCryptMLow}}–{{bonemassCryptMHigh}} |
| [Moder](/catalog/bosses#moder): the third drake nest | {{moderNestM}} | {{moderNestMLow}}–{{moderNestMHigh}} |
| [Yagluth](/catalog/bosses#yagluth): the first Fuling village | {{yagluthVillageM}} | {{yagluthVillageMLow}}–{{yagluthVillageMHigh}} |
| [The Queen](/catalog/bosses#the-queen): the first Infested Mine | {{queenMineM}} | {{queenMineMLow}}–{{queenMineMHigh}} |
| [Fader](/catalog/bosses#fader): the first Charred Fortress | {{faderFortM}} | {{faderFortMLow}}–{{faderFortMHigh}} |

Chart: spread

Out of the ring's reach, a spawner keeps spawning. Within it, the spawner falls silent, but whatever it already let out stays out. Clear the place, then ring it.

> **At leisure**, a portal pulls double duty: the road home and {{baseRadiusPortal}} m of ringed ground. Two portals across the arena with a bed between them make a ring you were going to build anyway.

## Is there ground to build on?

Water rings nothing and holds no wall, so an arena half under the sea is half an arena. Only Bonemass's Swamp has that problem: as a rule {{altarWaterBonemass}}% of the disc of {{arenaRadius}} m round his altar lies under the sea's level ({{altarWaterBonemassLow}}–{{altarWaterBonemassHigh}}% on the middle half of seeds), while the other altars, as a rule, stand dry. Raise the ground with the hoe before the ring, or ring the dry side and fight from there.

> **On a reverse run**, Fader is the first altar you ring: a campfire's {{baseRadiusCampfire}} m are the arena's first ring, built from the stone and wood you carried in.

## How high can a wall or a lookout stand?

Every piece holds only what the piece below passes up, and each material passes up less at every step. Stack full-height pieces of one material straight up from the ground and they stand this high; start on a rock or a tree and the count begins again from there.

| Material | Stands, m |
|---|---|
| Wood | {{buildHeightWood}} |
| Stone | {{buildHeightStone}} |
| Black marble | {{buildHeightMarble}} |
| Core wood | {{buildHeightCoreWood}} |
| Grausten | {{buildHeightGrausten}} |
| Stave, of the Deep North | {{buildHeightStave}} |
| Iron | {{buildHeightIron}} |

The heights are our own sums on the game's rule of support, for a straight stack; an arm reaching sideways stands shorter. The [wood](/catalog/wood-building), [stone](/catalog/stone-building) and [Deep North](/catalog/deep-north-building) building pages give each piece. In the Ashlands, ash eats any piece without a roof, so roof Fader's wall.

> **With no map**, the lookout is your map: an iron tower over an altar shows the arena's ground and the places round it before you build, and its torches ring its own foot.

With the nests broken and the ring laid, every boss fights you alone.
