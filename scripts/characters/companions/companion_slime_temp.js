// frog

CompanionSlime = function(game, x, y, followOn, isEqiupped){
    Companion.call(this, game, 'greenSlime', x, y, followOn, isEqiupped);
    this.name = 'slime';
    this.home = new Phaser.Point(23*tileLength, 35*tileLength);
    
    //animation
    this.animations.add('slime idle', [0, 1, 2, 3], frameRate=5, true);
    
    /* #region Physics */
    this.body.maxVelocity.x = 250;
    this.body.maxVelocity.y = 300;
    
    //increaseMaxJumps(1);
}

CompanionSlime.prototype = Object.create(Companion.prototype);
CompanionSlime.prototype.constructor = CompanionSlime;

// (Automatically called by World.update)
CompanionSlime.prototype.update = function() {
    Companion.prototype.update(this); // Update like a companion
    this.animations.play('slime idle');
}
