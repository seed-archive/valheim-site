# Boss-Arenen

**Wie baue ich eine Boss-Arena, in die nichts spawnt?** Mauern zählen nichts: Umring den Altar mit Feuern und Stationen und zerschlag jedes Nest darin. Ein Ring hält alles auf außer einem Nest.

## Welche Objekte machen den Boden zur Basis?

Ein Boss kämpft gegen dich auf dem Boden, den du für ihn wählst. Das Spiel zählt nie deine Mauern, deine Böden oder wie viel du gebaut hast: Eine Basis ist nur der Boden innerhalb der Bereiche, die bestimmte Objekte mit sich tragen. Ein Feuer trägt einen, ob brennend oder kalt, also umringt ein nicht entzündetes Lagerfeuer einen Altar so gut wie ein loderndes. Halt alles am Boden: Der Bereich einer Station ist eine hohe Säule, der eines Feuers, eines Betts oder einer Fackel aber eine Kugel. Die [Handwerksstationen](/catalog/crafting-stations) und die Feuer in [Weitere Bau-Objekte](/catalog/other-pieces) nennen ihre Materialien.

| Objekt | Umringt den Boden um sich, m | Um eine Arena von {{arenaRadius}} m abzudecken, etwa |
|---|---|---|
| Feuerstelle, Signalfeuer | {{baseRadiusHearth}} | {{ringPiecesHearth}} |
| Lagerfeuer | {{baseRadiusCampfire}} | {{ringPiecesCampfire}} |
| Werkbank, Schmiede, jede Station und jeder Schmelzofen | {{baseRadiusWorkbench}} | {{ringPiecesWorkbench}} |
| Bett, Stand-Fackel, Feuerschale | {{baseRadiusBed}} | {{ringPiecesBed}} |
| Wächterstein, Portal | {{baseRadiusPortal}} | {{ringPiecesPortal}} |
| Harzextraktor, Harzkerze | {{baseRadiusCandle}} | {{ringPiecesCandle}} |

Die letzte Spalte ist unsere eigene Rechnung: die wenigsten Kreise, die die Scheibe der Arena abdecken. Wo sich der Boden wölbt, gib ein paar dazu.

## Was hält ein Ring auf?

Eine Kreatur hat vier Türen in die Welt. Drei davon prüfen, ob sie sich auf eine Basis öffnen, und bleiben zu, wenn ja; die vierte, ein Nest, prüft nie.

| Woher eine Kreatur kommt | Innerhalb des Rings |
|---|---|
| Die Spawns der offenen Welt | aufgehalten; sie kommen dir ohnehin nie näher als {{spawnMinM}} m |
| Die Spawns eines Überfalls | aufgehalten |
| Ein platzierter Spawner (der eines Lagers, eines Turms, der Tür einer Krypta) | still, solange der Ring ihn abdeckt, wieder da, sobald der Ring weg ist |
| Ein Nest (ein Grauzwergen-Nest, ein Böser Knochenhaufen, ein Spawner der Verkohlten) | spawnt weiter |

