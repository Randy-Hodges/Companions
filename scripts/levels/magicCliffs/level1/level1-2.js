
demo.level1_2 = function () { };
demo.level1_2.prototype = {
    preload: function () {
        loadGameConfigs();
        loadPlayer();
        loadCompanion();
        loadItems();
        loadEnemies();
        loadUI();
        game.load.tilemap('level1-2', "assets/tilemaps/Levels/level 1/level1-2.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Magic_Cliffs16', "assets/tiles/Magic-Cliffs-Environment/PNG/tileset.png");
        game.load.image('nes-color-palette', "assets/tiles/nes-color-palette.jpg");

        // Event Specific
        loadHeadshots();
        game.load.spritesheet('grandfather', "assets/sprites/enemies/Plague Doctor/plague_doctor_sheet.png", 64, 64);

    },
    create: function () {
        // configs
        createGameConfigs();

        // sound effects
        coinCollect = game.add.audio('coin collect');
        coinCollect.volume = .5;

        //spawn points (in tiles)
        this.createSpawnPoints();

        // Tilemap behind
        var map = game.add.tilemap('level1-2');
        map.addTilesetImage('Magic_Cliffs16', 'Magic_Cliffs16'); //make sure the tileset name is the same as the tileset name used in Tiled
        map.addTilesetImage('Magic_Cliffs16_2', 'Magic_Cliffs16');
        map.addTilesetImage('Magic_Cliffs16_3', 'Magic_Cliffs16');
        map.addTilesetImage('nes-color-palette', 'nes-color-palette'); //make sure the tileset name is the same as the tileset name used in Tiled
        map.createLayer('caveBackground');
        levelTiles = map.createLayer('mainGrass');  // layer name is the same as used in Tiled
        map.setCollisionByExclusion(magicCliffsNoCollide, true, 'mainGrass');
        // Game borders based on tilemap
        game.world.setBounds(0, 0, map.layer.widthInPixels, map.layer.heightInPixels);

        // Player init
        currentPlayer = new Player(game, spawnpoint[0] * tileLength, spawnpoint[1] * tileLength);
        game.add.existing(currentPlayer);
        game.camera.follow(currentPlayer);

        // Coins


        // Warp points (doing it with coins bc I'm pressed for time)
        warp1 = new Warp(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength, 1, 2);
        warp2 = new Warp(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength, 1, 2);
        game.add.existing(warp2);

        // Enemies
        enemyGroup = game.add.group();
        map.setLayer('enemies');
        map.forEach(function (tile) { addEnemyFromTilemap(tile) }, 1, 0, 0, map.width, map.height);

        // Tilemap Infront
        map.createLayer('front');

        // Money - Coins
        moneyText = game.add.text(8, 26, "Coins: " + money, { fontSize: '18px', fill: '#fff' });
        moneyText.fixedToCamera = true;

        // Hearts
        heartText = game.add.text(8, 8, "Hearts: ", { fontSize: '18px', fill: '#fff' });
        heartText.fixedToCamera = true;
        createHearts(basePlayer.currentHearts);

        // Pause Menu
        loadPauseMenu();

        // Events
        if (!level1Completed) {
            rect1 = new Phaser.Rectangle(310, 0, 40, 1000); // x0, y0, x1, y1
            rect2 = new Phaser.Rectangle(1560, 0, 40, 1000); // x0, y0, x1, y1
            eventTrackingList = [false, false];
        }

        // Companion
        pig = new CompanionPig(game, 'piggy', 1620, 410, false, false);
        game.add.existing(pig);


    },
    update: function () {
        // Collision
        game.physics.arcade.collide(currentPlayer, levelTiles);
        game.physics.arcade.collide(enemyGroup, levelTiles);
        //game.physics.arcade.overlap(currentPlayer, coin_group, function(player, coin){coin.kill(); coinCollect.play(); money+=1;});

        this.collideEvents();
        // Warping
        game.physics.arcade.collide(currentPlayer, warp1, function (player, coin, backtrack) { spawn = 1; spawndirection = 1; changeLevel(0, "1-1"); });
        game.physics.arcade.collide(currentPlayer, warp2, function (player, coin) { backtrack.destroy(); addedAudio = false; level2Unlocked = true; level1Completed = true; spawn = 2; spawndirection = 1; changeLevel(0, "0"); });
        updateMoney();
    },
    render: function () {
        //game.debug.body(player);
        // game.debug.spriteInfo(currentPlayer);
        // game.debug.geom(rect1, 'rgb(0,0,0)');
        // game.debug.geom(rect2, 'rgb(0,0,0)');
    },
    createSpawnPoints: function () {
        //SpawnPoints are in units of tiles
        spawnpoint1 = [10, 12];
        spawnpoint2 = [107, 22];
        if (spawn == 2){
            spawnpoint = spawnpoint1.slice();
            spawnpoint[0] += 2;
        }
        if (spawn == 1) {
            spawnpoint = spawnpoint2.slice();
            //spawnpoint[0] += 2;
        }
        if (spawn == 0) {
            spawnpoint = spawnpoint1.slice();
            spawnpoint[0] += 2;
        }
    },
    collideEvents: function () {
        if (!level1Completed) {
            if (eventTrackingList[0] == false) {
                if (rect1.intersects(currentPlayer.body)) {
                    console.log('woo')
                    event3_1_2();
                    eventTrackingList[0] = true;
                }
            }
            if (eventTrackingList[1] == false) {
                if (rect2.intersects(currentPlayer.body)) {
                    event4_1_2();
                    eventTrackingList[1] = true;
                }
            }
        }
    }
};
