blueSlime = function (game, x, y) {
    Slime.call(this, game, x, y, 'blueSlime');
    this.health = 15;
}

blueSlime.prototype = Object.create(Slime.prototype);
blueSlime.prototype.constructor = blueSlime;

// (Automatically called by World.update)
blueSlime.prototype.update = function () {
    Slime.prototype.update(this); // Update like a normal slime

    // Add blue specific properties
    if (!this.currentlyHit && this.inWorld) {
        // if player is close to slime and is in front of slime
        if (game.physics.arcade.distanceBetween(this, currentPlayer) < 160 && this.faceDirection * (this.body.position.x - currentPlayer.body.position.x) < 0) {
            this.attacking = true;
            this.movementSpeed = 2.5 * this.baseMovementSpeed * this.faceDirection;
            // play attacking animation
            if (this.curAnimationPriority <= this.animationPriorities.attacking) {
                this.curAnimationPriority = this.animationPriorities.attacking;
            }
        }
        else {
            this.attacking = false;
            this.movementSpeed = this.baseMovementSpeed * this.faceDirection;
            // play walking animation
            if (this.curAnimationPriority <= this.animationPriorities.attacking) {
                this.curAnimationPriority = this.animationPriorities.moving;
            }
        }
    }
}


