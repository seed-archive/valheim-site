# Difícil, Muy difícil y Brutal

**¿Qué cambia «Muy difícil» o el preajuste «Brutal»?** Pegas más flojo y ellos más fuerte, hay más estrellas, asaltos antes y morir en «Brutal» se lleva cada habilidad y lo que cargas. Su salud no cambia.

## ¿Qué cambia cada ajuste de «Combate»?

Elige un mundo más difícil y un solo deslizador decide cuánto. Gira cuatro diales a la vez: tu daño, el suyo, su velocidad y su tamaño, y la probabilidad de que cada paso del nivel de una criatura le dé una estrella. Aquí está la trampa: la salud nunca se mueve. Un trol en «Muy difícil» tiene exactamente la salud que tiene en «Normal»; solo que tú le golpeas durante más tiempo mientras él te devuelve los golpes más fuerte. La velocidad y el tamaño de más se quedan fuera, además: en las salas de una mazmorra, las criaturas conservan su paso de siempre.

| Ajuste de «Combate» | Tu daño | Su daño | Su velocidad y tamaño | Probabilidad de estrella por paso |
|---|---|---|---|---|
| Muy fácil | {{combatPlayerDamageVeryEasy}} % | {{combatEnemyDamageVeryEasy}} % | {{combatSpeedSizeVeryEasy}} % | {{combatLevelUpVeryEasy}} % |
| Fácil | {{combatPlayerDamageEasy}} % | {{combatEnemyDamageEasy}} % | {{combatSpeedSizeEasy}} % | {{combatLevelUpEasy}} % |
| Normal | {{combatPlayerDamageNormal}} % | {{combatEnemyDamageNormal}} % | {{combatSpeedSizeNormal}} % | {{combatLevelUpNormal}} % |
| Difícil | {{combatPlayerDamageHard}} % | {{combatEnemyDamageHard}} % | {{combatSpeedSizeHard}} % | {{combatLevelUpHard}} % |
| Muy difícil | {{combatPlayerDamageVeryHard}} % | {{combatEnemyDamageVeryHard}} % | {{combatSpeedSizeVeryHard}} % | {{combatLevelUpVeryHard}} % |

Lee juntas las dos columnas de daño. En «Muy difícil» tu golpe impacta al {{combatPlayerDamageVeryHard}} % y el suyo al {{combatEnemyDamageVeryHard}} %, frente al {{combatPlayerDamageNormal}} % de cada uno en «Normal»: cada pelea dura más, y cada golpe que no bloqueas cuesta el doble.

> **Para speedrunners**: con «Fácil» o «Muy fácil» infliges más y recibes menos, y las estrellas no salen más a menudo que en «Normal».

## ¿Qué activan los preajustes?

Un preajuste es un puñado de deslizadores movidos a la vez, y los nombres ocultan lo distintos que son. «Difícil» solo endurece las peleas y trae asaltos más a menudo. «Brutal» se lo lleva todo: el combate más duro, más asaltos, la muerte que no conserva nada, sin mapa y sin portales con jefes. «Inmersivo» nunca toca una espada; te quita el mapa y los portales y añade peligros de incendio.

| Preajuste | Combate | Asaltos | Penalización por muerte | Mapa | Portales |
|---|---|---|---|---|---|
| Normal | Normal | Normal | Normal | Sí | Sí |
| Difícil | Difícil | Más | Normal | Sí | Sí |
| Brutal | Muy difícil | Más | Brutal | No | Sin portales con jefes |
| Inmersivo | Normal | Normal | Normal | No | Sin portales |

Nada de esto queda bloqueado. Tras elegir un preajuste aún puedes mover a mano cualquier deslizador, así que un mundo puede pelear en «Muy difícil» y conservar su mapa.

> **Sin mapa** y **Sin portales**: los preajustes «Brutal» e «Inmersivo» ya los activan; lo que te exige jugar así está en [Sin muertes, sin mapa, sin portales](/guides/other-rules).

## ¿Qué se lleva la muerte de «Brutal»?

