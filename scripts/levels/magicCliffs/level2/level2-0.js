
demo.level2_0 =  function(){};
demo.level2_0.prototype = {
    preload: function(){
        loadAssetsMC();
        // Tilemap
        game.load.tilemap('level2-0', "assets/tilemaps/Levels/Level 2/level2-0.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Magic_Cliffs16', "assets/tiles/Magic-Cliffs-Environment/PNG/tileset.png");
        game.load.image('nes-color-palette', "assets/tiles/nes-color-palette.jpg");
        // Music
        game.load.audio('backtrack', "assets/audio/music/Waterfall Cave.mp3");

    },
    create: function(){
        createGameConfigs();
        addMusic('backtrack');

        // spawn points (in units of tiles)
        this.createSpawnPoints();

        // Tilemap
        addTilemapMC('level2-0');
        
        // Warp points
        warp1 = new Warp(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength);
        warp2 = new Warp(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength, 270);

        // Coins, Enemies, Player
        addCoins();
        addHearts();
        addEnemiesMC();
        addPlayer();

        // Front
        tilemap.createLayer('front');

        addUI();

        this.setUpHiddens();
    },
    update: function(){
        // Collision
        game.physics.arcade.collide(currentPlayer, levelTiles);
        game.physics.arcade.collide(enemyGroup, levelTiles);

        // Warping
        game.physics.arcade.overlap(currentPlayer, warp1, function(){transitionLevel('0', newLevel = true)});
        game.physics.arcade.overlap(currentPlayer, warp2, function(){transitionLevel('2-1')});

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
        spawnpoint1 = [4, 44];
        spawnpoint2 = [119, 2];
        if (spawn == 2){
            spawndirection = -1;
            spawnpoint = spawnpoint2.slice();
            spawnpoint[0] += 2;
        }
        else { // (spawn == 1)
            spawndirection = 1;
            spawnpoint = spawnpoint1.slice();
            spawnpoint[0] += 2;
        }
    },
    setUpHiddens: function(){
        smallBell = game.add.audio('small bell');
        smallBell.volume = .1;
        if (hiddens20[0]){
            hidden1Layer = tilemap.createLayer('hidden1');
            hiddenRect1 = new Phaser.Rectangle(81*tileLength, 23*tileLength, 2*tileLength, 2*tileLength); // x0, y0, width, height
        }
    },
    checkHiddens: function(){
        if (hiddens20[0]){
            if (hiddenRect1.intersects(currentPlayer.body)){
                hiddens20[0] = false;
                hidden1Layer.alpha = 0;
                smallBell.play();
            }
        }
    }
};
    