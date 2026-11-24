# Russian glossary

The words every translator of `lib/i18n/en.json` and `content/en/` into `ru` uses, so the three of us write one
site. A term settled here is never translated another way. Sources, in order:

1. the game's own Russian, by localization key (game build 1.0.21; the Valheim generator's game data). Names of
   items, pieces, creatures and places not listed here come from `lib/valheim/names/ru.json`, which maps the site's
   English names to the game's Russian;
2. this glossary for the site's own words (source "site");
3. a literal translation of our own (source "own"), only where neither has the word.

The game writes most words without ё (Черный лес, Лед); a game term keeps the game's spelling exactly.

## 1. Game terms

### Biomes

| English | Russian | source |
|---|---|---|
| Meadows | Луга | biome_meadows |
| Black Forest | Черный лес | biome_blackforest |
| Swamp | Болото | biome_swamp |
| Mountain | Гора (prose: горы) | biome_mountain |
| Plains | Равнины | biome_plains |
| Mistlands | Туманные земли | biome_mistlands |
| Ashlands | Пепельные земли | biome_ashlands |
| Deep North | Дальний север | biome_deepnorth |
| Ocean | Океан | biome_ocean |
| biome | биом | own (community) |

"In the Meadows" is «на Лугах», "in the Black Forest" «в Черном лесу», "in the Swamp" «на Болоте», "in the
Mountain" «в Горах», "on the Plains" «на Равнинах», «в Туманных землях», «в Пепельных землях», «на Дальнем
севере». A biome's name keeps its capital letter in prose.

### Bosses and their powers

