var companionGroup;
var piggyUnlocked = false;
var froggyUnlocked = false;
var slimeUnlocked = false;

Companion = function(game, spritesheetStrID, x = gameWidth/2, y = gameHeight/2, followOn = false, isEquipped = false){ 
    
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, spritesheetStrID);
    this.anchor.setTo(.5,.5);   
    var scale = .6;
    this.scale.setTo(scale, scale);
    
    // Sprite Variables
    this.spritesheetStrID = spritesheetStrID;
    this.followOn = followOn;
    this.isEquipped = isEquipped;
    this.followObject;

    // animations
    this.stopMovementAnimations = false;
    
    /* #region Physics */
    this.accelx = basePlayer.accelx;
    game.physics.enable(this);
    this.body.allowGravity = false;
    this.body.setSize(32,32);
    this.body.drag.x = 500;
    this.body.maxVelocity.x = 150;
    this.body.maxVelocity.y = 300;

    // Text
    this.equipText = game.add.text(this.body.position.x, this.body.position.y,"Q", { fontSize: '12px', fill: '#000' });
    this.equipTextShowing = false;
    this.equipText.alpha = 0;
    this.equipText2 = game.add.text(this.body.position.x, this.body.position.y,"Q", { fontSize: '12px', fill: '#fff' });
    this.equipText2.alpha = 0;
}

Companion.prototype = Object.create(Phaser.Sprite.prototype);
Companion.prototype.constructor = Companion;

// (Automatically called by World.update)
Companion.prototype.update = function(companion = this) {
    // Equipping
    var overlapped = game.physics.arcade.overlap(currentPlayer, companionGroup, function(player, companion){
        if (!companion.isEquipped && !companion.equipTextShowing){
            companion.equipText.x = companion.body.position.x + 3;
            companion.equipText.y = companion.body.position.y - 12;
            companion.equipText.alpha = 1;
            companion.equipTextShowing = true;

            companion.equipText2.x = companion.body.position.x + 2;
            companion.equipText2.y = companion.body.position.y - 13;
            companion.equipText2.alpha = 1;
        }
        customKeys = new CustomKeys();
        if (customKeys.isDown("Q") && !companion.isEquipped){
            equipCompanion(companion);
        }
    });
    if (!overlapped){
        companion.equipText.alpha = 0;
        companion.equipTextShowing = false;
        companion.equipText2.alpha = 0;
    }
    
    // Follow Logic
    if (companion.isEquipped){
        companion.followOn = true;
    }    
    if (companion.followObject == undefined){
        companion.followOn = false;
    }
    if (companion.followOn){    
        game.physics.arcade.moveToObject(companion, companion.followObject, 30, 500);
    }
    else{
        companion.body.velocity.x = 0;
        companion.body.velocity.y = 0;
    }
    // ----Animation----
    // left
    if (companion.body.velocity.x < 0){
        companion.scale.x = Math.abs(companion.scale.x);
    }
    // right
    else if (companion.body.velocity.x > 0){
        companion.scale.x = -Math.abs(companion.scale.x);
    }
};

Companion.prototype.returnHome = function(){
    this.equipTextShowing = false;
    if (game.state.current == 'level0'){
        this.followObject = this.home;
    }
    else{
        this.followObject = undefined;
    }
}

Companion.prototype.equip = function(){
    console.log('equipping ' + this.name)
}

Companion.prototype.unequip = function(){
    console.log('unequipping ' + this.name)
}