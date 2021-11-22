
function createGameConfigs(){
    // configs
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = globalGravity;
    game.stage.backgroundColor = 'aeffee';
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
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
        backtrack = game.add.audio(music);
        backtrack.play();
        backtrack.volume = vol;
        addedAudio = true;
    }
}

function removeMusic(music = backtrack){
    music.destroy(); 
    addedAudio = false; 
}

function addUI(){
    // Money - Coins
    moneyText2 = game.add.text(9,27,"Coins: "  + money, { fontSize: '18px', fill: '#000' });
    moneyText2.fixedToCamera = true;
    
    moneyText = game.add.text(8,26,"Coins: " + money, { fontSize: '18px', fill: '#fff' });
    moneyText.fixedToCamera = true;
    
    // Hearts
    heartText = game.add.text(8,8,"Hearts: ", { fontSize: '18px', fill: '#fff' });
    heartText.setShadow(1,1);
    heartText.fixedToCamera = true;
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
    pauseLabel = game.add.text(gameWidth-20, 40,"Enter", { fontSize: '12px', fill: '#fff' });
    pauseLabel.setShadow(1,1)
    pauseLabel.anchor.setTo(0.5, 0.5);
    pauseLabel.fixedToCamera = true;

    addKeyCallback(Phaser.Keyboard.ENTER, pause);
}