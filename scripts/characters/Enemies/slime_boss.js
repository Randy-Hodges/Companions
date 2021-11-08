bossSlime = function (game, x, y) {
    Slime.call(this, game, x, y, 'slimeBoss');
    this.health = 200;
    scale = 4;
    this.scale.setTo(-scale, scale);
    this.tint = rgbToHex(255, 255, 255);
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.curColor = 'rainbow';
    this.colors = [['green', 1], // Color, probability
    ['blue', 1],
    ['red', 1],
    ['purple', 1],
    ['rainbow', 1]]

}

bossSlime.prototype = Object.create(Slime.prototype);
bossSlime.prototype.constructor = bossSlime;

// (Automatically called by World.update)
bossSlime.prototype.update = function () {
    Slime.prototype.update(this); // Update like a normal slime
    color = this.chooseColor();
    this.changeColor(color);


    // Add red specific properties
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
        this.rainbowTint();
    }
}

bossSlime.prototype.rainbowTint = function () {
    if (this.r > 0 && this.b == 0) {
        this.r -= 1;
        this.g += 1;
    }
    else if (this.g > 0 && this.r == 0) {
        this.g -= 1;
        this.b += 1;
    }
    else if (this.b > 0 && this.g == 0) {
        this.b -= 1;
        this.r += 1;
    }
    this.tint = rgbToHex(this.r, this.g, this.b);
}

bossSlime.prototype.chooseColor = function(){
    return 'color';
}

bossSlime.prototype.changeColor = function(color){
    return;
}

