demo.level0 = function(){};
demo.level0.prototype = {
    preload: function(){
        loadGameConfigs();
        loadPlayer();
        loadCompanion();
        loadItems();
        loadUI();
        loadEnemies();
        game.load.tilemap('level0', "assets/tilemaps/village/village_tilemap.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Village Tileset', "assets/tiles/village/Village Tileset.png");
        game.load.image('nes-color-palette', "assets/tiles/nes-color-palette.jpg");
        
        game.load.audio('village', "assets/audio/music/Treasure Town.mp3");
        
    },
    create: function(){
        // configs
        createGameConfigs();
        addMusic('village');

        // Spawn points
        this.createSpawnPoints();

        // Tilemap behind
        tilemap = game.add.tilemap('level0');
        tilemap.addTilesetImage('Village Tileset','Village Tileset'); //make sure the tileset name is the same as the tileset name used in Tiled
        tilemap.addTilesetImage('nes-color-palette','nes-color-palette'); //make sure the tileset name is the same as the tileset name used in Tiled
        tilemap.createLayer('villageBackground');  
        levelTiles = tilemap.createLayer('mainGrass');  // layer name is the same as used in Tiled
        shopDoor = tilemap.createLayer('shopDoor');
        healDoor = tilemap.createLayer('healDoor');
        companionDoor = tilemap.createLayer('companionDoor');
        front = tilemap.createLayer('front');  // layer name is the same as used in Tiled
        tilemap.setCollisionByExclusion(villageNoCollide, true, levelTiles);
        
        // Game borders based on tilemap
        game.world.setBounds(0, 0, tilemap.layer.widthInPixels, tilemap.layer.heightInPixels);

        // Text Instructions
        equipText1 = game.add.text(6*tileLength + 1, 30*tileLength + 1,"Press Q to Equip.", { fontSize: '14px', fill: '#000' });
        equipText2 = game.add.text(6*tileLength, 30*tileLength,"Press Q to Equip.", { fontSize: '14px', fill: '#fff' });
        
        // Warp points
        warp1 = new Warp(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength);
        game.add.existing(warp1) // comment this out to make warp zone invisible
        cp = new Checkpoint(game, (spawnpoint1[0] - 3)*tileLength, (spawnpoint1[1]+ 2)*tileLength);
        game.add.existing(cp);

        
        // Golden Heart
        addGoldHeart(52, 17.5);
        
        // Player
        addPlayer();
        
        // Tilemap Infront
        tilemap.createLayer('front');

        addUI();
            
        // Companion Init
        companionGroup = game.add.group();
        if (piggyUnlocked || devTools){
            if (!basePlayer.companionNames.includes('piggy')){
                pig = new CompanionPig(game, 25*tileLength, 35*tileLength, false, false);
                game.add.existing(pig);
                companionGroup.add(pig);
            }
        }
        if (froggyUnlocked || devTools){
            if (!basePlayer.companionNames.includes('froggy')){
                frog = new CompanionFrog(game, 27*tileLength, 35*tileLength, false, false);
                game.add.existing(frog);
                companionGroup.add(frog);
            }
        }
        if (slimeUnlocked || devTools || true){
            if (!basePlayer.companionNames.includes('slime')){
                slimeComp = new CompanionSlime(game, 23*tileLength, 35*tileLength, false, false);
                game.add.existing(slimeComp);
                companionGroup.add(slimeComp);
            }
        }
    },
    update: function(){
        // Collision
        game.physics.arcade.collide(currentPlayer, levelTiles);
        
        // Warping
        game.physics.arcade.collide(currentPlayer, warp1, function(player, warp){removeMusic(); spawn = 2; changeToMap(0)});

        this.checkEvents();
    },
    render: function(){
        // game.debug.body(currentPlayer.slash);
        // game.debug.spriteInfo(currentPlayer);
        // game.debug.geom(rect1, 'rgb(0,0,0)');
    },
    createSpawnPoints: function(){
        spawnpoint0 = [25, 35];
        spawnpoint1 = [61, 14];
        spawnpoint2 = [25, 35];  
        if (spawn == 0){
            spawnpoint = spawnpoint0.slice();
        };
        if (spawn == 2){
            spawnpoint = spawnpoint2.slice();
            spawnpoint[0] -= 2;
        };
        if (spawn == 1){
            spawnpoint = spawnpoint1.slice();
            spawnpoint[0] -= 2;
            spawndirection = -1;
        }
    },
    checkEvents: function(){
        if (firstVisitVillage){
            event1_village();
            firstVisitVillage = false;
        }
    }
}