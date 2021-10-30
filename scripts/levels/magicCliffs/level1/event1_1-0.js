// For dialogue, push [text, spritesheet Id] into dialogueList for each piece of dialogue
// you want to run. Then run startDialogue()
function event1_1_0(){
    player = 'playerHeadshot';
    ghost = 'ghostHeadshot';
    text1 = ['W- Wha- ... Where am I?', player];
    text2 = ['Oh hey there, you might be wondering where you are.', ghost];
    text3 = ["You just woke up in [Place]. I suppose I should introduce myself. I am your " + 
                "late GRANDFATHER. This world is full of interesting creatures " + 
                "and fun ways to die. ..You should probably try to not die though. I wouldn't want you to end up " + 
                "like me. Anyways, good luck!", ghost];
    text4 = ["(..)", player];
    for (i = 1; i<5; i += 1){
        dialogueList.push(eval("text" + i));
    }
    startDialogue();
}