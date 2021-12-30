demo.level1_1 = function(){};
demo.level1_1.prototype = {
    preload: function(){
        loadAssetsMC();
        game.load.tilemap('level1-1', "assets/tilemaps/Levels/level 1/level1-1.json", null, Phaser.Tilemap.TILED_JSON);
    },
    create: function(){
        // configs
        createGameConfigs();

        //spawn points
        this.createSpawnPoints();

        addTilemapMC("level1-1");

        // Warp points
        warp1 = new Warp(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength);
        warp2 = new Warp(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength);

        // Coins, Enemies, Player
        addCoins();
        addHearts();
        addEnemiesMC();
        addPlayer();
        
        // Tilemap Infront
        tilemap.createLayer('front');

        addUI();
    },
    update: function(){
        // Collision
        game.physics.arcade.collide(currentPlayer, levelTiles);
        game.physics.arcade.collide(enemyGroup, levelTiles);

        // Warping
        game.physics.arcade.overlap(currentPlayer, warp1, function(){transitionLevel('1-0', false, spawnVal = 2);});
        game.physics.arcade.overlap(currentPlayer, warp2, function(){transitionLevel('1-2');});
    },
    render: function(){
        //console.log('rendering');
        //game.debug.body(player);
        //game.debug.spriteInfo(player);
    },
    createSpawnPoints: function(){
        spawnpoint2 = [70,13];
        spawnpoint1 = [10,13];
        if (spawn == 1){
            spawnpoint = spawnpoint1.slice();
            spawnpoint[0] += 2;
            spawndirection = 1;
        }
        if (spawn == 2){
            spawnpoint = spawnpoint2.slice();
            spawnpoint[0] -= 2; // Don't spawn in on warp point
            spawndirection = -1;
        }
    }
};

