var playerJumpButton, currentPlayer, basePlayer;
var overlappedCompanion = 'undefined';

/*
Intended to be used to store the data of the current Player. Since Phaser automatically destroys sprite
data between game states, the basePlayer classe was added to store important data for the player.
*/
BasePlayer = function(){ 

    // hearts - HP
    this.maxHearts = 5;
    this.currentHearts = 5;
    
    // companions (string)
    this.companionNames = [undefined, undefined];
    
    // equipment
    this.slashDamage = 5;
    
    // Physics
    this.accelx = 750;
    this.gravityY = 500;
    this.dragX = 800;
    this.maxVelX = 180;
    this.maxVelY = 400;
        
    this.jumpAccel = -3070;
    this.jumpInputTime = 120 //ms
    this.jumpStorage = 0; // should be initialized to 0, can increase for dev purposes
    
}

basePlayer = new BasePlayer();

Player = function(game, x = gameWidth/2, y = gameHeight/2){ 
    // *INSTANTIATE AN ENEMY GROUP BEFORE THE PLAYER IN THE CODE FOR COLLISIONS WITH ENEMIES
    
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.anchor.setTo(.5,.5);   
    this.scale.setTo(spawndirection, 1);

    // HP
    this.maxHearts = basePlayer.maxHearts;
    this.currentHearts = basePlayer.currentHearts;

    // Animations
    this.animations.add('idle side', [11,12,13,14,15], frameRate=10);
    this.animations.add('walk side', [16,17,18,19,20,21], frameRate=10);
    this.animations.add('slash side', [8,9,10], frameRate = 10);
    this.animations.add('slash down', [0,1,2], frameRate = 10);
    this.frame = 11;
    this.stopAnimations = false;
    
    // #region Physics
    this.disableMovement = false;
    this.accelx = basePlayer.accelx;
    game.physics.enable(this);
    this.body.setSize(9,28,28,20); // Creating hitbox. first two params are size of body, second two are offset of body
    this.body.gravity.y = basePlayer.gravityY;
    this.body.drag.x = basePlayer.dragX;
    this.body.maxVelocity.x = basePlayer.maxVelX;
    this.body.maxVelocity.y = basePlayer.maxVelY;
    this.body.collideWorldBounds = true;
    
    this.faceDirection = 1; // x Direction player is facing. 1 or -1

    // #region jumping
    this.jumpAccel = basePlayer.jumpAccel;
    this.jumpInputTime = basePlayer.jumpInputTime; //ms
    this.jumpStorage = basePlayer.jumpStorage; // should be initialized to 0, can increase for dev purposes
    this.currentlyJumping = false;
    currentPlayer = this;
    playerJumpButton =  game.input.keyboard.addKey(Phaser.Keyboard.UP);
    playerJumpButton.onDown.add(
        function(){
            if (!currentPlayer.disableMovement){
                // give player ability to jump when touching ground
                if (currentPlayer.body.blocked.down && currentPlayer.jumpStorage == 0){
                    currentPlayer.jumpStorage += 1;
                }
                // jumping 
                if (devTools && currentPlayer.jumpStorage > 0){ // infinite jump, developer tool
                    currentPlayer.currentlyJumping = true;
                    //currentPlayer.body.velocity.y = currentPlayer.jumpVel;
                    currentPlayer.body.acceleration.y = currentPlayer.jumpAccel;
                }
                else if (currentPlayer.jumpStorage > 0) { // normal jump
                    currentPlayer.jumpStorage -= 1;
                    currentPlayer.currentlyJumping = true;
                    //currentPlayer.body.velocity.y = currentPlayer.jumpVel;
                    currentPlayer.body.acceleration.y = currentPlayer.jumpAccel;
                }
            }
        })
    playerJumpButton.onUp.add(
        function(){
            currentPlayer.currentlyJumping = false;
            currentPlayer.body.acceleration.y = 0;
        })
        // #endregion
        
    // #region ----- SLASHING ----- 
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
    this.slashDamage = basePlayer.slashDamage;
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
            if (!currentPlayer.disableMovement){
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
        }
        });
        // #endregion */
        // #endregion */

    // Invulnerability
    this.invulnerableTime = game.time.now;
    this.invulnerable = false;
    this.iFrames = 2000 //actually in milliseconds, not frames  

    // Companions
    this.companionSlots = [undefined, undefined];
    // TODO: loop through all of these instead of manually doing it
    this.companionSlots[0] = createEquippedCompanion(basePlayer.companionNames[0], this, this.body.position.x - 50, this.body.position.y - 50);
    this.companionSlots[1] = createEquippedCompanion(basePlayer.companionNames[1], this.companionSlots[0], this.body.position.x - 75, this.body.position.y - 75);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// (Automatically called by World.update)
