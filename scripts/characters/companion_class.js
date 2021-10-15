var currentCompanion1, currentCompanion2;

/*
Intended to be used to store the data of the current Companion. Ideally everything would be in one class or there would be 
some kind of inheritance, but this is what I'm doing to work around Phaser Sprites. If this was python, I probably could
have figured out how to do this better.
*/

Companion = function(game, spritesheetStrID, x = gameWidth/2, y = gameHeight/2, followOn = false, isEqiupped = false){ 
    
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, spritesheetStrID);
    this.anchor.setTo(.5,.5);   
    this.scale.setTo(.6,.6);
    
    // Sprite Variables
    this.followOn = followOn;
    this.isEqiupped = isEqiupped;
    this.followObject;

    // animations
    this.stopAnimations = false;
    
    /* #region Physics */
    this.accelx = basePlayer.accelx;
    game.physics.enable(this);
    this.body.allowGravity = false;
    this.body.setSize(32,32);
    this.body.drag.x = 800;
    this.body.maxVelocity.x = 150;
    this.body.maxVelocity.y = 300;
 
}

Companion.prototype = Object.create(Phaser.Sprite.prototype);
Companion.prototype.constructor = Companion;

// (Automatically called by World.update)
Companion.prototype.update = function(companion = this) {
    
    // Follow Logic
    if (companion.followOn == true){
        game.physics.arcade.moveToObject(companion, companion.followObject, 60, 1000);
    }
    
    if (companion.followOn == false){
        //console.log('Equipped to off.');
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