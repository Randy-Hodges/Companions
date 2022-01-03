var playerJumpButton, currentPlayer, basePlayer;
var slashUp, slashDown, slashRight, slashLeft;
var overlappedCompanion = 'undefined';

/*
Intended to be used to store the data of the current Player. Since Phaser automatically destroys sprite
data between game states, the basePlayer class was added to store important data for the player when 
transitioning between states.
*/
BasePlayer = function () {

    // hearts - HP
    this.maxHearts = 3;
    this.currentHearts = this.maxHearts;

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
    this.jumpStorage = 0;

    this.dashEnabled = false;
    this.lastCP = new CheckpointBase(55 * tileLength, 16 * tileLength, 'level1-0');

    // Stats
    this.deathCount = 0;
}

basePlayer = new BasePlayer();

Player = function (game, x = gameWidth / 2, y = gameHeight / 2) {
    // *INSTANTIATE AN ENEMY GROUP BEFORE THE PLAYER IN THE CODE FOR COLLISIONS WITH ENEMIES

    // Instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.anchor.setTo(.5, .5);
    this.scale.setTo(-spawndirection, 1);
    currentPlayer = this;

    // HP
    this.maxHearts = basePlayer.maxHearts;
    this.currentHearts = basePlayer.currentHearts;

    // Sound
    this.jumpSound = game.add.audio('jump sound', volume = .2);
    this.slashSound = game.add.audio('air slash sound', .09);
    this.dashSound = game.add.audio('dash sound', .02);
    this.damagedSound = game.add.audio('damaged sound', .2);

    // Animations
    this.animations.add('slash down', [0, 1, 2], frameRate = 10);
    this.animations.add('die', [5, 6, 7], frameRate = 3);
    this.animations.add('faceplant', [7], frameRate = 3);
    this.animations.add('reverse die', [7, 5, 11], frameRate = 3);
    this.animations.add('slash side', [8, 9, 10], frameRate = 10);
    this.animations.add('idle side', [11, 12, 13, 14, 15], frameRate = 10);
    this.animations.add('walk side', [16, 17, 18, 19, 20, 21], frameRate = 10);
    this.animations.add('dash', [21], framerate = 10);
    this.animations.add('slash up', [22, 23, 24], frameRate = 10);
    this.animations.add('jump', [26, 27], frameRate = 10);
    this.animations.add('rise', [28, 29, 30], frameRate = 10);
    this.animations.add('hover', [31, 32], framerate = 10);
    this.animations.add('fall', [33, 34, 35], frameRate = 10);

    dieAnim = this.animations.getAnimation('die');
    dieAnim.onComplete.add(function () {
        currentPlayer.postDie();
    });

    this.frame = 11;
    this.stopMovementAnimations = false;
    this.faceDirection = 1; // x Direction player is facing. 1 or -1 (positive is facing right)

    // Input log
    this.inputLog = [];
    cursors = game.input.keyboard.createCursorKeys();

    // Invulnerability
    this.invulnerableTime = game.time.now;
    this.invulnerable = false;
    this.iFrames = 2000 //actually in milliseconds, not frames 
    this.iTint = 0xff0f0f; 
    this.iAlpha = .7;
    this.iAnimCount = 0;

    // Misc 
    this.inConversation = false;

    // #region Physics
    this.disableMovement = false;
    this.accelx = basePlayer.accelx;
    game.physics.enable(this);
    this.body.setSize(9, 28, 28, 20); // xsize, ysize, xoffset, yoffset
    this.body.gravity.y = basePlayer.gravityY;
    this.body.drag.x = basePlayer.dragX;
    this.body.maxVelocity.x = basePlayer.maxVelX;
    this.body.maxVelocity.y = basePlayer.maxVelY;
    this.mass = 50;
    this.body.collideWorldBounds = true;
    // #endregion */

    // #region JUMPING
    this.jumpAccel = basePlayer.jumpAccel;
    this.jumpInputTime = basePlayer.jumpInputTime; //ms
    this.jumpStorage = basePlayer.jumpStorage; // should be initialized to 0, can increase for dev purposes
    this.isJumping = false;
    this.jumpEnabled = true;
    jumpAnim = this.animations.getAnimation('jump');
    jumpAnim.onComplete.add(function () {
        currentPlayer.isJumping = false;
    })
    playerJumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    playerJumpButton.onDown.add(
        function () {
            if (!currentPlayer.disableMovement && currentPlayer.jumpEnabled && !game.paused) {
                // give player ability to jump when touching ground
                if (currentPlayer.body.onFloor() && currentPlayer.jumpStorage == 0) {
                    currentPlayer.jumpStorage += 1;
                }
                // jumping 
                // infinite jump, developer tool
                if (devTools) {
                    currentPlayer.isJumping = true;
                    currentPlayer.body.acceleration.y = currentPlayer.jumpAccel;
                    currentPlayer.body.velocity.y = 0;
                    currentPlayer.jumpSound.play();
                    if (!currentPlayer.stopMovementAnimations) {
                        currentPlayer.animations.play('jump')
                    }
                }
                // normal jump
                else if (currentPlayer.jumpStorage > 0) {
                    currentPlayer.jumpStorage -= 1;
                    currentPlayer.isJumping = true;
                    currentPlayer.body.acceleration.y = currentPlayer.jumpAccel;
                    currentPlayer.jumpSound.play();
                    if (!currentPlayer.stopMovementAnimations) {
                        currentPlayer.animations.play('jump');
                    }
                }
            }
        })
    playerJumpButton.onUp.add(
        function () {
            currentPlayer.isJumping = false;
            currentPlayer.body.acceleration.y = 0;
        })

    // #endregion

    // #region SLASHING 
    // Slash mechanics
    this.isSlashing = false;
    this.slashDamage = basePlayer.slashDamage;
    slash = game.add.sprite(75, 800);
    slash.anchor.setTo(.2, 0);
    game.physics.enable(slash);
    slash.body.allowGravity = false;
    slash.body.setSize(20, 28, 0, 0);
    this.slash = slash;
    this.setSlashPosition; // function
    this.slashDirection;

    // #region Animations
    slashSide = this.animations.getAnimation('slash side');
    slashSide.onStart.add(function () {
        currentPlayer.slashSound.play();
        currentPlayer.stopMovementAnimations = true;
        currentPlayer.isSlashing = true;
        currentPlayer.slashDirection = currentPlayer.faceDirection == 1 ? 'right' : 'left';
        currentPlayer.setSlashPosition = function () {
            slash.body.setSize(20, 28, 0, 0);
            currentPlayer.slash.x = currentPlayer.body.position.x + currentPlayer.faceDirection * 20;
            currentPlayer.slash.y = currentPlayer.body.position.y;
        }
    });
    slashSide.onComplete.add(function () {
        currentPlayer.stopMovementAnimations = false;
        currentPlayer.isSlashing = false;
    });
    slashDown = this.animations.getAnimation('slash down');
    slashDown.onStart.add(function () {
        currentPlayer.slashSound.play();
        currentPlayer.stopMovementAnimations = true;
        currentPlayer.isSlashing = true;
        currentPlayer.slashDirection = 'down';
        currentPlayer.setSlashPosition = function () {
            slash.body.setSize(28, 20, 0, 0);
            currentPlayer.slash.x = currentPlayer.body.position.x - 3;
            currentPlayer.slash.y = currentPlayer.body.position.y + 25;
        }
    });
    slashDown.onComplete.add(function () {
        currentPlayer.stopMovementAnimations = false;
        currentPlayer.isSlashing = false;
    });
    slashUp = this.animations.getAnimation('slash up');
    slashUp.onStart.add(function () {
        currentPlayer.slashSound.play();
        currentPlayer.stopMovementAnimations = true;
        currentPlayer.isSlashing = true;
        currentPlayer.slashDirection = 'up';
        currentPlayer.setSlashPosition = function () {
            slash.body.setSize(28, 20, 0, 0);
            currentPlayer.slash.x = currentPlayer.body.position.x - 3;
            currentPlayer.slash.y = currentPlayer.body.position.y - 20;
        }
    });
    slashUp.onComplete.add(function () {
        currentPlayer.stopMovementAnimations = false;
        currentPlayer.isSlashing = false;
    });
    // #endregion

    // #region slash buttons
    // AWSD Buttons
    // slashUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
    // slashUp.onDown.add(
    //     function () {
    //         if (!currentPlayer.disableMovement) {
    //             if (!currentPlayer.stopMovementAnimations) {
    //                 currentPlayer.animations.play('slash up');
    //             }
    //         }
    //     });
    // slashDown = game.input.keyboard.addKey(Phaser.Keyboard.S);
    // slashDown.onDown.add(
    //     function () {
    //         if (!currentPlayer.disableMovement) {
    //             if (!currentPlayer.stopMovementAnimations) {
    //                 currentPlayer.animations.play('slash down');
    //             }
    //         }
    //     });
    // slashRight = game.input.keyboard.addKey(Phaser.Keyboard.D);
    // slashRight.onDown.add(
    //     function () {
    //         if (!currentPlayer.disableMovement) {
    //             if (!currentPlayer.stopMovementAnimations) {
    //                 currentPlayer.scale.x = -Math.abs(currentPlayer.scale.x);
    //                 currentPlayer.faceDirection = 1;
    //                 currentPlayer.animations.play('slash side');
    //             }
    //         }
    //     });
    // slashLeft = game.input.keyboard.addKey(Phaser.Keyboard.A);
    // slashLeft.onDown.add(
    //     function () {
    //         if (!currentPlayer.disableMovement) {
    //             if (!currentPlayer.stopMovementAnimations) {
    //                 currentPlayer.scale.x = Math.abs(currentPlayer.scale.x);
    //                 currentPlayer.faceDirection = -1;
    //                 currentPlayer.animations.play('slash side');
    //             }
    //         }
    //     });
    // #endregion

    // #region SPACEBAR Button
    playerSlashButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    playerSlashButton.onDown.add(
        function () {
            if (!currentPlayer.disableMovement && !game.paused) {
                if (!currentPlayer.stopMovementAnimations) {
                    var slashDirection = currentPlayer.inputLog[currentPlayer.inputLog.length - 1];
                    if (slashDirection == 'down') {
                        currentPlayer.animations.play('slash down');
                    }
                    else if (slashDirection == 'right' || slashDirection == 'left') {
                        currentPlayer.animations.play('slash side');
                    }
                    else if (slashDirection == 'up') {
                        currentPlayer.animations.play('slash up');
                    }
                    else {
                        currentPlayer.animations.play('slash side');
                    }
                }
            }
        });
    // #endregion

    // #endregion */

    // #region DASHING
    this.isDashing = false;
    this.dashCooldownLength = 500 // milliseconds
    this.lastDash = -this.dashCooldownLength
    this.dashEnabled = devTools ? true : basePlayer.dashEnabled;
    playerDashButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
    playerDashButton.onDown.add(function () {
        if (game.time.now - currentPlayer.lastDash >= currentPlayer.dashCooldownLength
            && currentPlayer.dashEnabled
            && !currentPlayer.disableMovement
            && !game.paused
        ) {
            // Note: this particular code feels weird, but it works smoothly
            currentPlayer.lastDash = game.time.now;
            //currentPlayer.dashSound.play();
            if (!currentPlayer.stopMovementAnimations) {
                currentPlayer.animations.play('walk side')
            }
            function dash(timer) {
                currentPlayer.isDashing = true;
                // Start Dash
                dashVelocity = 500;
                currentPlayer.body.maxVelocity.x = dashVelocity;
                currentPlayer.body.velocity.x = currentPlayer.faceDirection * dashVelocity;
                currentPlayer.body.velocity.y = 0;
                currentPlayer.body.acceleration.y = 0;
                currentPlayer.body.drag.x = 0;
                currentPlayer.body.allowGravity = false;
                currentPlayer.jumpEnabled = false;
                // Stop dash and retrun physics variables to correct values    
                timer.start();
            }
            function returnPhysics() {
                currentPlayer.body.allowGravity = true;
                currentPlayer.body.drag.x = basePlayer.dragX;
                currentPlayer.isDashing = false;
                currentPlayer.body.maxVelocity.x = basePlayer.maxVelX;
                currentPlayer.jumpEnabled = true;
            }
            var timer = game.time.create(false);
            timer.add(150, returnPhysics)
            dash(timer);
        }
    })

    // #endregion

    // Companions
    this.companionSlots = [undefined, undefined];
    // TODO: loop through all of these instead of manually doing it
    this.companionSlots[0] = createEquippedCompanion(basePlayer.companionNames[0], this, this.body.position.x - 50, this.body.position.y - 50);
    this.companionSlots[1] = createEquippedCompanion(basePlayer.companionNames[1], this.companionSlots[0], this.body.position.x - 75, this.body.position.y - 75);

}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// (Automatically called by World.update)
Player.prototype.update = function (player = this) {
    // #region Dev tool clipping
    if (devTools && game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.body.position.x -= 3;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.body.position.x += 3;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.body.position.y -= 3;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.body.position.y += 3;
        }

        this.body.enable = false;
    }
    else {
        this.body.enable = true;
    }
    // #endregion

    // #region Input log
    // Section can be improved for efficiency, but kept as is for some readability
    if (cursors.up.isDown) {
        var index = this.inputLog.indexOf('up');
        if (!(index > -1)) {
            this.inputLog.push('up');
        }
    }
    else {
        removeItemOnce(this.inputLog, 'up');
    }
    if (cursors.down.isDown) {
        var index = this.inputLog.indexOf('down');
        if (!(index > -1)) {
            this.inputLog.push('down');
        }
    }
    else {
        removeItemOnce(this.inputLog, 'down');
    }
    if (cursors.right.isDown) {
        var index = this.inputLog.indexOf('right');
        if (!(index > -1)) {
            this.inputLog.push('right');
        }
    }
    else {
        removeItemOnce(this.inputLog, 'right');
    }
    if (cursors.left.isDown) {
        var index = this.inputLog.indexOf('left');
        if (!(index > -1)) {
            this.inputLog.push('left');
        }
    }
    else {
        removeItemOnce(this.inputLog, 'left');
    }
    // #endregion

    // #region Slashing
    if (this.isSlashing) {
        this.setSlashPosition();
        game.physics.arcade.overlap(this.slash, enemyGroup, function (slash, enemy) {
            enemy.hit(basePlayer.slashDamage);
            currentPlayer.slashKnockback(enemy);
        });
        this.slash.body.enable = true;
    }
    else {
        this.slash.body.enable = false;
    }
    // #endregion

    // #region Keyboard Input */
    if (!this.disableMovement) {
        // #region ----- LATERAL MOVEMENT -----
        // Left
        if (cursors.left.isDown) {
            this.body.acceleration.x = -this.accelx;
        }
        // Right
        if (cursors.right.isDown) {
            this.body.acceleration.x = this.accelx;
        }
        // No input
        if (!cursors.left.isDown && !cursors.right.isDown) {
            this.body.acceleration.x = 0;
        }
        // #endregion
        // ----- Animation -----
        framerate = Math.abs(parseInt(this.body.velocity.x / 50)) + 10;
        lower_transition_threshold = -180; //-180
        upper_transition_threshold = 160; //330
        if (!currentPlayer.stopMovementAnimations) {
            // left
            if (this.body.acceleration.x < 0) {
                this.scale.x = Math.abs(this.scale.x);
                this.faceDirection = -1;
                if (this.body.onFloor() && !this.isJumping) {
                    this.animations.play('walk side', framerate);
                }
            }
            // right
            else if (this.body.acceleration.x > 0) {
                this.scale.x = -Math.abs(this.scale.x);
                this.faceDirection = 1;
                if (this.body.onFloor() && !this.isJumping) {
                    this.animations.play('walk side', framerate);
                }
            }
            // Rising
            if (this.body.velocity.y < lower_transition_threshold && !this.isJumping) {
                this.animations.play('rise');
            }
            // Hovering
            if (this.body.velocity.y <= upper_transition_threshold
                && this.body.velocity.y >= lower_transition_threshold
                && !this.body.onFloor()
                && !this.isJumping) {
                //this.animations.play('walk side', 10);
            }
            // Falling
            if (this.body.velocity.y > upper_transition_threshold) {
                this.animations.play('fall');
            }

            // idle
            if (this.body.velocity.x == 0 && !this.isJumping && this.body.onFloor()) {
                this.animations.play('idle side', textLoop = true);
            }
        }
        // ----- VERTICAL MOVEMENT -----
        // Jumping is mostly controlled under the section 'jumping' located in the Player function.
        if (playerJumpButton.duration > currentPlayer.jumpInputTime) {
            currentPlayer.currentlyJumping = false;
            currentPlayer.body.acceleration.y = 0;
        }
    }
    // #endregion */

    // Conversation
    if (this.inConversation) {
        this.animations.play('idle side');
        this.body.velocity.x = 0;
        this.body.acceleration.x = 0;
    }

    // Collision with enemies
    if (typeof enemyGroup !== 'undefined') {
        if (!this.invulnerable) {
            var collided = game.physics.arcade.collide(currentPlayer, enemyGroup, function (player, enemy) {
                player.calcDamageKnockback(enemy);
            });
            if (!collided){
                var overlap = game.physics.arcade.overlap(currentPlayer, enemyGroup, function (player, enemy) {
                    player.takeDamage()
                });
            }
        }
    }

    // #region Invulnerability
    // Note: invulnerableTime is the start time of the invulnerability
    if (this.invulnerable ) {
        // Turn off
        if (game.time.now - this.invulnerableTime > this.iFrames) {
            this.tint = 0xffffff;
            this.invulnerable = false;
        }
    }
    // #endregion
};

