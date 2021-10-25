// pig

CompanionPig = function(game,x,y,followOn,isEqiupped){
    Companion.call(this, game, 'piggy', x, y, followOn, isEqiupped);
    
    //animation
    this.animations.add('piggy idle', [0, 1, 2, 3], frameRate=5, true);
    
    /* #region Physics */
    this.body.maxVelocity.x = 300;
    this.body.maxVelocity.y = 350;
    
    increaseMaxHearts(1); 
}

CompanionPig.prototype = Object.create(Companion.prototype);
CompanionPig.prototype.constructor = CompanionPig;

// (Automatically called by World.update)
CompanionPig.prototype.update = function() {
    Companion.prototype.update(this); // Update like a companion
    this.animations.play('piggy idle');
}
