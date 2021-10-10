blueAngrySlime = function(game,x,y){
    Slime.call(this, game, x, y, 'blueAngrySlime');
}

blueAngrySlime.prototype = Object.create(Slime.prototype);
Object.defineProperty(blueAngrySlime.prototype, 'constructor', {
    value: blueAngrySlime,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true });

// (Automatically called by World.update)
blueAngrySlime.prototype.update = function() {
    Slime.prototype.update(this); // Update like a normal slime

    // Add blue-Angry specific properties
    // if player is close to slime and is in front of slime
    if (game.physics.arcade.distanceBetween(this, currentPlayer) < 160 && this.faceDirection * (this.body.position.x - currentPlayer.body.position.x) < 0){
        this.movementSpeed = 2.5 * this.baseMovementSpeed * this.faceDirection;
        // play attacking animation
        if (this.curAnimationPriority <= this.animationPriorities.attacking){
            this.curAnimationPriority = this.animationPriorities.attacking;
        }
        console.log('close');
    }
    else{
        this.movementSpeed = this.baseMovementSpeed * this.faceDirection;
        // play walking animation
        if (this.curAnimationPriority <= this.animationPriorities.attacking){
            this.curAnimationPriority = this.animationPriorities.moving;
        }
    }
}


