redSlime = function (game, x, y) {
    Slime.call(this, game, x, y, 'redSlime');
    this.health = 25;
}

redSlime.prototype = Object.create(Slime.prototype);
redSlime.prototype.constructor = redSlime;

// (Automatically called by World.update)
redSlime.prototype.update = function () {
    Slime.prototype.update(this); // Update like a normal slime

    // Add red specific properties
    if (!this.currentlyHit && this.inWorld) {
        // if player is close to slime and is in front of slime
        if (game.physics.arcade.distanceBetween(this, currentPlayer) < 160) {
            this.attacking = true;
            // If not facing player and sufficient time since last switch
            if (this.faceDirection * (this.body.position.x - currentPlayer.body.position.x) > 0 && game.time.now - this.timeLastSwitch > 500) {
                switchDirectionSlime(this);
            }
            // Fast speed
            this.movementSpeed = 2 * this.baseMovementSpeed * this.faceDirection;
            // play attacking animation
            if (this.curAnimationPriority <= this.animationPriorities.attacking) {
                this.curAnimationPriority = this.animationPriorities.attacking;
            }
        }
        else {
            this.attacking = false;
            // Normal Speed
            this.movementSpeed = this.baseMovementSpeed * this.faceDirection;
            // play walking animation
            if (this.curAnimationPriority <= this.animationPriorities.attacking) {
                this.curAnimationPriority = this.animationPriorities.moving;
            }
        }
    }
}