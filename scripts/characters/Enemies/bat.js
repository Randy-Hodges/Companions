var bat;
Bat = function(game, x, y, spritesheetStrID){        
    // Instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, spritesheetStrID);
    this.anchor.setTo(.5,.5); 
    scale = 1.3;  
    this.scale.setTo(-scale,scale);
    this.faceDirection = 1;
    bat = this;

    // Add animations
    this.animations.add('flying', [0,1,2,3,4,5,6]);
    this.animations.add('attacking', [7,8,9,10,11,12,13,14,15,16]);
    this.animations.add('hit', [17,18,19]);
    this.animations.getAnimation('hit').onComplete.add(function(bat) {bat.curAnimation = bat.anims.flying; 
                                                                    bat.currentlyHit = false;
                                                                }, this);
    this.anims = {flying: 0, attacking: 1, hit: 2}
    this.curAnimation = 0;

    // Physics
    game.physics.enable(this);
    hitboxOffsetX = 9;
    hitboxOffsetY = 7;
    this.body.setSize(13, 18, hitboxOffsetX, hitboxOffsetY);
    this.baseMovementSpeed = 60;
    this.movementSpeedX = 60;
    this.movementSpeedY = 12;
    this.body.gravity.y = -400; // counteracts global gravity

    // Damage player
    this.damage = {none: false, left: true, right: true, up: false, down: true};

    // Switching Direction
    this.timeLastSwitchX = 0;
    this.timeLastSwitchY = 0;
    this.roamFirstCall = true;

    this.health = 10;
}

Bat.prototype = Object.create(Phaser.Sprite.prototype);
Bat.prototype.constructor = Bat;

// (Automatically called by World.update)
Bat.prototype.update = function(bat = this) {
    bat.switchFaceDirection();

    // If bat close to player
    if (game.physics.arcade.distanceBetween(bat, currentPlayer) < 130){
        if (bat.curAnimation < bat.anims.hit){
            // Move to player
            game.physics.arcade.moveToObject(bat, currentPlayer, 80);
            bat.curAnimation = bat.anims.attacking;
            // Flip Sprite in x direction if player is behind sprite | Not needed?
            if (bat.faceDirection * (bat.body.position.x - currentPlayer.body.position.x) < 0){
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
        console.log("Current animation priority [", bat.curAnimationPriority, "] is not linked to an animation")
    }
    
};

Bat.prototype.hit = function(damage, bat = this){
    if(!bat.currentlyHit){
        bat.health -= damage;
        bat.currentlyHit = true;
        console.log("bat health: " + bat.health)
        if (bat.health <= 0){
            bat.die();
        }
        else{
            console.log('hit bat')
            bat.curAnimation = bat.anims.hit
            bat.animations.play('hit', 5);
        }  
    }
}

Bat.prototype.die = function(bat = this){
    console.log('bat death')
    bat.body.enable = false;
    bat.curAnimation = bat.anims.hit;
    bat.animations.play('hit', 5);
    bat.animations.getAnimation('hit').onComplete.add(function(bat) {bat.destroy()}, this);
}

Bat.prototype.switchFaceDirection = function(bat = this){
    if (bat.body.velocity.x < 0){
        bat.faceDirection = -1;
        bat.scale.x = -Math.abs(bat.scale.x);
    }
    else{
        bat.faceDirection = 1;
        bat.scale.x = Math.abs(bat.scale.x);
    }
}

Bat.prototype.roam = function(bat = this){
    // Roaming starts
    if (bat.roamFirstCall){
        bat.roamFirstCall = false;
        bat.body.velocity.x = bat.movementSpeed;
    }
    // Roaming in X direction
    if (game.time.now - bat.timeLastSwitchX > 2000){
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


