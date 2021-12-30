
demo.level2_1 =  function(){};
demo.level2_1.prototype = {
    preload: function(){
        loadAssetsMC();
        game.load.tilemap('level2-1', "assets/tilemaps/Levels/Level 2/level2-1.json", null, Phaser.Tilemap.TILED_JSON);

        // Events
        loadHeadshots();
        game.load.spritesheet('grandfather', "assets/sprites/enemies/Plague Doctor/plague_doctor_sheet.png", 64, 64);
    },
    create: function(){
        // Configs
        createGameConfigs();

        // Spawn points (in units of tiles)
        this.createSpawnPoints();

        // Tilemap (Most parts)
        addTilemapMC('level2-1');
        
        // Warp points
        warp1 = new Warp(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength, 270, 1, 2.5);
        // game.add.existing(warp1);
        warp2 = new Warp(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength, 270);
        game.add.existing(warp2);
        
        // Coins, Enemies, Player
        addCoins();
        addHearts();
        addEnemiesMC();
        addPlayer();
        
        // Front Layer
        tilemap.createLayer('front');
        gates1 = tilemap.createLayer('gates1'); 
        gates2 = tilemap.createLayer('gates2'); 

        addUI();

        // Events
        this.setUpEvents();

        // Companion
        companionGroup = game.add.group();
        frog = new CompanionFrog(game, 4680, 490, false, false);
        game.add.existing(frog);
        companionGroup.add(frog);
    },
    update: function(){
        
        // Collision
        game.physics.arcade.collide(currentPlayer, levelTiles);
        game.physics.arcade.collide(enemyGroup, levelTiles);
        if (gates1Shown){
            game.physics.arcade.collide(currentPlayer, gates1);
            gates1.alpha = 1;
            gates2.alpha = 0;
        }
        if (gates2Shown){
            game.physics.arcade.collide(currentPlayer, gates2);
            gates1.alpha = 0;
            gates2.alpha = 1;
        }
        
        // Warping
        game.physics.arcade.overlap(currentPlayer, warp1, function(){transitionLevel('2-0', newLevel = false, spawnVal = 2)});
        game.physics.arcade.overlap(currentPlayer, warp2, function(){
            transitionLevel('0', newLevel = true);
            level2Completed = true;
            level3Unlocked = true;
        });
        
        this.checkEvents();
    },
    render: function(){
        //console.log('rendering');
        // game.debug.body(warp1);
        // game.debug.spriteInfo(currentPlayer);
        // game.debug.geom(rect1, 'rgb(0,0,0)');
    },
    createSpawnPoints: function(){
        //SpawnPoints are in units of tiles
        spawnpoint1 = [42, 74.8];
        spawnpoint2 = [244, 4];
        if (spawn == 2){
            spawnpoint = spawnpoint2.slice();
            spawnpoint[0] += 2;
            spawnpoint[1] += 20;
            spawndirection = -1;
        }
        else { // (spawn == 1)
            spawnpoint = spawnpoint1.slice();
            spawnpoint[0] += 7;
            spawnpoint[1] -= 2;
            spawndirection = 1;
        }
    },
    checkEvents: function () {
        if (!level2Completed) {
            if (eventTrackingList[0] == false) {
                if (rect1.intersects(currentPlayer.body)) {
                    event1_2_1();
                    eventTrackingList[0] = true;
                }
            }
            if (eventTrackingList[1] == false) {
                if (frog.isEquipped) {
                    basePlayer.dashEnabled = true;
                    currentPlayer.dashEnabled = true;
                    gates1Shown = false;
                    gates2Shown = true;
                    eventTrackingList[1] = true;
                }
            }
        }
    },
    setUpEvents: function() {
        tilemap.setCollisionByExclusion(indexes = [0, -1], collides = true, layer = 'gates1')
        tilemap.setCollisionByExclusion(indexes = [0, -1], collides = true, layer = 'gates2')
        gates1.alpha = 0;
        gates2.alpha = 0;
        gates1Shown = false;
        gates2Shown = false;
        if (!level2Completed) {
            gates1Shown = true;
            rect1 = new Phaser.Rectangle(4560, 0, 40, 1000); // x0, y0, width, height
            rect2 = new Phaser.Rectangle(1560, 0, 40, 1000); // x0, y0, width, height
            eventTrackingList = [false, false];
        }
    }
};
    