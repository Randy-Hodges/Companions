function event1_3_1(){
    // Dialogue
    var eventDialogueList = [];
    ghost = 'ghostHeadshot';
    text1 = ['Hey, just a quick tip. I would grab this checkpoint if I were you.', ghost];
    for (i = 1; i<=1; i += 1){
        eventDialogueList.push(eval("text" + i));
    }
    
    // Ghost
    grandfather = new GrandfatherNPC(game, 19*tileLength, 47*tileLength, 'grandfather');
    grandfather.flipX();
    game.add.existing(grandfather);

    var endOfDialogueFunction = function(){
        grandfather.leave();
    }

    startDialogue(eventDialogueList, endOfDialogueFunction);
}

function event_bossStart_3_1(){
    game.camera.unfollow();
    game.camera.x = 41.5*tileWidth;
    game.camera.y = 40.5*tileWidth;
    
    slimeBoss = new bossSlime(game, 72*tileWidth, 55*tileWidth);
    game.add.existing(slimeBoss);
    enemyGroup.add(slimeBoss);
    
    var timer = game.time.create(false);
    timer.add(4000, function(){
        currentPlayer.disableMovement = false;
        gates1Shown = true;
    })
    currentPlayer.disableMovement = true;
    timer.start()
}

function event_bossEnd_3_1(){
    gates1Shown = false;
    game.camera.follow(currentPlayer)
}