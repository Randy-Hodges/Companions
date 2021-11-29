function loadPlayer(){
    game.load.spritesheet('player', "assets/sprites/characters/RPG Character/main_character_all.png", 64, 64);
    game.load.audio('air slash sound', "assets/audio/soundeffects/air_slash.wav");
    game.load.audio('jump sound', "assets/audio/soundeffects/jump.mp3");
    game.load.audio('dash sound', "assets/audio/soundeffects/dash.wav");
    game.load.audio('damaged sound', "assets/audio/soundeffects/player_damaged.ogg");
}

function loadCompanion(){
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
    game.load.image('Blank_Blue', "assets/UI/Blank_Blue.png");
    game.load.image('Gear_LightBlue', "assets/UI/Gear_LightBlue.png");
    game.load.image('Play_Blue', "assets/UI/Play_Blue.png");
    game.load.image('Green', "assets/UI/Green.png");
    game.load.audio('textContinue', "assets/audio/soundeffects/progress_text.wav");
    game.load.audio('text scroll sound', "assets/audio/soundeffects/primary_text_scroll.mp3");
}

function loadGameConfigs(){
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();
    textOffsetX = 100;
    textWidth = game.width - textOffsetX;
    textHeight = game.height/5;
}