var playerJumpButton, currentPlayer, basePlayer;
var overlappedCompanion = 'undefined';

/*
Intended to be used to store the data of the current Player. Ideally everything would be in one class or there would be 
some kind of inheritance, but this is what I'm doing to work around Phaser Sprites. If this was python, I probably could
have figured out how to do more efficiently, but hey this works.
*/
BasePlayer = function(){ 

    // hearts - HP
    this.maxHearts = 5;
    this.currentHearts = 5;
    
    // companions
    this.companionSlot1;
    this.companionSlot2;

    // equipment
    
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

    // hearts - HP
    this.maxHearts = basePlayer.maxHearts;
    this.currentHearts = basePlayer.currentHearts;

    // add animations
    this.animations.add('idle side', [11,12,13,14,15], frameRate=10);
    this.animations.add('walk side', [16,17,18,19,20,21], frameRate=10);
    this.frame = 11;
    this.animations.add('slash side', [8,9,10], frameRate = 10);
    this.animations.add('slash down', [0,1,2], frameRate = 10);
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
    playerJumpButton =  game.input.keyboard.addKey(Phaser.Keyboard.W);
    playerJumpButton.onDown.add(
        function(){
            // give player ability to jump when touching ground
            if (currentPlayer.body.blocked.down && currentPlayer.jumpStorage == 0){
                currentPlayer.jumpStorage += 1;
            }
            // jumping 
            if (currentPlayer.jumpStorage > 0){
                //currentPlayer.jumpStorage -= 1; // comment this line out for infinite jumps ***********************************
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
}


Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// (Automatically called by World.update)
Player.prototype.update = function() {
    game.physics.enable(this);
    game.physics.enable(slash);
    
    this.slash.body.setSize(20,35,-10 + this.faceDirection*15,0);
    if (this.isSlashing){
        game.physics.arcade.overlap(this.slash, enemyGroup, function(slash, enemy){enemy.die()});
        
    }

    if (!this.disableMovement){

        // #region Keyboard Input */
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
                this.animations.play('idle side', textLoop=true);
            }
        }
        // ----- VERTICAL MOVEMENT -----
        // Jumping is mostly controlled under the section 'jumping' located in the Player function.
        if ( playerJumpButton.duration > currentPlayer.jumpInputTime){
            currentPlayer.currentlyJumping = false;
            currentPlayer.body.acceleration.y = 0;
        }
        // #endregion */
    }
    else{
        this.animations.play('idle side', textLoop=true);
    }

    if (enemyGroup){
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
    
    // Companions
    if (overlappedCompanion != 'undefined'){   
        console.log('Companion is defined.')
        // Equip Companions
        if (customKeys.isDown("Q")){
            // Equip to Slot 1
            if (basePlayer.companionSlot1 == null || basePlayer.companionSlot1 == 'empty'){
                basePlayer.companionSlot1 = overlappedCompanion;
                basePlayer.companionSlot1.followOn = true;
                basePlayer.companionSlot1.followObject = currentPlayer;
                //console.log('Equipped to companionSlot1.');
                //console.log(overlappedCompanion);  
                
                if (basePlayer.companionSlot2 != null){
                    basePlayer.companionSlot2.followObject = basePlayer.companionSlot1;
                }
            // Equip to Slot 2
            } else { 
                if (basePlayer.companionSlot2 == null && overlappedCompanion != basePlayer.companionSlot1){
                    basePlayer.companionSlot2 = overlappedCompanion;
                    basePlayer.companionSlot2.followOn = true;
                    basePlayer.companionSlot2.followObject = basePlayer.companionSlot1;
                    //console.log('Equipped to companionSlot2.');
                    //console.log(overlappedCompanion);
                }
            }
        }
        
        // Unequip Companions
        if (customKeys.isDown("E")){
            
            // Unequip Slot 1
            if (basePlayer.companionSlot1 == overlappedCompanion){
                basePlayer.companionSlot1.followOn = false;
                basePlayer.companionSlot1 = 'empty';
                
                if (basePlayer.companionSlot2 != null){
                    basePlayer.companionSlot2.followOn = true;
                    basePlayer.companionSlot2.followObject = currentPlayer;
                }
            } 
            // Unequip Slot 2
            if (basePlayer.companionSlot2 == overlappedCompanion){
                basePlayer.companionSlot2.followOn = false;
                basePlayer.companionSlot2 = 'empty';
            }
        }  
    }
    
};

function playerDamageKnockback(player, enemy){
    knockbackVel = 200;
    damageKnockbackApplied = false;
    if (player.body.touching.left){
        player.body.velocity.x = knockbackVel;
        if (enemy.damage.right){
            damageKnockbackApplied = true;
            dmgHearts(1);
        }
    }
    if (player.body.touching.right){
        player.body.velocity.x = -knockbackVel;
        if (enemy.damage.left){
            damageKnockbackApplied = true;
            dmgHearts(1);
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
}

// Health Functions
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
    console.log(basePlayer.currentHearts);
}

function dmgHearts(dmg){
    var numhearts = hearts.countLiving();
    // Death
    if (basePlayer.currentHearts <= 1){
        hearts.removeChildAt(numhearts - 1);
        heartText = game.add.text(64,64,"You are dead.", { fontSize: '72px', fill: '#000' });
        heartText.fixedToCamera = true;
        changeLevel(0,"0");
    } 
    // Remove one heart
    else {
        hearts.removeChildAt(numhearts - 1);
    }
    basePlayer.currentHearts -= 1;
    console.log(basePlayer.currentHearts);
}

// Companion Functions - Powerups
function increaseMaxHearts(num){
    basePlayer.maxHearts = basePlayer.maxHearts + num;
    //console.log(basePlayer.maxHearts);
}

function doubleJump(){
    //basePlayer.jumpMax = 2
}

function enableFire(){
    //basePlayer.fireEnable = True
}

// Overlap
function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}