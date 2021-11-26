
demo.level2_0 =  function(){};
demo.level2_0.prototype = {
    preload: function(){
        loadGameConfigs();
        loadPlayer();
        loadCompanion();
        loadItems();
        loadEnemies();
        loadUI();
        // Tilemap
        game.load.tilemap('level2-0', "assets/tilemaps/Levels/Level 2/level2-0.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Magic_Cliffs16', "assets/tiles/Magic-Cliffs-Environment/PNG/tileset.png");
        game.load.image('nes-color-palette', "assets/tiles/nes-color-palette.jpg");
        // Music
        game.load.audio('backtrack', "assets/audio/music/Waterfall Cave.mp3");

    },
    create: function(){
        // configs
        createGameConfigs();

        // music
        addMusic('backtrack');

        // spawn points (in units of tiles)
        this.createSpawnPoints();

        // Most of the Tilemap
        addTilemapMC('level2-0');
        
        // Warp points
        warp1 = new Warp(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength);
        warp2 = new Warp(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength, 270);

        // Coins, Enemies, Player
        addCoins();
        addHearts();
        addEnemiesMC();
        addPlayer();

        // Front Layer
        tilemap.createLayer('front');

        addUI();
    },
    update: function(){
        // Collision
        game.physics.arcade.collide(currentPlayer, levelTiles);
        game.physics.arcade.collide(enemyGroup, levelTiles);

        // Warping
        game.physics.arcade.overlap(currentPlayer, warp1, function(){transitionLevel('0', newLevel = true)});
        game.physics.arcade.overlap(currentPlayer, warp2, function(){transitionLevel('2-1')});
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
        // else{
        //     spawnpoint = spawnpoint2.slice();
            
        // }
    }
};
    