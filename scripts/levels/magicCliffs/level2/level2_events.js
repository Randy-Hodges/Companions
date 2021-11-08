function event1_2_1(){
    // Dialogue
    var eventDialogueList = [];
    ghost = 'ghostHeadshot';
    text1 = ['Hey after you equip that frog you will have the ability to Dash. Press \'A\' to dash', ghost];
    for (i = 1; i<=1; i += 1){
        eventDialogueList.push(eval("text" + i));
    }
    
    // Ghost
    grandfather = new GrandfatherNPC(game, 4500, 29*tileLength, 'grandfather');
    grandfather.flipX();
    game.add.existing(grandfather);

    var endOfDialogueFunction = function(){
        grandfather.leave();
    }

    startDialogue(eventDialogueList, endOfDialogueFunction);
}