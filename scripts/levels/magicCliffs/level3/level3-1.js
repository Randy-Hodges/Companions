var slimeBoss
demo.level3_1 =  function(){};
demo.level3_1.prototype = {
    preload: function(){
        loadGameConfigs();
        loadPlayer();
        loadCompanion();
        loadItems();
        loadEnemies();
        loadUI();
        // Tilemap
        game.load.tilemap('level3-1', "assets/tilemaps/Levels/Level 3/level3-1.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Magic_Cliffs16', "assets/tiles/Magic-Cliffs-Environment/PNG/tileset.png");
        game.load.image('nes-color-palette', "assets/tiles/nes-color-palette.jpg");
        // Music
        game.load.audio('backtrack', "assets/audio/music/Defy the Legends.mp3");
        // Events
        game.load.spritesheet('slimeBoss', "assets/sprites/enemies/blue slime/slime-Sheet-white.png", 32, 25);


    },
    create: function(){
        // configs
        createGameConfigs();

        // music
        addMusic('backtrack');

        // spawn points (in units of tiles)
        this.createSpawnPoints();

        // Tilemap creation
        tilemap = game.add.tilemap('level3-1');
        tilemap.addTilesetImage('Magic_Cliffs16','Magic_Cliffs16'); //make sure the tileset name is the same as the tileset name used in Tiled
        tilemap.addTilesetImage('nes-color-palette','nes-color-palette'); 
        tilemap.createLayer('caveBackground');  
        levelTiles = tilemap.createLayer('mainGrass');  // layer name is the same as used in Tiled
        // Collision
        tilemap.setLayer('exclude');
        tilemap.forEach(function(tile){excludeCollision(tile)},1,0,0,tilemap.width,tilemap.height);
        tilemap.setCollisionByExclusion(Object.values(exclusionLayer), true, 'mainGrass');
        setTileProperties();
        // Game borders based on tilemap
        game.world.setBounds(0, 0, tilemap.layer.widthInPixels, tilemap.layer.heightInPixels);
        
        // Warp points
        warp1 = new Warp(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength);
        game.add.existing(warp1);
        warp2 = new Warp(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength, 270);
        game.add.existing(warp2);

        // Coins, Enemies, Player
        addCoins();
        addHearts();
        addEnemiesMC();
        addPlayer();

        // Events
        game.camera.unfollow();
        game.camera.x = 27.5*tileWidth;
        game.camera.y = 39.5*tileWidth;

        slimeBoss = new bossSlime(game, 50*tileWidth, 52*tileWidth);
        game.add.existing(slimeBoss);
        enemyGroup.add(slimeBoss);


        // Front Layer
        tilemap.createLayer('front');
        gates1 = tilemap.createLayer('gates1');

        addUI();

        // Events
        tilemap.setCollisionByExclusion(indexes = [0, -1], collides = true, layer = 'gates1')
        gates1.alpha = 0;
        gates1Shown = true;
        if (!level3Completed) {
            rect1 = new Phaser.Rectangle(4560, 0, 40, 1000); // x0, y0, width, height
            eventTrackingList = [false, false];
        }

    },
    update: function(){
        // Collision
        game.physics.arcade.collide(currentPlayer, levelTiles);
        game.physics.arcade.collide(enemyGroup, levelTiles);
        if (gates1Shown){
            game.physics.arcade.collide(currentPlayer, gates1);
            game.physics.arcade.collide(enemyGroup, gates1);
            gates1.alpha = 1;
        }

        // Warping
        game.physics.arcade.collide(currentPlayer, warp1, function(player, warp){spawn = 1; spawndirection = 1; changeLevel(0,"0");});
        game.physics.arcade.collide(currentPlayer, warp2, function(player, warp){spawn = 1; spawndirection = 1; changeLevel(0,"2-1");});
    },
    render: function(){
        //console.log('rendering');
        // game.debug.body(slimeBoss);
        // game.debug.spriteInfo(currentPlayer);
    },
    createSpawnPoints: function(){
        //SpawnPoints are in units of tiles
        spawnpoint1 = [25, 52]; // 8, 47
        spawnpoint2 = [0, 0];
        if (spawn == 2){
            spawnpoint = spawnpoint2.slice();
            spawnpoint[0] += 6;
        }
        else { // (spawn == 1)
            spawnpoint = spawnpoint1.slice();
            spawnpoint[0] += 7;
        }
        // else{
        //     spawnpoint = spawnpoint2.slice();
            
        // }
    }
};
    