Player.prototype.calcDamageKnockback = function (enemy, player = this) {
    knockbackVel = 200;
    damageKnockbackApplied = false;

    if (player.body.touching.left) {
        player.body.velocity.x = knockbackVel;
        if (enemy.damage.right) {
            damageKnockbackApplied = true;
            player.takeDamage(1);
        }
    }
    if (player.body.touching.right) {
        player.body.velocity.x = -knockbackVel;
        if (enemy.damage.left) {
            damageKnockbackApplied = true;
            player.takeDamage(1);
        }
    }
    if (player.body.touching.up) {
        player.body.velocity.y = knockbackVel;
        if (enemy.damage.down) {
            damageKnockbackApplied = true;
            player.takeDamage(1);
        }
    }
    if (player.body.touching.down) {
        player.body.velocity.y = -knockbackVel;
        if (enemy.damage.up) {
            damageKnockbackApplied = true;
            player.takeDamage(1);
        }
    }
    return damageKnockbackApplied;
}

Player.prototype.slashKnockback = function (enemy) {
    if (typeof enemy.mass === 'undefined') {
        enemy.mass = 20;
        console.log('enemy mass undefined')
    }
    var velocityConstant = 3000;
    var surfaceConstant = 20;
    var playerKnockbackVel = velocityConstant / this.mass + surfaceConstant;
    var enemyKnockbackVel = velocityConstant / enemy.mass + surfaceConstant;
    if (this.slashDirection == 'left') {
        this.body.velocity.x = playerKnockbackVel;
        enemyKnockbackVel *= -1;
        enemy.body.velocity.x = enemyKnockbackVel;
        if (enemy instanceof Slime) {
            enemy.movementSpeed = enemyKnockbackVel;
        }
    }
    else if (this.slashDirection == 'right') {
        this.body.velocity.x = -playerKnockbackVel;
        enemy.body.velocity.x = enemyKnockbackVel;
        if (enemy instanceof Slime) {
            enemy.movementSpeed = enemyKnockbackVel;
        }
    }
    else if (this.slashDirection == 'up') {
        this.body.velocity.y = playerKnockbackVel;
        enemy.body.velocity.y = -enemyKnockbackVel;
    }
    else if (this.slashDirection == 'down') {
        this.body.velocity.y = -playerKnockbackVel;
        enemy.body.velocity.y = enemyKnockbackVel;
    }
}

