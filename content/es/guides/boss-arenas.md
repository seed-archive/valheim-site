# Arenas de los jefes

**¿Cómo construyo una arena de jefe en la que no aparezca nada?** Los muros no cuentan: rodea el altar de fuegos y estaciones y rompe todo nido dentro. Un anillo lo frena todo salvo un nido.

## ¿Qué piezas convierten el suelo en una base?

Un jefe pelea contigo en el suelo que tú eliges para él. El juego nunca cuenta tus muros, tus suelos ni cuánto construiste: una base es solo el suelo dentro de las áreas que llevan ciertas piezas. Un fuego lleva la suya encendido o apagado, así que una Fogata apagada rodea un altar igual de bien que una que arde. Ponlo todo en el suelo: el área de una estación es una columna alta, pero la de un fuego, una cama o una antorcha es una esfera. Las [estaciones de trabajo](/catalog/crafting-stations) y los fuegos de [Otras piezas de construcción](/catalog/other-pieces) dan sus materiales.

| Pieza | Rodea el suelo a su alrededor, m | Para cubrir una arena de {{arenaRadius}} m, unas |
|---|---|---|
| Chimenea, Hoguera | {{baseRadiusHearth}} | {{ringPiecesHearth}} |
| Fogata | {{baseRadiusCampfire}} | {{ringPiecesCampfire}} |
| Banco de trabajo, Forja, cualquier estación y horno | {{baseRadiusWorkbench}} | {{ringPiecesWorkbench}} |
| Cama, antorcha de pie, Brasero de pie | {{baseRadiusBed}} | {{ringPiecesBed}} |
| Estatua guardiana, Portal | {{baseRadiusPortal}} | {{ringPiecesPortal}} |
| Extractor de savia, Vela de resina | {{baseRadiusCandle}} | {{ringPiecesCandle}} |

La última columna es una suma nuestra: los menos círculos que cubren el disco de la arena. Donde el suelo se curva, añade unos cuantos.

## ¿Qué frena un anillo?

Una criatura tiene cuatro puertas al mundo. Tres de ellas comprueban si dan a una base y se quedan cerradas si es así; la cuarta, un nido, nunca lo comprueba.

| De dónde viene una criatura | Dentro del anillo |
|---|---|
| Las apariciones del mundo abierto | frenadas; de todos modos nunca aparecen a menos de {{spawnMinM}} m de ti |
| Las apariciones de un asalto | frenadas |
| Un generador colocado (el de un campamento, una torre, la puerta de una cripta) | callado mientras el anillo lo cubre, de vuelta en cuanto el anillo desaparece |
| Un nido (un Nido de grisucios, un Cúmulo de huesos malignos, un generador de los carbonizados) | sigue generando |

