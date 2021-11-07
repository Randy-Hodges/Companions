function event2_2_1(){
    // Dialogue
    var eventDialogueList = [];
    ghost = 'ghostHeadshot';
    text1 = ['Oh hey there, you might be wondering where you are.', ghost];
    text2 = ["You just woke up in [Place]. I suppose I should introduce myself. I am your " + 
                "late GRANDFATHER. This world is full of interesting creatures " + 
                "and fun ways to die. ..You should probably try to not die though. I wouldn't want you to end up " + 
                "like me. Anyways, I have here in my notes that you should " +
                "USE THE ARROW KEYS TO MOVE and UP ARROW TO JUMP." , ghost]
    text3 = ["Whatever that means...", ghost];
    for (i = 1; i<=3; i += 1){
        eventDialogueList.push(eval("text" + i));
    }
    
    // Ghost
    grandfather = new GrandfatherNPC(game, 438, 520, 'grandfather');
    game.add.existing(grandfather);

    var endOfDialogueFunction = function(){
        grandfather.leave();
    }

    startDialogue(eventDialogueList, endOfDialogueFunction);
}