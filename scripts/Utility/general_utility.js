var demo = {};
globalGravity = 400;
var levelTiles, tilemap, tileLength = 16, tileWidth = 16;
var money = 0, moneyText;
var addedAudio = false;
var eventTrackingList = [];
var spawn = 1, spawndirection = 1;
var coinGroup, enemyGroup, heartGroup;
var menu, menu2, gamePaused = false;


var devTools = false; // Developer tools are turned on if true, otherwise, they are inactive

function textOverlap(x, y, string, styleBase = { fontSize: '18px', fill: '#000'}, styleOverlap = { fontSize: '18px', fill: '#fff'}, fixedBoolean = true){
    game.add.text(x, y, string, styleBase).fixedToCamera = fixedBoolean;
    game.add.text(x - 1, y - 1, string, styleOverlap).fixedToCamera = fixedBoolean;
}

function transitionLevel(level, newLevel = false, spawnVal = 1, unique = false){
    currentPlayer.disableMovement = true;
    currentPlayer.alpha = 0;
    fadeOut(); 
    
    game.camera.onFadeComplete.add(function(player, coin){
        if (newLevel) {removeMusic()}
        spawn = spawnVal; 
        changeLevel(0, level, unique);
        currentPlayer.disableMovement = false;
        currentPlayer.alpha = 1;
        game.camera.onFadeComplete.removeAll();
    }, this);
}

function changeLevel(i, level, unique = false){
    console.log('level change to: ' + level);
    addedTextContinueListener = false;
    // Change level
    if (unique){
        game.state.start(level);
    }
    levelString = level.includes('level') ? level : 'level' + level;
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
        pauseSound.play(); 
        // need to find a way to play the previous sound in a seperate event before this one
        console.log('Paused')
        game.paused = true;
        gamePaused = true;
        menu = game.add.text(currentPlayer.x, currentPlayer.y - 50, "Paused!!!", { fontSize: '18px', fill: '#000' });
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
            unpauseSound.play();
        }
        game.paused = false;
        gamePaused = false;
    }  
}

function fadeOut(){
    // fade color and duration
    game.camera.fade(0x000000, 500);
    // game.stage.backgroundColor = 0x000000; // figure out how to make background black for the split second that the transition is only on the screen
}

function fadeIn(){
    game.camera.flash(0x000000, 500);
}