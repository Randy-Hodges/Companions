demo.level0 = function(){};
demo.level0.prototype = {
    preload: function(){
        loadGameConfigs();
        loadPlayer();
        loadCompanion();
        loadItems();
        //loadEnemies();
        game.load.tilemap('level0', "assets/tilemaps/village_tilemap.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Map Tileset', "assets/tiles/village/Map Tileset.png");
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
        map.addTilesetImage('Map Tileset','Map Tileset'); //make sure the tileset name is the same as the tileset name used in Tiled
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
        
        // Coins
        //coin_group = game.add.group();
        //coin_positions = [[30,35],[185,19],[202,9],[116,18],[14,16]] // in units of tiles
        //coin_positions.forEach(coin_pos => {
        //    coin = new Coin(game, coin_pos[0]*tileLength, coin_pos[1]*tileLength);
        //    game.add.existing(coin);
        //    coin_group.add(coin);
        //});
        
        // Medi - Hearts
        //heart_group = game.add.group();
        //heart_positions = [[29,35],[184,19],[201,9],[115,18],[15,16]] // in units of tiles
        //heart_positions.forEach(heart_pos => {
        //    heart = new Medi(game, heart_pos[0]*tileLength, heart_pos[1]*tileLength);
        //    game.add.existing(heart);
        //    heart_group.add(heart);
        //});

        // Enemies
        //enemyGroup = game.add.group();
        //map.setLayer('enemies');
        //map.forEach(function(tile){addEnemyFromTilemap(tile)},1,0,0,map.width,map.height);
        // gdslime = new GDSlime(game, 25*tileLength, 35*tileLength);
        // game.add.existing(gdslime);
        // enemyGroup.add(gdslime);
        
        // Warp points (doing it with coins that aren't physically loaded in the game)
        //warp1 = new Coin(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength);
        //warp2 = new Coin(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength);
        
        // Companion Init
        currentCompanion1 = new Companion(game, spawnpoint[0]*tileLength, spawnpoint[1]*tileLength);
        game.add.existing(currentCompanion1);
        
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
        
    },
    update: function(){
        // Collision
        game.physics.arcade.collide(currentPlayer, levelZeroTiles);
        //game.physics.arcade.collide(enemyGroup, levelZeroTiles);
        game.physics.arcade.overlap(currentPlayer, coin_group, function(player, coin){coin.kill(); coinCollect.play(); money+=1;});
        game.physics.arcade.overlap(currentPlayer, heart_group, function(player, heart){heart.kill(); healHearts(1); /*heartCollect.play();*/});

        // Warping
        //game.physics.arcade.collide(currentPlayer, warp1, function(player, coin){spawn = 1; spawndirection = 1; console.log(currentPlayer); changeLevel(0,"0");});
        //game.physics.arcade.collide(currentPlayer, warp2, function(player, coin){spawn = 2; spawndirection = -1; changeLevel(0,"1_1");});
        updateMoney();
    },
    render: function(){
        //console.log('rendering');
    //    game.debug.body(gdslime.enfrente);
    //    game.debug.body(gdslime);
       //game.debug.spriteInfo(player);
    },
    createSpawnPoints: function(){
        spawnpoint0 = [25, 35]
        //spawnpoint1 = [0,7];
        //spawnpoint2 = [229,13];
        if (spawn == 0){
            spawnpoint = spawnpoint0.slice();
        }
        //if (spawn == 2){
        //    spawnpoint = spawnpoint1.slice();
        //    spawnpoint[0] += 2;
        //}
        //if (spawn == 1){
        //    spawnpoint = spawnpoint2.slice();
        //    spawnpoint[0] -= 2;
        //}
    }
}