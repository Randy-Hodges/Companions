var demo = {};
var levelTiles, tilemap; 
var tileLength = 16;
var tileWidth = 16;
var money = 0, moneyText;
var addedAudio = false;

var spawn = 0, spawndirection = -1;
var eventTrackingList = [];

var coinGroup, enemyGroup, heartGroup;

var devTools = true; // Developer tools are turned on if true, otherwise, they are inactive

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
}