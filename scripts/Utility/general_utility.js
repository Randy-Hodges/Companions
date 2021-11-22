var demo = {};
globalGravity = 400;
var levelTiles, tilemap; 
var tileLength = 16, tileWidth = 16;
var money = 0, moneyText;
var addedAudio = false;

var spawn = 1, spawndirection = 1;
var eventTrackingList = [];

var coinGroup, enemyGroup, heartGroup;

var devTools = false; // Developer tools are turned on if true, otherwise, they are inactive


function changeLevel(i, levelNum, unique = false){
    console.log('level change to: ' + levelNum);
    addedTextContinueListener = false;
    // Change level
    if (unique){
        game.state.start(levelNum);
    }
    levelString = levelNum.includes('level') ? levelNum : 'level' + levelNum;
    game.state.start(levelString);
}

function excludeCollision(tile){
    // exclusionLayer somehow just references the current map layer. It isn't defined anywhere else but here.
    if (!(tile.index in exclusionLayer)){
        exclusionLayer[tile.index] = tile.index;
    }
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    //   console.log(componentToHex(r))
    return "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function updateMoney(){
    moneyText.text = "Coins: " + money;
    moneyText2.text = "Coins: " + money;
}

function hitSpike(sprite, tile){
    if (enemyGroup.contains(sprite)){
        console.log('in enemy group');
        sprite.hit(100);
    }
    if (sprite == currentPlayer){
        currentPlayer.takeDamage(1);
    }
    return true;
}