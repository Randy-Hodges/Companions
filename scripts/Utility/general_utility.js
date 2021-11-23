var demo = {};
globalGravity = 400;
var levelTiles, tilemap, tileLength = 16, tileWidth = 16;
var money = 0, moneyText;
var addedAudio = false;
var eventTrackingList = [];
var spawn = 1, spawndirection = 1;
var coinGroup, enemyGroup, heartGroup;
var menu, menu2, gamePaused = false;


var devTools = true; // Developer tools are turned on if true, otherwise, they are inactive


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
    
function pause(event){
    // Pause
    if (!gamePaused){
        console.log('Paused')
        game.paused = true;
        gamePaused = true;
        menu = game.add.text(currentPlayer.x, currentPlayer.y - 50, "Paused!!!", { fontSize: '18px', fill: '#000' }); //game.add.sprite(gameWidth-20, 20, 'Play_Blue');
        menu2 = game.add.text(currentPlayer.x - 1, currentPlayer.y - 51, "Paused!!!", { fontSize: '18px', fill: '#fff' });
        menu.anchor.setTo(0.5, 0.5);
        menu2.anchor.setTo(0.5, 0.5);
    }
    // Unpause
    else{
        console.log('Unpaused.');
        if (typeof menu != 'undefined'){
            menu.destroy();
            menu2.destroy();
        }
        game.paused = false;
        gamePaused = false;
    }  
}

var lvlBool;
function fade(){
    // fade color and duration
    game.camera.fade(0x000000, 500);
    // game.stage.backgroundColor = 0x000000; // figure out how to make background black for the split second that the transition is only on the screen
}