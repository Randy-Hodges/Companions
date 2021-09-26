var levelOneTiles, currentPlayer, map, gdslime; 
var score = 0, scoreText, addedAudio = false;
var spawn = 0, spawndirection = -1;
var tileLength = 16;

var demo = {};
demo.level1 =  function(){};
demo.level1.prototype = {
    preload: function(){
        load_config_game();
        load_player();
        loadItems();
        loadEnemies();
        game.load.tilemap('level1', "assets/tilemaps/basic_tilemap_027.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Magic_Cliffs16', "assets/tiles/Magic-Cliffs-Environment/PNG/tileset.png");
        game.load.image('nes-color-palette', "assets/tiles/nes-color-palette.jpg");
        
        game.load.audio('backtrack', "assets/audio/music/speck_-_Home_Precarity_1.mp3")

    },
    create: function(){
        // configs
        create_game_configs();

        // music
        if (!addedAudio){
            backtrack = game.add.audio('backtrack');
            backtrack.play();
            backtrack.volume = .5;
            addedAudio = true;
        }

        // sound effects
        coinCollect = game.add.audio('coin collect');
        coinCollect.volume = .5;

        // Spawn points
        this.createSpawnPoints();

        // Tilemap behind
        var map = game.add.tilemap('level1');
        map.addTilesetImage('Magic_Cliffs16','Magic_Cliffs16'); //make sure the tileset name is the same as the tileset name used in Tiled
        map.addTilesetImage('Magic_Cliffs16_2','Magic_Cliffs16'); //make sure the tileset name is the same as the tileset name used in Tiled
        map.addTilesetImage('nes-color-palette','nes-color-palette'); //make sure the tileset name is the same as the tileset name used in Tiled
        map.createLayer('caveBackground');  
        levelOneTiles = map.createLayer('mainGrass');  // layer name is the same as used in Tiled
        map.setCollisionByExclusion(magicCliffsNoCollide, true, 'mainGrass');
        // Game borders based on tilemap
        game.world.setBounds(0, 0, map.layer.widthInPixels, map.layer.heightInPixels);

        // Coins
        coin_group = game.add.group();
        coin_positions = [[30,35],[185,19],[202,9],[116,18],[14,16]] // in units of tiles
        coin_positions.forEach(coin_pos => {
            coin = new Coin(game, coin_pos[0]*tileLength, coin_pos[1]*tileLength);
            game.add.existing(coin);
            coin_group.add(coin);
        });

        // Enemies
        enemyGroup = game.add.group();
        map.setLayer('enemies')
        map.forEach(function(tile){addEnemyFromTilemap(tile)},1,0,0,map.width,map.height)
        gdslime = new GDSlime(game, 25*tileLength, 35*tileLength);
        game.add.existing(gdslime);
        enemyGroup.add(gdslime);
        
        // Warp points (doing it with coins that aren't physically loaded in the game)
        warp1 = new Coin(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength);
        warp2 = new Coin(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength);

        // Player init
        currentPlayer = new Player(game, spawnpoint[0]*tileLength, spawnpoint[1]*tileLength);
        game.add.existing(currentPlayer);
        game.camera.follow(currentPlayer);

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
        game.physics.arcade.overlap(currentPlayer, coin_group, function(player, coin){coin.kill(); coinCollect.play(); score+=1;});

        // Warping
        game.physics.arcade.collide(currentPlayer, warp1, function(player, coin){spawn = 1; spawndirection = 1; changeLevel(0,"1_1");});
        game.physics.arcade.collide(currentPlayer, warp2, function(player, coin){spawn = 2; spawndirection = -1; changeLevel(0,"1_1");});
        updateScore();
    },
    render: function(){
        //console.log('rendering');
    //    game.debug.body(gdslime.enfrente);
    //    game.debug.body(gdslime);
       //game.debug.spriteInfo(player);
    },
    createSpawnPoints: function(){
        spawnpoint0 = [25, 35]
        spawnpoint1 = [0,7];
        spawnpoint2 = [229,13];
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
    }
};