Todo. Cada objeto que llevas encima desaparece, equipado o no, y cada habilidad vuelve a cero. Si eso es demasiado duro, el ajuste «Difícil» de la «Penalización por muerte» se queda a un paso: quema lo que cargas pero respeta lo que llevas puesto, y desangra tus habilidades más deprisa que «Normal».

> **Sin muertes**, la penalización por muerte ya no importa, porque la primera muerte termina la partida de todos modos; lo que importa es el ajuste de «Combate» de arriba y las estrellas de abajo.

## ¿Cada cuánto llegan los asaltos?

El mundo lleva un reloj. Cada cierto tiempo tira los dados, y una tirada puede traer un asalto a tu puerta. «Más» asaltos, como los ponen «Difícil» y «Brutal», aprieta las dos tuercas: las tiradas llegan más seguidas y cada una acierta más a menudo. Qué asalto será, y hasta qué jefe, está en la página [Asaltos](/catalog/events). Un pequeño consuelo: las criaturas de un asalto llegan sin estrellas, salvo las garrapatas del asalto del gjall y la escolta de los de Hildir.

| Ajuste de «Asaltos» | Minutos entre tiradas | Probabilidad de que una tirada traiga un asalto |
|---|---|---|
| Normal | {{raidIntervalNormal}} | {{raidChanceNormal}} % |
| Más | {{raidIntervalMore}} | {{raidChanceMore}} % |
| Mucho más | {{raidIntervalMuchMore}} | {{raidChanceMuchMore}} % |

