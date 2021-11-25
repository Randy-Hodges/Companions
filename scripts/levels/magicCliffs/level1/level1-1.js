demo.level1_1 = function(){};
demo.level1_1.prototype = {
    preload: function(){
        loadGameConfigs();
        loadPlayer();
        loadCompanion();
        loadItems();
        loadEnemies();
        loadUI();
        game.load.tilemap('level1-1', "assets/tilemaps/Levels/level 1/level1-1.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Magic_Cliffs16', "assets/tiles/Magic-Cliffs-Environment/PNG/tileset.png");
        game.load.image('nes-color-palette', "assets/tiles/nes-color-palette.jpg");

    },
    create: function(){
        // configs
        createGameConfigs();

        //spawn points
        this.createSpawnPoints();

        // Tilemap behind
        tilemap = game.add.tilemap('level1-1');
        tilemap.addTilesetImage('Magic_Cliffs16','Magic_Cliffs16'); //make sure the tileset name is the same as the tileset name used in Tiled
        tilemap.addTilesetImage('Magic_Cliffs16_2','Magic_Cliffs16'); 
        tilemap.addTilesetImage('nes-color-palette','nes-color-palette'); //make sure the tileset name is the same as the tileset name used in Tiled
        tilemap.createLayer('caveBackground');  
        levelTiles = tilemap.createLayer('mainGrass');  // layer name is the same as used in Tiled
        tilemap.setCollisionByExclusion(magicCliffsNoCollide, true, 'mainGrass');
        // Game borders based on tilemap
        game.world.setBounds(0, 0, tilemap.layer.widthInPixels, tilemap.layer.heightInPixels);

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
        game.physics.arcade.collide(currentPlayer, warp1, function(){transitionLevel('1-0', false, spawnVal = 2);});
        game.physics.arcade.collide(currentPlayer, warp2, function(){transitionLevel('1-2');});
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

