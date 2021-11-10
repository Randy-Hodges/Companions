bossSlime = function (game, x, y) {
    Slime.call(this, game, x, y, 'slimeBoss');
    scale = 4;
    this.scale.setTo(-scale, scale);
    this.slimeBoss = true;
    this.baseMovementSpeed = 90
    
    // Colors
    this.tint = rgbToHex(255, 255, 255);
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.color = 'green';
    this.colors = [['green', 1], // Color, probability
    ['blue', 1],
    ['red', 1],
    ['purple', 0],
    ['rainbow', 2]]
    // Transitioning
    this.isTrasitioning = false;
    this.lastTransitionTime = 0;
    this.transitionThresh = 1200;
    // Color switch
    this.timeLastColorSwitch = 0;
    this.timeColorSwitchThresh = 5000 + this.transitionThresh;
    this.switchingTime = 0;

    // Health
    this.health = 50;
    this.currentlyHitCount = 0;
}

bossSlime.prototype = Object.create(Slime.prototype);
bossSlime.prototype.constructor = bossSlime;

// (Automatically called by World.update)
bossSlime.prototype.update = function () {
    Slime.prototype.update(this); // Update like a normal slime

    // Hitting
    if (this.currentlyHit && this.currentlyHitCount < 30){
        this.currentlyHitCount += 1;
    }
    else{
        this.currentlyHit = false;
        this.currentlyHitCount = 0;
    }
    if (slime.health <= 0) {
        slime.die();
    }
    
    // Switch color
    if (game.time.now - this.timeLastColorSwitch > this.timeColorSwitchThresh){
        if (!this.isTrasitioning){
            this.color = this.chooseColor();
            this.timeLastColorSwitch = game.time.now;
        }
    }
    if (!this.isTrasitioning){
        // Act based on color
        if (this.color == 'green'){
            this.actGreen();
        }
        else if (this.color == 'blue'){
            this.actBlue();
        }
        else if (this.color == 'red'){
            this.actRed();
        }
        else if (this.color == 'purple'){
            this.actPurple();
        }
        else if (this.color == 'rainbow'){
            this.actRainbow();
        }
        else{
            console.log("Invalid color property on boss slime");
        }
    }
    else{
        this.transition();
    }
}


bossSlime.prototype.rainbowTint = function (changeRate = 1) {
    // changeRate should follow 255%changeRate == 0
    if (this.r > 0 && this.b == 0) {
        this.r -= changeRate;
        this.g += changeRate;
    }
    else if (this.g > 0 && this.r == 0) {   
        this.g -= changeRate;
        this.b += changeRate;
    }
    else if (this.b > 0 && this.g == 0) {
        this.b -= changeRate;
        this.r += changeRate;
    }
    this.tint = rgbToHex(this.r, this.g, this.b);
}


bossSlime.prototype.chooseColor = function(){
    newColor = this.color;
    sum = 0;
    probSum = 0;
    for (var i = 0; i < this.colors.length; i += 1){
        sum += this.colors[i][1];
    }
    // ( the program doesn't like while loops)
    for (var i0 = 0; i0 < 100; i0 += 1){
        randomNumber = Math.random();
        for (var i = 0; i < this.colors.length; i += 1){
            probSum += this.colors[i][1]/sum;
            if (randomNumber <= probSum){
                newColor = this.colors[i][0];
                break;
            }
        }
        if (this.color != newColor){
            break;
        }

    }
    this.isTrasitioning = true;
    this.lastTransitionTime = game.time.now;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    return newColor;
}


bossSlime.prototype.changeColor = function(color){
    green = [0, 255, 0];
    red = [255, 110, 110];
    blue = [140, 140, 255];
    purple = [125, 0, 130];
    if (this.color == 'green'){
        newColor = green;
        this.tint = rgbToHex(newColor[0], newColor[1], newColor[2]);
    }
    else if (this.color == 'blue'){
        newColor = blue;
        this.tint = rgbToHex(newColor[0], newColor[1], newColor[2]);
    }
    else if (this.color == 'red'){
        newColor = red;
        this.tint = rgbToHex(newColor[0], newColor[1], newColor[2]);
    }
    return;
}


bossSlime.prototype.transition = function(){
    // Transitioning
    this.movementSpeed = 0;
    this.rainbowTint(15);
    this.curAnimationPriority = this.animationPriorities.idle;
    // Stop transitioning after set time
    if (game.time.now - this.lastTransitionTime > this.transitionThresh){
        this.isTrasitioning = false;
        this.changeColor(this.color);
    }
}


bossSlime.prototype.actGreen = function(){
    var direction = this.movementSpeed != 0 ? this.movementSpeed : -1;
    this.movementSpeed = this.baseMovementSpeed*1.5*Math.abs(direction)/direction;
    this.curAnimationPriority = this.animationPriorities.moving;
}


bossSlime.prototype.actBlue = function(){
    // Add blue specific properties
    // if (!this.currentlyHit) {
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
    // }
}


bossSlime.prototype.actRed = function(){
    // Add red specific properties
    // if (!this.currentlyHit) {
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
    // }
}


bossSlime.prototype.actRainbow = function(){
    this.rainbowTint(5)
    var direction = this.movementSpeed != 0 ? this.movementSpeed : -1;
    this.movementSpeed = this.baseMovementSpeed*2*Math.abs(direction)/direction;
    if (this.body.blocked.down){
        this.body.velocity.y = -300;
        this.curAnimationPriority = this.animationPriorities.attacking;
    }
}