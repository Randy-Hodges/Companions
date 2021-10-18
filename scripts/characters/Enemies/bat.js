var bat;
Bat = function(game, x, y, spritesheetStrID){        
<<<<<<< HEAD
    // instantiate Sprite object
=======
    // Instantiate Sprite object
>>>>>>> dev
    Phaser.Sprite.call(this, game, x, y, spritesheetStrID);
    this.anchor.setTo(.5,.5); 
    scale = 1.3;  
    this.scale.setTo(-scale,scale);
    this.faceDirection = 1;
    bat = this;

<<<<<<< HEAD
    // add animations
=======
    // Add animations
>>>>>>> dev
    this.animations.add('flying', [0,1,2,3,4,5,6]);
    this.animations.add('attacking', [7,8,9,10,11,12,13,14,15,16]);
    this.animations.add('hit', [17,18,19]);
    // this.animations.getAnimation('hit').onComplete.add(function(bat) {bat.destroy()}, this);
    this.anims = {flying: 0, attacking: 1, hit: 2}
    this.curAnimation = 0;

<<<<<<< HEAD
    // physics
=======
    // Physics
>>>>>>> dev
    game.physics.enable(this);
    hitboxOffsetX = 9;
    hitboxOffsetY = 7;
    this.body.setSize(13, 18, hitboxOffsetX, hitboxOffsetY);
    this.baseMovementSpeed = 60;
    this.movementSpeedX = 60;
    this.movementSpeedY = 12;
    this.body.gravity.y = -400; // counteracts global gravity

<<<<<<< HEAD
    // damage player
    this.damage = {none: false, left: true, right: true, up: false, down: true};

=======
    // Damage player
    this.damage = {none: false, left: true, right: true, up: false, down: true};

    // Switching Direction
>>>>>>> dev
    this.timeLastSwitchX = 0;
    this.timeLastSwitchY = 0;
    this.roamFirstCall = true;
}

Bat.prototype = Object.create(Phaser.Sprite.prototype);
Bat.prototype.constructor = Bat;

<<<<<<< HEAD

=======
>>>>>>> dev
// (Automatically called by World.update)
Bat.prototype.update = function(bat = this) {
    // If bat close to player
    if (game.physics.arcade.distanceBetween(bat, currentPlayer) < 130){
        if (bat.curAnimation < bat.anims.hit){
            // Move to player
            game.physics.arcade.moveToObject(bat, currentPlayer, 80);
            bat.curAnimation = bat.anims.attacking;
            // Flip Sprite in x direction if player is behind sprite
            if (bat.faceDirection * (bat.body.position.x - currentPlayer.body.position.x) < 0){
                bat.switchFaceDirection();
                bat.roamFirstCall = true;    
            }
        }
    }
    else{
        // Otherwise, roam around
        if (bat.curAnimation < bat.anims.hit){
            bat.curAnimation = bat.anims.flying;
            bat.roam();
        }
    }

    // Animations
    if (bat.curAnimation == bat.anims.flying){
        bat.animations.play('flying', 10, true);
    }
    else if (bat.curAnimation == bat.anims.attacking){
        bat.animations.play('attacking', 10, true);
    }
    else if (bat.curAnimation == bat.anims.hit){
        bat.animations.play('hit', 5);
    }
    else {
        console.log("Current animation priority [", slime.curAnimationPriority, "] is not linked to an animation")
    }
    
};

Bat.prototype.die = function(bat = this){
    console.log('hit bat')
    bat.body.enable = false;
    bat.curAnimation = bat.anims.hit;
    bat.animations.play('hit', 5);
    bat.animations.getAnimation('hit').onComplete.add(function(bat) {bat.destroy()}, this);
}

Bat.prototype.switchFaceDirection = function(bat = this){
    bat.faceDirection *= -1;
    bat.scale.x *= -1;
}

Bat.prototype.roam = function(bat = this){
<<<<<<< HEAD
=======
    // Roaming starts
>>>>>>> dev
    if (bat.roamFirstCall){
        bat.roamFirstCall = false;
        bat.body.velocity.x = bat.movementSpeed;
        bat.switchFaceDirection();
    }
    // Roaming in X direction
    if (game.time.now - bat.timeLastSwitchX > 2000){
        bat.switchFaceDirection();
        bat.movementSpeedX *= -1;
        bat.body.velocity.x = bat.movementSpeedX;
        bat.timeLastSwitchX = game.time.now;
    }
    // Y direction
    if (game.time.now - bat.timeLastSwitchY > 400){
        bat.movementSpeedY *= -1;
        bat.body.velocity.y = bat.movementSpeedY;
        bat.timeLastSwitchY = game.time.now;
    }
}