Un anillo deja fuera las apariciones, no a los que caminan. Los asaltantes aparecen a {{raidMinM}}–{{raidMaxM}} m de ti y simplemente entran paseando. Y {{raidBasePieces, plural, one {# pieza de base} other {# piezas de base}}} a menos de {{raidBaseM}} m de ti es lo que permite que empiece siquiera un asalto cerca de la base ([Asaltos](/catalog/events)): el anillo que construyes es una base, y una base es una invitación. Pelea dentro de él, y vigila con un ojo lo que llega desde fuera.

> **Para speedrunners**, la arena sobra: un Banco de trabajo junto al altar, construido antes de la invocación, mantiene las apariciones del mundo abierto fuera de su suelo durante toda la pelea, y la partida sigue adelante.

## ¿Qué no frena nunca un anillo, junto a cada altar?

Un nido genera dentro de una base como si no hubieras construido nada, así que rompe todos los que tengas al alcance antes de colocar la primera pieza. El mundo los planta junto a dos altares. Hay un Nido de grisucios a menos de {{arenaReach}} m del altar del [Sabio](/catalog/bosses#the-elder) en el {{altarNestElder}} % de las semillas, el más cercano por lo general a {{altarNestElderM}} m ({{altarNestElderMLow}}–{{altarNestElderMHigh}} m en la mitad central de las semillas). Hay un generador de los carbonizados a menos de {{arenaReach}} m del de [Fader](/catalog/bosses#fader), en la [Tierra de Ceniza](/guides/ashlands), en el {{altarNestFader}} % de las semillas, el más cercano a {{altarNestFaderM}} m ({{altarNestFaderMLow}}–{{altarNestFaderMHigh}} m).

Tuétano tiene el suyo: hay un Cúmulo de huesos malignos a menos de {{arenaReach}} m de su altar en todas las semillas salvo el {{bonemassNoPileReach}} %. El [mapa de semillas](/tools/map) muestra lo que espera alrededor de tus propios altares. Y un Nido de grisucios suelta al romperse las mismísimas Semillas milenarias con las que se invoca al Sabio, así que destrozarlo no es una tarea; es ir de compras.

> **Sin muertes**, el orden es todo el plan: los nidos, luego el anillo, luego la invocación, un día que puedas permitírtelo. En un [mundo más difícil](/guides/hardcore), lo que sale de un nido que se te escapó pega más fuerte que en Normal.

## ¿Qué generadores colocados calla el anillo?

Todo lo demás que vive junto a un altar sale de un generador colocado, y un anillo sobre uno lo mantiene callado mientras el anillo siga en pie. Cuanto más cerca está, más de tu arena reclama.

| Desde el altar, m | Por lo general | Mitad central de las semillas |
|---|---|---|
| [Tuétano](/catalog/bosses#bonemass): la cripta hundida más cercana, en el [Pantano](/guides/swamp) | {{bonemassCryptM}} | {{bonemassCryptMLow}}–{{bonemassCryptMHigh}} |
| [Moder](/catalog/bosses#moder): el tercer nido de draco | {{moderNestM}} | {{moderNestMLow}}–{{moderNestMHigh}} |
| [Yagluth](/catalog/bosses#yagluth): la primera aldea fuling | {{yagluthVillageM}} | {{yagluthVillageMLow}}–{{yagluthVillageMHigh}} |
| [La Reina](/catalog/bosses#the-queen): la primera mina infestada | {{queenMineM}} | {{queenMineMLow}}–{{queenMineMHigh}} |
| [Fader](/catalog/bosses#fader): la primera fortaleza carbonizada | {{faderFortM}} | {{faderFortMLow}}–{{faderFortMHigh}} |

Chart: spread

Fuera del alcance del anillo, un generador sigue generando. Dentro, el generador se calla, pero lo que ya soltó sigue fuera. Limpia el lugar y luego rodéalo.

> **Sin prisas**, un Portal cumple doble función: el camino a casa y {{baseRadiusPortal}} m de suelo rodeado. Dos portales a ambos lados de la arena con una Cama entre ellos forman un anillo que ibas a construir de todos modos.

## ¿Hay suelo donde construir?

El agua no rodea nada ni sostiene ningún muro, así que una arena medio bajo el mar es media arena. Solo el Pantano de Tuétano tiene ese problema: por lo general, el {{altarWaterBonemass}} % del disco de {{arenaRadius}} m alrededor de su altar está por debajo del nivel del mar ({{altarWaterBonemassLow}}–{{altarWaterBonemassHigh}} % en la mitad central de las semillas), mientras que los demás altares, por lo general, están en seco. Levanta el suelo con la Azada antes del anillo, o rodea el lado seco y pelea desde allí.

> **En partida inversa**, Fader es el primer altar que rodeas: los {{baseRadiusCampfire}} m de una Fogata son el primer anillo de la arena, construido con la piedra y la madera que trajiste.

## ¿A qué altura puede llegar un muro o una atalaya?

Cada pieza sostiene solo lo que le pasa la pieza de abajo, y cada material pasa menos en cada paso. Apila piezas de altura completa de un solo material en vertical desde el suelo y llegan a esta altura; empieza sobre una roca o un árbol y la cuenta vuelve a empezar desde ahí.

| Material | Llega a, m |
|---|---|
| Madera | {{buildHeightWood}} |
| Piedra | {{buildHeightStone}} |
| Mármol negro | {{buildHeightMarble}} |
| Madera resistente | {{buildHeightCoreWood}} |
| Piedra cenicienta | {{buildHeightGrausten}} |
| Duela, del Norte profundo | {{buildHeightStave}} |
| Hierro | {{buildHeightIron}} |

Las alturas son sumas nuestras sobre la regla de soporte del juego, para una pila recta; un brazo que se extiende hacia un lado llega menos alto. Las páginas de construcción en [madera](/catalog/wood-building), en [piedra](/catalog/stone-building) y del [Norte profundo](/catalog/deep-north-building) dan cada pieza. En la Tierra de Ceniza, la ceniza se come cualquier pieza sin techo, así que pon techo al muro de Fader.

> **Sin mapa**, la atalaya es tu mapa: una torre de hierro sobre un altar te muestra el suelo de la arena y los lugares a su alrededor antes de construir, y sus antorchas rodean su propio pie.

Con los nidos rotos y el anillo colocado, cada jefe pelea contigo a solas.
