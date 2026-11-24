# Schwierig, Sehr schwierig und Albtraum

**Was ändern „Sehr schwierig“ oder die Voreinstellung „Albtraum“?** Du triffst schwächer, sie härter, Sterne öfter, Überfälle früher; ein Albtraum-Tod nimmt alle Fertigkeiten und alles Getragene. Ihre Gesundheit bleibt.

## Was ändert jede Kampf-Einstellung?

Wählst du eine härtere Welt, entscheidet ein einziger Regler, wie hart. Er dreht an vier Rädchen auf einmal: deinem Schaden, ihrem, ihrem Tempo und ihrer Größe und der Chance, dass jede Stufe im Aufstieg einer Kreatur einen Stern bringt. Und hier ist der Haken: Die Gesundheit rührt sich nie. Ein Troll auf „Sehr schwierig“ hat genau die Gesundheit, die er auf „Normal“ hat; du schlägst nur länger auf ihn ein, während er härter zurückschlägt. Auch das zusätzliche Tempo und die zusätzliche Größe bleiben draußen: In den Räumen eines Dungeons behalten Kreaturen ihr gewohntes Tempo.

| Kampf-Einstellung | Dein Schaden | Ihr Schaden | Ihr Tempo und ihre Größe | Sternchance je Stufe |
|---|---|---|---|---|
| Sehr einfach | {{combatPlayerDamageVeryEasy}} % | {{combatEnemyDamageVeryEasy}} % | {{combatSpeedSizeVeryEasy}} % | {{combatLevelUpVeryEasy}} % |
| Einfach | {{combatPlayerDamageEasy}} % | {{combatEnemyDamageEasy}} % | {{combatSpeedSizeEasy}} % | {{combatLevelUpEasy}} % |
| Normal | {{combatPlayerDamageNormal}} % | {{combatEnemyDamageNormal}} % | {{combatSpeedSizeNormal}} % | {{combatLevelUpNormal}} % |
| Schwierig | {{combatPlayerDamageHard}} % | {{combatEnemyDamageHard}} % | {{combatSpeedSizeHard}} % | {{combatLevelUpHard}} % |
| Sehr schwierig | {{combatPlayerDamageVeryHard}} % | {{combatEnemyDamageVeryHard}} % | {{combatSpeedSizeVeryHard}} % | {{combatLevelUpVeryHard}} % |

Lies die beiden Schadensspalten zusammen. Auf „Sehr schwierig“ landet dein Schlag mit {{combatPlayerDamageVeryHard}} % und ihrer mit {{combatEnemyDamageVeryHard}} %, gegenüber je {{combatPlayerDamageNormal}} % auf „Normal“: Jeder Kampf dauert länger, und jeder Schlag, den du nicht blockst, kostet doppelt.

> **Für Speedrunner**: Mit „Einfach“ oder „Sehr einfach“ teilst du mehr aus und steckst weniger ein, und Sterne kommen nicht öfter als auf „Normal“.

## Was schalten die Voreinstellungen ein?

Eine Voreinstellung ist eine Handvoll Regler, die auf einmal verschoben werden, und die Namen verbergen, wie verschieden sie sind. „Schwierig“ verschärft nur die Kämpfe und bringt öfter Überfälle. „Albtraum“ nimmt alles davon: den härtesten Kampf, mehr Überfälle, den Tod, der nichts übrig lässt, keine Karte und keine Bossportale. „Immersiv“ rührt kein Schwert an; es nimmt dir deine Karte und deine Portale und fügt Feuerrisiken hinzu.

| Voreinstellung | Kampf | Überfall-Rate | Todesfolgen | Karte | Portale |
|---|---|---|---|---|---|
| Normal | Normal | Normal | Normal | Ein | Ein |
| Schwierig | Schwierig | Häufiger | Normal | Ein | Ein |
| Albtraum | Sehr schwierig | Häufiger | Albtraum | Aus | Keine Bossportale |
| Immersiv | Normal | Normal | Normal | Aus | Keine Portale |

Nichts davon ist gesperrt. Nach einer Voreinstellung kannst du jeden Regler noch von Hand verschieben, sodass eine Welt auf „Sehr schwierig“ kämpfen und ihre Karte behalten kann.

> **Ohne Karte** und **Ohne Portale**: Die Voreinstellungen „Albtraum“ und „Immersiv“ stellen beides schon ein; was diese Spielweise von dir verlangt, steht unter [Ohne Tod, ohne Karte, ohne Portale](/guides/other-rules).

## Was nimmt der Tod auf „Albtraum“?

