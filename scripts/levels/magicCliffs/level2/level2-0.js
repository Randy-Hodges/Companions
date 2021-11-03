
demo.level2_0 =  function(){};
demo.level2_0.prototype = {
    preload: function(){
        loadGameConfigs();
        loadPlayer();
        loadCompanion();
        loadItems();
        loadEnemies();
        loadUI();
        game.load.tilemap('level2-0', "assets/tilemaps/Levels/Level 2/level2-0.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Magic_Cliffs16', "assets/tiles/Magic-Cliffs-Environment/PNG/tileset.png");
        game.load.image('nes-color-palette', "assets/tiles/nes-color-palette.jpg");

        game.load.audio('backtrack', "assets/audio/music/Waterfall Cave.mp3");

    },
    create: function(){
        // configs
        createGameConfigs();

        // music
        if (!addedAudio){
            backtrack = game.add.audio('backtrack');
            backtrack.play();
            backtrack.volume = .1;
            addedAudio = true;
        }

        // sound effects
        coinCollect = game.add.audio('coin collect');
        coinCollect.volume = .5;

        //spawn points (in units of tiles)
        this.createSpawnPoints();

        // Tilemap behind
        var map = game.add.tilemap('level2-0');
        map.addTilesetImage('Magic_Cliffs16','Magic_Cliffs16'); //make sure the tileset name is the same as the tileset name used in Tiled
        map.addTilesetImage('nes-color-palette','nes-color-palette'); //make sure the tileset name is the same as the tileset name used in Tiled
        map.createLayer('caveBackground');  
        levelTiles = map.createLayer('mainGrass');  // layer name is the same as used in Tiled
        // Collision
        map.setLayer('exclude');
        map.forEach(function(tile){excludeCollision(tile)},1,0,0,map.width,map.height);
        // console.log(Object.values(exclusionLayer))
        map.setCollisionByExclusion(Object.values(exclusionLayer), true, 'mainGrass');
        // Game borders based on tilemap
        game.world.setBounds(0, 0, map.layer.widthInPixels, map.layer.heightInPixels);

        createGroups();
        
        // Warp points
        warp1 = new Warp(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength);
        warp2 = new Warp(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength, 90);
        game.add.existing(warp1);
        game.add.existing(warp2);

        // Coins
        coinGroup = game.add.group();
        map.setLayer('coins');
        map.forEach(function(tile){addCoinFromTilemap(tile)},1,0,0,map.width,map.height);

        // Enemies
        enemyGroup = game.add.group();
        map.setLayer('enemies');
        map.forEach(function(tile){addEnemyFromTilemap(tile)},1,0,0,map.width,map.height);
        

        // Player init
        currentPlayer = new Player(game, spawnpoint[0]*tileLength, spawnpoint[1]*tileLength);
        game.add.existing(currentPlayer);
        game.camera.follow(currentPlayer);

        // Tilemap Infront
        map.createLayer('front');

        // Money - Coins
        moneyText = game.add.text(8,26,"Coins: " + money, { fontSize: '18px', fill: '#fff' });
        moneyText.fixedToCamera = true;
        
        // Hearts
        heartText = game.add.text(8,8,"Hearts: ", { fontSize: '18px', fill: '#fff' });
        heartText.fixedToCamera = true;
        createHearts(basePlayer.currentHearts);
        
        // Pause Menu
        loadPauseMenu();

        // Companions
        createCompanion();
    },
    update: function(){
        // Collision
        game.physics.arcade.collide(currentPlayer, levelTiles);
        game.physics.arcade.collide(enemyGroup, levelTiles);
        game.physics.arcade.overlap(currentPlayer, coinGroup, function(player, coin){coin.kill(); coinCollect.play(); money+=1; updateMoney();});
        game.physics.arcade.overlap(currentPlayer, heartGroup, function(player, heart){heart.kill(); healHearts(1); /*heartCollect.play();*/});

        // Warping
        game.physics.arcade.collide(currentPlayer, warp1, function(player, warp){spawn = 1; spawndirection = 1; changeLevel(0,"0");});
        game.physics.arcade.collide(currentPlayer, warp2, function(player, warp){spawn = 1; spawndirection = 1; changeLevel(0,"2-1");});
        updateMoney();
    },
    render: function(){
        //console.log('rendering');
        // game.debug.body(currentPlayer);
        //game.debug.spriteInfo(player);
    },
    createSpawnPoints: function(){
        //SpawnPoints are in units of tiles
        spawnpoint1 = [4, 44];
        spawnpoint2 = [123.5, 1];
        if (spawn == 2){
            spawnpoint = spawnpoint2.slice();
            spawnpoint[0] += 2;
        }
        else { // (spawn == 1)
            spawnpoint = spawnpoint1.slice();
            spawnpoint[0] += 2;
        }
        // else{
        //     spawnpoint = spawnpoint2.slice();
            
        // }
    }
};
    