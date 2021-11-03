// Warp - create any size warp zone
Warp = function(game, x, y, orientation = 0, x_scale = 1, y_scale = 2){
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, 'portal');
        
    this.scale.setTo(x_scale, y_scale);

    // Animations
    this.animations.add('rotate', [0,1,2]);

    // in degrees
    this.angle = orientation;

    // physics
    game.physics.enable(this);
    this.body.acceleration.y = -globalGravity; // counteracts gravity
}

Warp.prototype = Object.create(Phaser.Sprite.prototype);
Warp.prototype.constructor = Warp;

// (Automatically called by World.update)
Warp.prototype.update = function(orientation) {
    this.animations.play('rotate', 5);
}