Alles. Jeder Gegenstand an dir geht verloren, angelegt oder nicht, und jede Fertigkeit fällt auf null zurück. Ist dir das zu steil, hört die Einstellung „Schwierig“ der Todesfolgen eine Stufe früher auf: Sie verbrennt, was du bei dir trägst, lässt dir aber, was du angelegt hast, und sie lässt deine Fertigkeiten schneller ausbluten als „Normal“.

> **Ohne Tod** spielen die Todesfolgen keine Rolle mehr, da der erste Tod den Run ohnehin beendet; was zählt, sind die Kampf-Einstellung oben und die Sterne unten.

## Wie oft kommen Überfälle?

Die Welt führt eine Uhr. Ab und zu würfelt sie, und ein Wurf kann einen Überfall vor deine Tür bringen. „Häufiger“, wie „Schwierig“ und „Albtraum“ es einstellen, dreht an beiden Schrauben: Die Würfe kommen dichter aufeinander, und jeder trifft öfter. Welcher Überfall es sein wird und bis zu welchem Boss, steht auf der Seite [Überfälle](/catalog/events). Eine kleine Gnade: Die Kreaturen eines Überfalls kommen ohne Stern, außer den Zecken im Überfall des Gjall und den Begleitern in Hildirs.

| Überfall-Rate | Minuten zwischen den Würfen | Chance, dass ein Wurf einen Überfall bringt |
|---|---|---|
| Normal | {{raidIntervalNormal}} | {{raidChanceNormal}} % |
| Häufiger | {{raidIntervalMore}} | {{raidChanceMore}} % |
| Viel häufiger | {{raidIntervalMuchMore}} | {{raidChanceMuchMore}} % |

