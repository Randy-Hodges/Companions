// #region Hearts
// TODO: make as part of the player class. Personally, I didn't want this to ever be 
//       apart from the player, but sometimes you gotta delegate work to others.
// Heart Functions - Health
function createHearts(numhearts) {
    hearts = game.add.group();
    hearts.fixedToCamera = true;
    for (var i = 0; i < numhearts; i += 1) {
        var heart = hearts.create(i * 20 + 80, 13, 'heart');
    }
}

function increaseMaxHearts(increaseNum = 1) {
    var numhearts = basePlayer.currentHearts + increaseNum;
    basePlayer.maxHearts += increaseNum;
    basePlayer.currentHearts += increaseNum;
    currentPlayer.maxHearts += increaseNum;
    currentPlayer.currentHearts += increaseNum;
    hearts.destroy();
    createHearts(numhearts);
}

function decreaseMaxHearts(decreaseNum = 1){
    var numhearts = basePlayer.currentHearts - decreaseNum;
    basePlayer.maxHearts -= decreaseNum;
    basePlayer.currentHearts -= decreaseNum;
    currentPlayer.maxHearts -= decreaseNum;
    currentPlayer.currentHearts -= decreaseNum;
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

function removeHearts(numhearts, dmg = 1){
    basePlayer.currentHearts -= dmg;
    for (var i = 1; i <= dmg; i += 1) {
        if (hearts.length == 0){
            break;
        }
        hearts.removeChildAt(numhearts - i);
    }
}
// #endregion