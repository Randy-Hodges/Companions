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
    backtrack.fadeOut(1000);
    // Camera
    game.camera.unfollow();
    var tween = game.add.tween(game.camera);
    tween.to({ x: 40.5*tileWidth, y: 40.5*tileWidth}, 1000, 'Linear', true, 0);
    // game.camera.x = 40.5*tileWidth;
    // game.camera.y = 40.5*tileWidth;
    
    // Add boss
    slimeBoss = new bossSlime(game, 72*tileWidth, 55*tileWidth);
    game.add.existing(slimeBoss);
    enemyGroup.add(slimeBoss);
    
    // Entrance
    var timer = game.time.create(false);
    timer.add(3000, function(){
        gates1Shown = true;
        bossMusic = game.add.audio('bossFight');
        bossMusic.volume = .1;
        bossMusic.fadeIn(1000);
        game.camera.shake(.04, 1500);
        var timer2 = game.time.create(false);
        timer2.add(1500, function(){
            currentPlayer.disableMovement = false;
        })
        timer2.start();
    })
    currentPlayer.disableMovement = true;
    timer.start();
}

function event_bossEnd_3_1(){
    gates1Shown = false;
    cameraIsTweening = true;
    bossMusic.fadeOut(500);
    backtrack.fadeIn(1000);
}