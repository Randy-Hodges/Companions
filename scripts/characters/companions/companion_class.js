var currentCompanion1, currentCompanion2;

/*
Intended to be used to store the data of the current Companion. Ideally everything would be in one class or there would be 
some kind of inheritance, but this is what I'm doing to work around Phaser Sprites. If this was python, I probably could
have figured out how to do this better.
*/

Companion = function(game, spritesheetStrID, x = gameWidth/2, y = gameHeight/2, followOn = false, isEquipped = false){ 
    
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, spritesheetStrID);
    this.anchor.setTo(.5,.5);   
    this.scale.setTo(.6,.6);
    
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
    if (companion.followOn == true){    
        console.log('Follows', companion.followObject);
        game.physics.arcade.moveToObject(companion, companion.followObject, 30, 1000);
    }
    
    if (companion.followOn == false){
        companion.body.velocity.x = 0;
        companion.body.velocity.y = 0;
        //console.log('Equipped to off.');
    }
    
    // Equipped Logic
    
    if (companion.isEquipped == true){
        if (currentPlayer.companionSlot1 == undefined){
            currentPlayer.companionSlot1 = companion.spritesheetStrID;
            companion.followOn = true;
        }
        
        if (currentPlayer.companionSlot2 == undefined) {
            currentPlayer.companionSlot2 = companion.spritesheetStrID;
            companion.followOn = true;
            
        } else {
            //console.log('Companion unequipped is undefined.')
            //console.log(currentPlayer.companionSlot1, currentPlayer.companionSlot2)
        }
    }
    
    // left ----Animation----
    if (companion.body.velocity.x < 0){
        companion.scale.setTo(.6, .6);
    }
    // right
    else if (companion.body.velocity.x > 0){
        companion.scale.setTo(-.6, .6);
    }
    
};
 
function createCompanion(){
    console.log('Companion Slot 1: ', basePlayer.companionSlot1, ' Companion Slot 2: ', basePlayer.companionSlot2);
        
    // Companions in Levels - Slot 1
    if (basePlayer.companionSlot1 == 'piggy'){
        //pig = new CompanionPig(game, 'piggy', 50, 50, true, true);
        game.add.existing(pig);
        console.log("New piggy created! Slot 1.");
        console.log(pig);
        
    } 
    
    if (basePlayer.companionSlot1 == 'froggy'){
        //frog = new CompanionFrog(game, 'froggy', 50, 50, true, true);
        game.add.existing(frog);
        console.log("New froggy created! Slot 1.");
        console.log(frog);
    }
     
    // Companions in Levels - Slot 2
    if (basePlayer.companionSlot2 == 'piggy'){
        //pig = new CompanionPig(game, 'piggy', 50, 50, true, true);
        console.log("New piggy created! Slot 2.");
        game.add.existing(pig);
        console.log(pig);
        
    } else if (basePlayer.companionSlot2 == 'froggy'){
        //frog = new CompanionFrog(game, 'froggy', 60, 60, true, true);
        game.add.existing(frog);
        console.log("New froggy created! Slot 2.");
        console.log(frog);
    }
    
}