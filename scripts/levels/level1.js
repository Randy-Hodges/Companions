var levelOneTiles, currentPlayer; 
var spawn = 0, spawndirection = -1;
var tileLength = 16;
var score = 0, scoreText;

var demo = {};
demo.level1 =  function(){};
demo.level1.prototype = {
    preload: function(){
        load_config_game();
        load_player();
        load_items();
        game.load.tilemap('level1', "assets/tilemaps/basic_tilemap_027.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Magic_Cliffs16', "assets/tiles/Magic-Cliffs-Environment/PNG/tileset.png");
        
        game.load.audio('backtrack', "assets/audio/music/speck_-_Home_Precarity_1.mp3")

    },
    create: function(){
        // configs
        create_game_configs();

        // music 
        backtrack = game.add.audio('backtrack');
        backtrack.play();
        backtrack.volume = .5;

        // sound effects
        coinCollect = game.add.audio('coin collect');
        coinCollect.volume = .5;

        // Spawn points
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

        // Tilemap behind
        var map = game.add.tilemap('level1');
        map.addTilesetImage('Magic_Cliffs16','Magic_Cliffs16'); //make sure the tileset name is the same as the tileset name used in Tiled
        map.addTilesetImage('Magic_Cliffs16_2','Magic_Cliffs16'); //make sure the tileset name is the same as the tileset name used in Tiled
        levelOneTiles = map.createLayer('caveBackground');  
        levelOneTiles = map.createLayer('mainGrass');  // layer name is the same as used in Tiled
        map.setCollisionByExclusion(magicCliffsNoCollide, true, 'mainGrass');
        // Game borders based on tilemap
        game.world.setBounds(0, 0, map.layer.width*tileLength, map.layer.height*tileLength);

        // Player init
        currentPlayer = new Player(game, spawnpoint[0]*tileLength, spawnpoint[1]*tileLength);
        game.add.existing(currentPlayer);
        game.camera.follow(currentPlayer);

        // Coins
        coin_group = game.add.group();
        coin_positions = [[30,35],[185,19],[202,9],[116,18],[14,16]] // in units of tiles
        coin_positions.forEach(coin_pos => {
            coin = new Coin(game, coin_pos[0]*tileLength, coin_pos[1]*tileLength);
            game.add.existing(coin);
            coin_group.add(coin);
        });
        
        // Warp points (doing it with coins bc I'm pressed for time)
        warp1 = new Coin(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength);
        warp2 = new Coin(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength);

        // Tilemap Infront
        map.createLayer('front');

        // Score
        scoreText = game.add.text(16,16,"Score: " + score + "/10", { fontSize: '32px', fill: '#fff' });
        scoreText.fixedToCamera = true;

    },
    update: function(){
        game.physics.arcade.collide(currentPlayer, levelOneTiles);
        game.physics.arcade.overlap(currentPlayer, coin_group, function(player, coin){coin.kill(); coinCollect.play(); score+=1;});
        game.physics.arcade.collide(currentPlayer, warp1, function(player, coin){spawn = 1; spawndirection = 1; changeLevel(0,"1_1");});
        game.physics.arcade.collide(currentPlayer, warp2, function(player, coin){spawn = 2; spawndirection = -1; changeLevel(0,"1_1");});
        updateScore();
    },
    render: function(){
        //console.log('rendering');
       //game.debug.body(player);
       //game.debug.spriteInfo(player);
    }
};

function changeLevel(i, levelNum){
    backtrack.pause();
    console.log('level change to: ' + levelNum);
    game.state.start('level' + levelNum);
    backtrack.resume();
}