// Health Functions
Player.prototype.takeDamage = function (dmg = 1) {
    if (currentPlayer.invulnerable) {
        return;
    }
    numhearts = basePlayer.currentHearts;
    removeHearts(numhearts, dmg);
    this.damagedSound.play();
    this.becomeInvulnerable();
    // If Dead
    if (numhearts <= 1) {
        this.preDie(numhearts, dmg);
    }
}

Player.prototype.preDie = function (numhearts, dmg) {
    this.tint = this.iTint;
    currentPlayer.disableMovement = true;
    currentPlayer.stopMovementAnimations = true;
    currentPlayer.body.enable = false;
    currentPlayer.body.acceleration.x = 0;
    currentPlayer.body.velocity.x = 0;

    currentPlayer.animations.play("die");
}

Player.prototype.postDie = function () {
    // Stats
    basePlayer.deathCount += 1;
    // Specialties/Revives
    var state = game.state.getCurrentState().key;
    if (state.slice(0, 6) == 'level1') {
        if (basePlayer.deathCount < 2) {
            revive_event_level1();
        }
        else {
            basePlayer.currentHearts = basePlayer.maxHearts;
            transitionLevel(basePlayer.lastCP.level);
        }
        return
    }
    // Die

    removeMusic();
    if (typeof bossMusic !== 'undefined') {
        removeMusic(bossMusic);
    }
    spawn = -1;
    transitionLevel(basePlayer.lastCP.level);
    basePlayer.currentHearts = basePlayer.maxHearts;
}

Player.prototype.heal = function (heal = 1) {
    healHearts(heal);
}

Player.prototype.healMax = function () {
    healMaxHearts();
}

Player.prototype.becomeInvulnerable = function () {
    this.invulnerable = true;
    this.invulnerableTime = game.time.now;
    if (basePlayer.currentHearts <= 0){
        currentPlayer.tint = currentPlayer.iTint;
        return;
    }
    function iAnimFlash(){
        //currentPlayer.tint = currentPlayer.tint == 0xffffff ? currentPlayer.iTint : 0xffffff;
        currentPlayer.alpha = currentPlayer.alpha == 1 ? currentPlayer.iAlpha : 1;
    }
    var iTimer = game.time.create(false);
    var flashCount = 10;
    iTimer.repeat(parseInt(currentPlayer.iFrames/flashCount), flashCount, iAnimFlash);
    iTimer.start();
}