Auf „Häufiger“ würfelt die Welt {{raidIntervalMore, plural, one {jede # Minute} other {alle # Minuten}}} statt {{raidIntervalNormal, plural, one {jede #} other {alle #}}}, und ein Wurf trifft in {{raidChanceMore}} % der Fälle statt in {{raidChanceNormal}} %. Umgib dein Zuhause vom ersten Tag an mit einer Mauer: Die erste Armee, die Eikthyrs, wartet auf keinen gefallenen Boss.

> **Ganz entspannt**: Ein Baumeister, der lieber baut als verteidigt, kann die Überfall-Rate auf „Seltener“, „Viel seltener“ oder „Keine“ stellen.

## Wie oft kommen Kreaturen mit Sternen?

Jede Kreatur wird ohne Stern geboren und steigt Stern um Stern auf. Jede Stufe ist ein neuer Wurf mit der Chance ihrer Quelle, und der erste Fehlwurf beendet den Aufstieg; ein zweiter Stern wartet nur auf Kreaturen, deren Spanne ihn zulässt. „Schwierig“ und „Sehr schwierig“ verschieben jede Quelle gleich: die offene Welt, einen platzierten Spawner, ein Nest. Und die Quellen sind alles andere als gleich. Ein Nest gibt seinen Kreaturen öfter Sterne als die offene Welt, die Spawner der Verkohlten seltener und die Spawner der Zecken mit Sternen am häufigsten.

Auf „Normal“:

| Woher sie kommt | Ein Stern | Zwei Sterne |
|---|---|---|
| Die offene Welt | {{starOneOpenWorldNormal}} % | {{starTwoOpenWorldNormal}} % |
| Ein platzierter Spawner | {{starOneSpawnerNormal}} % | {{starTwoSpawnerNormal}} % |
| Ein Nest oder ein Böser Knochenhaufen | {{starOneNestNormal}} % | {{starTwoNestNormal}} % |
| Ein Spawner der Verkohlten | {{starOneCharredNormal}} % | {{starTwoCharredNormal}} % |
| Ein Spawner der Zecken mit Sternen | {{starOneTicksNormal}} % | {{starTwoTicksNormal}} % |

Chart: share

Auf „Schwierig“:

| Woher sie kommt | Ein Stern | Zwei Sterne |
|---|---|---|
| Die offene Welt | {{starOneOpenWorldHard}} % | {{starTwoOpenWorldHard}} % |
| Ein platzierter Spawner | {{starOneSpawnerHard}} % | {{starTwoSpawnerHard}} % |
| Ein Nest oder ein Böser Knochenhaufen | {{starOneNestHard}} % | {{starTwoNestHard}} % |
| Ein Spawner der Verkohlten | {{starOneCharredHard}} % | {{starTwoCharredHard}} % |
| Ein Spawner der Zecken mit Sternen | {{starOneTicksHard}} % | {{starTwoTicksHard}} % |

Chart: share

Auf „Sehr schwierig“:

| Woher sie kommt | Ein Stern | Zwei Sterne |
|---|---|---|
| Die offene Welt | {{starOneOpenWorldVeryHard}} % | {{starTwoOpenWorldVeryHard}} % |
| Ein platzierter Spawner | {{starOneSpawnerVeryHard}} % | {{starTwoSpawnerVeryHard}} % |
| Ein Nest oder ein Böser Knochenhaufen | {{starOneNestVeryHard}} % | {{starTwoNestVeryHard}} % |
| Ein Spawner der Verkohlten | {{starOneCharredVeryHard}} % | {{starTwoCharredVeryHard}} % |
| Ein Spawner der Zecken mit Sternen | {{starOneTicksVeryHard}} % | {{starTwoTicksVeryHard}} % |

Chart: share

Mancher Boden ist auf jeder Einstellung gemeiner. Dunklere Strecken des Graslands, die felsigen und die Kiefernstrecken des Düsterwalds, das Land der Wölfe und Drachen im Gebirge, Strecken der Ebenen, darunter das Land der Fulings: Sie alle würfeln öfter Sterne, und eine Festung im Gebirge am schlimmsten. Hildir spielt nach eigenen Regeln: In ihrem Schwelenden Grab und ihrer Heulenden Kaverne und unter den Begleitern ihrer Überfälle trägt jede Kreatur mindestens einen Stern, egal auf welcher Einstellung. Die Nacht ändert den Wurf nicht, und ein gefallener Boss auch nicht. Manche Kreaturen haben allerdings einen eigenen Nacht-Spawn, der mehr Sterne zulässt; die Seite [Kreaturen](/catalog/creatures) nennt sie unter jeder Kreatur.

## Was bewirkt ein Stern?

Ein Stern ist eine zweite Kreatur, die in der ersten steckt. Jeder fügt die ganze Gesundheit der Kreatur noch einmal hinzu und obendrein die Hälfte ihres Schadens, und die Kampf-Einstellung multipliziert darüber: Eine Kreatur mit zwei Sternen auf „Sehr schwierig“ schlägt härter zu, als die Sterne oder die Einstellung allein sie machen würden.

| Sterne | Gesundheit | Schaden |
|---|---|---|
| Keine | {{starHealth0}} % | {{starDamage0}} % |
| Einer | {{starHealth1}} % | {{starDamage1}} % |
| Zwei | {{starHealth2}} % | {{starDamage2}} % |

Was ein Stern nicht gibt, ist Tempo: Ein Troll mit Stern trottet wie ein gewöhnlicher, und aus seiner Reichweite zu treten wirkt weiterhin. Tritt jeder Gefahr mit ihrer Resistenz entgegen: Die Seite [Met](/catalog/meads) führt sie auf, und [Wie du jeden Boss besiegst](/catalog/bosses) zeigt jeden Boss auf die Art, die dich aus seiner Reichweite hält. Die meisten Bosse greifen mit Stechen an, und der [Wurzelkürass](/guides/swamp#how-do-i-get-the-roots-for-the-root-harnesk) aus dem Sumpfland halbiert es.

## Wo bringt die offene Welt keine Sterne?

Nahe der Weltmitte bekommst du eine Schonzone. Einige Kreaturen der offenen Welt kommen dort nie mit Stern, wie hart die Welt auch ist; jenseits ihrer Entfernung würfeln sie wie alle anderen. Jede andere Kreatur der offenen Welt kann überall mit Stern kommen, und Spawner und Nester kümmern sich überhaupt nicht um die Entfernung.

| Kreatur | Kein Stern innerhalb von, m um die Mitte |
|---|---|
| Troll | {{starMinDistanceTroll}} |
| Grauzwergen Berserker, nachts | {{starMinDistanceBrute}} |
| Wildschwein | {{starMinDistanceBoar}} |
| Nixe | {{starMinDistanceNeck}} |

> **Im Rückwärts-Run** liegt der ferne Norden weit jenseits jeder dieser Entfernungen: Dort kann jede Kreatur der offenen Welt ab der ersten Nacht mit Stern kommen.

Eine härtere Welt verlangt einen sichereren Kampf, und am sichersten ist der, in den sich sonst nichts einmischt: Umfriede zuerst den Altar, wie [Boss-Arenen](/guides/boss-arenas) zeigt. Ein Weg bleibt noch unversucht: die ganze Saga rückwärts erzählt, die späten Biome zuerst und Eikthyr zuletzt, im [Rückwärts-Run](/guides/reverse-run).
