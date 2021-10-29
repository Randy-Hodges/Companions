// frog

CompanionFrog = function(game, spritesheetStrID, x, y, followOn, isEqiupped){
    Companion.call(this, game, 'froggy', x, y, followOn, isEqiupped);
    
    //animation
    this.animations.add('froggy idle', [0, 1, 2, 3], frameRate=5, true);
    
    /* #region Physics */
    this.body.maxVelocity.x = 250;
    this.body.maxVelocity.y = 300;
    
    //increaseMaxJumps(1);
}

CompanionFrog.prototype = Object.create(Companion.prototype);
CompanionFrog.prototype.constructor = CompanionFrog;

// (Automatically called by World.update)
CompanionFrog.prototype.update = function() {
    Companion.prototype.update(this); // Update like a companion
    this.animations.play('froggy idle');
}
