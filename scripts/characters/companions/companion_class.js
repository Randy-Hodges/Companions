var companionGroup;
var piggyUnlocked = false;
var froggyUnlocked = true;

Companion = function(game, spritesheetStrID, x = gameWidth/2, y = gameHeight/2, followOn = false, isEquipped = false){ 
    
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, spritesheetStrID);
    this.anchor.setTo(.5,.5);   
    var scale = .6;
    this.scale.setTo(scale, scale);
    
    // Sprite Variables
    this.spritesheetStrID = spritesheetStrID;
    this.followOn = followOn;
    this.isEquipped = isEquipped;
    this.followObject;

    // animations
    this.stopAnimations = false;
    
    /* #region Physics */
    this.accelx = basePlayer.accelx;
    game.physics.enable(this);
    this.body.allowGravity = false;
    this.body.setSize(32,32);
    this.body.drag.x = 500;
    this.body.maxVelocity.x = 150;
    this.body.maxVelocity.y = 300;
}

Companion.prototype = Object.create(Phaser.Sprite.prototype);
Companion.prototype.constructor = Companion;

// (Automatically called by World.update)
Companion.prototype.update = function(companion = this) {
    
    // Follow Logic
    if (companion.followOn){    
        game.physics.arcade.moveToObject(companion, companion.followObject, 30, 500);
    }
    // Equipped Logic
    if (companion.isEquipped){
        companion.followOn = true;
    }    
    // ----Animation----
    // left
    if (companion.body.velocity.x < 0){
        companion.scale.x = Math.abs(companion.scale.x);
    }
    // right
    else if (companion.body.velocity.x > 0){
        companion.scale.x = -Math.abs(companion.scale.x);
    }
};
 
function createEquippedCompanion(companionName, followObject, positionX, positionY){

    if (companionName == 'piggy'){
        pig = new CompanionPig(game, 'piggy', positionX, positionY, true, true);
        pig.followObject = followObject;
        pig.isEquipped = true;
        game.add.existing(pig);
        return pig;
    } 
    if (companionName == 'froggy'){
        frog = new CompanionFrog(game, 'froggy', positionX, positionY, true, true);
        frog.followObject = followObject;
        frog.isEquipped = true;
        game.add.existing(frog);
        return frog;
    }
}

equipCompanion = function(companion){
    // Fill undefined slots
    for (var i = 0; i < basePlayer.companionNames.length; i += 1){
        if (basePlayer.companionNames[i] == undefined){
            // update player companions
            basePlayer.companionNames[i] = companion.name;
            currentPlayer.companionSlots[i] = companion;
            // update companion equip/followObject data
            companion.isEquipped = true;
            if (i > 0){
                companion.followObject = currentPlayer.companionSlots[i-1];
            }
            else{
                companion.followObject = currentPlayer;
            }
            return;
        }
    }
    // Remove the first slot, shift names down, append to end.
    // basePlayer.companionNames.shift();
    // console.log("companion names:" + basePlayer.companionNames)
    // console.log('Companion Slot 1:', basePlayer.companionNames[0], '| Companion Slot 2:', basePlayer.companionNames[1]);
    
    // return
}
// console.log('Companion Slot 1:', basePlayer.companionNames[0], '| Companion Slot 2:', basePlayer.companionNames[1]);