Player.prototype.update = function(player = this) {

    // Dev tool
    if (devTools && game.input.keyboard.isDown(Phaser.Keyboard.Z)){
        this.body.position.y -= 3;
        this.body.enable = false;
    }
    else{
        this.body.enable = true;
    }
    
    // Slashing
    this.slash.body.setSize(20,35,-10 + this.faceDirection*15,0);
    if (this.isSlashing){
        game.physics.arcade.overlap(this.slash, enemyGroup, function(slash, enemy){enemy.hit(basePlayer.slashDamage)});
    }

    // #region Keyboard Input */
    if (!this.disableMovement){
        customKeys = new CustomKeys();
        // ----- LATERAL MOVEMENT -----
        // Left
        if (customKeys.isDown("left")){
            this.body.acceleration.x = -this.accelx;
        }
        // Right
        if (customKeys.isDown("right")){
            this.body.acceleration.x = this.accelx;
        }
        // No input
        if (customKeys.isUp("left") && customKeys.isUp("right")){
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
                this.animations.play('idle side', textLoop=true);
            }
        }
        // ----- VERTICAL MOVEMENT -----
        // Jumping is mostly controlled under the section 'jumping' located in the Player function.
        if ( playerJumpButton.duration > currentPlayer.jumpInputTime){
            currentPlayer.currentlyJumping = false;
            currentPlayer.body.acceleration.y = 0;
        }
    }
    else{
        this.animations.play('idle side');
        this.body.velocity.x = 0;
        this.body.acceleration.x = 0;
    }
    // #endregion */

    // Collision with enemies
    if (enemyGroup != undefined){
        if (!this.invulnerable){
            game.physics.arcade.collide(currentPlayer, enemyGroup, function(player, enemy){
                player.calcDamageKnockback(enemy);
            });
        }
    }

    // Remove invulnerability after set time
    if (this.invulnerable && game.time.now - this.invulnerableTime > this.iFrames){
       this.invulnerable = false;
    }

};

Player.prototype.calcDamageKnockback = function(enemy, player = this){
    knockbackVel = 200;
    damageKnockbackApplied = false;

    if (player.body.touching.left){
        player.body.velocity.x = knockbackVel;
        if (enemy.damage.right){
            damageKnockbackApplied = true;
            player.takeDamage(1);
        }
    }
    if (player.body.touching.right){
        player.body.velocity.x = -knockbackVel;
        if (enemy.damage.left){
            damageKnockbackApplied = true;
            player.takeDamage(1);
        }
    }
    if (player.body.touching.up){
        player.body.velocity.y = knockbackVel;
        if (enemy.damage.down){
            damageKnockbackApplied = true;
            player.takeDamage(1);
        }
    }
    if (player.body.touching.down){
        player.body.velocity.y = -knockbackVel;
        if (enemy.damage.up){
            damageKnockbackApplied = true;
            player.takeDamage(1);
        }
    }
    return damageKnockbackApplied;
}


// Health Functions
Player.prototype.takeDamage = function(dmg){
    numhearts = basePlayer.currentHearts;
    // If Dead
    if (numhearts <= 1){
        hearts.removeChildAt(numhearts - 1);
        changeLevel(0,"0");
        basePlayer.currentHearts = basePlayer.maxHearts;
    } 
    // Otherwise, Remove one heart
    else {
        basePlayer.currentHearts -= 1;
        hearts.removeChildAt(numhearts - 1);
        this.invulnerable = true;
        this.invulnerableTime = game.time.now;  
        console.log("got hit");
    }
}

function createHearts(numhearts){
    hearts = game.add.group();
    hearts.fixedToCamera = true;
    for (var i = 0; i < numhearts; i += 1){
        var heart = hearts.create(i*20 + 80, 13, 'heart');
    }
}

function increaseMaxHearts(increasenum){
    var numhearts = basePlayer.currentHearts + increasenum;
    basePlayer.currentHearts += increasenum;
    createHearts(numhearts);
}

function healHearts(heal){
    if (basePlayer.currentHearts >= basePlayer.maxHearts){
        console.log("At max hearts!");
    } 
    else {
        basePlayer.currentHearts += 1;
        createHearts(basePlayer.currentHearts);
    }
}

// Companion Functions - Powerups
function increaseMaxHearts(num){
    basePlayer.maxHearts = basePlayer.maxHearts + num;
    //console.log(basePlayer.maxHearts);
}

// function doubleJump(){
//     //basePlayer.jumpMax = 2
// }

// function enableFire(){
//     //basePlayer.fireEnable = True
// }


// Overlap
// function checkOverlap(spriteA, spriteB) {

//     var boundsA = spriteA.getBounds();
//     var boundsB = spriteB.getBounds();

//     return Phaser.Rectangle.intersects(boundsA, boundsB);

// }