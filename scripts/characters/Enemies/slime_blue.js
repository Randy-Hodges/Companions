blueSlime = function(game,x,y){
    Slime.call(this, game, x, y, 'blueSlime');
}

blueSlime.prototype = Object.create(Slime.prototype);
blueSlime.prototype.constructor = blueSlime;

// (Automatically called by World.update)
blueSlime.prototype.update = function() {
    Slime.prototype.update(this); // Update like a normal slime

    // Add blue-Angry specific properties
    // if player is close to slime and is in front of slime
    if (game.physics.arcade.distanceBetween(this, currentPlayer) < 160 && this.faceDirection * (this.body.position.x - currentPlayer.body.position.x) < 0){
        this.movementSpeed = 2.5 * this.baseMovementSpeed * this.faceDirection;
        // play attacking animation
        if (this.curAnimationPriority <= this.animationPriorities.attacking){
            this.curAnimationPriority = this.animationPriorities.attacking;
        }
<<<<<<< HEAD
        console.log('close');
=======
>>>>>>> dev
    }
    else{
        this.movementSpeed = this.baseMovementSpeed * this.faceDirection;
        // play walking animation
        if (this.curAnimationPriority <= this.animationPriorities.attacking){
            this.curAnimationPriority = this.animationPriorities.moving;
        }
    }
}


