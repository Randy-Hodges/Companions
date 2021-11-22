// For dialogue, push [text, spritesheet Id] into dialogueList for each piece of dialogue
// you want to run. Then run startDialogue()
function event1_1_0(){
    // Dialogue
    var eventDialogueList = [];
    player = 'playerHeadshot';
    ghost = 'ghostHeadshot';
    text1 = ['Oh hey there, you might be wondering where you are.', ghost];
    text2 = ["You just woke up in Rocky Pass. I suppose I should introduce myself. I am your " + 
                "late GRANDFATHER. This world is full of interesting creatures " + 
                "and fun ways to die. ", ghost]; 
    text3 = ["..You should probably try to not die though. I wouldn't want you to end up like me.", ghost];
    text4 = ["Anyways, I have here in my notes that you should USE THE ARROW KEYS TO MOVE and UP ARROW TO JUMP." , ghost];
    text5 = ["Whatever that means...", ghost];
    for (i = 1; i<=5; i += 1){
        eventDialogueList.push(eval("text" + i));
    }
    
    // Ghost
    if (typeof grandfather !== 'undefined'){
        grandfather.leave();
    }
    grandfather = new GrandfatherNPC(game, 438, 520, 'grandfather');
    game.add.existing(grandfather);

    var endOfDialogueFunction = function(){
        grandfather.leave();
    }

    startDialogue(eventDialogueList, endOfDialogueFunction);
}

function event2_1_0(){
    // Dialogue
    var eventDialogueList = [];
    player = 'playerHeadshot';
    ghost = 'ghostHeadshot';
    text1 = ['This is an enemy. I have here in my notes that you PRESS SPACEBAR TO SLASH ATTACK. ', ghost];
    text2 = ['Might be worth a try.', ghost];
    for (i = 1; i<=2; i += 1){
        eventDialogueList.push(eval("text" + i));
    }
    
    // Ghost
    if (typeof grandfather !== 'undefined'){
        grandfather.leave();
    }
    grandfather = new GrandfatherNPC(game, 1000, 455, 'grandfather');
    grandfather.flipX();
    game.add.existing(grandfather);

    var endOfDialogueFunction = function(){
        grandfather.leave();
        grandfather = new GrandfatherNPC(game, 62*tileLength, 29*tileLength, 'grandfather');
        grandfather.flipX();
        grandfather.setIdle();
        grandfather.setDialogue([['I have here in my notes that you PRESS SPACEBAR TO SLASH ATTACK.', 'ghostHeadshot']])    
        game.add.existing(grandfather);
    }
    
    startDialogue(eventDialogueList, endOfDialogueFunction);
}

function event3_1_2(){
    // Dialogue
    var eventDialogueList = [];
    player = 'playerHeadshot';
    ghost = 'ghostHeadshot';
    text1 = ['I have a lot of hope for you. I think there is a lot of potential in you.', ghost];
    for (i = 1; i<=1; i += 1){
        eventDialogueList.push(eval("text" + i));
    }
    
    // Ghost
    if (typeof grandfather !== 'undefined'){
        grandfather.leave();
    }
    grandfather = new GrandfatherNPC(game, 380, 160, 'grandfather');
    game.add.existing(grandfather);

    var endOfDialogueFunction = function(){
        grandfather.leave();
    }

    startDialogue(eventDialogueList, endOfDialogueFunction);
}

function event4_1_2(){
    // Dialogue
    var eventDialogueList = [];
    player = 'playerHeadshot';
    ghost = 'ghostHeadshot';
    text1 = ['Hey look, a companion. Go ahead and free it from '+
                'that cage.', ghost];
    for (i = 1; i<=1; i += 1){
        eventDialogueList.push(eval("text" + i));
    }
    
    // Ghost
    if (typeof grandfather !== 'undefined'){
        grandfather.leave();
    }
    grandfather = new GrandfatherNPC(game, 1500, 380, 'grandfather');
    grandfather.flipX()
    game.add.existing(grandfather);

    var endOfDialogueFunction = function(){
        grandfather.leave();
    }

    startDialogue(eventDialogueList, endOfDialogueFunction);
}