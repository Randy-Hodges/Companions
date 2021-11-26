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
        game.load.audio('bossFight', "assets/audio/music/Defy the Legends.mp3");
        game.load.audio('backtrack', "assets/audio/music/Drenched Bluff.mp3");
        // Events
        game.load.spritesheet('slimeBoss', "assets/sprites/enemies/blue slime/slime-Sheet-white.png", 32, 25);
        loadHeadshots();
        game.load.spritesheet('grandfather', "assets/sprites/enemies/Plague Doctor/plague_doctor_sheet.png", 64, 64);



    },
    create: function(){
        // configs
        createGameConfigs();

        // music
        addMusic('backtrack');

        // spawn points (in units of tiles)
        this.createSpawnPoints();

       // Tilemap (Most parts)
       addTilemapMC('level3-1');
        
        // Warp points
        warp1 = new Warp(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength);
        game.add.existing(warp1);
        warp2 = new Warp(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength);
        game.add.existing(warp2);

        cp1 = new Checkpoint(game, 20*tileLength, 45*tileLength);
        game.add.existing(cp1);        

        // Coins, Enemies, Player
        addCoins();
        addHearts();
        addEnemiesMC();
        addPlayer();

        // Front Layer
        tilemap.createLayer('front');
        gates1 = tilemap.createLayer('gates1');

        addUI();

        // Events
        this.setUpEvents();

    },
    update: function(){
        // Collision
        game.physics.arcade.collide(currentPlayer, levelTiles);
        game.physics.arcade.collide(enemyGroup, levelTiles);

        // Warping
        game.physics.arcade.overlap(currentPlayer, warp1, function(){transitionLevel('3-0', false, 2)});
        game.physics.arcade.overlap(currentPlayer, warp2, function(){
            transitionLevel('0');
            level3Completed = true;
            level4Unlocked = true;
        });

        // Events
        if (gates1Shown){
            game.physics.arcade.collide(currentPlayer, gates1);
            game.physics.arcade.collide(enemyGroup, gates1);
            gates1.alpha = 1;
        }
        else{
            gates1.alpha = 0;
        }
        

        this.checkEvents();
    },
    render: function(){
        //console.log('rendering');
        // game.debug.body(warp2);
        // game.debug.spriteInfo(currentPlayer);
    },
    createSpawnPoints: function(){
        // SpawnPoints are in units of tiles
        spawnpoint1 = [3, 46]; // 3, 46 normal
        spawnpoint2 = [115, 55];
        if (spawn == 2){
            spawnpoint = spawnpoint2.slice();
            spawnpoint[0] -= 2;
            spawnpoint[1] -= 2;
            spawndirection = -1;
        }
        else if (spawn == 1){
            spawnpoint = spawnpoint1.slice();
            spawnpoint[0] += 2;
            spawndirection = 1;
        }
        else{
            // checkpoint
            spawnpoint = [basePlayer.lastCP.x/tileLength, basePlayer.lastCP.y/tileLength];
            spawndirection = 1;
        }
    },
    checkEvents: function () {
        if (!level3Completed) {
            if (eventTrackingList[0] == false) {
                if (rect1.intersects(currentPlayer.body)) {
                    event1_3_1();
                    eventTrackingList[0] = true;
                }
            }
        }
        if (eventTrackingList[1] == false) {
            if (rect2.intersects(currentPlayer.body)) {
                event_bossStart_3_1();
                eventTrackingList[1] = true;
            }
        }
        if (cameraIsTweening){
            game.camera.unfollow();
            tweeningCount += 1;
            if (tweeningCount % 2 == 0){
                tween.stop();
                tween = game.add.tween(game.camera).to({ x: currentPlayer.x - game.width/2, y: currentPlayer.y - game.height/2}, 100, 'Linear', true, 0);
            }
            if (tweeningCount > 60){
                tween.stop();
                game.camera.follow(currentPlayer);
                cameraIsTweening = false;
            }
            // game.physics.arcade.moveToObject(game.camera, currentPlayer, 250);
        }
    },
    setUpEvents: function(){
        cameraIsTweening = false;
        tween = game.add.tween(game.camera).to({ x: currentPlayer.x - game.width/2, y: currentPlayer.y - game.height/2}, 200, 'Linear', true, 0);
        tweeningCount = 0;
        tilemap.setCollisionByExclusion(indexes = [0, -1], collides = true, layer = 'gates1')
        gates1.alpha = 0;
        gates1Shown = false;
        if (!level3Completed) {
            rect1 = new Phaser.Rectangle(18*tileLength, 0, 40, 1000); // x0, y0, width, height
            rect2 = new Phaser.Rectangle(46*tileLength, 0, 40, 1000); // x0, y0, width, height
            eventTrackingList = [false, false];
        }
    }
};
    