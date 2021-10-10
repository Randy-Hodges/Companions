var levelOneTilesTiles;
var i = 0;
Slime = function(game, x, y, spritesheetStrID){        
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, spritesheetStrID);
    this.anchor.setTo(.5,.5); 
    scale = 1.3;  
    this.scale.setTo(-scale,scale);
    this.faceDirection = 1;
    slime = this;

    // add animations
    this.animations.add('idle', [0,1,2,3]);
    this.animations.add('moving', [4,5,6,7]);
    this.animations.add('attacking', [8,9,10,11,12]);
    this.animations.add('hurt', [13,14,15,16])
    this.animations.add('dying', [1,17,18,19,20], frameRate = 10);
    this.animations.getAnimation('dying').onComplete.add(function(slime) {slime.destroy()}, this);
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

    // offset to get correct tile of slime
    faceconstant = 0;
    if (slime.faceDirection == 1){
        faceconstant = slime.faceDirection*25;
    }
    //Don't fall off ledges
    // if they are on a no-collision tile and haven't switched direction in a while, switch direction
    // Tile index in front of slime
    tileIdx = levelOneTilesTiles[levelOneTiles.getTileY(slime.body.position.y)*game.world.bounds.width/tileLength + levelOneTiles.getTileX(slime.body.position.x + faceconstant)].index
    if (!magicCliffsNoCollide.includes(tileIdx) && 
        !(String(tileIdx) in exclusionLayer) && 
        tileIdx != 0 &&
        game.time.now - slime.timeLastSwitch > 200){
            // console.log('switching');    
            switchDirectionSlime(slime);
    }
    

    // Collision
    if (enemyGroup){
        game.physics.arcade.collide(enemyGroup, enemyGroup, function(enemy1, enemy2){switchDirectionSlime(enemy1); switchDirectionSlime(enemy2)});
    }
    if ((slime.body.blocked.right || slime.body.blocked.left)){
        switchDirectionSlime(slime);
    }
    slime.body.velocity.x = slime.movementSpeed;

    // Animations
    if (slime.curAnimationPriority == slime.animationPriorities.moving){
        slime.animations.play('moving', 10, true);
    }
    else if (slime.curAnimationPriority == slime.animationPriorities.attacking){
        slime.animations.play('attacking', 10, true);
    }
    else if (slime.curAnimationPriority == slime.animationPriorities.hurt){
        slime.animations.play('hurt', 10, true);
    }
    else if (slime.curAnimationPriority == slime.animationPriorities.dying){
        slime.animations.play('dying', 10, true);
    }
    else {
        console.log("Current animation priority [", slime.curAnimationPriority, "] is not linked to an animation")
    }
};

Slime.prototype.die = function(slime = this) {
    slime.body.enable = false;
    slime.curAnimationPriority = slime.animationPriorities.dying;
    slime.animations.play('dying');
}


function switchDirectionSlime(slime) {
    slime.timeLastSwitch = game.time.now;
    slime.faceDirection *= -1;
    slime.movementSpeed *= -1;
    slime.scale.x *= -1;
}



