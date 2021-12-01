// Medi - Heart Collectible that heals
Medi = function(game, x, y){        
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, 'heart');
    //this.anchor.setTo(.5,.5);   
    this.scale.setTo(1,1);

    // Animations
    this.animations.add('heartbeat', [0,1,2,3,4,5]);

    // physics
    game.physics.enable(this);
    this.body.acceleration.y = -globalGravity;

    // Sound
    this.heartCollect = game.add.audio('heart collect');
    this.heartCollect.volume = .2;
}

Medi.prototype = Object.create(Phaser.Sprite.prototype);
Medi.prototype.constructor = Medi;

// (Automatically called by World.update)
Medi.prototype.update = function() {
    this.animations.play('heartbeat', 10);
    game.physics.arcade.overlap(currentPlayer, heartGroup, function(player, heart){heart.kill(); healHearts(1);});
}