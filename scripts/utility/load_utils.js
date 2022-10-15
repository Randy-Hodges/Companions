
function loadPlayer(){
    game.load.spritesheet('player', "assets/sprites/characters/RPG Character/main_character_all_v5.png", 64, 64);
    game.load.audio('air slash sound', "assets/audio/soundeffects/air_slash.wav");
    game.load.audio('jump sound', "assets/audio/soundeffects/jump.mp3");
    game.load.audio('dash sound', "assets/audio/soundeffects/dash.wav");
    game.load.audio('damaged sound', "assets/audio/soundeffects/player_damaged.ogg");
}

function loadCompanions(){
    game.load.spritesheet('piggy', "assets/sprites/companions/piggy_animation.png", 30, 30);
    game.load.spritesheet('piggy idle', "assets/sprites/companions/piggy_animation.png", 30, 30);
    game.load.spritesheet('froggy', "assets/sprites/companions/froggy_animation.png", 27, 30);
    game.load.spritesheet('froggy idle', "assets/sprites/companions/froggy_animation.png", 27, 30);
}

function loadItems(){
    game.load.spritesheet('coin', "assets/sprites/items/money/MonedaD.png", 16, 16); 
    game.load.audio('coin collect', "assets/audio/soundeffects/Collect Coin Sound Effect.mp3");
    game.load.spritesheet('heart', "assets/sprites/items/Collectible/heart_tilesheet.png", 13, 13);
    game.load.spritesheet('gold heart', "assets/sprites/items/Collectible/gold_heart_tilesheet.png", 13, 13);
    game.load.audio('heart collect', "assets/audio/soundeffects/heal.wav");
    game.load.spritesheet('portal', "assets/sprites/items/portal/pixelportal_tilesheet.png", 16, 32);
    game.load.spritesheet('cp', "assets/sprites/items/money/spr_coin_azu.png", 16, 16);
}

function loadEnemies(){
    game.load.spritesheet('greenSlime', "assets/sprites/enemies/blue slime/slime-Sheet-green.png", 32, 25);
    game.load.spritesheet('redSlime', "assets/sprites/enemies/blue slime/slime-Sheet-red.png", 32, 25);
    game.load.spritesheet('blueSlime', "assets/sprites/enemies/blue slime/slime-Sheet-blue.png", 32, 25);
    game.load.spritesheet('bat', "assets/sprites/enemies/Bat/bat-sheet.png", 32, 32);
    game.load.audio('enemy hit sound', "assets/audio/soundeffects/enemy_hit.wav");
    game.load.audio('slime death sound', "assets/audio/soundeffects/slime_death.wav");
}

function loadUI(){
    game.load.image('Blank_Blue', "assets/sprites/UI/Blank_Blue.png");
    game.load.image('Gear_LightBlue', "assets/sprites/UI/Gear_LightBlue.png");
    game.load.image('Play_Blue', "assets/sprites/UI/Play_Blue.png");
    game.load.image('Green', "assets/sprites/UI/Green.png");
    game.load.audio('textContinue', "assets/audio/soundeffects/progress_text.wav");
    game.load.audio('text scroll sound', "assets/audio/soundeffects/primary_text_scroll.mp3");
    game.load.audio('pause sound', "assets/audio/soundeffects/pause.mp3");
    game.load.audio('unpause sound', "assets/audio/soundeffects/unpause.mp3");
}

function loadOverworldMap(){
    // loading in assets for map
    game.load.tilemap('overworldMap', "assets/tilemaps/overworld/overworld.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.image('RedMarket', "assets/sprites/overworld_map/Buildings/Red/RedMarket.png");
    game.load.image('RedTaverns', "assets/sprites/overworld_map/Buildings/Red/RedTaverns.png");
    game.load.image('TexturedGrass', "assets/sprites/overworld_map/Ground/TexturedGrass.png");
    game.load.image('Trees', "assets/sprites/overworld_map/Nature/Trees.png");
    game.load.image('Cliff', "assets/sprites/overworld_map/Ground/Cliff.png");
    game.load.image('AssortedGround', "assets/sprites/overworld_map/Ground/Grass.png");
    game.load.image('Chests', "assets/sprites/overworld_map/Miscellaneous/Chests.png");
    game.load.image('QuestBoard', "assets/sprites/overworld_map/Miscellaneous/QuestBoard.png");
    game.load.image('Rocks', "assets/sprites/overworld_map/Nature/Rocks.png");
    game.load.image('StreetSigns', "assets/sprites/overworld_map/Miscellaneous/StreetSigns.png");
    game.load.image('Static_cloud_group', "assets/tiles/painted style/PNG/Mountains/Layer 1 cloud anim1.png");
    game.load.image('Static_cloud_large', "assets/tiles/painted style/PNG/Mountains/Layer 3 cloud anim1.png");

    game.load.image('Moving_cloud', "assets/sprites/overworld_map/Clouds/cloud1.png");
    game.load.image('Moving_cloud2', "assets/sprites/overworld_map/Clouds/cloud1.png");
}

function loadGameConfigs(){
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();
    textOffsetX = 100;
    textWidth = game.width - textOffsetX;
    textHeight = game.height/5;
}