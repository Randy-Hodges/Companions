var bat;
GrandfatherNPC = function(game, x, y, spritesheetStrID){        
    // Instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, spritesheetStrID);
    this.anchor.setTo(.5,.5); 
    scale = 1.3;  
    this.scale.setTo(scale,scale);
    this.faceDirection = 1;
    grandfather = this;

    // Add animations
    this.animations.add('hover', [0,1,2,3,4,5,6]);

    // Physics
    game.physics.enable(this);
    this.movementSpeedY = 30;
    this.body.gravity.y = -globalGravity; // counteracts global gravity

    // Switching Direction
    this.timeLastSwitchX = 0;
    this.timeLastSwitchY = 0;

    this.flipFaceX();
}

GrandfatherNPC.prototype = Object.create(Phaser.Sprite.prototype);
GrandfatherNPC.prototype.constructor = GrandfatherNPC;

// (Automatically called by World.update)
GrandfatherNPC.prototype.update = function(grandfather = this) {
    this.hover()
};

GrandfatherNPC.prototype.hover = function(grandfather = this){
    grandfather.animations.play('hover', 10, true);
    // Y direction
    if (game.time.now - grandfather.timeLastSwitchY > 1500){
        grandfather.movementSpeedY *= -1;
        grandfather.body.velocity.y = grandfather.movementSpeedY;
        grandfather.timeLastSwitchY = game.time.now;
    }
}

GrandfatherNPC.prototype.flipFaceX = function(grandfather = this){
    grandfather.scale.x *= -1;
    grandfather.faceDirection *= -1;
}

GrandfatherNPC.prototype.leave = function(){
    this.destroy();
}


