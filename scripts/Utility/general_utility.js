var demo = {};
globalGravity = 400;
var levelTiles, tilemap, tileLength = 16, tileWidth = 16;
var addedAudio = false;
var eventTrackingList = [];
var spawn = 1, spawndirection = 1;
var coinGroup, enemyGroup, heartGroup;
var menu, menu2, gamePaused = false;

// #region Text 
function textOverlap(x, y, string, styleBase = { fontSize: '18px', fill: '#000'}, styleOverlap = { fontSize: '18px', fill: '#fff'}, fixedBoolean = true){
    game.add.text(x, y, string, styleBase).fixedToCamera = fixedBoolean;
    game.add.text(x - 1, y - 1, string, styleOverlap).fixedToCamera = fixedBoolean;
}

function updateMoney(){
    moneyText.text = "Coins: " + basePlayer.money;
    moneyText2.text = "Coins: " + basePlayer.money;
}
// #endregion

// #region Transitioning
function transitionLevel(level, newLevel = false, spawnVal = 1, unique = false){
    currentPlayer.disableMovement = true;
    currentPlayer.stopMovementX();
    currentPlayer.alpha = 0;
    fadeOut(); 
    game.camera.onFadeComplete.add(function(){
        if (newLevel) {
            removeMusic();
        }
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
    fadeIn();
}

function fadeOut(endFunction = undefined){
    // fade color and duration
    if (typeof endFunction !== "undefined"){
        console.log(endFunction)
        game.camera.onFadeComplete.add(endFunction, this);
    }
    game.camera.fade(0x000000, 500);
}

function fadeIn(){
    game.camera.flash(0x000000, 1000, true)
}
// #endregion 

// #region Tiles
function excludeCollision(tile){
    // exclusionLayer somehow just references the current map layer. It isn't defined anywhere else but here.
    if (!(tile.index in exclusionLayer)){
        exclusionLayer[tile.index] = tile.index;
    }
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
// #endregion

// #region Colors
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    //   console.log(componentToHex(r))
    return "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function invertBMD () {
    /* Currently not used. The original idea was for this to be used in a white, flashing
    player invulnerablity animation. Since Phaser 2 doesn't have any way to brighten an image,
    my idea was to darken it and then invert the pixels. This requires doing things with bitmaps 
    and redrawing things with the bitmap (I think? At least, that's what I got from my reading).
    I've opted to make a dark flashing animation to avoid the hassel and the extra compute time.
    */
	bmd.processPixelRGB(invertPixel, this);

}

function invertPixel (pixel) {

    /**
     * (Copied from one of the official Phaser Examples)
    * This callback will be sent a single object with 6 properties: `{ r: number, g: number, b: number, a: number, color: number, rgba: string }`.
    * Where r, g, b and a are integers between 0 and 255 representing the color component values for red, green, blue and alpha.
    * The `color` property is an Int32 of the full color. Note the endianess of this will change per system.
    * The `rgba` property is a CSS style rgba() string which can be used with context.fillStyle calls, among others.
    * The callback must return either `false`, in which case no change will be made to the pixel, or a new color object.
    * If a new color object is returned the pixel will be set to the r, g, b and a color values given within it.
    */

	pixel.r = 255 - pixel.r;
	pixel.g = 255 - pixel.g;
	pixel.b = 255 - pixel.b;

	return pixel;

}
// #endregion

// #region Other
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

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
// #endregion
