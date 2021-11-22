function event1_village(){
    // Dialogue
    var eventDialogueList = [];
    ghost = 'ghostHeadshot';
    text1 = ['This is the village. You can call it home for now.', ghost];
    text2 = ['Here you will be able to spend coins, heal up, visit your saved companions, and meet towns folk.', ghost]
    for (i = 1; i<=2; i += 1){
        eventDialogueList.push(eval("text" + i));
    }
    
    // Ghost
    if (typeof grandfather !== 'undefined'){
        grandfather.leave();
    }
    grandfather = new GrandfatherNPC(game, 52*tileLength, 15*tileLength, 'grandfather');
    grandfather.flipX();
    game.add.existing(grandfather);

    var endOfDialogueFunction = function(){
        grandfather.leave();
    }

    startDialogue(eventDialogueList, endOfDialogueFunction);
}