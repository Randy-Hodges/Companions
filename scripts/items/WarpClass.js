// Warp - create any size warp zone
Warp = function(game, x, y, rotation = 0, x_scale = 1, y_scale = 2){
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, 'portal');
        
    this.scale.setTo(x_scale, y_scale);

    // in degrees
    this.angle = rotation;
    
    
    // Animations
    this.animations.add('rotate', [0,1,2]);
        
    // physics
    game.physics.enable(this);
    this.body.setSize(this.width/x_scale * Math.cos(rotation*Math.PI/180) - this.height/x_scale * Math.sin(rotation*Math.PI/180),
                      this.width/y_scale * Math.sin(rotation*Math.PI/180) + this.height/y_scale * Math.cos(rotation*Math.PI/180),
                      0, 0); // xsize, ysize, xoffset, yoffset
    this.body.acceleration.y = -globalGravity; // counteracts gravity
}

Warp.prototype = Object.create(Phaser.Sprite.prototype);
Warp.prototype.constructor = Warp;

// (Automatically called by World.update)
Warp.prototype.update = function() {
    this.animations.play('rotate', 5);
}