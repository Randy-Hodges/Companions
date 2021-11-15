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
    this.stopAnimations = false;
    
    /* #region Physics */
    this.accelx = basePlayer.accelx;
    game.physics.enable(this);
    this.body.allowGravity = false;
    this.body.setSize(32,32);
    this.body.drag.x = 500;
    this.body.maxVelocity.x = 150;
    this.body.maxVelocity.y = 300;

    // Text
    this.equipText1 = game.add.text(this.body.position.x, this.body.position.y,"Q", { fontSize: '12px', fill: '#000' });
    this.equipText2 = game.add.text(this.body.position.x, this.body.position.y,"Q", { fontSize: '12px', fill: '#fff' });
    this.equipText1Showing = false;
    this.equipText1.alpha = 0;
    this.equipText2Showing = false;
    this.equipText2.alpha = 0;
}

Companion.prototype = Object.create(Phaser.Sprite.prototype);
Companion.prototype.constructor = Companion;

// (Automatically called by World.update)
Companion.prototype.update = function(companion = this) {
    // Equipping
    var overlapped = game.physics.arcade.overlap(currentPlayer, companionGroup, function(player, companion){
        if (!companion.isEquipped && !companion.equipText1Showing){
            companion.equipText1.x = companion.body.position.x + 3;
            companion.equipText1.y = companion.body.position.y - 12;
            companion.equipText1.alpha = 1;
            companion.equipText1Showing = true;

            companion.equipText2.x = companion.body.position.x + 2;
            companion.equipText2.y = companion.body.position.y - 13;
            companion.equipText2.alpha = 1;
            companion.equipText2Showing = true;
        }
        customKeys = new CustomKeys();
        if (customKeys.isDown("Q") && !companion.isEquipped){
            equipCompanion(companion);
        }
    });
    if (!overlapped){
        companion.equipText1.alpha = 0;
        companion.equipText1Showing = false;
        companion.equipText2.alpha = 0;
        companion.equipText2Showing = false;
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
    if (game.state.current == 'level0'){
        this.followObject = this.home;
    }
    else{
        this.followObject = undefined;
    }
}

// TODO: Needs to be moved outside of the class script
function createEquippedCompanion(companionName, followObject, positionX, positionY){

    if (companionName == 'piggy'){
        pig = new CompanionPig(game, positionX, positionY, true, true);
        pig.followObject = followObject;
        pig.isEquipped = true;
        game.add.existing(pig);
        return pig;
    } 
    if (companionName == 'froggy'){
        frog = new CompanionFrog(game, positionX, positionY, true, true);
        frog.followObject = followObject;
        frog.isEquipped = true;
        game.add.existing(frog);
        return frog;
    }
}

// TODO: Needs to be moved outside of the class script
equipCompanion = function(companion){
    // Fill undefined slots
    for (var i = 0; i < basePlayer.companionNames.length; i += 1){
        if (basePlayer.companionNames[i] == undefined){
            // update player companions
            basePlayer.companionNames[i] = companion.name;
            currentPlayer.companionSlots[i] = companion;
            // update companion equip/followObject data
            companion.isEquipped = true;
            if (i > 0){
                companion.followObject = currentPlayer.companionSlots[i-1];
            }
            else{
                companion.followObject = currentPlayer;
            }

            return;
        }
    }
    unequipCompanion();
    
    basePlayer.companionNames.push(companion.name);
    currentPlayer.companionSlots.push(companion);
    companion.isEquipped = true;
    updateEquippedCompanionFollowObjects();
    // console.log('Companion Slot 1:', currentPlayer.companionSlots[0].name, '| Companion Slot 2:', currentPlayer.companionSlots[1].name);
}

// TODO: move to part of a class
updateEquippedCompanionFollowObjects = function () {
    // updates the followObject property of equipped companions
    for (var i = 0; i < currentPlayer.companionSlots.length; i += 1) {
        if (i > 0) {
            currentPlayer.companionSlots[i].followObject = currentPlayer.companionSlots[i - 1];
        }
        else {
            currentPlayer.companionSlots[i].followObject = currentPlayer;
        }
    }
}

// TODO: add as part of companion class and override with subclasses to create effects for player
unequipCompanion = function(){
    // Remove the first slot, shift names down, append to end.
    basePlayer.companionNames.shift();
    unequippedCompanion = currentPlayer.companionSlots.shift();
    unequippedCompanion.isEquipped = false;
    unequippedCompanion.returnHome();
}