var playerJumpButton, currentPlayer;


Player = function(game, x = gameWidth/2, y = gameHeight/2){ 
    // *INSTANTIATE AN ENEMY GROUP BEFORE THE PLAYER IN THE CODE FOR COLLISIONS WITH ENEMIES
    
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.anchor.setTo(.5,.5);   
    this.scale.setTo(spawndirection,1);

    // add animations
    this.animations.add('idle side', [11,12,13,14,15], frameRate=10);
    this.animations.add('walk side', [16,17,18,19,20,21], frameRate=10);
    this.frame = 11;
    this.animations.add('slash side', [8,9,10], frameRate = 10);
    this.animations.add('slash down', [0,1,2], frameRate = 10);
    this.stopAnimations = false;
    
    // physics
    this.accelx = 750;
    game.physics.enable(this);
    this.body.setSize(9,28,28,20); // Creating hitbox. first two params are size of body, second two are offset of body
    this.body.gravity.y = 500;
    this.body.drag.x = 800;
    this.body.maxVelocity.x = 180;
    this.body.maxVelocity.y = 400;
    this.body.collideWorldBounds = true;
    
    this.faceDirection = 1;

    /* #region jumping */
    this.jumpAccel = -3070;
    this.jumpInputTime = 120 //ms
    this.jumpStorage = 0; // should be initialized to 0, can increase for dev purposes
    this.currentlyJumping = false;
    currentPlayer = this;
    playerJumpButton =  game.input.keyboard.addKey(Phaser.Keyboard.W);
    playerJumpButton.onDown.add(
        function(){
            // give player ability to jump when touching ground
            if (currentPlayer.body.blocked.down && currentPlayer.jumpStorage == 0){
                currentPlayer.jumpStorage += 1;
            }
            // jumping 
            if (currentPlayer.jumpStorage > 0){
                //currentPlayer.jumpStorage -= 1; // comment this line out for infinite jumps ************************
                currentPlayer.currentlyJumping = true;
                //currentPlayer.body.velocity.y = currentPlayer.jumpVel;
                currentPlayer.body.acceleration.y = currentPlayer.jumpAccel;
            }
        })
    playerJumpButton.onUp.add(
        function(){
            currentPlayer.currentlyJumping = false;
            currentPlayer.body.acceleration.y = 0;
        })
        /* #endregion */
        
    /* #region ----- SLASHING ----- */
    // Animations
    slashSide = this.animations.getAnimation('slash side');
    slashSide.onStart.add(function(){
        currentPlayer.stopAnimations = true;
        currentPlayer.isSlashing = true;
    });
    slashSide.onComplete.add(function(){
        currentPlayer.stopAnimations = false;
        currentPlayer.isSlashing = false;
    });
    slashDown = this.animations.getAnimation('slash down');
    slashDown.onStart.add(function(){
        currentPlayer.stopAnimations = true;
        currentPlayer.isSlashing = true;
    });
    slashDown.onComplete.add(function(){
        currentPlayer.stopAnimations = false;
        currentPlayer.isSlashing = false;
    });
    //slash mechanics
    this.isSlashing = false;
    slash = game.add.sprite(0,0);
    this.slash = slash;
    slash.anchor.setTo(0,.5);
    game.physics.enable(slash);
    slash.body.allowGravity = false;
    slash.body.setSize(20,28,0,0);
    this.addChild(slash)

    playerSlashButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    playerSlashButton.onDown.add(
        function(){
            if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || game.input.keyboard.isDown(Phaser.Keyboard.S)){
                if (!currentPlayer.stopAnimations){
                    currentPlayer.animations.play('slash down');
                }
            }
            else{
                if (!currentPlayer.stopAnimations){
                    currentPlayer.animations.play('slash side');
                }
            }
        });
        /* #endregion */

    // custom variables
    this.invulnerableTime = game.time.now;
    this.invulnerable = false;
    this.iFrames = 2000 //actually in milliseconds, not frames

    
}


Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// (Automatically called by World.update)
Player.prototype.update = function() {
    
    this.slash.body.setSize(20,35,-10 + this.faceDirection*15,0);
    if (this.isSlashing){
        game.physics.arcade.overlap(this.slash, enemyGroup, function(slash, enemy){enemy.die()});
        
    }

    /* #region Keyboard Input */
    customKeys = new CustomKeys();
    // ----- LATERAL MOVEMENT -----
    // Left (Movement)
    if (customKeys.isDown("A")){
        this.body.acceleration.x = -this.accelx;
    }
    // Right
    if (customKeys.isDown("D")){
        this.body.acceleration.x = this.accelx;
    }
    // No input
    if (customKeys.isUp("A") && customKeys.isUp("D")){
        this.body.acceleration.x = 0;
    }
    framerate = Math.abs(parseInt(this.body.velocity.x/50)) + 10;
    if (!currentPlayer.stopAnimations){
        // left ----Animation----
        if (this.body.acceleration.x < 0){
            this.scale.x = Math.abs(this.scale.x);
            this.faceDirection = -1;
            this.animations.play('walk side', framerate);
        }
        // right
        else if (this.body.acceleration.x > 0){
            this.scale.x = -Math.abs(this.scale.x);
            this.faceDirection = 1;
            this.animations.play('walk side', framerate);
        }
        // idle
        if (this.body.velocity.x == 0) {
            this.animations.play('idle side', loop=true);
        }
    }
    // ----- VERTICAL MOVEMENT -----
    // Jumping is mostly controlled under the section 'jumping' located in the Player function.
    if ( playerJumpButton.duration > currentPlayer.jumpInputTime){
        currentPlayer.currentlyJumping = false;
        currentPlayer.body.acceleration.y = 0;
    }
    
    /* #endregion */

    if (enemyGroup || bossFight){
        if (!this.invulnerable){
            game.physics.arcade.collide(currentPlayer, enemyGroup, function(player, enemy){
                damageKnockbackApplied = playerDamageKnockback(player, enemy)
                if (damageKnockbackApplied){
                    player.invulnerable = true;
                    player.invulnerableTime = game.time.now;  
                    console.log("got hit")
                }
            });
        }
    }

   // Invulnerability on hit
   if (this.invulnerable && game.time.now - this.invulnerableTime > this.iFrames){
       this.invulnerable = false;
   }
};

function playerDamageKnockback(player, enemy){
    knockbackVel = 200;
    damageKnockbackApplied = false;
    if (player.body.touching.left){
        player.body.velocity.x = knockbackVel;
        if (enemy.damage.right){
            damageKnockbackApplied = true;
        }
    }
    if (player.body.touching.right){
        player.body.velocity.x = -knockbackVel;
        if (enemy.damage.left){
            damageKnockbackApplied = true;
        }
    }
    if (player.body.touching.up){
        player.body.velocity.y = knockbackVel;
        if (enemy.damage.down){
            damageKnockbackApplied = true;
        }
    }
    if (player.body.touching.down){
        player.body.velocity.y = -knockbackVel;
        if (enemy.damage.up){
            damageKnockbackApplied = true;
        }
    }
    return damageKnockbackApplied
    // distance = game.physics.arcade.distanceBetween(player,enemy);
    // console.log(distance)
}

