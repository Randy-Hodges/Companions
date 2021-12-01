// #region Hearts
// TODO: make as part of the player class
// Heart Functions - Health
function createHearts(numhearts) {
    hearts = game.add.group();
    hearts.fixedToCamera = true;
    for (var i = 0; i < numhearts; i += 1) {
        var heart = hearts.create(i * 20 + 80, 13, 'heart');
    }
}

function increaseMaxHearts(increasenum) {
    var numhearts = basePlayer.currentHearts + increasenum;
    basePlayer.currentHearts += increasenum;
    
    hearts.destroy();
    createHearts(numhearts);
}

function healHearts(heal = 1) {
    basePlayer.currentHearts += heal;
    if (basePlayer.currentHearts > basePlayer.maxHearts){
        basePlayer.currentHearts = basePlayer.maxHearts;
    }
    
    heart.heartCollect.play();
    hearts.destroy();
    createHearts(basePlayer.currentHearts);
}

function healMaxHearts() {
    if (basePlayer.currentHearts < basePlayer.maxHearts){
        heart.heartCollect.play();
        basePlayer.currentHearts = basePlayer.maxHearts;
        numhearts = basePlayer.currentHearts;
        
        hearts.destroy();
        createHearts(basePlayer.currentHearts);
    }
}

// Companion Functions - Powerups
function increaseMaxHearts(num) {
    basePlayer.maxHearts = basePlayer.maxHearts + num;
    //console.log(basePlayer.maxHearts);
}
// #endregion