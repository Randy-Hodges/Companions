
magicCliffsNoCollide = [0,1768,1769,1801,1802,1803,1804,1805,1806,661,1831,1832,1833,1826,1827,646,642,644,643,1859,1891,
    1917,1221,1222,1223,1224,1225,1226,1227,1949,1297,1298,1299,1300,1302,1304,1305,1306,1307,1975,1279,1285,2007,
    2033,2065,1413,1423,2091,1396,1400,2123,1471,1481,2149,1455,1457,1529,1539,177,1836,1837,1839,1840,1842,1843,183,1894,1895,
    1897,1898,1900,1901,61,62,63,64,65,66,67,119,125,137,138,139,140,142,144,145,146,147,195,205,253,263,311,321,1815,1816,358,
    359,369,379,416,417,608,609,1337,1343,641,645,655,656,666,667,671,672,673,676,677,679,680,682,683,1401,699,731,734,735,737,
    738,740,741,757,789,815,847,873,905,931,963,989,661,1821,1520,1570,1571,1572,410,411,412,295,297,1455,1457,1587,1597,354,1514,
    1405,1579,1638,1350,1293,1294,1353,1412,1470,1527,1528,1581,1584,1640,1636,1637,1348,1349,1585,1639,1642];

exclusionLayer = {};

function changeToMap(i) {
    console.log('change to map');
    game.state.start('Map');
}

function loadHeadshots(){
    game.load.image('ghostHeadshot', "assets/sprites/characters/portraits/Icons_28.png");
    // game.load.image('playerHeadshot', "assets/sprites/characters/headshots/Player1.png");
}

function loadAssetsMC(){
    loadGameConfigs();
    loadPlayer();
    loadCompanions();
    loadItems();
    loadEnemies();
    loadUI();
    // Hiddens
    game.load.audio('small bell', 'assets/audio/soundeffects/small_bell2.mp3')
}



function addTilemapMC(tilemapKey){
    // Tilemap creation
    tilemap = game.add.tilemap(tilemapKey);
    tilemap.addTilesetImage('Magic_Cliffs16','Magic_Cliffs16'); //make sure the tileset name is the same as the tileset name used in Tiled
    tilemap.addTilesetImage('nes-color-palette','nes-color-palette'); 
    tilemap.createLayer('caveBackground');  
    levelTiles = tilemap.createLayer('mainGrass');  // layer name is the same as used in Tiled
    // Collision
    tilemap.setLayer('exclude');
    tilemap.forEach(function(tile){excludeCollision(tile)},1,0,0,tilemap.width,tilemap.height);
    tilemap.setCollisionByExclusion(Object.values(exclusionLayer), true, 'mainGrass');
    setTilePropertiesMC();
    // Game borders based on tilemap
    game.world.setBounds(0, 0, tilemap.layer.widthInPixels, tilemap.layer.heightInPixels);
}

function addEnemiesMC(){
    enemyGroup = game.add.group();
    tilemap.setLayer('enemies');
    tilemap.forEach(function(tile){addEnemyFromTilemapMC(tile)},1,0,0,tilemap.width,tilemap.height);
}

function addEnemyFromTilemapMC(tile){
    if (tile.index == 2346 || tile.index == 1186){
        slime = new Slime(game, tile.x*tileLength, tile.y*tileLength,'greenSlime');
        game.add.existing(slime);
        enemyGroup.add(slime);
    }
	
    if (tile.index == 2342 || tile.index == 1182){
        slime = new redSlime(game, tile.x*tileLength, tile.y*tileLength,'redSlime');
        game.add.existing(slime);
        enemyGroup.add(slime);
    }

    if (tile.index == 2338 || tile.index == 1178){
        slime = new blueSlime(game, tile.x*tileLength, tile.y*tileLength,'blueSlime');
        game.add.existing(slime);
        enemyGroup.add(slime);
    }
    if (tile.index == 2362 || tile.index == 1194 || tile.index == 2354){
        bat = new Bat(game, tile.x*tileLength, tile.y*tileLength,'bat');
        game.add.existing(bat);
        enemyGroup.add(bat);
    }
}

function setTilePropertiesMC(){
    function setTilePropertiesHelper(tile){
        if (tile.index == 795 || tile.index == 796){
            tile.collideUp = true;
            tile.collideDown = false;
            tile.collideLeft = false;
            tile.collideRight = false;
            tile.faceTop = true;
            tile.faceBottom = false;
            tile.faceLeft = false;
            tile.faceRight = false;
        }
        if (tile.index == 1023){
            tile.setCollisionCallback(hitSpike, this);
        }
    }
    tilemap.setLayer('mainGrass');
    tilemap.forEach(function(tile){setTilePropertiesHelper(tile)},1,0,0,tilemap.width,tilemap.height);
}



// TODO: Finish these functions, put them in levels
function loadParallax(){
    game.load.image('sea', 'assets/tiles/Magic-Cliffs-Environment/PNG/sea.png')
}

function addParallax(){
    tilesprite = game.add.tileSprite(25*tileLength, 40*tileLength, 112, 96, 'sea');

}

function updateParallax(){

}