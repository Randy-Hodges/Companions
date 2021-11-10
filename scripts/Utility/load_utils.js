function loadPlayer(){
    game.load.spritesheet('player', "assets/sprites/characters/RPG Character/main_character_all.png", 64, 64);
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
    game.load.spritesheet('portal', "assets/sprites/items/portal/pixelportal_tilesheet.png", 16, 32)
}

function loadEnemies(){
    game.load.spritesheet('greenSlime', "assets/sprites/enemies/blue slime/slime-Sheet-green.png", 32, 25);
    game.load.spritesheet('redSlime', "assets/sprites/enemies/blue slime/slime-Sheet-red.png", 32, 25);
    game.load.spritesheet('blueSlime', "assets/sprites/enemies/blue slime/slime-Sheet-blue.png", 32, 25);
    game.load.spritesheet('bat', "assets/sprites/enemies/Bat/bat-sheet.png", 32, 32);
}

function loadUI(){
    game.load.image('Blank_Blue', "assets/UI/Blank_Blue.png");
    game.load.image('Gear_LightBlue', "assets/UI/Gear_LightBlue.png");
    game.load.image('Play_Blue', "assets/UI/Play_Blue.png");
    game.load.image('Green', "assets/UI/Green.png");
    game.load.audio('textContinue', "assets/audio/soundeffects/progress_text.wav");
}