En «Más» el mundo tira cada {{raidIntervalMore, plural, one {# minuto} other {# minutos}}} en lugar de cada {{raidIntervalNormal}}, y una tirada acierta el {{raidChanceMore}} % de las veces en lugar del {{raidChanceNormal}} %. Amuralla el hogar desde el primer día: el primer ejército, el de Eikthyr, no espera a que caiga ningún jefe.

> **Sin prisas**, un constructor que prefiere construir a defender puede poner «Asaltos» en «Menos», «Mucho menos» o «Nunca».

## ¿Cada cuánto salen criaturas con estrellas?

Toda criatura nace sin estrellas y sube una estrella cada vez. Cada paso es una tirada nueva con la probabilidad de su origen, y el primer fallo termina la subida; una segunda estrella solo espera a las criaturas cuyo rango la permite. «Difícil» y «Muy difícil» inclinan por igual todos los orígenes: el mundo abierto, un generador colocado, un nido. Y los orígenes distan mucho de ser iguales. Un nido da estrellas a sus criaturas más a menudo que el mundo abierto, los generadores de los carbonizados menos, y los generadores de garrapatas con estrellas más que ninguno.

En «Normal»:

| De dónde sale | Una estrella | Dos estrellas |
|---|---|---|
| El mundo abierto | {{starOneOpenWorldNormal}} % | {{starTwoOpenWorldNormal}} % |
| Un generador colocado | {{starOneSpawnerNormal}} % | {{starTwoSpawnerNormal}} % |
| Un nido o un cúmulo de huesos | {{starOneNestNormal}} % | {{starTwoNestNormal}} % |
| Un generador de los carbonizados | {{starOneCharredNormal}} % | {{starTwoCharredNormal}} % |
| Un generador de garrapatas con estrellas | {{starOneTicksNormal}} % | {{starTwoTicksNormal}} % |

Chart: share

En «Difícil»:

| De dónde sale | Una estrella | Dos estrellas |
|---|---|---|
| El mundo abierto | {{starOneOpenWorldHard}} % | {{starTwoOpenWorldHard}} % |
| Un generador colocado | {{starOneSpawnerHard}} % | {{starTwoSpawnerHard}} % |
| Un nido o un cúmulo de huesos | {{starOneNestHard}} % | {{starTwoNestHard}} % |
| Un generador de los carbonizados | {{starOneCharredHard}} % | {{starTwoCharredHard}} % |
| Un generador de garrapatas con estrellas | {{starOneTicksHard}} % | {{starTwoTicksHard}} % |

Chart: share

En «Muy difícil»:

| De dónde sale | Una estrella | Dos estrellas |
|---|---|---|
| El mundo abierto | {{starOneOpenWorldVeryHard}} % | {{starTwoOpenWorldVeryHard}} % |
| Un generador colocado | {{starOneSpawnerVeryHard}} % | {{starTwoSpawnerVeryHard}} % |
| Un nido o un cúmulo de huesos | {{starOneNestVeryHard}} % | {{starTwoNestVeryHard}} % |
| Un generador de los carbonizados | {{starOneCharredVeryHard}} % | {{starTwoCharredVeryHard}} % |
| Un generador de garrapatas con estrellas | {{starOneTicksVeryHard}} % | {{starTwoTicksVeryHard}} % |

Chart: share

Hay terreno más malvado con cualquier ajuste. Los tramos más oscuros de las Praderas, los tramos rocosos y de pinos del Bosque negro, el terreno de lobos y dracos de la Montaña, y tramos de las Llanuras, entre ellos el terreno de los fulings, tiran estrellas más a menudo, y una fortaleza de la Montaña, más que ninguno. Hildir juega con sus propias reglas: en su Tumba humeante y su Caverna de los aullidos, y entre la escolta de sus asaltos, toda criatura lleva al menos una estrella, sea cual sea el ajuste. La noche no cambia la tirada, y tampoco un jefe caído. Algunas criaturas, eso sí, conservan una aparición nocturna propia que permite más estrellas; la página [Criaturas](/catalog/creatures) las nombra bajo cada criatura.

## ¿Qué hace una estrella?

Una estrella es una segunda criatura escondida dentro de la primera. Cada una suma otra vez toda la salud de la criatura y la mitad de su daño encima, y el ajuste de «Combate» multiplica por encima de eso: una criatura de dos estrellas en «Muy difícil» pega más fuerte de lo que la harían pegar las estrellas o el ajuste por separado.

| Estrellas | Salud | Daño |
|---|---|---|
| Ninguna | {{starHealth0}} % | {{starDamage0}} % |
| Una | {{starHealth1}} % | {{starDamage1}} % |
| Dos | {{starHealth2}} % | {{starDamage2}} % |

Lo que una estrella no da es velocidad: un trol con estrellas avanza tan pesado como uno sin ellas, y salir de su alcance sigue funcionando. Recibe cada peligro con su resistencia puesta: los [hidromieles](/catalog/meads) las enumeran, y [Cómo matar a cada jefe](/catalog/bosses) muestra a cada jefe de la forma que te mantiene fuera de su alcance. La mayoría de los jefes golpean con daño Perforante, y la [Coraza de raíces](/guides/swamp#how-do-i-get-the-roots-for-the-root-harnesk) del Pantano lo reduce a la mitad.

## ¿Dónde no trae estrellas el mundo abierto?

Cerca del centro del mundo tienes una zona de gracia. Unas pocas criaturas del mundo abierto nunca salen allí con estrellas, por difícil que sea el mundo; más allá de su distancia tiran como todas las demás. Cualquier otra criatura del mundo abierto puede salir con estrellas en cualquier parte, y los generadores y los nidos ignoran del todo la distancia.

| Criatura | Sin estrellas a menos de, m del centro |
|---|---|
| Trol | {{starMinDistanceTroll}} |
| Grisucio Bruto, de noche | {{starMinDistanceBrute}} |
| Jabalí | {{starMinDistanceBoar}} |
| Nixe | {{starMinDistanceNeck}} |

> **En partida inversa**, el extremo norte queda muy lejos de todas estas distancias: allí cualquier criatura del mundo abierto puede salir con estrellas desde la primera noche.

Un mundo más difícil pide una pelea más segura, y la más segura es aquella en la que nada más se une: rodea antes el altar, como muestra [Arenas de los jefes](/guides/boss-arenas). Queda un camino sin probar: toda la saga contada al revés, los biomas tardíos primero y Eikthyr el último, en la [Partida inversa](/guides/reverse-run).
