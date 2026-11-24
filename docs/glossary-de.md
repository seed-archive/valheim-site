# German glossary

The words every translator of `lib/i18n/en.json` and `content/en/` into `de` uses, so the three of us write one
site. A term settled here is never translated another way. Sources, in order:

1. the game's own German, by localization key (game build 1.0.21; the Valheim generator's game data). Names of
   items, pieces, creatures and places not listed here come from `lib/valheim/names/de.json`, which maps the site's
   English names to the game's German;
2. this glossary for the site's own words (source "site");
3. a literal translation of our own (source "own"), only where neither has the word.

The owner's rule (2026-11-24): wherever a term catches the player's eye in the game (an item, a setting, a
difficulty level, a status, a station, a skill), the site writes exactly the game's form, even where it sounds odd
(«Albtraum» for Hardcore, «Flammenkern» for Flametal, «Wünschelrute» for Wishbone). A player compares the site with
the game; a word that differs makes him think the numbers differ too. Translate from the English, never from the
Russian.

## 1. Game terms

### Biomes

| English | German | source |
|---|---|---|
| Meadows | Grasland | biome_meadows |
| Black Forest | Düsterwald | biome_blackforest |
| Swamp | Sumpfland | biome_swamp |
| Mountain | Gebirge | biome_mountain |
| Plains | Ebenen | biome_plains |
| Mistlands | Nebellande | biome_mistlands |
| Ashlands | Aschenlande | biome_ashlands |
| Deep North | Hoher Norden | biome_deepnorth |
| Ocean | Ozean | biome_ocean |
| biome, biomes | Biom, Biome | piece_beehive_area |

In prose: «im Grasland», «im Düsterwald», «im Sumpfland», «im Gebirge», «in den Ebenen», «in den Nebellanden»,
«in den Aschenlanden», «im Hohen Norden» (the adjective declines: «des Hohen Nordens»), «auf dem Ozean». "His
Swamp", "her Mountain" in the seed report: «sein Sumpfland», «ihr Gebirge». A one-word biome joins a compound
with a hyphen, as the game does («Düsterwald-Buffetplatte»); a two-word one takes the genitive instead: «Bauten des
Hohen Nordens».

### Bosses and their powers

