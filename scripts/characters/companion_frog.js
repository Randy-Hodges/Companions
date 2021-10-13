// frog

CompanionFrog = function(game,x,y){
    Companion.call(this, game, x, y, 'froggy');
    
    //animation
    this.animations.add('froggy idle', [0, 1, 2, 3], frameRate=5, true);
    
    /* #region Physics */
    this.body.drag.x = 700;
    this.body.maxVelocity.x = 100;
    this.body.maxVelocity.y = 250;
}

CompanionFrog.prototype = Object.create(Companion.prototype);
CompanionFrog.prototype.constructor = CompanionFrog;

// (Automatically called by World.update)
CompanionFrog.prototype.update = function() {
    Companion.prototype.update(this); // Update like a companion
    this.animations.play('froggy idle');
    //PlayerClass.increaseMaxJumps(1);
    //game.physics.arcade.moveToObject(this, currentCompanion1, 60, 1000);
}
