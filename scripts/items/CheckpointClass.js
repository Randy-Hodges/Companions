CheckpointBase = function(x, y, level = undefined){
    this.x = x;
    this.y = y;
    if (typeof level === 'undefined'){
        this.level = game.state.current;
    }
    else{
        this.level = level;
    }
}

Checkpoint = function(game, x, y){
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, 'cp');
    this.base = new CheckpointBase(x, y);
        
    this.scale.setTo(2, 2);
    
    // Animations
    this.animations.add('rotate', [0,1,2,3]);
        
    // physics
    game.physics.enable(this);
    this.body.acceleration.y = -globalGravity; // counteracts gravity

    // Sound
    this.showing = false;
    this.playingSound = false;
}

Checkpoint.prototype = Object.create(Phaser.Sprite.prototype);
Checkpoint.prototype.constructor = Checkpoint;

// (Automatically called by World.update)
Checkpoint.prototype.update = function() {
    this.animations.play('rotate', 5);
    game.physics.arcade.overlap(currentPlayer, this, function(player, cp){
        // [add sound effect]
        basePlayer.lastCP = cp.base;
        healMaxHearts();
    });
}