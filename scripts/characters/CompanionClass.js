var currentCompanion1, currentCompanion2;

/*
Intended to be used to store the data of the current Companion. Ideally everything would be in one class or there would be 
some kind of inheritance, but this is what I'm doing to work around Phaser Sprites. If this was python, I probably could
have figured out how to do this better.
*/

Companion = function(game, x = gameWidth/2, y = gameHeight/2){ 
    
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, 'piggy');
    this.anchor.setTo(.5,.5);   
    this.scale.setTo(.6,.6);

    // add animations
    this.animations.add('piggy idle', [0, 1, 2, 3], frameRate=5, true);
    this.animations.add('frog idle', [0, 1, 2, 3], frameRate=5, true);
    this.stopAnimations = false;
    
    /* #region Physics */
    this.accelx = basePlayer.accelx;
    game.physics.enable(this);
    this.body.setSize(0,0,0,0); // Creating hitbox. first two params are size of body, second two are offset of body
    this.body.drag.x = 800;
    this.body.maxVelocity.x = 150;
    this.body.maxVelocity.y = 300;
    
    this.faceDirection = 1; // x Direction player is facing. 1 or -1
 
}


Companion.prototype = Object.create(Phaser.Sprite.prototype);
Companion.prototype.constructor = Companion;

// (Automatically called by World.update)
Companion.prototype.update = function() {
    
    this.animations.play('piggy idle');
    //PlayerClass.increaseMaxHearts(1);
    game.physics.arcade.moveToObject(this, currentPlayer, 60, 1000);
    
    // left ----Animation----
    if (this.body.velocity.x < 0){
        this.scale.setTo(.6, .6);
        this.faceDirection = -1;
    }
    // right
    else if (this.body.velocity.x > 0){
        this.scale.setTo(-.6, .6);
        this.faceDirection = 1;
    }
    
};