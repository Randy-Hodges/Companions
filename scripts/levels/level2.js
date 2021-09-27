demo.level2 =  function(){};
demo.level2.prototype = {
    preload: function(){
        load_config_game();
        load_player();
        load_items();
        game.load.tilemap('level1', "assets/tilemaps/basic_tilemap_027.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('Magic_Cliffs16', "assets/tiles/Magic-Cliffs-Environment/PNG/tileset.png");
    },
    create: function(){
        // configs
        create_game_configs();

        // Tilemap behind
        var map = game.add.tilemap('level1');
        map.addTilesetImage('Magic_Cliffs16','Magic_Cliffs16'); //make sure the tileset name is the same as the tileset name used in Tiled
        map.addTilesetImage('Magic_Cliffs16_2','Magic_Cliffs16'); //make sure the tileset name is the same as the tileset name used in Tiled
        map.createLayer('caveBackground');  
        levelOneTiles = map.createLayer('mainGrass');  // layer name is the same as used in Tiled
        map.setCollisionByExclusion([0,1768,1769,1801,1802,1803,1804,1805,1806,661,1831,1832,1833,1826,1827,646,642,644,643,1859,1891,
            1917,1221,1222,1223,1224,1225,1226,1227,1949,1297,1298,1299,1300,1302,1304,1305,1306,1307,1975,1279,1285,2007,1355,1365,
            2033,2065,1413,1423,2091,1396,1400,2123,1471,1481,2149,1455,1457,1529,1539,177,1836,1837,1839,1840,1842,1843,183,1894,1895,
            1897,1898,1900,1901,61,62,63,64,65,66,67,119,125,137,138,139,140,142,144,145,146,147,195,205,253,263,311,321,1815,1816,358,
            359,369,379,416,417,608,609,1337,1343,641,645,655,656,666,667,671,672,673,676,677,679,680,682,683,1401,699,731,734,735,737,
            738,740,741,757,789,815,847,873,905,931,963,989,661,1821,1520,1570,1571,1572,410,411,412,295,297,1455,1457,1587,1597,354,1514,
            1405,1579,1638,1350,1293,1294,1353,1412,1470,1527,1528,1581,1584,1640,1636,1637,1348,1349,1585,1639,1642],
            true,
            'mainGrass')

        game.world.setBounds(0, 0, map.layer.width*16, map.layer.height*16);

        // Player init
        currentPlayer = new Player(game);
        game.add.existing(currentPlayer);
        game.camera.follow(currentPlayer);

        // Tilemap Infront
        map.createLayer('front');
    },
    update: function(){
        
        game.physics.arcade.collide(currentPlayer, levelOneTiles);
        
    },
    render: function(){
        //console.log('rendering');
        //game.debug.body(player);
        //game.debug.spriteInfo(player);
    }
};
        
//     preload: function(){},
//     create: function(){
//         game.stage.backgroundColor = 'a1bbee';
//         console.log('level 2');
//         game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(changeLevel, null, null, 1);
//         game.input.keyboard.addKey(Phaser.Keyboard.TWO).onDown.add(changeLevel, null, null, 2);
//     },
//     update: function(){}
// };