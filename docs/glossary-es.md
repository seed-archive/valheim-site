# Spanish glossary

The words every translator of `lib/i18n/en.json` and `content/en/` into `es` uses, so the three of us write one
site. A term settled here is never translated another way. Translate from the English, never from the Russian.
Sources, in order:

1. the game's own Spanish, by localization key (game build 1.0.21; the Valheim generator's game data). Names of
   items, pieces, creatures and places not listed here come from `lib/valheim/names/es.json`, which maps the site's
   English names to the game's Spanish;
2. this glossary for the site's own words (source "site");
3. a literal translation of our own (source "own"), only where neither has the word.

**The game's form wins** (the owner, 2026-11-24): wherever a term catches the player's eye in the game (an item, a
setting, a difficulty level, a status, a station, a skill), the site writes exactly the game's form, its spelling and
its capitals, even where it sounds odd («Con energía», «Piquetes», «Brutal»). A player compares the site with the
game, and a word that differs makes him think the numbers differ too.

The game's Spanish is not always consistent with itself. Where two keys disagree, the one below is the one the
player sees most (the HUD, the item's own name, the menu), and the other is noted.

## 1. Game terms

### Biomes

| English | Spanish | source |
|---|---|---|
| Meadows | Praderas | biome_meadows |
| Black Forest | Bosque negro | biome_blackforest |
| Swamp | Pantano | biome_swamp |
| Mountain | Montaña (prose: montañas) | biome_mountain |
| Plains | Llanuras | biome_plains |
| Mistlands | Tierras Nubladas | biome_mistlands |
| Ashlands | Tierra de Ceniza (Hugin's label says «Tierras de Ceniza»; the biome's own name wins) | biome_ashlands |
| Deep North | Norte profundo | biome_deepnorth |
| Ocean | Océano | biome_ocean |
| biome | bioma | own (community) |

In prose a biome keeps its game capitals and takes the article: «en las Praderas», «en el Bosque negro», «en el
Pantano», «en la Montaña», «en las Llanuras», «en las Tierras Nubladas», «en la Tierra de Ceniza», «en el Norte
profundo», «en el Océano»; with *de*: «del Bosque negro», «de las Llanuras». A biome's guide chapter is titled with
its bare name.

### Bosses and their powers

| English | Spanish | source |
|---|---|---|
| Eikthyr | Eikthyr | enemy_eikthyr |
| The Elder | El Sabio | enemy_gdking |
| Bonemass | Tuétano (one achievement says «Masa de huesos»; the creature's name wins) | enemy_bonemass |
| Moder | Moder | enemy_dragon |
| Yagluth | Yagluth | enemy_goblinking |
| The Queen | La Reina | enemy_seekerqueen |
| Fader | Fader | enemy_fader |
| Kall, Kall Fimbulbringer | Kall, Kall Fimbulbringer | enemy_frozenking |
| boss | jefe | own (community; the game says «los Desterrados») |
| the Forsaken (the game's name for the bosses) | los Desterrados | tutorial_altar_label |
| power (a boss's, at the stones) | Poder de los Desterrados; in prose «poder» | settings_gp |
| boss altar | altar del jefe | own; the game: «Altares de los Desterrados» (tutorial_altar_label) |
| aspect (Kall's phase 2) | aspecto | own |
| phase | fase | own |

The Elder and the Queen carry their article: «el Sabio», «la Reina» in prose, and *de* + *el* contracts: «el altar
del Sabio», «la puerta de la Reina», «el altar de Moder». A sentence that puts `{boss}` in a placeholder never puts
an article or an adjective that agrees with it beside the placeholder (the boss may be el Sabio or la Reina):
«{boss} queda fuera de la franja», not «El {boss}…».

### Traders and helpers

| English | Spanish | source |
|---|---|---|
| Haldor | Haldor | npc_haldor |
| Hildir | Hildir | npc_hildir |
| the Bog Witch | la bruja del pantano (as a name on a label: La bruja del pantano) | npc_bogwitch |
| Hugin (the raven) | Hugin, el cuervo Hugin | npc_hugin, loadscreen_tip15 |
| Munin | Munin | npc_munin |
| Odin | Odín | piece_banner04_description |
| Valkyrie | Valquiria | npc_valkyrie_end |
| trader | comerciante | tutorial_haldor_label («Haldor el Comerciante») |
| Thungr, Zil | Thungr, Zil | enemy_goblinbrute_hildir, enemy_goblin_hildir |
| Hildir's chest (Brass, Silver, Bronze) | cofre de Hildir (Cofre de latón de Hildir, Cofre de plata de Hildir, Cofre de bronce de Hildir) | names/es.json |

### Dungeons and places

| English | Spanish | source |
|---|---|---|
| dungeon | mazmorra | tutorial_crypt_label |
| Burial Chamber(s) | Cámara funeraria, Cámaras funerarias | location_forestcrypt |
| Sunken Crypt(s) | Cripta hundida, Criptas hundidas | location_sunkencrypt |
| troll cave | cueva del trol (plural: cuevas del trol) | location_forestcave |
| frost cave | caverna gélida, Cavernas gélidas | location_mountaincave |
| Infested Mine | Mina infestada | location_dvergrtown |
| Infested Citadel | Ciudadela infestada | location_dvergrboss |
| Charred Fortress | Fortaleza carbonizada | charredfortress |
| Mörkhalla | Mörkhalla | location_morkhalla |
| Winding Tunnels | Túneles serpenteantes | location_thehole |
| Morgen hole | Agujero pútrido (the English game says Putrid Hole) | location_morgenhole |
| Bear den | Cueva de osos | location_bearcave |
| Howling Cavern | Caverna de los aullidos | hud_pin_hildir2 |
| Smouldering Tomb | Tumba humeante | hud_pin_hildir1 |
| Sealed Tower | Torre sellada | hud_pin_hildir3 |
| Sacrificial Stones | las piedras de sacrificio (one: Piedra de sacrificio) | tutorial_stemple1_text, guardianstone_name |
| Vegvísir | Vegvísir (plural: vegvísires) | piece_vegvisir, tutorial_stemple2_label |
| Runestone | Piedra rúnica | piece_lorestone |
| Greydwarf nest | Nido de grisucios | enemy_greydwarfspawner |
| Forge of Potential | Forja del Potencial | piece_upgradestation |
| Yggdrasil | Yggdrasil | item_yggdrasilwood |
| Ancient root, Yggdrasil root | Raíz milenaria; raíz de Yggdrasil | prop_ancienttreeroot, tutorial_yggroot_label |
| giant's remains | restos de gigante | tutorial_giants_label |
| Cartography table | Mesa de cartografía | piece_cartographytable |

A Burial Chamber, a Sunken Crypt and the frost caves keep the game's capital on the first word in a label and as a
name; in running prose they are common nouns: «una cámara funeraria», «las criptas hundidas», «una caverna gélida».
A troll cave stays lower case.

Places the game does not name are our own literal words: abandoned house «casa abandonada», abandoned farm «granja
abandonada», Fuling village «aldea fuling», Fuling outpost «puesto fuling», Draugr village «aldea draugr», tar pit
«pozo de brea», drake nest «nido de draco», fire hole «agujero de fuego», shipwreck «naufragio», Greydwarf camp
«campamento de grisucios», stone tower ruins «ruinas de torre de piedra», swamp hut «cabaña del pantano», volture
nest «nido de buicán», Dvergr ruins «ruinas dvergr», Charred ruins «ruinas carbonizadas», standing stones «piedras
erguidas», dolmen «dolmen», grave «tumba», well «pozo», waymarker «hito».

### Creatures that recur

A creature's name is capitalised only as the game writes it; in prose it is a common noun with a Spanish plural
(un grisucio, los troles).

| English | Spanish | source |
|---|---|---|
| Greydwarf | grisucio | enemy_greydwarf |
| Troll | trol (plural: troles) | enemy_troll |
| Skeleton | esqueleto | enemy_skeleton |
| Draugr | draugr (plural: draugrs) | enemy_draugr |
| Leech | sanguijuela | enemy_leech |
| Blob | babosa | enemy_blob |
| Wraith | espíritu (also the damage type Spirit: say «el espíritu» for the creature, «daño de Espíritu» for the type) | enemy_wraith |
| Ghost | fantasma | enemy_ghost |
| Abomination | abominación | enemy_abomination |
| Wolf | lobo | enemy_wolf |
| Drake | draco | enemy_drake |
| Fenring | fenring | enemy_fenring |
| Ulv | ulv | enemy_ulv |
| Cultist | cultista | enemy_fenringcultist |
| Stone Golem | gólem de piedra | enemy_stonegolem |
| Bat | murciélago | enemy_bat |
| Fuling | fuling (plural: fulings) | enemy_goblin |
| Deathsquito | muersquito | enemy_deathsquito |
| Lox | luey (plural: lueyes) | enemy_lox |
| Seeker | buscador | enemy_seeker |
| Tick | garrapata | enemy_tick |
| Gjall | gjall | enemy_gjall |
| Dvergr | dvergr, plural dvergrs (as in «Mago Dvergr») | enemy_dvergrs, enemy_dvergr_mage |
| Surtling | surtling (plural: surtlings) | enemy_surtling |
| the Charred | los carbonizados | enemy_charred |
| Twitcher | crispante | enemy_charred_twitcher |
| Morgen | morgen | enemy_morgen |
| Volture | buicán | enemy_volture |
| Asksvin | cenicerdo | enemy_asksvin |
| Fallen Valkyrie | valquiria caída | enemy_fallenvalkyrie |
| Serpent | serpiente | enemy_serpent |
| Bonemaw | faucesoseas | enemy_bonemawserpent |
| Frysling | frysling | enemy_frysling |
| Eyeless One | sin ojos | enemy_elakingmole |
| Writhan | marchitado | enemy_writhan |
| Jotun(s) | jotun, los jotun (no plural -s, as the game) | event_jotunarmy_start |
| Krigen, Hexen | krigen, hexen | enemy_jotun_warrior, enemy_jotun_witch |
| Boar, Deer, Neck, Bear | jabalí, ciervo, nixe, bjorn (the game calls the bear «Bjorn»; in prose «oso» is fine where no name is shown) | enemy_boar, enemy_deer, enemy_neck, enemy_bjorn |
| Leviathan, Lava leviathan | leviatán, leviatán de lava | own (the game has no name for it) |
| star (a creature's level) | estrella | ach_bigfish_desc |
| spawner | generador (de criaturas) | own |

### Key items and materials

| English | Spanish | source |
|---|---|---|
| Wood | Madera | item_wood |
| Fine wood | Madera noble | item_finewood |
| Core wood | Madera resistente | item_roundlog |
| Stone, Flint | Piedra, Sílex | item_stone, item_flint |
| Copper, Tin, Bronze | Cobre, Estaño, Bronce | item_copper, item_tin, item_bronze |
| Iron, Scrap Iron | Hierro, Chatarra | item_iron, item_ironscrap |
| Silver | Plata | item_silver |
| Black metal | Metal negro | item_blackmetal |
| Flametal | Flametal (the bar itself); «llametal» inside every other name (Mineral de llametal, Coraza de llametal, the idol tier Llametal) | item_flametal, item_flametalore, names/es.json |
| Bloodgold | Oro sanguino | item_gold |
| ore (Copper Ore…) | mineral (Mineral de cobre…); Hugin's tip says «mena» | item_copperore |
| Obsidian | Obsidiana | item_obsidian |
| Black marble | Mármol negro | item_blackmarble |
| Grausten | Piedra cenicienta | item_grausten |
| Ashwood | Madera de ceniza | item_blackwood |
| Sulfur | Azufre | item_sulfurstone |
| Surtling core | Corazón de surtling | item_surtlingcore |
| Black core | Núcleo negro | item_blackcore |
| Troll hide | Piel de trol | item_trollhide |
| Honey, Barley, Flax | Miel, Cebada, Lino | item_honey, item_barley, item_flax |
| Tar, Guck, Sap | Brea, Viscosidad, Savia | item_tar, item_guck, item_sap |
| Coins, Ancient coin | Monedas, Moneda antigua | item_coins, item_ancientcoin |
| Fuling totem | Tótem de fuling | names/es.json |
| Dragon egg | Huevo de dragón | item_dragonegg |
| Swamp key | Llave de la cripta | item_cryptkey |
| Sealbreaker, Sealbreaker fragment | Rompedor de sellos, Fragmento del rompedor de sellos | item_dvergrkey, item_dvergrkeyfragment |
| Dvergr Extractor | Extractor Dvergr | item_dvergrneedle |
| Bell fragment | Fragmento de campana | item_bellfragment |
| Fenris hair | Pelo de Fenris | item_pickable_hairstrands |
| Malicious Ice | Hielo malicioso | blackice_core |
| Orb of Fimbulvinter | Orbe de Fimbulvinter | fimbulvinterorb |
| Megingjord | Megingjord | item_beltstrength |
| Root Harnesk | Coraza de raíces | item_chest_root |
| Wishbone | Fúrcula | item_wishbone |
| Wolf fur cape | Capa de pelo de lobo | item_cape_wolf |
| Trollstav | Trollstav | item_staffredtroll |
| Echo Spike | Púa de eco | item_staff_orbofahri |
| Mead (generic), mead base | hidromiel (masculine: el hidromiel, los hidromieles), base de hidromiel | se_mead_name, names/es.json |
| a mead base by name | as names/es.json has it, «Malta: …» or «Base de hidromiel: …» (the game uses both) | item_meadbasetasty |
| Frost (resistance) mead | Hidromiel resistente a la congelación | item_mead_frostres |
| potion | poción | se_healthpotionminor_name |
| Feast, feasts | banquete, banquetes | hud_feasts |
| Trophy | Trofeo; a boss's: «Trofeo de Eikthyr» | item_trophy_eikthyr, inventory_trophies |
| mould | molde | tutorial_mould_hugin_label |
| recipe | receta | inventory_onlyoneingredient |
| ingredients | ingredientes | inventory_onlyoneingredient |
| Food | Comida | item_food, hud_food |

### Idols and upgrade quality

| English | Spanish | source |
|---|---|---|
| Idol | ídolo | item_upgrader_name |
| Battle idol | ídolo de batalla | item_upgrader_name + item_upgrader_weapon |
| Protection idol | ídolo de protección | item_upgrader_name + item_upgrader_armor |
| Bronze Battle Idol (any tier) | Ídolo de batalla (Bronce); tiers: Madera, Bronce, Hierro, Plata, Metal negro, Mármol negro, Llametal, Oro sanguino | item_upgrader_tier0…7 |
| quality | calidad | inventory_quality |
| level (of quality, of a station) | nivel | msg_level, inventory_stationlevel |
| upgrade (verb, noun) | mejorar, mejora | inventory_upgradebutton, inventory_upgrade |
| Max quality | Calidad máxima | inventory_maxquality |
| a try at the forge | intento de refinamiento (the button: «Intentar refinamiento») | inventory_upgraderbutton |
| break (at the forge) | destruirse (the game: «El refinamiento puede destruir tu objeto») | inventory_upgraderwarning |

The game builds an idol's name from three strings, and `names/es.json` holds them in the English order («Llametal
Batalla Ídolo»); the site writes «Ídolo de batalla (Llametal)».

### Stations, tools, pieces, ships

| English | Spanish | source |
|---|---|---|
| crafting station | estación de trabajo | piece_craftingstation, inventory_stationlevel |
| station level | nivel de estación de trabajo | inventory_stationlevel |
| extension, upgrade of a station | mejora (de la estación) | inventory_stationlevel («sube al construir mejoras») |
| Workbench | Banco de trabajo | piece_workbench |
| Forge | Forja | piece_forge |
| Stonecutter | Cortapiedras | piece_stonecutter |
| Artisan table | Mesa de artesanía | piece_artisanstation |
| Black forge | Forja negra | piece_blackforge |
| Galdr table | Mesa de galdr | piece_magetable |
| Cauldron | Caldero | piece_cauldron |
| Mead ketill | Caldero de aguamiel | piece_meadcauldron |
| Fermenter | Fermentador | piece_fermenter |
| Food preparation table | Mesa para preparación de alimentos | piece_preptable |
| Serving tray | Bandeja para servir | item_feaster |
| Smelter | Horno de fundición | piece_smelter |
| Charcoal kiln | Horno de carbón | piece_charcoalkiln |
| Blast furnace | Gran horno | piece_blastfurnace |
| Spinning wheel, Windmill | Rueca, Molino de viento | piece_spinningwheel, piece_windmill |
| Eitr refinery | Refinería de Eitr | piece_eitrrefinery |
| Campfire, Bonfire, Hearth | Fogata, Hoguera, Chimenea | piece_firepit, piece_bonfire, piece_hearth |
| Bed | Cama | piece_bed |
| spawn point | punto de aparición | piece_bed_setspawn |
| Portal | Portal | piece_portal |
| Ward | Estatua guardiana (Hugin's label says «Piedra guardiana»; the piece's name wins) | piece_guardstone |
| Shield generator | Generador de escudo | piece_shieldgenerator |
| Item stand | Expositor | piece_itemstand |
| Training dummy | muñeco de entrenamiento in prose (the piece: P. A. L. O.) | piece_trainingdummy |
| Obliterator | Obliterador | piece_incinerator |
| Beehive | Colmena | piece_beehive |
| Stakewall | Empalizada | piece_stakewall |
| Ballista, Catapult, Battering ram | Ballesta, Catapulta, Ariete | piece_turret, tool_catapult, tool_batteringram |
| Hammer, Hoe, Cultivator | Martillo, Azada, Cultivador | item_hammer, item_hoe, item_cultivator |
| Pickaxe, Torch, Fishing rod | Pico, Antorcha, Caña de pescar | inventory_pickaxe, item_torch, item_fishingrod |
| Raft, Karve, Longship, Drakkar | Balsa, Karve, Barco vikingo, Drakkar | ship_raft, ship_karve, ship_longship, ship_longship_ashlands |
| Cart | Carro | tool_cart |
| Cooking station, "the spits" | Estación de cocina, las estaciones de cocina | piece_cookingstation |
| Brazier | Brasero (the piece: Brasero de pie) | piece_brazierfloor01 |
| Banner, banners | bandera, banderas | piece_banner01 («Bandera negra») |
| Stack (of wood…) | pila (Pila de leña) | piece_woodstack |
| Light, lantern (furniture, tool) | linterna (Linterna dvergr); other lights by their names (Farol de lava…) | item_lantern, piece_dvergr_lantern |
| Rug, carpet | alfombra | piece_rug_deer, piece_rug_seal |
| Lox saddle | Silla de montar para luey | item_saddlelox |
| inventory | inventario | inventory_full |
| build, building (the menu) | construir, Construcción | hud_build, hud_building |
| Furniture (the build tab) | Decoración | hud_furniture |
| build piece | pieza de construcción | menu_modifier_hammer_tooltip |

The siege Ballista and the weapon kind crossbow share the word «ballesta» in the game. A crossbow is «ballesta»; the
siege piece is «la Ballesta», capitalised, with «(arma de asedio)» the first time a page names it.

### Damage, resistances, stats

| English | Spanish | source |
|---|---|---|
| Damage | Daño | inventory_damage |
| Blunt | Contundente | inventory_blunt |
| Slash | Tajante | inventory_slash |
| Pierce | Perforante | inventory_pierce |
| Chop | Cortante | inventory_chop |
| Pickaxe (damage; the site's "Mining") | Pico | inventory_pickaxe |
| Fire | Fuego | inventory_fire |
| Frost | Escarcha | inventory_frost |
| Lightning | Rayo | inventory_lightning |
| Poison | Veneno | inventory_poison |
| Spirit | Espíritu | inventory_spirit |
| Very weak | Muy débil | inventory_veryweak |
| Weak | Débil | inventory_weak |
| Slightly weak | Ligeramente débil | inventory_slightlyweak |
| Slightly resistant | Ligeramente resistente | inventory_slightlyresistant |
| Resistant | Resistente | inventory_resistant |
| Very resistant | Muy resistente | inventory_veryresistant |
| Immune | Inmune (head: «Inmunidad», own) | inventory_immune |
| Health | Salud | item_food_health |
| Stamina | Vigor | item_food_stamina |
| Eitr | Eitr | item_food_eitr |
| Health regen, Stamina regen, Eitr regen | Regeneración de salud / de vigor / de Eitr | se_healthregen, se_staminaregen, se_eitrregen |
| Armour | Armadura | item_armor |
| Block armour | Poder de bloqueo | item_blockpower |
| Block force (parry force) | Fuerza de esquiva | item_deflection |
| Durability | Resistencia (not to be confused with Resistente, a resistance) | item_durability |
| Weight | Peso | item_weight |
| Carry weight | carga máxima | se_max_carryweight |
| Movement speed | Velocidad de movimiento | item_movement_modifier |
| Backstab | Ataque furtivo | item_backstab |
| tier (of a tool, an item) | nivel | own (the game shows none) |
| Stagger resistance; stagger | Resistencia al tambaleo; tambaleo | se_stagger |
| Fall damage, Jump height | Daño por caída, Altura del salto | item_falldamage, se_jumpheight |

A damage type in prose is «daño Contundente», «daño de Fuego», «daño de Escarcha»: the game's word, capitalised as
in the item panel.

### Kinds of gear

| English | Spanish | source |
|---|---|---|
| Atgeir, atgeirs | Atgeir, atgeirs | item_atgeir_bronze («Atgeir de bronce») |
| Sledge | Mazo | item_sledge_iron («Mazo de hierro»); a few names say «almádena», keep them as names/es.json has them |
| Staff, staffs | báculo, báculos | item_staffshield («Báculo de Protección») |
| Trinket | Abalorio | item_trinket, tutorial_trinket_label |
| Utility item | Objeto útil | item_utility |
| Fishing bait, bait | Cebo | item_fishingbait |
| Grappling hook | Gancho de agarre | item_graplinghook |
| Fists (the weapon kind) | nudillos | names/es.json («Nudillos nord») |
| Fists (the skill) | Desarmado | skill_unarmed |
| Arrows, bolts | flechas, virotes | ammo_arrows, ammo_bolts |
| Chest piece, leg piece | pieza de torso, pieza de piernas | own |
| Red Jute; jute in prose | Yute rojo; yute | item_jutered |

Head "Weak / Resists / Immune" of the bosses' table: «Débil / Resiste / Inmune»; the full forms above stay for a
single value.

### Status effects and comfort

| English | Spanish | source |
|---|---|---|
| Rested | Con energía | se_rested_name |
| Resting | Descansando | se_resting_name |
| Shelter | A cubierto | se_shelter_name |
| Comfort | Comodidad | se_rested_comfort |
| Wet | Humedad | se_wet_name |
| Cold | Frío | se_cold_name |
| Freezing | Congelación | se_freezing_name |
| Warm | Calidez | se_warm_name |
| Burning | Quemadura | se_burning_name |
| Poisoned | Veneno | se_poison_name |
| Encumbered | Sobrecarga | se_encumbered_name |
| Cozy | Bienestar | se_cozy_name |
| Feather fall | Caída de pluma | se_slowfall_name |

A status named in prose stands in «» with the word «estado» before it: «el estado «Con energía»», «con el estado
«Sobrecarga»»; the game's names read as phrases, not nouns, and the quotes keep them from blending into the sentence.

### Skills

| English | Spanish | source |
|---|---|---|
| skill, skills | habilidad, habilidades | inventory_skills |
| Swords, Knives, Clubs | Espadas, Cuchillos, Garrotes | skill_swords, skill_knives, skill_clubs |
| Polearms, Spears | Piquetes, Lanzas | skill_polearms, skill_spears |
| Blocking, Axes | Bloqueo, Hachas | skill_blocking, skill_axes |
| Bows, Crossbows | Arcos, Ballestas | skill_bows, skill_crossbows |
| Elemental magic, Blood magic | Magia elemental, Magia de sangre | skill_elementalmagic, skill_bloodmagic |
| Unarmed (Fists) | Desarmado | skill_unarmed |
| Pickaxes, Woodcutting | Picos, Tala | skill_pickaxes, skill_woodcutting |
| Jump, Sneak, Run, Swim | Salto, Sigilo, Carrera, Natación | skill_jump, skill_sneak, skill_run, skill_swim |
| Fishing, Cooking, Farming | Pesca, Cocina, Cultivo | skill_fishing, skill_cooking, skill_farming |
| Crafting, Ride, Dodge | Elaboración, Cabalgar, Evasión | skill_crafting, skill_ride, skill_dodge |

### World settings, raids, events

| English | Spanish | source |
|---|---|---|
| Very easy, Easy | Muy fácil, Fácil | menu_modifier_veryeasy, menu_modifier_easy |
| Normal | Normal | menu_modifier_normal |
| Hard, Very hard | Difícil, Muy difícil | menu_modifier_hard, menu_modifier_veryhard |
| Hardcore | Brutal | menu_modifier_hardcore |
| Casual, Immersive, Hammer mode | Tranquilo, Inmersivo, Modo martillo | menu_modifier_casual, menu_modifier_immersive, menu_modifier_hammer |
| preset | preajuste | menu_presets |
| world modifiers | modificadores de mundo | menu_modifier_popup_title |
| Combat (setting) | Combate | menu_combat |
| Death penalty | Penalización por muerte | menu_deathpenalty |
| Resource rate | Obtención de recursos | menu_resources |
| No map, No portals | Sin mapa, Sin portales | menu_nomap, menu_noportals |
| Raid rate (setting) | Asaltos | menu_events |
| raid | asalto (a tu base) | menu_events, menu_modifier_hard_tooltip |
| Jotun Invasion | Invasión jotun | jotuninvasion |
| The Jotun Advance / Retreat | El avance de los jotun / La retirada de los jotun | fimbulvinterorb_start, fimbulvinterorb_destroyed |
| map, minimap | mapa, minimapa | settings_map, menu_nomap_tooltip |
| world | mundo | menu_worlds |
| playthrough | partida | menu_modifier_popup_text («tu primera partida») |
| tame (verb), taming | domar, doma | hud_tame |

"Hard, Very hard and Hardcore" is «Difícil, Muy difícil y Brutal». A setting's name stands in «» in prose («en
«Brutal»», «con «Sin mapa»»), so it reads as the name the menu shows and not as an adjective.

## 2. The site's own words

| English | Spanish | source |
|---|---|---|
| Seed Archive | Seed Archive | site (a name, never translated) |
| Valheim | Valheim | site (the game's menu writes it so: menu_modifier_popup_text) |
| Nidavellir | Nidavellir | site (a name, never translated) |
| Home | Inicio | site |
| Catalog | Catálogo | site |
| Guides | Guías | site |
| Tools | Herramientas | site |
| Basics | Lo básico | site |
| Biomes | Biomas | site |
| Challenges | Desafíos | site |
| World, Gear, Food and drink, Materials, Your base | Mundo, Equipo, Comida y bebida, Materiales, Tu base | site |
| Map | Mapa | site, settings_map |
| Menu, Account, Sign out, Language | Menú, Cuenta, Cerrar sesión, Idioma | site |
| Privacy, Terms | Privacidad, Términos | site |
| Release notes | Novedades | site |
| Support the archive | Apoya el archivo | site |
| Bugs | Errores | site |
| Chart, Table | Gráfico, Tabla | site |
| New (a badge) | Nuevo | site |
| seed | semilla (the game's own field is «Semilla», menu_seed) | site |
| Valheim seeds | Semillas de Valheim | site |
| Valheim seed map | Mapa de semillas de Valheim | site |
| How good is my seed? | ¿Es buena mi semilla? | site |
| Best seeds | Mejores semillas | site |
| Craft tree | Árbol de fabricación | site (the game's tag: «Fabricación», tag_crafting) |
| Wind | Viento | site |
| speedrun, speedrunner, a runner | speedrun (el speedrun), speedrunner (el/la speedrunner, plural speedrunners) | site (the community's anglicism) |
| the wind ahead of your beam; on either side (of the bow) | viento por delante del través; por cualquier banda | own (nautical) |
| Stands there / Stands there, by its turn / Rolled when you take it (the loot groups) | Está ahí / Está ahí, según su giro / Se decide al recogerlo | site |
| Speedrunners (footnote label) | **Para speedrunners** | site |
| run (a speedrun, a playthrough) | partida | site, from menu_modifier_popup_text |
| reverse run | partida inversa | site |
| strip (the speedrun's line) | franja | site |
| start (Sacrificial Stones as the start) | inicio (el inicio) | site |
| starting island | isla inicial | site |
| home (the usual player's) / base (the runner's) | hogar / base | site |
| score | puntuación | site |
| Rate (the button) | Evaluar | site |
| report (the seed's) | informe | site |
| as a rule (the median) | por lo general | site |
| middle half (of seeds) | la mitad central (de las semillas) | site |
| share | proporción | site |
| the best quarter / the worst quarter | el mejor cuarto / el peor cuarto (de las semillas) | site |
| layer (of the map) | capa | site |
| pin | marca | site, hud_addpin («Añadir marca») |
| ruler | regla | site |
| loot | botín | site |
| catalogue page / guide | página del catálogo / guía | site |
| chapter (a biome guide) | capítulo | site |

"Seed": Spanish-speaking Valheim players say «semilla», and the game's own world-creation field says «Semilla»
(menu_seed), so the word a player types his seed into and the word on the site are the same. «Seed» in English
appears in Spanish forums too, but «semilla» is what Spanish searches use («mejores semillas Valheim»). It is
feminine: «una buena semilla», «esta semilla».

"Speedrun" and "speedrunner" stay in English, as the Spanish speedrunning community writes them; «run» alone is not
used: a run is «partida», the game's word for a playthrough. "Strip" is «franja», the band of the map the run
follows. "As a rule" (the median) is «por lo general»; "the middle half of seeds" is «la mitad central de las
semillas».

The verb *coger* is never used (vulgar in much of Latin America): «recoger», «tomar», «llevarse».

### Guide titles (menu labels, each the `<h1>` of its page)

| English | Spanish |
|---|---|
| A speedrunner's start | El inicio de un speedrunner |
| How to kill each boss | Cómo matar a cada jefe |
| What to buy from the traders | Qué comprar a los comerciantes |
| Weapons, Damage types | Armas, Tipos de daño |
| Raids | Asaltos |
| No death, no map, no portals | Sin muertes, sin mapa, sin portales |
| Forge of Potential | Forja del Potencial |
| Speedrun, Reverse run | Speedrun, Partida inversa |
| Where to build your base | Dónde construir tu base |
| How much metal a run takes | Cuánto metal necesita una partida |
| Hard, Very hard and Hardcore | Difícil, Muy difícil y Brutal |
| Boss arenas | Arenas de los jefes |
| Taming animals | Domar animales |
| Bows, crossbows and arrows | Arcos, ballestas y flechas |
| Staffs, Armour, Tools | Báculos, Armaduras, Herramientas |
| Meads, Trophies | Hidromieles, Trofeos |
| Crafting stations | Estaciones de trabajo |
| Wood building, Stone building | Construcción en madera, Construcción en piedra |
| Furniture, Deep North building | Decoración, Construcción del Norte profundo |
| Ships and carts | Barcos y carros |
| Other build pieces | Otras piezas de construcción |
| Creatures, Farming | Criaturas, Cultivo |
| Food and feasts | Comida y banquetes |
| Comfort | Comodidad |
| Caves and dungeons | Cuevas y mazmorras |
| Materials | Materiales |
| What to break | Qué romper |
| Meadows … Deep North (the biome chapters) | the biome's name: Praderas, Bosque negro, Pantano, Montaña, Llanuras, Tierras Nubladas, Tierra de Ceniza, Norte profundo |

All source "site". The footnote labels: **Para speedrunners**, **Sin mapa**, **Sin portales**, **En partida
inversa**, **Sin prisas**, **Sin muertes**.

A page's meta title keeps the site's pattern with the separator « — »: «Semillas de Valheim — Seed Archive»,
«Mejores semillas en Valheim — Seed Archive».

## 3. How the reader is addressed

**Tú**, everywhere: every text, every button, every label (the owner, 2026-11-24, for every game of the archive,
whatever the game's own narrator does). The game's Spanish happens to speak to the player as tú too: Hugin «Soy
Hugin, y mi deber es guiarte en tus viajes» (tutorial_stemple1_text), the menus «Determina qué ocurre cuando mueres»
(menu_deathpenalty_tooltip), «tu primera partida» (menu_modifier_popup_text). The rule "told to the reader as you"
(`.claude/rules/site-text.md`) becomes tú.

- Pronouns: *tú* (rarely needed: Spanish drops it), *te*, *ti*, *contigo*; possessives *tu*, *tus*, *tuyo*: «tu
  base», «tus semillas», «te conviene».
- Verbs in the second person singular, present: «encuentras», «puedes», «necesitas», «tienes», «vas».
- Commands in the text in the affirmative imperative of tú: «Evalúa tu semilla», «Elige», «Construye», «Ve al
  altar», «Pon una marca»; negative with the subjunctive: «No construyas aquí», «No olvides la antorcha».
- Buttons are infinitives, as the game's own buttons are («Mejorar», «Entrar», «Intentar refinamiento»): «Evaluar»,
  «Mostrar el mapa», «Buscar nombres», «Cerrar», «Quitar». Every sentence and every instruction in the text uses
  the imperative of tú.
- Never *usted*, never *vosotros* (Spain only) and never *vos*. The reader is always one person: no plural
  address.
- Neutral Spanish: no regionalisms of one country (no *coger*, *ordenador*/*computadora* where a neutral word
  serves, no *vale*, no *chévere*).

## 4. Style

- Quotes: comillas angulares «…»; a quote inside a quote “…”, and inside that ‘…’ (the RAE's order). A punctuation
  mark that belongs to the sentence goes after the closing quote: «Brutal».
- Questions and exclamations open and close: «¿Es buena mi semilla?», «¡Cuidado!». A heading that is a question
  keeps both marks.
- Dash: the raya (—) for an aside, joined to the aside and spaced outside: «el Sabio —el segundo jefe— vive en el
  Bosque negro». An English em dash that introduces an explanation becomes a colon or a comma in Spanish. The only
  spaced « — » is the meta-title separator («… — Seed Archive»). A range keeps the en dash without spaces, as in
  English: «5–10 min».
- Numbers keep the site's format: they come from the data and `react-intl` formats them for `es` (decimal comma,
  «1,5»); never retype a number, and keep every placeholder (`{n}`, `{m}`, `#`) and tag (`<link>`, `<b>`) as it is.
- Units as Spanish writes them, symbols without a dot and never pluralised, after a space: «{m} m» metres, «km»
  kilometres, «s» seconds, «min» minutes, «m/s» speed, «h» hours. Percent takes a space too, as the RAE writes it:
  «{v} %» (the English «{v}%»). In running text "metres" spelt out is «metros».
- Capitals: headings and labels in sentence case, as Spanish does anyway: only the first word and names take
  capitals («Mejores semillas», «Mapa de semillas de Valheim»). Game terms keep the game's capitals inside a
  sentence («la Forja del Potencial», «el Bosque negro», «Tierras Nubladas»). Days and months are lower case.
- Accents on capitals always: «Ídolo», «Árbol de fabricación».
- A page's bold question and the guides list's line for that page use the same Spanish words.
- "Every minute" in a plural on minutes: `=1 {Cada minuto}` before `one {Cada # minuto}`, so 1 reads without the
  number.
- Gender agreement: an adjective or article beside a placeholder agrees with what the placeholder always is (a
  seed: feminine; a level: masculine). Where the placeholder can be either gender (a boss, an item), rephrase so
  nothing agrees with it.

## 5. Plurals

Spanish uses two ICU forms, `one` and `other`:

- `one`: exactly 1 — «1 semilla»;
- `other`: everything else, 0, 2, 3… and fractions — «0 semillas», «5 semillas», «1,5 metros».

CLDR also gives Spanish a `many` form, used only for whole millions («1 millón de»); the site never counts in
millions, and a message without `many` falls back to `other`, so it is left out.

```
{count, plural, one {# mejor semilla} other {# mejores semillas}}
{minutes, plural, =1 {Cada minuto} one {Cada # minuto} other {Cada # minutos}}
{n, plural, one {# min} other {# min}}
{n, plural, other {# a menos de {m} m}}
```

Where the English has only `other`, Spanish adds `one` when the words change with the number; a unit symbol does
not change («1 min», «5 min»). `select` keeps its English keys (`yes`, `other`); only the text inside is
translated.