| English | Russian | source |
|---|---|---|
| Eikthyr | Эйктюр | enemy_eikthyr |
| The Elder | Древний | enemy_gdking |
| Bonemass | Масса костей | enemy_bonemass |
| Moder | Матерь | enemy_dragon |
| Yagluth | Яглут | enemy_goblinking |
| The Queen | Королева | enemy_seekerqueen |
| Fader | Прародитель | enemy_fader |
| Kall, Kall Fimbulbringer | Келл, Келл Вестник Зимы (never «Кал»: a vulgar word in Russian; the owner, 2026-11-24) | enemy_frozenking |
| boss | босс | own (community; the game says «Павший») |
| the Forsaken (the game's name for the bosses) | Павшие | tutorial_altar_label |
| power (a boss's, at the stones) | Сила Павшего; in prose «сила» | settings_gp |
| boss altar | алтарь босса | own; the game: «Алтари Павших» (tutorial_altar_label) |
| aspect (Kall's phase 2) | аспект | own |
| phase | фаза | own |

### Traders and helpers

| English | Russian | source |
|---|---|---|
| Haldor | Хальдор | npc_haldor |
| Hildir | Хильдир | npc_hildir |
| the Bog Witch | Болотная ведьма | npc_bogwitch |
| Hugin (the raven) | Хугин, ворон Хугин | npc_hugin, loadscreen_tip15 |
| Munin | Мунин | npc_munin |
| Odin | Один | piece_banner04_description |
| Valkyrie | Валькирия | npc_valkyrie_end |
| trader | торговец | own |
| Thungr, Zil | Тангр, Зил | enemy_goblinbrute_hildir, enemy_goblin_hildir |
| Hildir's chest (Brass, Silver, Bronze) | сундук Хильдир (Медный, Серебряный, Бронзовый) | names/ru.json |

### Dungeons and places

| English | Russian | source |
|---|---|---|
| dungeon | подземелье | tutorial_crypt_label |
| Burial Chamber(s) | погребальная комната, Погребальные комнаты | location_forestcrypt |
| Sunken Crypt(s) | затонувший склеп, Затонувшие склепы | location_sunkencrypt |
| troll cave | пещера тролля | location_forestcave |
| frost cave | ледяная пещера, Ледяные пещеры | location_mountaincave |
| Infested Mine | Зараженный рудник | location_dvergrtown |
| Infested Citadel | Зараженная цитадель | location_dvergrboss |
| Charred Fortress | Обугленная крепость | charredfortress |
| Mörkhalla | Мёркхалла | location_morkhalla |
| Winding Tunnels | Извилистые тоннели | location_thehole |
| Morgen hole | Зловонная дыра | location_morgenhole |
| Bear den | Медвежья берлога | location_bearcave |
| Howling Cavern | Жуткая пещера | hud_pin_hildir2 |
| Smouldering Tomb | Тлеющая гробница | hud_pin_hildir1 |
| Sealed Tower | Запечатанная башня | hud_pin_hildir3 |
| Sacrificial Stones | жертвенные камни (one: Жертвенный камень) | tutorial_stemple1_text, guardianstone_name |
| Vegvísir | Вегвизир | piece_vegvisir |
| Runestone | Рунный камень | piece_lorestone |
| Greydwarf nest | Гнездо грейдворфов | enemy_greydwarfspawner |
| Forge of Potential | Кузница возможностей | piece_upgradestation |
| Yggdrasil | Иггдрасиль | item_yggdrasilwood |
| Ancient root | Древний корень | prop_ancienttreeroot |
| giant's remains | останки великана | own, from item_ymirremains_description |

A Burial Chamber and a Sunken Crypt keep the capital of their first word in prose, singular and plural, as the
English and the game write them: «в Погребальной комнате», «Затонувшие склепы». A troll cave and a frost cave stay
lower case; the plural of troll cave is «пещеры тролля».

Places the game does not name (abandoned house, Fuling village, Draugr village, tar pit, drake nest, fire hole,
shipwreck, Greydwarf camp…) are our own literal words: заброшенный дом, деревня фулингов, деревня драугров,
смоляная яма, гнездо дракона, огненная дыра, обломки корабля, лагерь грейдворфов.

### Creatures that recur

A creature's name is capitalised only as the game writes it; in prose it is a common noun (грейдворф, тролль).

| English | Russian | source |
|---|---|---|
| Greydwarf | грейдворф | enemy_greydwarf |
| Troll | тролль | enemy_troll |
| Skeleton | скелет | enemy_skeleton |
| Draugr | драугр | enemy_draugr |
| Leech | пиявка | enemy_leech |
| Blob | сгустень | enemy_blob |
| Wraith | призрак | enemy_wraith |
| Ghost | дух | enemy_ghost |
| Abomination | мерзость | enemy_abomination |
| Wolf | волк | enemy_wolf |
| Drake | дракон | enemy_drake |
| Fenring | фенринг | enemy_fenring |
| Ulv | ульв | enemy_ulv |
| Cultist | культист | enemy_fenringcultist |
| Stone Golem | каменный голем | enemy_stonegolem |
| Bat | летучая мышь | enemy_bat |
| Fuling | фулинг | enemy_goblin |
| Deathsquito | смертожал | enemy_deathsquito |
| Lox | быкоящер | enemy_lox |
| Seeker | искатель | enemy_seeker |
| Tick | клещ | enemy_tick |
| Gjall | гьялль | enemy_gjall |
| Dvergr | дверги (one: дверг, as in «Дверг-маг») | enemy_dvergrs, enemy_dvergr_mage |
| Surtling | суртлинг | enemy_surtling |
| the Charred | обугленные | enemy_charred |
| Twitcher | дергун | enemy_charred_twitcher |
| Morgen | морген | enemy_morgen |
| Volture | стервулканник | enemy_volture |
| Asksvin | пеплозавр | enemy_asksvin |
| Fallen Valkyrie | падшая валькирия | enemy_fallenvalkyrie |
| Serpent | змей | enemy_serpent |
| Bonemaw | костепасть | enemy_bonemawserpent |
| Frysling | фрислинг | enemy_frysling |
| Eyeless One | безглазый | enemy_elakingmole |
| Writhan | скручень | enemy_writhan |
| Jotun(s) | йотун, йотуны | event_jotunarmy_start |
| Krigen, Hexen | криген, хексен | enemy_jotun_warrior, enemy_jotun_witch |
| Boar, Deer, Neck, Bear | кабан, олень, никс, медведь | enemy_boar, enemy_deer, enemy_neck, enemy_bjorn |
| Leviathan, Lava leviathan | левиафан, лавовый левиафан | own (the game has no name for it) |
| star (a creature's level) | звезда | own, from ach_bigfish_desc |
| spawner | спаунер | own (community) |

### Key items and materials

| English | Russian | source |
|---|---|---|
| Wood | Древесина | item_wood |
| Fine wood | Качественная древесина | item_finewood |
| Core wood | Цельная древесина | item_roundlog |
| Stone, Flint | Камень, Кремень | item_stone, item_flint |
| Copper, Tin, Bronze | Медь, Олово, Бронза | item_copper, item_tin, item_bronze |
| Iron, Scrap Iron | Железо, Металлолом | item_iron, item_ironscrap |
| Silver | Серебро | item_silver |
| Black metal | Черный металл | item_blackmetal |
| Flametal | Огнеметалл | item_flametal |
| Bloodgold | Кровавое золото | item_gold |
| ore (Copper Ore…) | руда (Медная руда…) | item_copperore |
| Obsidian | Обсидиан | item_obsidian |
| Black marble | Черный мрамор | item_blackmarble |
| Grausten | Серокамень | item_grausten |
| Ashwood | Пепельная древесина | item_blackwood |
| Surtling core | Ядро суртлинга | item_surtlingcore |
| Black core | Черное ядро | item_blackcore |
| Troll hide | Шкура тролля | item_trollhide |
| Honey, Barley, Flax | Мед, Ячмень, Лен | item_honey, item_barley, item_flax |
| Tar, Guck, Sap | Деготь, Слизь, Живица | item_tar, item_guck, item_sap |
| Coins | Монеты | item_coins |
| Fuling totem | Тотем фулинга | names/ru.json |
| Dragon egg | Яйцо дракона | item_dragonegg |
| Sealbreaker, Sealbreaker fragment | Разрушитель печатей, Фрагмент разрушителя печатей | item_dvergrkey, item_dvergrkeyfragment |
| Dvergr Extractor | Экстрактор двергов | item_dvergrneedle |
| Bell fragment | Фрагмент колокола | item_bellfragment |
| Fenris hair | Шерсть Фенриса | item_pickable_hairstrands |
| Malicious Ice | Зловещий лед | blackice_core |
| Orb of Fimbulvinter | Сфера Великой Зимы | fimbulvinterorb |
| Megingjord | Мегингьорд | item_beltstrength |
| Root Harnesk | Корневой нагрудник | item_chest_root |
| Wishbone | Дужка | item_wishbone |
| Wolf fur cape | Плащ из шкуры волка | item_cape_wolf |
| Trollstav | Тролль-посох | item_staffredtroll |
| Echo Spike | Шип эха | item_staff_orbofahri |
| Mead, mead base | медовуха, основа медовухи | se_mead_name, item_meadbasetasty |
| Frost (resistance) mead | Морозоустойчивая медовуха | item_mead_frostres |
| potion | зелье | se_healthpotionminor_name |
| Feast, feasts | пир, пиры | hud_feasts |
| Trophy | Трофей; a boss's: «Трофей: Эйктюр» | item_trophy_eikthyr |
| mould | форма | own |
| recipe | рецепт (the game's list is «Чертежи») | inventory_onlyoneingredient |
| ingredients | ингредиенты | inventory_onlyoneingredient |

### Idols and upgrade quality

| English | Russian | source |
|---|---|---|
| Idol | идол | item_upgrader_name |
| Battle idol | идол сражения | item_upgrader_name + item_upgrader_weapon |
| Protection idol | идол защиты | item_upgrader_name + item_upgrader_armor |
| Bronze Battle Idol (any tier) | Идол сражения (Бронза); tiers: Дерево, Бронза, Железо, Серебро, Черный металл, Черный мрамор, Огнеметалл, Кровавое золото | item_upgrader_tier0…7 |
| quality | качество | inventory_quality |
| level (of quality, of a station) | уровень | msg_level, inventory_upgrade |
| upgrade (verb, noun) | улучшить, улучшение | inventory_upgradebutton |
| Max quality | макс. качество | inventory_maxquality |
| a try at the forge | попытка улучшить | inventory_upgraderbutton |
| break (at the forge) | поломка, сломаться | inventory_upgraderwarning |

The game builds an idol's name from three strings, and `names/ru.json` holds them in the English order («Бронза
Сражение Идол»); the site writes «Идол сражения (Бронза)».

### Stations, tools, pieces, ships

| English | Russian | source |
|---|---|---|
| crafting station | станок | inventory_stationlevel |
| station level | уровень станка | inventory_stationlevel |
| extension, upgrade of a station | улучшение станка | inventory_stationlevel |
| Workbench | Верстак | piece_workbench |
| Forge | Кузница | piece_forge |
| Stonecutter | Камнерез | piece_stonecutter |
| Artisan table | Стол ремесленника | piece_artisanstation |
| Black forge | Черная кузница | piece_blackforge |
| Galdr table | Стол гальдров | piece_magetable |
| Cauldron | Котел | piece_cauldron |
| Mead ketill | Котел для медовух | piece_meadcauldron |
| Fermenter | Бродильная бочка | piece_fermenter |
| Food preparation table | Разделочный стол | piece_preptable |
| Serving tray | Поднос для подачи | item_feaster |
| Smelter | Плавильня | piece_smelter |
| Charcoal kiln | Углевыжигательная печь | piece_charcoalkiln |
| Blast furnace | Доменная печь | piece_blastfurnace |
| Spinning wheel, Windmill | Прялка, Мельница | piece_spinningwheel, piece_windmill |
| Eitr refinery | Машина для переработки эйтра | piece_eitrrefinery |
| Campfire, Bonfire, Hearth | Костер, Большой костер, Очаг | piece_firepit, piece_bonfire, piece_hearth |
| Bed | Кровать | piece_bed |
| spawn point | точка возрождения | piece_bed_setspawn |
| Portal | Портал | piece_portal |
| Ward | Оберег | piece_guardstone |
| Shield generator | Генератор щита | piece_shieldgenerator |
| Item stand | Стойка для предмета | piece_itemstand |
| Training dummy | тренировочный манекен (the piece: М.А.Н.Е.К.Е.Н.) | piece_trainingdummy |
| Obliterator | Мусоросжигатель | piece_incinerator |
| Beehive | Улей | piece_beehive |
| Stakewall | Частокол | piece_stakewall |
| Ballista, Catapult, Battering ram | Баллиста, Катапульта, Таран | piece_turret, tool_catapult, tool_batteringram |
| Hammer, Hoe, Cultivator | Молот, Мотыга, Пропашник | item_hammer, item_hoe, item_cultivator |
| Pickaxe, Torch, Fishing rod | Кирка, Факел, Удочка | inventory_pickaxe, item_torch, names/ru.json |
| Raft, Karve, Longship, Drakkar | Плот, Карви, Длинный корабль, Драккар | ship_raft, ship_karve, ship_longship, ship_longship_ashlands |
| Cart | Повозка | tool_cart |
| Cooking station, "the spits" | Стойка для готовки, стойки для готовки | piece_cookingstation |
| Brazier | Жаровня | piece_brazierfloor01 |
| Banner, banners | флаг, флаги | piece_banner01 («Черный флаг») |
| Stack (of wood…) | стопка (Стопка дров) | piece_woodstack |
| Light, lantern (furniture, tool) | светильник; the comfort group "Lanterns" «Фонари» | item_lantern, piece_dvergr_lantern |
| Rug, carpet | ковер, коврик (the game's pieces) | piece_rug_deer, piece_rug_seal |
| Lox saddle | Седло для быкоящера | item_saddlelox |
| inventory | инвентарь | inventory_full |

### Damage, resistances, stats

| English | Russian | source |
|---|---|---|
| Damage | Урон | inventory_damage |
| Blunt | Дробящий | inventory_blunt |
| Slash | Рассекающий | inventory_slash |
| Pierce | Колющий | inventory_pierce |
| Chop | Рубка | inventory_chop |
| Pickaxe (damage; the site's "Mining") | Кирка | inventory_pickaxe |
| Fire | Огонь | inventory_fire |
| Frost | Лед | inventory_frost |
| Lightning | Молния | inventory_lightning |
| Poison | Яд | inventory_poison |
| Spirit | Дух | inventory_spirit |
| Very weak | Сильная уязвимость | inventory_veryweak |
| Weak | Уязвимость | inventory_weak |
| Slightly weak | Легкая уязвимость | inventory_slightlyweak |
| Slightly resistant | Легкое сопротивление | inventory_slightlyresistant |
| Resistant | Сопротивление | inventory_resistant |
| Very resistant | Сильное сопротивление | inventory_veryresistant |
| Immune | Невосприимчивый (head: «Невосприимчивость», own) | inventory_immune |
| Health | Здоровье | item_food_health |
| Stamina | Выносливость | item_food_stamina |
| Eitr | Эйтр | item_food_eitr |
| Health regen, Stamina regen, Eitr regen | Восстановление здоровья / выносливости / эйтра | se_healthregen, se_staminaregen, se_eitrregen |
| Armour | Броня | item_armor |
| Block armour | Сила блокирования | item_blockpower |
| Block force | Сила парирования | item_deflection |
| Durability | Прочность | item_durability |
| Weight | Вес | item_weight |
| Carry weight | переносимый вес | se_max_carryweight |
| Movement speed | Скорость передвижения | item_movement_modifier |
| Backstab | Удар в спину | item_backstab |
| tier (of a tool, an item) | уровень | own (the game shows none) |
| Stagger resistance; stagger | Сопротивление к оглушению; оглушение | se_stagger |
| Fall damage, Jump height | Урон от падения, Высота прыжка | item_falldamage, se_jumpheight |

### Kinds of gear

| English | Russian | source |
|---|---|---|
| Atgeir, atgeirs | Алебарда, алебарды | item_atgeir_bronze («Бронзовая алебарда») |
| Sledge | Кувалда | item_sledge_iron («Железная кувалда») |
| Trinket | Оберег (the game uses the same word for the Ward) | item_trinket |
| Utility item | Аксессуар | item_utility |
| Fishing bait, bait | Наживка | item_fishingbait |
| Grappling hook | Крюк-кошка | item_graplinghook |
| Fists (the weapon kind) | кулачное оружие | own |
| Chest piece, leg piece | нагрудник, поножи | own |
| Red Jute; jute in prose | Красный джут; джут | item_jutered |

Head "Weak / Resists / Immune" of the bosses' table: «Уязвим / Сопротивляется / Невосприимчив»; the full forms
above stay for a single value.

### Status effects and comfort

| English | Russian | source |
|---|---|---|
| Rested | Бодрость | se_rested_name |
| Resting | Отдых | se_resting_name |
| Shelter | Укрытие | se_shelter_name |
| Comfort | Комфорт | se_rested_comfort |
| Wet | Сырость | se_wet_name |
| Cold | Холод | se_cold_name |
| Freezing | Замерзание | se_freezing_name |
| Warm | Тепло | se_warm_name |
| Burning | Горение | se_burning_name |
| Poisoned | Отравление | se_poison_name |
| Encumbered | Нагруженность | se_encumbered_name |
| Cozy | Уют | se_cozy_name |
| Feather fall | Словно перышко | se_slowfall_name |

### Skills

| English | Russian | source |
|---|---|---|
| skill, skills | навык, навыки | inventory_skills |
| Swords, Knives, Clubs | Мечи, Ножи, Дубины | skill_swords, skill_knives, skill_clubs |
| Polearms, Spears | Древковое оружие, Копья | skill_polearms, skill_spears |
| Blocking, Axes | Блокирование, Топоры | skill_blocking, skill_axes |
| Bows, Crossbows | Луки, Арбалеты | skill_bows, skill_crossbows |
| Elemental magic, Blood magic | Магия стихий, Магия крови | skill_elementalmagic, skill_bloodmagic |
| Unarmed | Без оружия | skill_unarmed |
| Pickaxes, Woodcutting | Кирки, Рубка древесины | skill_pickaxes, skill_woodcutting |
| Jump, Sneak, Run, Swim | Прыжок, Скрытность, Бег, Плавание | skill_jump, skill_sneak, skill_run, skill_swim |
| Fishing, Cooking, Farming | Рыбалка, Кулинария, Земледелие | skill_fishing, skill_cooking, skill_farming |
| Crafting, Ride, Dodge | Ремесло, Верховая езда, Уклонение | skill_crafting, skill_ride, skill_dodge |

### World settings, raids, events

| English | Russian | source |
|---|---|---|
| Very easy, Easy | Очень легко, Легко | menu_modifier_veryeasy, menu_modifier_easy |
| Normal | Обычная игра | menu_modifier_normal |
| Hard, Very hard | Сложно, Очень сложно | menu_modifier_hard, menu_modifier_veryhard |
| Hardcore | Ужасно сложно | menu_modifier_hardcore |
| Casual, Immersive, Hammer mode | Без забот, Погружение, Молот | menu_modifier_casual, _immersive, _hammer |
| preset | готовый режим сложности | menu_presets |
| world modifiers | модификаторы мира | menu_modifier_popup_title |
| Combat (setting) | Бой | menu_combat |
| Death penalty | Плата за смерть | menu_deathpenalty |
| No map, No portals | Без карты, Без порталов | menu_nomap, menu_noportals |
| raid | набег (на лагерь) | menu_modifier_hammer_tooltip |
| Jotun Invasion | Вторжение йотунов | jotuninvasion |
| The Jotun Advance / Retreat | Наступление йотунов / Отступление йотунов | fimbulvinterorb_start, fimbulvinterorb_destroyed |
| map, minimap | карта, мини-карта | settings_map, menu_nomap_tooltip |

"Hard, Very hard and Hardcore" is «Сложно, Очень сложно и Ужасно сложно». A setting's name stands in «» in prose
(«на Ужасно сложно»), as the game's own tooltips quote theirs.

## 2. The site's own words

| English | Russian | source |
|---|---|---|
| Seed Archive | Seed Archive | site (a name, never translated) |
| Valheim | Valheim | site (the game's menu writes it so: menu_modifier_popup_text) |
| Home | Главная | site |
| Database (the menu item, was Catalog until 2026-11-24) | Справочник (the owner, 2026-11-24; not «База данных», not «Каталог») | site |
| Guides | Гайды | site |
| Tools | Инструменты | site |
| Basics | Основы | site |
| Biomes | Биомы | site |
| Challenges | Испытания | site |
| World, Gear, Food and drink, Materials, Your base | Мир, Снаряжение, Еда и питье, Материалы, Ваша база | site |
| Map | Карта | site, settings_map |
| Menu, Account, Sign out, Language | Меню, Аккаунт, Выйти, Язык | site |
| Privacy, Terms | Конфиденциальность, Условия | site |
| Release notes | Что нового | site |
| Support the archive | Поддержать архив | site |
| Bugs | Баги | site |
| seed | сид (the game's field is «Зерно мира», menu_seed) | site |
| Seed map (the map's label and h1, 2026-11-24); Valheim seed map (its title) | Карта сида; Карта сида Valheim | site |
| Pickaxes and tools (the catalogue page, 2026-11-24) | Кирки и инструменты | site |
| How good is my seed? | Хорош ли мой сид? | site |
| Best seeds | Лучшие сиды | site |
| Craft tree | Дерево крафта | site |
| Nidavellir | Nidavellir (Latin letters) | site |
| Wind | Ветер | site |
| speedrun, speedrunner, a runner | спидран, спидранер, спидранер | site |
| the wind ahead of your beam; on either side (of the bow) | впереди траверза; с любого борта | own (nautical) |
| Stands there / Stands there, by its turn / Rolled when you take it (the loot groups) | Стоит там / Стоит там, в зависимости от поворота / Разыгрывается, когда вы это берете | site |
| Speedrunners (footnote label) | **Спидранерам** | site |
| run (a speedrun, a playthrough) | забег | site |
| reverse run | обратный забег | site |
| strip (the speedrun's line) | полоса | site |
| start (Sacrificial Stones as the start) | старт | site |
| starting island | стартовый остров | site |
| home (the usual player's) / base (the runner's) | дом / база | site |
| score | оценка | site |
| Rate | Оценить | site |
| report (the seed's) | отчет | site |
| as a rule (the median) | как правило | site |
| middle half (of seeds) | средняя половина (сидов) | site |
| share | доля | site |
| the best quarter / the worst quarter | лучшая четверть / худшая четверть | site |
| layer (of the map) | слой | site |
| pin | метка | site, hud_ping |
| ruler | линейка | site |
| loot | добыча | site |
| catalogue page / guide | страница каталога / гайд | site |
| chapter (a biome guide) | глава | site |

### Guide titles (menu labels, each the `<h1>` of its page)

| English | Russian |
|---|---|
| A speedrunner's start | Старт спидранера |
| How to kill each boss | Как убить каждого босса |
| What to buy from the traders | Что купить у торговцев |
| Weapons, Damage types | Оружие, Типы урона |
| Raids | Набеги |
| No death, no map, no portals | Без смертей, без карты, без порталов |
| Speedrun, Reverse run | Спидран, Обратный забег |
| Where to build your base | Где построить базу |
| How much metal a run takes | Сколько металла нужно на забег |
| Boss arenas | Арены боссов |
| Taming animals | Приручение животных |
| Bows, crossbows and arrows | Луки, арбалеты и стрелы |
| Staffs, Armour, Tools | Посохи, Броня, Инструменты |
| Meads, Trophies | Медовухи, Трофеи |
| Crafting stations | Станки |
| Wood building, Stone building | Деревянные постройки, Каменные постройки |
| Furniture, Deep North building | Мебель, Постройки Дальнего севера |
| Ships and carts | Корабли и повозки |
| Other build pieces | Прочие постройки |
| Creatures, Farming | Существа, Земледелие |
| Food and feasts | Еда и пиры |
| Comfort | Комфорт |
| Caves and dungeons | Пещеры и подземелья |
| What to break | Что разбить |

All other source "site" for this table. The footnote labels: **Спидранерам**, **Без карты**, **Без порталов**,
**В обратном забеге**, **Не спеша**, **Без смертей**.

## 3. How the reader is addressed

The game's Russian speaks to the player as **вы**, in lower case: Hugin «Я Хугин, послан сюда, дабы сопровождать
вас в ваших путешествиях» (tutorial_stemple1_text), «Вернитесь к жертвенным камням…» (tutorial_bosstrophy_text),
the menus «Что ждет вас после смерти» (menu_deathpenalty_tooltip). Only the traders and Munin say «ты», in
character. The site follows the narrator: **вы**, lower case, in every text and every button («Найдите имена»,
«Ваша база»). The rule "told to the reader as you" (`.claude/rules/site-text.md`) becomes «вы».

## 4. Style

- Quotes are «ёлочки»; a quote inside a quote is „лапки“.
- A dash is an em dash with spaces: « — ». A range keeps the en dash without spaces, as in English: «5–10 мин».
- ё only where the game writes it (Мёркхалла); its terms without ё keep the game's spelling (Черный лес, Лед).
  Ordinary words follow the game too: «все», «все еще», never «всё».
- A page's bold question and the guides list's line for that page use the same Russian words.
- "Every minute" in a plural on minutes: `=1 {Каждую минуту}` before `one {Каждую # минуту}`, so 1 reads without
  the number and 21 keeps it.
- Numbers keep the site's format: they come from the data and `react-intl` formats them for the locale; never
  retype a number, and keep every placeholder (`{n}`, `{m}`, `#`) and tag (`<link>`, `<b>`) as it is.
- Units: «м» metres, «км» kilometres, «с» seconds, «мин» minutes, «м/с» speed, «%» with no space before it
  (as the English has «{v}%»). A unit stands after a space: «{m} м».
- Headings and labels in sentence case: only the first word and names take capitals («Лучшие сиды», «Карта сида
  Valheim»).

## 5. Plurals

Every `plural` in Russian has the four forms `one`, `few`, `many`, `other`, even where the English has only `other`:

- `one`: 1, 21, 31… — «1 сид»;
- `few`: 2–4, 22–24… — «3 сида»;
- `many`: 0, 5–20, 25–30… — «5 сидов»;
- `other`: fractions — «1,5 сида».

```
{count, plural, one {# лучший сид} few {# лучших сида} many {# лучших сидов} other {# лучшего сида}}
{minutes, plural, one {Каждую # минуту} few {Каждые # минуты} many {Каждые # минут} other {Каждые # минуты}}
{n, plural, one {# мин} few {# мин} many {# мин} other {# мин}}
```

`select` keeps its English keys (`yes`, `other`); only the text inside is translated.