Ein Ring hält Spawns fern, nicht Läufer. Angreifer erscheinen {{raidMinM}}–{{raidMaxM}} m von dir entfernt und spazieren einfach herein. Und {{raidBasePieces, plural, one {# Basis-Objekt} other {# Basis-Objekte}}} innerhalb von {{raidBaseM}} m um dich sind es, die einen Überfall bei der Basis überhaupt beginnen lassen ([Überfälle](/catalog/events)): Der Ring, den du baust, ist eine Basis, und eine Basis ist eine Einladung. Kämpf darin und behalt ein Auge auf dem, was von jenseits kommt.

> **Für Speedrunner** fällt die Arena weg: Eine Werkbank beim Altar, gebaut vor der Beschwörung, hält die Spawns der offenen Welt den ganzen Kampf über von seinem Boden fern, und der Run geht weiter.

## Was hält ein Ring nie auf, bei jedem Altar?

Ein Nest spawnt in einer Basis, als hättest du nichts gebaut, also zerschlag jedes in Reichweite, bevor du das erste Objekt setzt. Die Welt pflanzt sie bei zwei Altären. Auf {{altarNestElder}} % der Seeds steht ein Grauzwergen-Nest innerhalb von {{arenaReach}} m um den Altar [des Uralten](/catalog/bosses#the-elder), das nächste in der Regel {{altarNestElderM}} m entfernt ({{altarNestElderMLow}}–{{altarNestElderMHigh}} m auf der mittleren Hälfte der Seeds). Auf {{altarNestFader}} % der Seeds steht ein Spawner der Verkohlten innerhalb von {{arenaReach}} m um [Faders](/catalog/bosses#fader) Altar, in den [Aschenlanden](/guides/ashlands), der nächste {{altarNestFaderM}} m entfernt ({{altarNestFaderMLow}}–{{altarNestFaderMHigh}} m).

Knochenwanst hat sein eigenes: Ein Böser Knochenhaufen steht innerhalb von {{arenaReach}} m um seinen Altar, auf allen Seeds außer {{bonemassNoPileReach}} %. Die [Seed-Karte](/tools/map) zeigt, was um deine eigenen Altäre wartet. Und ein Grauzwergen-Nest zerfällt genau in die Uralten Samen, mit denen der Uralte beschworen wird, also ist es keine lästige Pflicht, es zu zerschlagen; es ist Einkaufen.

> **Ohne Tod** ist die Reihenfolge der ganze Plan: Nester, dann der Ring, dann die Beschwörung, an einem Tag, den du erübrigen kannst. Auf einer [schwierigeren Welt](/guides/hardcore) trifft alles, was aus einem übersehenen Nest kriecht, härter als auf „Normal“.

## Welche platzierten Spawner bringt der Ring zum Schweigen?

Alles andere, was bei einem Altar lebt, kommt aus einem platzierten Spawner, und ein Ring darüber hält ihn still, solange der Ring steht. Je näher er sitzt, desto mehr von deiner Arena beansprucht er.

| Vom Altar, m | In der Regel | Mittlere Hälfte der Seeds |
|---|---|---|
| [Knochenwanst](/catalog/bosses#bonemass): die nächste Versunkene Krypta, im [Sumpfland](/guides/swamp) | {{bonemassCryptM}} | {{bonemassCryptMLow}}–{{bonemassCryptMHigh}} |
| [Moder](/catalog/bosses#moder): das dritte Drachennest | {{moderNestM}} | {{moderNestMLow}}–{{moderNestMHigh}} |
| [Yagluth](/catalog/bosses#yagluth): das erste Fuling-Dorf | {{yagluthVillageM}} | {{yagluthVillageMLow}}–{{yagluthVillageMHigh}} |
| [Die Königin](/catalog/bosses#the-queen): die erste Befallene Mine | {{queenMineM}} | {{queenMineMLow}}–{{queenMineMHigh}} |
| [Fader](/catalog/bosses#fader): die erste Verkohlte Festung | {{faderFortM}} | {{faderFortMLow}}–{{faderFortMHigh}} |

Chart: spread

Außerhalb der Reichweite des Rings spawnt ein Spawner weiter. Innerhalb verstummt er, aber was er schon herausgelassen hat, bleibt draußen. Räum den Ort, dann umring ihn.

> **Ganz entspannt** leistet ein Portal doppelten Dienst: der Weg nach Hause und {{baseRadiusPortal}} m umringter Boden. Zwei Portale quer über die Arena mit einem Bett dazwischen ergeben einen Ring, den du ohnehin bauen wolltest.

## Gibt es Boden zum Bauen?

Wasser umringt nichts und trägt keine Mauer, also ist eine Arena, die halb unter dem Meer liegt, eine halbe Arena. Nur das Sumpfland von Knochenwanst hat dieses Problem: In der Regel liegen {{altarWaterBonemass}} % der Scheibe von {{arenaRadius}} m um seinen Altar unter dem Meeresspiegel ({{altarWaterBonemassLow}}–{{altarWaterBonemassHigh}} % auf der mittleren Hälfte der Seeds), während die anderen Altäre in der Regel trocken stehen. Heb den Boden mit der Hacke an, bevor du den Ring legst, oder umring die trockene Seite und kämpf von dort.

> **Im Rückwärts-Run** ist Fader der erste Altar, den du umringst: Die {{baseRadiusCampfire}} m eines Lagerfeuers sind der erste Ring der Arena, gebaut aus dem Stein und Holz, das du mitgebracht hast.

## Wie hoch kann eine Mauer oder ein Ausguck stehen?

Jedes Objekt hält nur, was das Objekt darunter nach oben weitergibt, und jedes Material gibt mit jedem Schritt weniger weiter. Stapel Objekte voller Höhe aus einem Material gerade vom Boden aus nach oben, und sie stehen so hoch; fang auf einem Felsen oder einem Baum an, und die Zählung beginnt dort von vorn.

| Material | Steht, m |
|---|---|
| Holz | {{buildHeightWood}} |
| Stein | {{buildHeightStone}} |
| Schwarzer Marmor | {{buildHeightMarble}} |
| Kernholz | {{buildHeightCoreWood}} |
| Grausten | {{buildHeightGrausten}} |
| Stabholz, des Hohen Nordens | {{buildHeightStave}} |
| Eisen | {{buildHeightIron}} |

Die Höhen sind unsere eigenen Rechnungen nach der Stützregel des Spiels, für einen geraden Stapel; ein Arm, der zur Seite reicht, steht niedriger. Die Seiten [Bauen mit Holz](/catalog/wood-building), [Bauen mit Stein](/catalog/stone-building) und [Bauten des Hohen Nordens](/catalog/deep-north-building) nennen jedes Objekt. In den Aschenlanden frisst die Asche jedes Objekt ohne Dach, also überdach Faders Mauer.

> **Ohne Karte** ist der Ausguck deine Karte: Ein Eisenturm über einem Altar zeigt den Boden der Arena und die Orte um sie herum, bevor du baust, und seine Fackeln umringen seinen eigenen Fuß.

Mit zerschlagenen Nestern und gelegtem Ring kämpft jeder Boss allein gegen dich.
