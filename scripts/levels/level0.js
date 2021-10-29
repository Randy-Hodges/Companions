demo.level0 = function(){};
demo.level0.prototype = {
    preload: function(){
        loadGameConfigs();
        loadPlayer();
        loadCompanion();
        loadItems();
        loadUI();
        //loadEnemies();
        game.load.tilemap('level0', "assets/tilemaps/village/village_tilemap.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Village Tileset', "assets/tiles/village/Village Tileset.png");
        game.load.image('nes-color-palette', "assets/tiles/nes-color-palette.jpg");
        
        game.load.audio('village', "assets/audio/music/Treasure Town.mp3");

    },
    create: function(){
        // configs
        createGameConfigs();

        // music
        if (!addedAudio){
            backtrack = game.add.audio('village');
            backtrack.play();
            backtrack.volume = .1;
            addedAudio = true;
        }

        // sound effects
        //coinCollect = game.add.audio('coin collect');
        //coinCollect.volume = .5;

        // Spawn points
        this.createSpawnPoints();

        // Tilemap behind
        var map = game.add.tilemap('level0');
        map.addTilesetImage('Village Tileset','Village Tileset'); //make sure the tileset name is the same as the tileset name used in Tiled
        map.addTilesetImage('nes-color-palette','nes-color-palette'); //make sure the tileset name is the same as the tileset name used in Tiled
        map.createLayer('villageBackground');  
        levelZeroTiles = map.createLayer('mainGrass');  // layer name is the same as used in Tiled
        shopDoor = map.createLayer('shopDoor');
        healDoor = map.createLayer('healDoor');
        companionDoor = map.createLayer('companionDoor');
        front = map.createLayer('front');  // layer name is the same as used in Tiled
        map.setCollisionByExclusion(villageNoCollide, true, levelZeroTiles);
        // Game borders based on tilemap
        game.world.setBounds(0, 0, map.layer.widthInPixels, map.layer.heightInPixels);


        createGroups();

        // Text Instructions
        equipText1 = game.add.text(6*tileLength, 30*tileLength,"Press Q to Equip.", { fontSize: '14px', fill: '#000' });
        equipText2 = game.add.text(6*tileLength, 31*tileLength,"Press E to Unequip.", { fontSize: '14px', fill: '#000' });
        
        // Medi - Hearts
        //heart_group = game.add.group();
        //heart_positions = [[29,35],[184,19],[201,9],[115,18],[15,16]] // in units of tiles
        //heart_positions.forEach(heart_pos => {
        //    heart = new Medi(game, heart_pos[0]*tileLength, heart_pos[1]*tileLength);
        //    game.add.existing(heart);
        //    heart_group.add(heart);
        //});
        
        // Warp points (doing it with coins that aren't physically loaded in the game)
        warp1 = new Warp(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength, 1, -spawnpoint1[1]);
        game.add.existing(warp1) // comment this out to make warp zone invisible

        // warp2 = new Coin(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength);
        
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
            
        // Companion Init
        pig = new CompanionPig(game, 'piggy', 25*tileLength, 35*tileLength, false, false);
        frog = new CompanionFrog(game, 'froggy', 27*tileLength, 35*tileLength, false, false);
        game.add.existing(pig);
        game.add.existing(frog);
        //currentPlayer.companionSlot1 = 'piggy';
        //currentPlayer.companionSlot2 = 'froggy';
        //console.log(currentPlayer.companionSlot1);
        //console.log(currentPlayer.companionSlot2);
        createCompanion();

        // Pause Menu
        loadPauseMenu();
        
    },
    update: function(){
        // Collision
        game.physics.arcade.collide(currentPlayer, levelZeroTiles);
        game.physics.arcade.overlap(currentPlayer, coinGroup, function(player, coin){coin.kill(); coinCollect.play(); money+=1;});
        
        // Companions Overlap     
        if (checkOverlap(currentPlayer, pig)){
            overlappedCompanion = pig;
            //console.log('pig overlap');
        
        } else if (checkOverlap(currentPlayer, frog)){
            overlappedCompanion = frog;
            //console.log('frog overlap');
            
        } else {
            overlappedCompanion = 'undefined';
        }

        //game.physics.arcade.collide(enemyGroup, levelZeroTiles);
        game.physics.arcade.overlap(currentPlayer, coinGroup, function(player, coin){coin.kill(); coinCollect.play(); money+=1;});
        game.physics.arcade.overlap(currentPlayer, heartGroup, function(player, heart){heart.kill(); healHearts(1); /*heartCollect.play();*/});

        // Warping
        game.physics.arcade.collide(currentPlayer, warp1, function(player, coin){backtrack.destroy(); addedAudio = false; spawn = 2; spawndirection = 1; changeToMap(0)});
        // game.physics.arcade.collide(currentPlayer, warp2, function(player, coin){spawn = 1; spawndirection = -1; changeLevel(0,"1_1");});

        updateMoney();

    },
    render: function(){
        //console.log('rendering');
    //    game.debug.body(gdslime.enfrente);
    //    game.debug.body(gdslime);
       //game.debug.spriteInfo(player);
    },
    createSpawnPoints: function(){
        spawnpoint0 = [25, 35];
        if (spawn == 0){
            spawnpoint = spawnpoint0.slice();
        };

        spawnpoint1 = [69, 36]; // for the right side of village screen 
        if (spawn == 2){
            spawnpoint = spawnpoint1.slice();
            spawnpoint[0] -= 2;
        };

        spawnpoint2 = [25, 35];
        if (spawn == 1){
           spawnpoint = spawnpoint2.slice();
        }
    }
}