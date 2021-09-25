var levelOneTiles, currentPlayer; 
var spawn = 0, spawndirection = -1;
var tileLength = 16;
var score = 0, scoreText;

magicCliffsNoCollide = [0,1768,1769,1801,1802,1803,1804,1805,1806,661,1831,1832,1833,1826,1827,646,642,644,643,1859,1891,
    1917,1221,1222,1223,1224,1225,1226,1227,1949,1297,1298,1299,1300,1302,1304,1305,1306,1307,1975,1279,1285,2007,
    2033,2065,1413,1423,2091,1396,1400,2123,1471,1481,2149,1455,1457,1529,1539,177,1836,1837,1839,1840,1842,1843,183,1894,1895,
    1897,1898,1900,1901,61,62,63,64,65,66,67,119,125,137,138,139,140,142,144,145,146,147,195,205,253,263,311,321,1815,1816,358,
    359,369,379,416,417,608,609,1337,1343,641,645,655,656,666,667,671,672,673,676,677,679,680,682,683,1401,699,731,734,735,737,
    738,740,741,757,789,815,847,873,905,931,963,989,661,1821,1520,1570,1571,1572,410,411,412,295,297,1455,1457,1587,1597,354,1514,
    1405,1579,1638,1350,1293,1294,1353,1412,1470,1527,1528,1581,1584,1640,1636,1637,1348,1349,1585,1639,1642]

function load_config_game(){
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();
}

function load_player(){
    game.load.spritesheet('player', "assets/sprites/characters/RPG Character/main_character_all.png", 64, 64); // Important for Player Init
}

function load_items(){
    game.load.spritesheet('coin', "assets/sprites/items/money/MonedaD.png", 16, 16); 
    game.load.audio('coin collect', "assets/audio/soundeffects/Collect Coin Sound Effect.mp3");
}

function get_mouse(){
        console.log(String(game.input.mousePointer.x), " ", String(game.input.mousePointer.y));
}
    
function create_game_configs(){
    // configs
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 400;
    game.stage.backgroundColor = 'aeffee';
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
}

function updateScore(){
    scoreText.text = "Score: " + score + "/10";
    scoreText.text.x = 0;
    scoreText.text.y = 0;
}

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