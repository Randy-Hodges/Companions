// pig

CompanionPig = function(game,x,y){
    Companion.call(this, game, x, y, 'piggy');
    
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, 'piggy');
    
    //animation
    this.animations.add('piggy idle', [0, 1, 2, 3], frameRate=5, true);
    
    /* #region Physics */
    this.body.drag.x = 800;
    this.body.maxVelocity.x = 150;
    this.body.maxVelocity.y = 300;
    
    increaseMaxHearts(1); 
}

CompanionPig.prototype = Object.create(Companion.prototype);
CompanionPig.prototype.constructor = CompanionPig;

// (Automatically called by World.update)
CompanionPig.prototype.update = function() {
    Companion.prototype.update(this); // Update like a companion
    this.animations.play('piggy idle');
    //game.physics.arcade.moveToObject(this, currentCompanion1, 60, 1000);
}
