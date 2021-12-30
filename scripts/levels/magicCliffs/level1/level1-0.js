
demo.level1_0 = function(){};
demo.level1_0.prototype = {
    preload: function(){
        loadAssetsMC();
        
        // Level Specific
        game.load.tilemap('level1-0', "assets/tilemaps/Levels/level 1/level1-0.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.audio('backtrack', "assets/audio/music/Faint - Discovery.wav");
        
        // Event Specific
        loadHeadshots();
        game.load.spritesheet('grandfather', "assets/sprites/enemies/Plague Doctor/plague_doctor_sheet.png", 64, 64)

    },
    create: function(){
        // configs
        createGameConfigs();

        // music
        addMusic('backtrack', .2);

        // Spawn points
        this.createSpawnPoints();

        addTilemapMC("level1-0");
        
        // Warp points
        warp1 = new Warp(game, spawnpoint0[0]*tileLength, spawnpoint0[1]*tileLength);
        warp2 = new Warp(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength);

        // Coins, Enemies, Player
        addCoins();
        addHearts();
        addEnemiesMC();
        addPlayer();
                
        // Tilemap Infront
        tilemap.createLayer('front');

        addUI();

        // Only start events if level 1 is not completed
        if (!level1Completed) {
            rect1 = new Phaser.Rectangle(400, 0, 40, 600); // x0, y0, width, height
            rect2 = new Phaser.Rectangle(1050, 0, 40, 540); // x0, y0, width, height
            eventTrackingList = [false, false];
        }   

        fadeIn();
    },
    update: function(){
        // Collision
        game.physics.arcade.collide(currentPlayer, levelTiles);
        game.physics.arcade.collide(enemyGroup, levelTiles);

        // Warping
        game.physics.arcade.overlap(currentPlayer, warp1, function(){transitionLevel('0', newLevel = true)});
        game.physics.arcade.overlap(currentPlayer, warp2, function(){transitionLevel('1-1')});

        // Events
        this.collideEvents();
    },
    render: function(){
        // game.debug.body(currentPlayer.slash);
        // game.debug.spriteInfo(currentPlayer);
        // game.debug.geom(rect1, 'rgb(0,0,0)');
    },
    createSpawnPoints: function(){
        spawnpoint0 = [0,6];
        spawnpoint1 = [23, 35]
        spawnpoint2 = [229,12];
        if (spawn == 0){
            spawnpoint = spawnpoint0.slice();
        }
        else if (spawn == 1){
            spawnpoint = spawnpoint1.slice();
            spawnpoint[0] += 2;
            spawndirection = 1;
        }
        else{ 
            spawnpoint = spawnpoint2.slice();
            spawnpoint[0] -= 2;
            spawndirection = -1;
        }
    },
    collideEvents: function(){
        if (!level1Completed){
            // Event 1
            if (eventTrackingList[0] == false){
                if(rect1.intersects(currentPlayer.body)){
                    event1_1_0();
                    eventTrackingList[0] = true;
                }
            }
            // Event 2
            if (eventTrackingList[1] == false){
                if(rect2.intersects(currentPlayer.body)){
                    event2_1_0();
                    eventTrackingList[1] = true;
                }
            }
        }
    }
};



