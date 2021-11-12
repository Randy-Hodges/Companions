var bat;
GrandfatherNPC = function(game, x, y, spritesheetStrID){        
    // Instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, spritesheetStrID);
    this.anchor.setTo(.5,.5); 
    scale = 1.3;  
    this.scale.setTo(scale,scale);
    this.faceDirection = 1;
    grandfather = this;

    // Add animations
    this.animations.add('idle', [0,1,2,3,4,5,6]);
    this.anims = {idle: 0, hover: 1, walk: 2}
    this.curAnim = 1;

    // Physics
    game.physics.enable(this);
    this.movementSpeedY = 30;
    this.body.gravity.y = -globalGravity; // counteracts global gravity

    // Switching Direction
    this.timeLastSwitchX = 0;
    this.timeLastSwitchY = 0;

    // Dialogue
    this.hasDialogue = false;
    this.dialogue = [];
    this.isSpeaking = false;
    this.interactText = game.add.text(0, 0,"Q", { fontSize: '12px', fill: '#FFF' });
    this.interactTextShowing = false;
    this.interactText.alpha = 0;

    this.flipX();
}

GrandfatherNPC.prototype = Object.create(Phaser.Sprite.prototype);
GrandfatherNPC.prototype.constructor = GrandfatherNPC;

// (Automatically called by World.update)
GrandfatherNPC.prototype.update = function(grandfather = this) {
    // Dialogue
    var overlapped = game.physics.arcade.overlap(currentPlayer, grandfather, function(player, grandfather){
        if (!grandfather.hasDialogue){
            return
        }
        if (!grandfather.isSpeaking && !grandfather.interactTextShowing){
            grandfather.interactText.x = grandfather.body.position.x + grandfather.body.width/4;
            grandfather.interactText.y = grandfather.body.position.y + 10;
            grandfather.interactText.alpha = 1;
            grandfather.interactTextShowing = true;
        }
        customKeys = new CustomKeys();
        if (customKeys.isDown("Q") && !grandfather.isSpeaking){
            grandfather.isSpeaking = true;
            startDialogue(grandfather.dialogue, function(){
                grandfather.isSpeaking = false;
            });
        }
    });
    if (!overlapped){
        grandfather.interactText.alpha = 0;
        grandfather.interactTextShowing = false;
    }

    // Animations
    if (grandfather.curAnim == grandfather.anims.idle){
        grandfather.animations.play('idle', 10, true);
    }
    else if (grandfather.curAnim == grandfather.anims.hover){
        this.hover();
    }
    else if (grandfather.curAnim == grandfather.anims.moving){
        // bat.animations.play('hit', 5);
    }
    else {
        console.log("Current animation priority [", grandfather.curAnim, "] is not linked to an animation")
    }
};

GrandfatherNPC.prototype.hover = function(grandfather = this){
    grandfather.animations.play('idle', 10, true);
    // Y direction
    if (game.time.now - grandfather.timeLastSwitchY > 1500){
        grandfather.movementSpeedY *= -1;
        grandfather.body.velocity.y = grandfather.movementSpeedY;
        grandfather.timeLastSwitchY = game.time.now;
    }
}

GrandfatherNPC.prototype.flipX = function(grandfather = this){
    grandfather.scale.x *= -1;
    grandfather.faceDirection *= -1;
}

GrandfatherNPC.prototype.leave = function(){
    this.destroy();
}

GrandfatherNPC.prototype.setIdle = function(){
    this.curAnim = this.anims.idle;
}

GrandfatherNPC.prototype.setDialogue = function(dialogue = undefined){
    if (dialogue != undefined){
        this.hasDialogue = true;
        this.dialogue = dialogue;
    }
}
