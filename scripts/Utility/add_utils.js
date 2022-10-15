
function createGameConfigs(){
    // configs
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = globalGravity;
    game.stage.backgroundColor = '000000';
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.camera.resetFX();
    // Adding Reset Button
    resetEnabled = true;
    resetButton = game.input.keyboard.addKey(Phaser.Keyboard.H);
    resetButton.onDown.add(function () {
        if (resetEnabled) {
            transitionLevel('0', newLevel = true);
        }
    })
    fadeIn();
}

function addCoins(){
    // Coins
    coinGroup = game.add.group();
    tilemap.setLayer('coins');
    tilemap.forEach(function(tile){addCoinFromTilemap(tile)},1,0,0,tilemap.width,tilemap.height);
}

function addCoinFromTilemap(tile){
    if (tile.index != 0 && tile.index != -1){
        coin = new Coin(game, tile.x*tileLength, tile.y*tileLength,'coin');
        game.add.existing(coin);
        coinGroup.add(coin);
    }
}

function addGoldHeart(x, y){
    goldHeartGroup = game.add.group();
    goldenHeart = new GoldenHeart(game, x*tileLength, y*tileLength);
    game.add.existing(goldenHeart);
    goldHeartGroup.add(goldenHeart);
}

function addHearts(){
    // Hearts
    heartGroup = game.add.group();
    tilemap.setLayer('hearts');
    tilemap.forEach(function(tile){addHeartFromTilemap(tile)},1,0,0,tilemap.width,tilemap.height);
}

function addHeartFromTilemap(tile){
    if (tile.index != 0 && tile.index != -1){
        heart = new Medi(game, tile.x*tileLength, tile.y*tileLength);
        game.add.existing(heart);
        heartGroup.add(heart);
    }
}

function addPlayer(){
    currentPlayer = new Player(game, spawnpoint[0]*tileLength, spawnpoint[1]*tileLength);
    game.add.existing(currentPlayer);
    game.camera.follow(currentPlayer);
}

function addMusic(music = 'backtrack', vol = .1){
    if (!addedAudio){
        this.backtrack = game.add.audio(music, vol, true);
        this.backtrack.play();
        addedAudio = true;
    }
}

function removeMusic(music = this.backtrack){
    this.backtrack.stop();
    this.backtrack.destroy()
    music.destroy(); 
    addedAudio = false; 
}

function addUI(){
    // Money - Coins
    moneyText2 = game.add.text(9,27,"Coins: "  + basePlayer.money, { fontSize: '18px', fill: '#000' });
    moneyText2.fixedToCamera = true;
    
    moneyText = game.add.text(8,26,"Coins: " + basePlayer.money, { fontSize: '18px', fill: '#fff' });
    moneyText.fixedToCamera = true;
    
    // Hearts
    heartText = "Hearts: ";
    textOverlap(8, 8, heartText);
    createHearts(basePlayer.currentHearts);
    // Pause Menu
    addPauseMenu();
}

function addPauseMenu(){
    // Create a label to use as a button
    pause_button = game.add.sprite(gameWidth-20, 20, 'Gear_LightBlue');
    pause_button.anchor.setTo(0.5, 0.5);
    pause_button.fixedToCamera = true;
    pause_button.inputEnabled = true;

    // Text under button
    style_button = { fontSize: '11px', fill: '#000' };
    overlap_button = { fontSize: '11px', fill: '#fff' };
    pauseLabelText = "Enter";
    textOverlap(gameWidth - 34, 34, pauseLabelText, style_button, overlap_button);

    addKeyCallback(Phaser.Keyboard.ENTER, pause);

    // Sound
    pauseSound = game.add.audio('pause sound');
    pauseSound.volume = .3;
    unpauseSound = game.add.audio('unpause sound');
    unpauseSound.volume = .3;
}