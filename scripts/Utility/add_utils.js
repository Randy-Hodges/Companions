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

function addMusic(music = 'backtrack'){
    if (!addedAudio){
        backtrack = game.add.audio(music);
        backtrack.play();
        backtrack.volume = .1;
        addedAudio = true;
    }
}

function addUI(){
    // Money - Coins
    moneyText = game.add.text(8,26,"Coins: " + money, { fontSize: '18px', fill: '#fff' });
    moneyText.fixedToCamera = true;
    
    // Hearts
    heartText = game.add.text(8,8,"Hearts: ", { fontSize: '18px', fill: '#fff' });
    heartText.fixedToCamera = true;
    createHearts(basePlayer.currentHearts);
    
    // Pause Menu
    addPauseMenu();
}