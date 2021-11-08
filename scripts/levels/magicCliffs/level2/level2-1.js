
demo.level2_1 =  function(){};
demo.level2_1.prototype = {
    preload: function(){
        loadGameConfigs();
        loadPlayer();
        loadCompanion();
        loadItems();
        loadEnemies();
        loadUI();
        game.load.tilemap('level2-1', "assets/tilemaps/Levels/Level 2/level2-1.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Magic_Cliffs16', "assets/tiles/Magic-Cliffs-Environment/PNG/tileset.png");
        game.load.image('nes-color-palette', "assets/tiles/nes-color-palette.jpg");

        game.load.audio('backtrack', "assets/audio/music/Waterfall Cave.mp3");

        // Events
        loadHeadshots();
        game.load.spritesheet('grandfather', "assets/sprites/enemies/Plague Doctor/plague_doctor_sheet.png", 64, 64);

    },
    create: function(){
        // Configs
        createGameConfigs();

        // Music
        addMusic('backtrack');

        // Spawn points (in units of tiles)
        this.createSpawnPoints();

        // Tilemap
        tilemap = game.add.tilemap('level2-1');
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
        warp1 = new Warp(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength, 270, 1, 2.5);
        game.add.existing(warp1);
        warp2 = new Warp(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength, 270);
        game.add.existing(warp2);
        
        // Coins, Enemies, Player
        addCoins();
        addEnemiesMC();
        addPlayer();
        
        // Front Layer
        tilemap.createLayer('front');
        gates1 = tilemap.createLayer('gates1'); 
        gates2 = tilemap.createLayer('gates2'); 

        addUI();

        // Events
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
        this.checkEvents();
        // Warping
        game.physics.arcade.collide(currentPlayer, warp1, function(player, coin){spawn = 2; spawndirection = 1; changeLevel(0,"2-0");});
        game.physics.arcade.collide(currentPlayer, warp2, function(player, coin){backtrack.destroy(); spawn = 1; spawndirection = 1; changeLevel(0,"0");});
    },
    render: function(){
        //console.log('rendering');
        game.debug.body(warp1);
        // game.debug.spriteInfo(currentPlayer);
        // game.debug.geom(rect1, 'rgb(0,0,0)');
    },
    createSpawnPoints: function(){
        //SpawnPoints are in units of tiles
        spawnpoint1 = [42, 75];
        spawnpoint2 = [244, 4];
        if (spawn == 2){
            spawnpoint = spawnpoint2.slice();
            spawnpoint[0] += 2;
            spawnpoint[1] += 20;
        }
        else { // (spawn == 1)
            spawnpoint = spawnpoint1.slice();
            spawnpoint[0] += 7;
            spawnpoint[1] -= 2;
        }
        // else{
        //     spawnpoint = spawnpoint2.slice();
            
        // }
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
    }
};
    