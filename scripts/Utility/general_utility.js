var demo = {};
var levelTiles, tilemap; 
var tileLength = 16;
var tileWidth = 16;
var money = 0, moneyText;
var addedAudio = false;

var spawn = 0, spawndirection = -1;
var eventTrackingList = [];

var coinGroup, enemyGroup, mediGroup;

var devTools = true; // Developer tools are turned on if true, otherwise, they are inactive

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
}

function updateMoney(){
    moneyText.text = "Coins: " + money;
    moneyText.text.x = 0;
    moneyText.text.y = 0;
}

function changeLevel(i, levelNum){
    console.log('level change to: ' + levelNum);
    addedTextContinueListener = false;
    game.state.start('level' + levelNum);
}

function excludeCollision(tile){
    // exclusionLayer somehow just references the current map layer. It isn't defined anywhere else but here.
    if (!(tile.index in exclusionLayer)){
        exclusionLayer[tile.index] = tile.index;
    }
}

function addCoins(){
    // Coins
    coinGroup = game.add.group();
    tilemap.setLayer('coins');
    tilemap.forEach(function(tile){addCoinFromTilemap(tile)},1,0,0,tilemap.width,tilemap.height);
}


function addCoinFromTilemap(tile){
    if (tile.index != 0 && tile.index != -1){
        coin = new Coin(game, tile.x*tileLength, tile.y*tileLength,'coin');
        game.add.existing(coin);
        coinGroup.add(coin);
    }
}

function addPlayer(){
    currentPlayer = new Player(game, spawnpoint[0]*tileLength, spawnpoint[1]*tileLength);
    game.add.existing(currentPlayer);
    game.camera.follow(currentPlayer);
}

function addMusic(music = 'backtrack'){
    if (!addedAudio){
        backtrack = game.add.audio(music);
        backtrack.play();
        backtrack.volume = .1;
        addedAudio = true;
    }
}

function addUI(){
    // Money - Coins
    moneyText = game.add.text(8,26,"Coins: " + money, { fontSize: '18px', fill: '#fff' });
    moneyText.fixedToCamera = true;
    
    // Hearts
    heartText = game.add.text(8,8,"Hearts: ", { fontSize: '18px', fill: '#fff' });
    heartText.fixedToCamera = true;
    createHearts(basePlayer.currentHearts);
    
    // Pause Menu
    addPauseMenu();
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
function rgbToHex(r, g, b) {
//   console.log(componentToHex(r))
return "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}