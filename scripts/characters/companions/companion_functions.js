
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

equipCompanion = function(companion){
    // Fill undefined slots if they exist
    for (var i = 0; i < basePlayer.companionNames.length; i += 1){
        if (basePlayer.companionNames[i] == undefined){
            // update player companions
            basePlayer.companionNames[i] = companion.name;
            currentPlayer.companionSlots[i] = companion;
            companion.equip();
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
    // Rotate out a companion and append new companion at the end of equipped companion list
    unequipCompanion();
    basePlayer.companionNames.push(companion.name);
    currentPlayer.companionSlots.push(companion);
    companion.isEquipped = true;
    companion.equip();
    updateEquippedCompanionFollowObjects();
    // console.log('Companion Slot 1:', currentPlayer.companionSlots[0].name, '| Companion Slot 2:', currentPlayer.companionSlots[1].name);
}

// TODO: add as part of companion class and override with subclasses to create effects for player
unequipCompanion = function(){
    // Remove the first slot, shift names down, append to end.
    basePlayer.companionNames.shift();
    unequippedCompanion = currentPlayer.companionSlots.shift();
    unequippedCompanion.isEquipped = false;
    unequippedCompanion.unequip();
    unequippedCompanion.returnHome();
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

