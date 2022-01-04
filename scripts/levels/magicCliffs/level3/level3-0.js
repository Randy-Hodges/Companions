
demo.level3_0 =  function(){};
demo.level3_0.prototype = {
    preload: function(){
        loadAssetsMC();
        
        // Music
    },
    create: function(){
        // configs
        createGameConfigs();

        // music
        addMusic('mysterious dungeon music', .2);

        // spawn points (in units of tiles)
        this.createSpawnPoints();

        // Tilemap (Most parts)
        addTilemapMC('level3-0');
        
        // Warp points
        warp1 = new Warp(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength);
        game.add.existing(warp1);
        warp2 = new Warp(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength);
        game.add.existing(warp2);

        // Coins, Enemies, Player
        addCoins();
        addHearts();
        addEnemiesMC();
        addPlayer();

        // Front Layer
        tilemap.createLayer('front');

        addUI();

        // Events
        this.setUpHiddens();
    },
    update: function(){
        // Collision
        game.physics.arcade.collide(currentPlayer, levelTiles);
        game.physics.arcade.collide(enemyGroup, levelTiles);

        // Warping
        game.physics.arcade.overlap(currentPlayer, warp1, function(){transitionLevel('0', newLevel = true)});
        game.physics.arcade.overlap(currentPlayer, warp2, function(){transitionLevel('3-1')});

        // Events
        this.checkHiddens();
    },
    render: function(){
        //console.log('rendering');
        // game.debug.body(currentPlayer.slash);
        // game.debug.spriteInfo(currentPlayer);
    },
    createSpawnPoints: function(){
        //SpawnPoints are in units of tiles
        spawnpoint1 = [78, 55];
        spawnpoint2 = [444, 40];
        if (spawn == 2){
            spawnpoint = spawnpoint2.slice();
            spawnpoint[0] -= 2;
            spawndirection = -1;
        }
        else { // (spawn == 1)
            spawnpoint = spawnpoint1.slice();
            spawnpoint[0] += 2;
            spawndirection = 1;
        }
    },
    setUpHiddens: function(){
        smallBell = game.add.audio('small bell');
        smallBell.volume = .1;
        if (hiddens30[0]){
            hidden1Layer = tilemap.createLayer('hidden1');
            hiddenRect1 = new Phaser.Rectangle(325*tileLength, 50*tileLength, 2*tileLength, 2*tileLength); // x0, y0, width, height
        }
        if (hiddens30[1]){
            hidden2Layer = tilemap.createLayer('hidden2');
            hiddenRect2 = new Phaser.Rectangle(331*tileLength, 67*tileLength, 2*tileLength, 2*tileLength); // x0, y0, width, height
        }
    },
    checkHiddens: function(){
        if (hiddens30[0]){
            if (hiddenRect1.intersects(currentPlayer.body)){
                hiddens30[0] = false;
                hidden1Layer.alpha = 0;
                smallBell.play();
            }
        }
        if (hiddens30[1]){
            if (hiddenRect2.intersects(currentPlayer.body)){
                hiddens30[1] = false;
                hidden2Layer.alpha = 0;
                smallBell.play();
            }
        }
    }
};
    