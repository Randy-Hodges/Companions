var spawn = 2, spawndirection = -1;
var levelOneTiles, currentPlayer, map, gdslime; 
var score = 0, scoreText, addedAudio = false;
var tileLength = 16;

demo.level1_2 =  function(){};
demo.level1_2.prototype = {
    preload: function(){
        load_config_game();
        load_player();
        loadItems();
        loadEnemies();
        game.load.tilemap('level1_2', "assets/tilemaps/basic_tilemap_3_010.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Magic_Cliffs16', "assets/tiles/Magic-Cliffs-Environment/PNG/tileset.png");
        game.load.image('nes-color-palette', "assets/tiles/nes-color-palette.jpg");

    },
    create: function(){
        // configs
        create_game_configs();

        // sound effects
        coinCollect = game.add.audio('coin collect');
        coinCollect.volume = .5;

        //spawn points (in tiles)
        this.createSpawnPoints();

        // Tilemap behind
        var map = game.add.tilemap('level1_2');
        map.addTilesetImage('Magic_Cliffs16','Magic_Cliffs16'); //make sure the tileset name is the same as the tileset name used in Tiled
        map.addTilesetImage('Magic_Cliffs16_2','Magic_Cliffs16'); 
        map.addTilesetImage('nes-color-palette','nes-color-palette'); //make sure the tileset name is the same as the tileset name used in Tiled
        map.createLayer('caveBackground');  
        levelOneTiles = map.createLayer('mainGrass');  // layer name is the same as used in Tiled
        map.setCollisionByExclusion(magicCliffsNoCollide, true, 'mainGrass');
        // Game borders based on tilemap
        game.world.setBounds(0, 0, map.layer.widthInPixels, map.layer.heightInPixels);

        // Player init
        currentPlayer = new Player(game, spawnpoint[0]*tileLength, spawnpoint[1]*tileLength);
        game.add.existing(currentPlayer);
        game.camera.follow(currentPlayer);

        // Coins

        
        // Warp points (doing it with coins bc I'm pressed for time)
        warp1 = new Coin(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength);
        warp2 = new Coin(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength);

        // Enemies
        enemyGroup = game.add.group();
        map.setLayer('enemies');
        map.forEach(function(tile){addEnemyFromTilemap(tile)},1,0,0,map.width,map.height);

        // Tilemap Infront
        map.createLayer('front');

        // Score
        scoreText = game.add.text(16,16,"Score: " + score, { fontSize: '32px', fill: '#fff' });
        scoreText.fixedToCamera = true;
    },
    update: function(){
        // Collision
        game.physics.arcade.collide(currentPlayer, levelOneTiles);
        game.physics.arcade.collide(enemyGroup, levelOneTiles);
        //game.physics.arcade.overlap(currentPlayer, coin_group, function(player, coin){coin.kill(); coinCollect.play(); score+=1;});

        // Warping
        game.physics.arcade.collide(currentPlayer, warp1, function(player, coin){spawn = 1; spawndirection = 1; changeLevel(0,"1");});
        game.physics.arcade.collide(currentPlayer, warp2, function(player, coin){spawn = 2; spawndirection = -1; changeLevel(0,"1");});
        updateScore();
    },
    render: function(){
        //console.log('rendering');
        //game.debug.body(player);
        //game.debug.spriteInfo(player);
    },
    createSpawnPoints: function(){
        //SpawnPoints are in units of tiles
        spawnpoint1 = [20, 20];
        spawnpoint2 = [0,0];
        if (spawn == 2){
            spawnpoint = spawnpoint1.slice();
            spawnpoint[0] += 2;
            console.log(spawnpoint, spawnpoint1)
        }
        if (spawn == 1){
            spawnpoint = spawnpoint2.slice();
            spawnpoint[0] -= 2;
        }
    }
};

// {
    //     preload: function(){},
    //     create: function(){
    //         game.stage.backgroundColor = 'a1bbee';
    //         console.log('level 2');
    //         game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(changeLevel, null, null, 1);
    //         game.input.keyboard.addKey(Phaser.Keyboard.TWO).onDown.add(changeLevel, null, null, 2);
    //     },
    //     update: function(){}
    //}