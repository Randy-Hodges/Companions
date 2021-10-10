
Bat = function(game, x, y, spritesheetStrID){        
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, spritesheetStrID);
    this.anchor.setTo(.5,.5); 
    scale = 1.3;  
    this.scale.setTo(-scale,scale);
    this.faceDirection = 1;
    bat = this;

    // add animations
    this.animations.add('flying', [0,1,2,3,4,5,6]);
    this.animations.add('attacking', [7,8,9,10,11,12,13,14,15,16]);
    this.animations.add('hit', [17,18,19]);
    this.animationPriorities = {idle: 0, moving: 1, attacking: 2, hurt: 3, dying: 4}
    this.curAnimationPriority = 1;

    // physics
    game.physics.enable(this);
    hitboxOffsetX = 7;
    hitboxOffsetY = 14;
    this.body.setSize(18, 11, hitboxOffsetX, hitboxOffsetY);
    this.baseMovementSpeed = 60;
    this.movementSpeed = 60;
    this.body.velocity.x = this.movementSpeed;
    this.body.maxVelocity.x = this.movementSpeed*20;

    //damage player
    this.damage = {none: false, left: true, right: true, up: false, down: true};

    // Miscellaneous (might break into own sections in the future)
    this.timeLastSwitch = game.time.now;
    levelOneTilesTiles = levelOneTiles.getTiles(0,0,game.world.bounds.width, game.world.bounds.height)
}

Slime.prototype = Object.create(Phaser.Sprite.prototype);
Slime.prototype.constructor = Slime;


// (Automatically called by World.update)
Slime.prototype.update = function(slime = this) {

    
};


