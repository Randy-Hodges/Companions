// Warp - create any size warp zone
Warp = function(game, x, y, x_scale = 1, y_scale = 1){
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, 'portal');
        
    this.scale.setTo(x_scale, y_scale);

    // Animations
    this.animations.add('rotate', [0,1,2]);

    // physics
    game.physics.enable(this);
    this.body.acceleration.y = -globalGravity; // counteracts gravity
}

Warp.prototype = Object.create(Phaser.Sprite.prototype);
Warp.prototype.constructor = Warp;

// (Automatically called by World.update)
Warp.prototype.update = function() {
    this.animations.play('rotate', 5);
}