
demo.level1 =  function(){};
demo.level1.prototype = {
    preload: function(){
        loadGameConfigs();
        loadPlayer();
        loadCompanion();
        loadItems();
        loadEnemies();
        loadUI();
        
        // Level Specific
        game.load.tilemap('level1-0', "assets/tilemaps/Levels/level 1/level1-0.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Magic_Cliffs16', "assets/tiles/Magic-Cliffs-Environment/PNG/tileset.png");
        game.load.image('nes-color-palette', "assets/tiles/nes-color-palette.jpg");
        game.load.audio('backtrack', "assets/audio/music/Blizzard Island.mp3");
        
        // Event Specific
        loadHeadshots();
        game.load.spritesheet('grandfather', "assets/sprites/enemies/Plague Doctor/plague_doctor_sheet.png", 64, 64)

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

        // Spawn points
        this.createSpawnPoints();

        // Tilemap behind
        var map = game.add.tilemap('level1-0');
        map.addTilesetImage('Magic_Cliffs16','Magic_Cliffs16'); //make sure the tileset name is the same as the tileset name used in Tiled
        map.addTilesetImage('Magic_Cliffs16_2','Magic_Cliffs16'); //make sure the tileset name is the same as the tileset name used in Tiled
        map.addTilesetImage('nes-color-palette','nes-color-palette'); //make sure the tileset name is the same as the tileset name used in Tiled
        map.createLayer('caveBackground');  
        levelTiles = map.createLayer('mainGrass');  // layer name is the same as used in Tiled
        map.setCollisionByExclusion(magicCliffsNoCollide, true, 'mainGrass');
        // Game borders based on tilemap
        game.world.setBounds(0, 0, map.layer.widthInPixels, map.layer.heightInPixels);
        
        createGroups();

        // // Coins
        // coin_group = game.add.group();
        coin_positions = [[30,35],[185,19],[202,9],[116,18],[14,16]] // in units of tiles
        coin_positions.forEach(coin_pos => {
            coin = new Coin(game, coin_pos[0]*tileLength, coin_pos[1]*tileLength);
            game.add.existing(coin);
            coinGroup.add(coin);
        });

        // Enemies
        map.setLayer('enemies');
        map.forEach(function(tile){addEnemyFromTilemap(tile)},1,0,0,map.width,map.height);
        
        // Warp points (doing it with coins that aren't physically loaded in the game)
        warp1 = new Warp(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength, 1, 2);
        warp2 = new Warp(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength, 1, 2);

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
        createHearts(currentPlayer.currentHearts);
        
        // Pause Menu
        loadPauseMenu();
        
        // Companions
        createCompanion();
        
        // Only start intro scene if level 1 is not completed
        if (!level1Completed) {
            rect1 = new Phaser.Rectangle(1050, 0, 40, 540); // x0, y0, x1, y1
            event1_1_0();  
            eventTrackingList = [true, false, false];
        }   
    },
    update: function(){
        // Collision
        game.physics.arcade.collide(currentPlayer, levelTiles);
        game.physics.arcade.collide(enemyGroup, levelTiles);
        game.physics.arcade.overlap(currentPlayer, coinGroup, function(player, coin){coin.kill(); coinCollect.play(); money+=1; updateMoney();});
        game.physics.arcade.overlap(currentPlayer, heartGroup, function(player, heart){heart.kill(); healHearts(1); /*heartCollect.play();*/});

        // Events
        this.collideEvents();

        // Warping
        //game.physics.arcade.collide(currentPlayer, warp1, function(player, coin){spawn = 1; spawndirection = 1; console.log(currentPlayer); changeLevel(0,"1_1");});
        game.physics.arcade.collide(currentPlayer, warp2, function(player, coin, backtrack){spawn = 2; spawndirection = -1; changeLevel(0,"1-1");});
        
        // Level 0 Warp Test
        game.physics.arcade.collide(currentPlayer, warp1, function(player, coin){backtrack.destroy(); addedAudio = false; spawn = 1; spawndirection = 1; console.log(currentPlayer); changeLevel(0,"0");});
    },
    render: function(){
    //    game.debug.body(currentPlayer.slash);
        game.debug.spriteInfo(currentPlayer);
        // game.debug.geom(rect1, 'rgb(0,0,0)');
    },
    createSpawnPoints: function(){
        spawnpoint0 = [25, 35]
        spawnpoint1 = [0,6];
        spawnpoint2 = [229,12];
        if (spawn == 0){
            spawnpoint = spawnpoint0.slice();
        }
        if (spawn == 2){
            spawnpoint = spawnpoint1.slice();
            spawnpoint[0] += 2;
        }
        if (spawn == 1){
            spawnpoint = spawnpoint2.slice();
            spawnpoint[0] -= 2;
        }
    },
    collideEvents: function(){
        if (!level1Completed){
            if (eventTrackingList[1] == false){
                if(rect1.intersects(currentPlayer.body)){
                    console.log('woooo')
                    event2_1_0();
                    eventTrackingList[1] = true;
                }
                // game.physics.arcade.overlap(currentPlayer, line1, function(){console.log('yo'); event2_1_0();});
            }
        }
    }
};