| English | German | source |
|---|---|---|
| Eikthyr | Eikthyr | enemy_eikthyr |
| The Elder | der Uralte (declines: des Uralten, dem Uralten) | enemy_gdking |
| Bonemass | Knochenwanst | enemy_bonemass |
| Moder | Moder | enemy_dragon |
| Yagluth | Yagluth | enemy_goblinking |
| The Queen | die Königin | enemy_seekerqueen |
| Fader | Fader | enemy_fader |
| Kall, Kall Fimbulbringer | Kall, Kall Fimbulbringer | enemy_frozenking |
| boss, bosses | Boss, Bosse | menu_playerbasedevents_tooltip («welche Bosse») |
| the Forsaken (the game's name for the bosses) | die Verlassenen | tutorial_altar_label, tutorial_stemple1_text |
| Forsaken altars | Verlassenenaltäre | tutorial_altar_label |
| boss altar; Eikthyr's altar, the Elder's altar | Bossaltar (own); Eikthyrs Altar, Altar des Uralten, Altar der Königin… | own |
| The Queen's gate | Tor der Königin | own |
| power (a boss's, at the stones) | Verlassenen-Kraft; in prose «Kraft» | settings_gp |
| aspect (Kall's phase 2) | Aspekt | enemy_aspect_eikthyr («Aspekt des Blitzhirschs») |
| phase | Phase | own |
| Trophy; a boss's | Trophäe; «Eikthyr-Trophäe», «Knochenwanst-Trophäe» | msg_newtrophy, names/de.json |

A boss's name with a possessive: a name without article takes «-s» («Eikthyrs Altar», «Moders Altar», «Kalls
Altar»; Knochenwanst: «Altar von Knochenwanst»), one with an article takes the genitive («Altar des Uralten»).

### Traders and helpers

| English | German | source |
|---|---|---|
| Haldor | Haldor | npc_haldor |
| Hildir | Hildir | npc_hildir |
| the Bog Witch | die Sumpfhexe | npc_bogwitch |
| Hugin (the raven) | Hugin, der Rabe Hugin | npc_hugin, loadscreen_tip15 |
| Munin | Munin | npc_munin |
| Odin | Odin | piece_banner04_description |
| Valkyrie | Walküre | npc_valkyrie_end |
| Valhalla | Walhalla | tutorial_stemple1_text |
| trader, traders | Händler (Hildir, the Bog Witch: Händlerin), Händler | tutorial_haldor_label, tutorial_hildir |
| Thungr, Zil | Thungr, Zil | enemy_goblinbrute_hildir, enemy_goblin_hildir |
| Hildir's chest (Brass, Silver, Bronze) | Hildirs Messingtruhe, Silbertruhe, Bronzetruhe | item_chest_hildir1…3 |

### Dungeons and places

| English | German | source |
|---|---|---|
| dungeon, dungeons | Dungeon, Dungeons | tutorial_crypt_label |
| Burial Chamber(s) | Grabkammer, Grabkammern | location_forestcrypt |
| Sunken Crypt(s) | Versunkene Krypta, Versunkene Krypten | location_sunkencrypt |
| troll cave | Trollhöhle | location_forestcave |
| frost cave | Frosthöhle, Frosthöhlen | location_mountaincave |
| Infested Mine | Befallene Mine | location_dvergrtown |
| Infested Citadel | Befallene Hochburg | location_dvergrboss |
| Charred Fortress | Verkohlte Festung | charredfortress |
| Mörkhalla | Mörkhalla | location_morkhalla |
| Winding Tunnels | Gewundene Tunnel | location_thehole |
| Morgen hole | Fauliges Loch (the game's English: Putrid Hole) | location_morgenhole |
| Bear den | Bärenhöhle | location_bearcave |
| Howling Cavern | Heulende Kaverne | hud_pin_hildir2 |
| Smouldering Tomb | Schwelendes Grab | hud_pin_hildir1 |
| Sealed Tower | Versiegelter Turm | hud_pin_hildir3 |
| Sacrificial Stones | Opfersteine (one: Opferstein) | tutorial_stemple1_text, guardianstone_name |
| Vegvísir | Vegvisir | piece_vegvisir |
| Runestone | Runenstein | piece_lorestone |
| Greydwarf nest | Grauzwergen-Nest | enemy_greydwarfspawner |
| Forge of Potential | Schmiede des Potenzials | piece_upgradestation |
| Yggdrasil | Yggdrasil | item_yggdrasilwood |
| Ancient root (a Yggdrasil root) | Uralte Wurzel | prop_ancienttreeroot |
| giant's remains | Überreste eines Riesen | own, from item_ymirremains_description |
| chest | Truhe | piece_chestwood |

The game's adjectives decline in prose: «in einer Versunkenen Krypta», «in der Befallenen Mine», «die Verkohlten
Festungen»; the adjective keeps its capital, as the game writes it, because it is part of the name.

Places the game does not name are our own literal words (source "own"): verlassenes Haus, verlassener Hof,
Fuling-Dorf, Draugr-Dorf, Steinturm-Ruine, Steinhaus-Ruine, Ruinen, Grauzwergen-Lager, Menhire (standing stones),
Dolmen, Grab, Schiffswrack, Steinschiff (stone ship setting), eingefrorenes Schiff, Sumpfhütte, Brunnen, Teergrube,
Drachennest mit Ei, Glibber-Baum, Dvergr-Ausgrabung, Dvergr-Ruinen, verkohlte Ruinen, verkohlte Steine,
Feuerloch, Schwefelbogen, Vulkangeier-Nest, Ort des Geheimnisses, Ruinen des Hohen Nordens, Dorf des Hohen
Nordens, Gedenkstätte des Hohen Nordens, Eisteich, Wegmarke, Holzfällerlager, Steinlichtung, Fuling-Außenposten,
verlassenes Gehöft. Their names take creatures and biomes from the tables here (Grauzwerg, Fuling, Vulkangeier).

### Creatures that recur

A creature is a German noun and so always capitalised (der Grauzwerg, die Grauzwerge).

| English | German | source |
|---|---|---|
| Greydwarf | Grauzwerg, Grauzwerge | enemy_greydwarf |
| Troll | Troll, Trolle | enemy_troll |
| Skeleton | Skelett | enemy_skeleton |
| Draugr | Draugr | enemy_draugr |
| Leech | Schlundegel | enemy_leech |
| Blob | Schleimling | enemy_blob |
| Wraith | Zorngeist | enemy_wraith |
| Ghost | Geist | enemy_ghost |
| Abomination | Monstrosität | enemy_abomination |
| Wolf | Wolf, Wölfe | enemy_wolf |
| Drake | Drache | enemy_drake |
| Fenring | Fenring | enemy_fenring |
| Ulv | Ulv | enemy_ulv |
| Cultist | Kultist | enemy_fenringcultist |
| Stone Golem | Steingolem | enemy_stonegolem |
| Bat | Fledermaus | enemy_bat |
| Fuling | Fuling | enemy_goblin |
| Deathsquito | Todeskito | enemy_deathsquito |
| Lox | Lox | enemy_lox |
| Seeker | Sucher | enemy_seeker |
| Tick | Zecke | enemy_tick |
| Gjall | Gjall | enemy_gjall |
| Dvergr | Dvergar (plural); Dvergr- in compounds and one («Dvergr-Magier») | enemy_dvergrs, enemy_dvergr_mage |
| Surtling | Surtling | enemy_surtling |
| the Charred | die Verkohlten (one: Verkohlter) | enemy_charred, npc_dvergr_ashlands_random_talk_in_faction_base8 |
| Twitcher | Verkohlter Zuckender; in prose «Zuckender» | enemy_charred_twitcher |
| Morgen | Morgen | enemy_morgen |
| Volture | Vulkangeier | enemy_volture |
| Asksvin | Asksvin | enemy_asksvin |
| Fallen Valkyrie | Gefallene Walküre | enemy_fallenvalkyrie |
| Serpent | Seeschlange | enemy_serpent |
| Bonemaw | Knochenschlund | enemy_bonemawserpent |
| Frysling | Frysling | enemy_frysling |
| Eyeless One | Augenloser | enemy_elakingmole |
| Writhan | Writhan | enemy_writhan |
| Jotun(s) | Jotun (one, piece_jotunchest «Jotun-Truhe»), Jötnar (plural) | event_jotunarmy_start |
| Krigen, Hexen | Krigen, Hexen | enemy_jotun_warrior, enemy_jotun_witch |
| Boar, Deer, Neck, Bear | Wildschwein, Hirsch, Nixe, Bär | enemy_boar, enemy_deer, enemy_neck, enemy_bjorn |
| Leviathan, Lava leviathan | Leviathan, Lava-Leviathan | own (the game has no name for it) |
| star (a creature's level) | Stern («ein Wolf mit zwei Sternen») | ach_bigfish_desc |
| spawner | Spawner | own (community; the game's «Spawnpunkt» is the bed's) |

### Key items and materials

| English | German | source |
|---|---|---|
| Wood | Holz | item_wood |
| Fine wood | Edelholz | item_finewood |
| Core wood | Kernholz | item_roundlog |
| Stone, Flint | Stein, Feuerstein | item_stone, item_flint |
| Copper, Tin, Bronze | Kupfer, Zinn, Bronze | item_copper, item_tin, item_bronze |
| Iron, Scrap Iron | Eisen, Eisenschrott | item_iron, item_ironscrap |
| Silver | Silber | item_silver |
| Black metal | Schwarzmetall | item_blackmetal |
| Flametal | Flammenkern | item_flametal |
| Bloodgold | Blutgold | item_gold |
| ore (Copper Ore…); vein | Erz (Kupfererz, Eisenerz, Zinnerz, Silbererz, Flammenkernerz); vein: Ader (own: «Kupferader») | item_copperore, names/de.json |
| Obsidian | Obsidian | item_obsidian |
| Black marble | Schwarzer Marmor | item_blackmarble |
| Grausten | Grausten | item_grausten |
| Ashwood | Aschenholz | item_blackwood |
| Surtling core | Surtling-Kern | item_surtlingcore |
| Black core | Schwarzer Kern | item_blackcore |
| Troll hide | Trollleder | item_trollhide |
| Honey, Barley, Flax | Honig, Gerste, Flachs | item_honey, item_barley, item_flax |
| Tar, Guck, Sap | Teer, Glibber, Harz | item_tar, item_guck, item_sap |
| Coins | Münzen | item_coins |
| Fuling totem | Fuling-Totem | names/de.json |
| Dragon egg | Drachenei | item_dragonegg |
| Sealbreaker, Sealbreaker fragment | Siegelbrecher, Siegelbrecherfragment | item_dvergrkey, item_dvergrkeyfragment |
| Dvergr Extractor | Dvergr-Extraktor | item_dvergrneedle |
| Bell fragment | Glockenfragment | item_bellfragment |
| Fenris hair | Fenris Haarsträhnen | item_pickable_hairstrands |
| Malicious Ice | Bösartiges Eis | blackice_core |
| Orb of Fimbulvinter | Kugel des Fimbulwinters | fimbulvinterorb |
| Megingjord | Megingiard | item_beltstrength |
| Root Harnesk | Wurzelkürass | item_chest_root |
| Wishbone | Wünschelrute | item_wishbone |
| Wolf fur cape | Wolfsfellumhang | item_cape_wolf |
| Trollstav | Trollstab | item_staffredtroll |
| Echo Spike | Echo-Stachel | item_staff_orbofahri |
| Mead, mead base | Met, Metmischung | se_mead_name, item_meadbasetasty |
| Frost (resistance) mead | Met des Frostwiderstands | item_mead_frostres |
| potion | Trank | se_healthpotionminor_name |
| Feast, feasts | Festmahl, Festmähler | hud_feasts |
| Trophy, trophies | Trophäe, Trophäen | inventory_trophies |
| mould | Gussform («Gussform: Nord-Schwert») | item_mold_sword |
| recipe | Rezept (the game's list of them is «Bauanleitungen») | inventory_onlyoneingredient, inventory_recipes |
| ingredients | Zutaten | inventory_onlyoneingredient |
| item | Gegenstand | inventory_upgraderwarning |

### Idols and upgrade quality

| English | German | source |
|---|---|---|
| Idol | Götze | item_upgrader_name |
| Battle idol | Kampf-Götze (prose, own); the item: «Bronze Kampf Götze» | item_upgrader_name + item_upgrader_weapon |
| Protection idol | Schutz-Götze (prose, own); the item: «Bronze Schutz Götze» | item_upgrader_name + item_upgrader_armor |
| tiers | Holz, Bronze, Eisen, Silber, Schwarzmetall, Schwarzer Marmor, Flammenkern, Blutgold | item_upgrader_tier0…7 |
| quality | Qualität | inventory_quality |
| level (of quality, of a station) | Stufe | msg_level |
| upgrade (verb, noun) | aufwerten (the button «Aufwerten»), Aufwertung; «Qualität 2 auf 3 verbessern» | inventory_upgradebutton, inventory_upgrade |
| Max quality | Max. Qualität | inventory_maxquality |
| a try at the forge | Verfeinerung; the button «Verfeinerung versuchen» | inventory_upgraderbutton |
| break (at the forge) | zerstören, zerstört werden («Das Verfeinern kann deinen Gegenstand zerstören») | inventory_upgraderwarning |

An idol's full name stands as `names/de.json` and the game build it: «Bronze Kampf Götze», no hyphen, in that
order. In prose the kind alone is «Kampf-Götze», «Schutz-Götze».

### Stations, tools, pieces, ships

| English | German | source |
|---|---|---|
| crafting station | Handwerksstation | loadscreen_tip03 |
| station level | Ausbaustufe | inventory_stationlevel |
| extension, upgrade of a station | Verbesserung | inventory_stationlevel |
| Workbench | Werkbank | piece_workbench |
| Forge | Schmiede | piece_forge |
| Stonecutter | Steinmetz | piece_stonecutter |
| Artisan table | Handwerkstisch | piece_artisanstation |
| Black forge | Schwarzschmiede | piece_blackforge |
| Galdr table | Galdr-Tisch | piece_magetable |
| Cauldron | Kessel | piece_cauldron |
| Mead ketill | Metkocher | piece_meadcauldron |
| Fermenter | Fermentierer | piece_fermenter |
| Food preparation table | Essenszubereitungs-Tisch | piece_preptable |
| Serving tray | Serviertablett | item_feaster |
| Smelter | Schmelzofen | piece_smelter |
| Charcoal kiln | Kohlenmeiler | piece_charcoalkiln |
| Blast furnace | Hochofen | piece_blastfurnace |
| Spinning wheel, Windmill | Spinnrad, Windmühle | piece_spinningwheel, piece_windmill |
| Eitr refinery | Eitr-Raffinerie | piece_eitrrefinery |
| Campfire, Bonfire, Hearth | Lagerfeuer, Signalfeuer, Feuerstelle | piece_firepit, piece_bonfire, piece_hearth |
| Bed | Bett | piece_bed |
| spawn point | Spawnpunkt | piece_bed_setspawn |
| Portal | Portal | piece_portal |
| Ward | Wächterstein | piece_guardstone |
| Shield generator | Schildgenerator | piece_shieldgenerator |
| Item stand | Objektständer | piece_itemstand |
| Training dummy | Trainingspuppe (own); the piece: «Schlachtenbruder» | piece_trainingdummy |
| Obliterator | Vernichter | piece_incinerator |
| Beehive | Bienenstock | piece_beehive |
| Stakewall | Palisadenwall | piece_stakewall |
| Ballista, Catapult, Battering ram | Balliste, Katapult, Rammbock | piece_turret, tool_catapult, tool_batteringram |
| Hammer, Hoe, Cultivator | Hammer, Hacke, Pflug | item_hammer, item_hoe, item_cultivator |
| Pickaxe, Torch, Fishing rod | Spitzhacke, Fackel, Angelrute | inventory_pickaxe, item_torch, names/de.json |
| Raft, Karve, Longship, Drakkar | Floß, Karve, Langschiff, Drakkar | ship_raft, ship_karve, ship_longship, ship_longship_ashlands |
| Cart | Karren | tool_cart |
| Cooking station, "the spits" | Kochstelle, Kochstellen | piece_cookingstation |
| Brazier | Feuerschale | piece_brazierfloor01 («Stehendes Feuerschale») |
| Banner, banners | Banner, Banner | piece_banner01 («Schwarzes Banner») |
| Stack (of wood…) | Stapel; the game's own («Holzstoß», «Stapel Kupfer», «Aschenholzstapel») | piece_woodstack, names/de.json |
| Light, lantern | Laterne | item_lantern («Dvergr-Laterne») |
| Rug, carpet | Teppich, Läufer (the game's pieces) | piece_rug_seal, piece_rug_deer |
| Lox saddle | Lox-Sattel | item_saddlelox |
| inventory, inventory slot | Inventar, Inventarplatz (own) | inventory_full |

### Damage, resistances, stats

| English | German | source |
|---|---|---|
| Damage | Schaden | inventory_damage |
| Blunt | Hauen | inventory_blunt |
| Slash | Schlitzen | inventory_slash |
| Pierce | Stechen | inventory_pierce |
| Chop | Hacken | inventory_chop |
| Pickaxe (damage; the site's "Mining") | Spitzhacke | inventory_pickaxe |
| Fire | Feuer | inventory_fire |
| Frost | Eis | inventory_frost |
| Lightning | Blitz | inventory_lightning |
| Poison | Gift | inventory_poison |
| Spirit | Geist | inventory_spirit |
| Very weak | Sehr schwach | inventory_veryweak |
| Weak | Schwach | inventory_weak |
| Slightly weak | Leicht schwach | inventory_slightlyweak |
| Slightly resistant | Leicht resistent | inventory_slightlyresistant |
| Resistant | Resistent | inventory_resistant |
| Very resistant | Sehr resistent | inventory_veryresistant |
| Immune | Immun | inventory_immune |
| Health | Gesundheit | item_food_health |
| Stamina | Ausdauer | item_food_stamina |
| Eitr | Eitr | item_food_eitr |
| Health regen, Stamina regen, Eitr regen | Gesundheitsregeneration, Ausdauerregeneration, Eitr-Regeneration | se_healthregen, se_staminaregen, se_eitrregen |
| Armour | Rüstung | item_armor |
| Block armour (block power) | Blockwert | item_blockpower |
| Block force (parry force) | Parierstärke | item_deflection |
| Durability | Haltbarkeit | item_durability |
| Weight | Gewicht | item_weight |
| Carry weight | Max. Gewicht; in prose «Tragegewicht» (own) | se_max_carryweight |
| Movement speed | Bewegungstempo | item_movement_modifier |
| Backstab | Hinterhältigkeit | item_backstab |
| tier (of a tool, an item) | Stufe | own (the game shows none) |
| Stagger resistance; stagger | Taumelwiderstand; taumeln, Taumeln | se_stagger |
| Fall damage, Jump height | Fallschaden, Sprunghöhe | item_falldamage, se_jumpheight |

The bosses' table heads "Weak / Resists / Immune": «Schwach / Resistent / Immun», the game's own words.

### Kinds of gear

| English | German | source |
|---|---|---|
| Atgeir, atgeirs | Atgeir, Atgeire | item_atgeir_bronze («Bronze-Atgeir») |
| Sledge | Hammer, as the items have it («Eisenhammer»); where it could be read as the build tool, name the item | item_sledge_iron |
| Trinket | Schmuckstück | item_trinket |
| Utility item | Hilfsgegenstand | item_utility |
| Fishing bait, bait | Angelköder, Köder | item_fishingbait |
| Grappling hook | Enterhaken | item_graplinghook |
| Fists (the weapon kind) | Faustwaffen (own; the skill is «Unbewaffnet») | own |
| Chest piece, leg piece | Brustschutz, Hose (the game's item names) | item_chest_wolf, names/de.json |
| Red Jute; jute in prose | Rote Jute; Jute | item_jutered |

### Status effects and comfort

| English | German | source |
|---|---|---|
| Rested | Ausgeruht | se_rested_name |
| Resting | Ruhend | se_resting_name |
| Shelter | Unterkunft | se_shelter_name |
| Comfort (the number in the Rested tooltip) | Gemütlich (as the game shows it: «Gemütlich: 12»); the noun in prose and the guide's title «Gemütlichkeit» | se_rested_comfort, ach_grindcomfort |
| comfort level | Gemütlichkeit («Gemütlichkeit 12»); not the achievement's «Behaglichkeitsstufe», which would mix with Cozy | own, from the above |
| Wet | Nass | se_wet_name |
| Cold | Kälte | se_cold_name |
| Freezing | Erfrieren | se_freezing_name |
| Warm | Warm | se_warm_name |
| Burning | Brennen | se_burning_name |
| Poisoned | Gift | se_poison_name |
| Encumbered | Überladen | se_encumbered_name |
| Cozy | Behaglich | se_cozy_name |
| Feather fall | Federfall | se_slowfall_name |

A status's name stands in „…“ in prose where it reads as a word of the sentence: «du bekommst „Nass“».

### Skills

| English | German | source |
|---|---|---|
| skill, skills | Fertigkeit, Fertigkeiten | inventory_skills |
| Swords, Knives, Clubs | Schwerter, Messer, Schlagwaffen | skill_swords, skill_knives, skill_clubs |
| Polearms, Spears | Stangenwaffen, Speere | skill_polearms, skill_spears |
| Blocking, Axes | Blocken, Äxte | skill_blocking, skill_axes |
| Bows, Crossbows | Bögen, Armbrüste | skill_bows, skill_crossbows |
| Elemental magic, Blood magic | Elementarmagie, Blutmagie | skill_elementalmagic, skill_bloodmagic |
| Unarmed (Fists) | Unbewaffnet | skill_unarmed |
| Pickaxes, Woodcutting | Spitzhacken, Holzhacken | skill_pickaxes, skill_woodcutting |
| Jump, Sneak, Run, Swim | Springen, Schleichen, Sprinten, Schwimmen | skill_jump, skill_sneak, skill_run, skill_swim |
| Fishing, Cooking, Farming | Angeln, Kochen, Landwirtschaft | skill_fishing, skill_cooking, skill_farming |
| Crafting, Ride, Dodge | Herstellung, Reiten, Ausweichen | skill_crafting, skill_ride, skill_dodge |

The guide "Farming" is «Landwirtschaft», the skill's word.

### World settings, raids, events

| English | German | source |
|---|---|---|
| Very easy, Easy | Sehr einfach, Einfach | menu_modifier_veryeasy, menu_modifier_easy |
| Normal | Normal | menu_modifier_normal |
| Hard, Very hard | Schwierig, Sehr schwierig | menu_modifier_hard, menu_modifier_veryhard |
| Hardcore | Albtraum | menu_modifier_hardcore |
| Casual, Immersive, Hammer mode | Gelegenheitsmodus, Immersiv, Hammermodus | menu_modifier_casual, _immersive, _hammer |
| preset | Voreinstellung | menu_presets |
| world modifiers | Welt-Modifikatoren | menu_modifier_popup_title |
| Combat (setting) | Kampf | menu_combat |
| Death penalty | Todesfolgen | menu_deathpenalty |
| No map, No portals | Keine Karte, Keine Portale | menu_nomap, menu_noportals |
| raid, raids; raid rate | Überfall, Überfälle; Überfall-Rate | menu_modifier_hammer_tooltip, menu_events |
| Jotun Invasion | Jötnar-Invasion | jotuninvasion |
| The Jotun Advance / Retreat | Die Jötnar rücken vor / Die Jötnar ziehen sich zurück | fimbulvinterorb_start, fimbulvinterorb_destroyed |
| map, minimap | Karte, Minikarte | settings_map, menu_nomap_tooltip |
| world | Welt («die 10. Welt») | menu_newworld, tutorial_haldor |

"Hard, Very hard and Hardcore" is «Schwierig, Sehr schwierig und Albtraum». A setting's name stands in „…“ in
prose («auf „Albtraum“», «mit „Keine Karte“»).

## 2. The site's own words

| English | German | source |
|---|---|---|
| Seed Archive | Seed Archive | site (a name, never translated) |
| Valheim | Valheim | site |
| Nidavellir | Nidavellir | site |
| Home | Startseite | site |
| Database (the menu item, was Catalog until 2026-11-24) | Datenbank | site |
| Guides | Guides | site (the word German players use) |
| Tools (the menu) | Tools | site; the catalogue's guide "Tools" (hammer, pickaxe…) is «Werkzeuge» |
| Basics | Grundlagen | site |
| Biomes | Biome | site |
| Challenges | Herausforderungen | site |
| World, Gear, Food and drink, Materials, Your base | Welt, Ausrüstung, Essen und Trinken, Materialien, Deine Basis | site |
| Map | Karte | site, settings_map |
| Menu, Account, Sign out, Language | Menü, Konto, Abmelden, Sprache | site |
| Privacy, Terms | Datenschutz, Nutzungsbedingungen | site |
| Release notes | Neuigkeiten | site |
| Support the archive | Das Archiv unterstützen | site |
| Bugs | Bugs | site |
| Chart, Table | Diagramm, Tabelle | site |
| New | Neu | site |
| seed, seeds | der Seed, die Seeds (the game's field is «Seed» too, menu_seed) | site, menu_seed |
| Valheim seed map | Valheim-Seed-Karte | site |
| How good is my seed? | Wie gut ist mein Seed? | site |
| Best seeds | Beste Seeds | site |
| Craft tree | Herstellungsbaum | site (from skill_crafting «Herstellung») |
| Wind | Wind | site |
| speedrun, speedrunner, a runner | Speedrun, Speedrunner, Speedrunner | site |
| run (a speedrun, a playthrough) | Run (der Run, die Runs) | site |
| reverse run | Rückwärts-Run | site |
| strip (the speedrun's line) | Streifen | site |
| start (Sacrificial Stones as the start) | Start | site |
| starting island | Startinsel | site |
| home (the usual player's) / base (the runner's) | Zuhause / Basis | site; «Basis» as menu_modifier_hammer_tooltip |
| score | Wertung | site |
| Rate (the button) | Bewerten | site |
| report (the seed's) | Bericht | site |
| as a rule (the median) | in der Regel | site |
| middle half (of seeds) | die mittlere Hälfte (der Seeds) | site |
| share | Anteil | site |
| the best quarter / the worst quarter | das beste Viertel / das schlechteste Viertel | site |
| layer (of the map) | Ebene | site |
| pin | Markierung | site |
| ruler | Lineal | site |
| loot | Beute | site |
| catalogue page / guide | Katalogseite / Guide | site |
| chapter (a biome guide) | Kapitel | site |
| the wind ahead of your beam; on either side (of the bow) | vorlicher als querab; an Backbord wie an Steuerbord | own (nautical) |
| Stands there / Stands there, by its turn / Rolled when you take it (the loot groups) | Steht dort / Steht dort, je nach Drehung / Wird ausgewürfelt, wenn du es nimmst | site |
| Speedrunners (footnote label) | **Für Speedrunner** | site |

The map's layers: Bosse, Händler, Dungeons, Ressourcen, Gebäude, Höhenlinien, Bäume, Erz, Edelholz, Spawner.

### Guide titles (menu labels, each the `<h1>` of its page)

| English | German |
|---|---|
| A speedrunner's start | Der Start eines Speedrunners |
| Meadows … Deep North (the biome guides) | the biome's name (Grasland … Hoher Norden) |
| How to kill each boss | Wie du jeden Boss besiegst |
| What to buy from the traders | Was du bei den Händlern kaufst |
| Weapons, Damage types | Waffen, Schadensarten |
| Raids | Überfälle |
| No death, no map, no portals | Ohne Tod, ohne Karte, ohne Portale |
| Forge of Potential | Schmiede des Potenzials |
| Speedrun, Reverse run | Speedrun, Rückwärts-Run |
| Where to build your base | Wo du deine Basis baust |
| How much metal a run takes | Wie viel Metall ein Run braucht |
| Hard, Very hard and Hardcore | Schwierig, Sehr schwierig und Albtraum |
| Boss arenas | Boss-Arenen |
| Taming animals | Tiere zähmen |
| Bows, crossbows and arrows | Bögen, Armbrüste und Pfeile |
| Staffs, Armour, Tools | Stäbe, Rüstung, Werkzeuge |
| Meads, Trophies | Met, Trophäen |
| Crafting stations | Handwerksstationen |
| Wood building, Stone building | Bauen mit Holz, Bauen mit Stein |
| Furniture, Deep North building | Möbel, Bauten des Hohen Nordens |
| Ships and carts | Schiffe und Karren |
| Other build pieces | Weitere Bau-Objekte |
| Creatures, Farming | Kreaturen, Landwirtschaft |
| Food and feasts | Essen und Festmähler |
| Comfort | Gemütlichkeit |
| Materials | Materialien |
| Caves and dungeons | Höhlen und Dungeons |
| What to break | Was du zerschlagen kannst |

All source "site", taking the game's words where the table above has them (Stäbe from «Trollstab», «Bau-Objekte»
from menu_modifier_hammer_tooltip). The footnote labels: **Für Speedrunner**, **Ohne Karte**, **Ohne Portale**,
**Im Rückwärts-Run**, **Ganz entspannt**, **Ohne Tod**.

## 3. How the reader is addressed

**du**, everywhere: every text, every button, every heading and every meta description. The owner's decision for
every game of the archive (2026-11-24), whatever the game's own narrator does; in German the game agrees: Hugin
«um dich auf deiner Reise zu begleiten» (tutorial_stemple1_text), the menus «Du hast keinen Zugriff auf die Karte»
(menu_nomap_tooltip), «Im Hammermodus kannst du…» (menu_modifier_hammer_tooltip). Never «Sie», never «ihr» for a
reader (a group of players in a multiplayer world may be «ihr» only inside a sentence about them).

- Pronouns in lower case, as the Duden recommends for websites: du, dich, dir, dein, deine, deinem, deinen, deiner.
- Verbs in the second person singular: du findest, du baust, du brauchst, du nimmst, du kannst, du musst, du
  solltest, du bist, du hast, du wirst.
- Buttons and instructions in the informal imperative singular, without «du»: «Gib deinen Seed ein», «Finde
  Namen», «Bewerte», «Zeig die Karte», «Wähle», «Schalte aus», «Nimm», «Sieh dir … an».
- The bold questions of a page are the reader's own, in the first person: «Wie gut ist mein Seed?», «Wie viel Holz
  und Erz braucht mein Run?».
- The rule "told to the reader as you" (`.claude/rules/site-text.md`) becomes «du».

## 4. Style

- Quotes are German: „…“ (U+201E, U+201C); a quote inside a quote ‚…‘. The «» used in this file's own prose are
  only for this file.
- A dash is the en dash with spaces: « – ». A range keeps the en dash without spaces: «5–10 min», «{low}–{high} min».
- Every noun takes its capital, the game's names included; headings and labels otherwise in sentence case:
  «Beste Seeds», «Wie gut ist mein Seed?», «Die Startinsel».
- Compounds follow the game: a hyphen where the game sets one («Surtling-Kern», «Grauzwergen-Nest», «Eitr-Raffinerie»),
  none where it does not («Kupfererz», «Trollleder»). Our own compounds with a name take a hyphen:
  «Fuling-Dorf», «Valheim-Seed-Karte».
- Numbers keep the site's format: they come from the data and `react-intl` formats them for `de` (1.234,5); never
  retype a number, and keep every placeholder (`{n}`, `{m}`, `#`) and tag (`<link>`, `<b>`) as it is. In prose a
  number written by hand uses the decimal comma and the thousands point (2,5 km; 1.200 m).
- Units, after a no-break space: «m» metres, «km» kilometres, «s» seconds, «min» minutes, «m/s» speed:
  «{m} m», «{v} m/s», «{n} min». Percent also takes a no-break space in German: «{v} %», «{pct} %».
- An ordinal is a number with a point: «die 10. Welt», «Stufe 3».
- ß and umlauts always (Floß, Bärenhöhle, Jötnar); never ss, ae, oe, ue.
- A page's bold question and the guides list's line for that page use the same German words.

## 5. Plurals

German has two ICU plural forms, `one` (exactly 1) and `other` (0, 2, 3…, fractions). Every `plural` has both,
even where the English has only `other`. An `=0` or `=1` case is added only where the sentence changes, as in
«Jede Minute» for 1:

```
{count, plural, one {Der # beste Seed} other {Die # besten Seeds}}
{camps, plural, one {# Grauzwergen-Lager} other {# Grauzwergen-Lager}}
{crypts, plural, one {# Versunkene Krypta} other {# Versunkene Krypten}}
{minutes, plural, =1 {Jede Minute} one {Jede # Minute} other {Alle # Minuten}}
{n, plural, one {# min} other {# min}}
```

A noun after a number declines with the sentence: «in # Versunkenen Krypten», «mit # Kupferadern». `select` keeps
its English keys (`yes`, `other`); only the text inside is translated.
