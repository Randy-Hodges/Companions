
magicCliffsNoCollide = [0,1768,1769,1801,1802,1803,1804,1805,1806,661,1831,1832,1833,1826,1827,646,642,644,643,1859,1891,
    1917,1221,1222,1223,1224,1225,1226,1227,1949,1297,1298,1299,1300,1302,1304,1305,1306,1307,1975,1279,1285,2007,
    2033,2065,1413,1423,2091,1396,1400,2123,1471,1481,2149,1455,1457,1529,1539,177,1836,1837,1839,1840,1842,1843,183,1894,1895,
    1897,1898,1900,1901,61,62,63,64,65,66,67,119,125,137,138,139,140,142,144,145,146,147,195,205,253,263,311,321,1815,1816,358,
    359,369,379,416,417,608,609,1337,1343,641,645,655,656,666,667,671,672,673,676,677,679,680,682,683,1401,699,731,734,735,737,
    738,740,741,757,789,815,847,873,905,931,963,989,661,1821,1520,1570,1571,1572,410,411,412,295,297,1455,1457,1587,1597,354,1514,
    1405,1579,1638,1350,1293,1294,1353,1412,1470,1527,1528,1581,1584,1640,1636,1637,1348,1349,1585,1639,1642];

exclusionLayer = {};

function loadHeadshots(){
    game.load.image('ghostHeadshot', "assets/sprites/characters/headshots/Ghost1.png");
    game.load.image('playerHeadshot', "assets/sprites/characters/headshots/Player1.png");
}


function changeToMap(i) {
    console.log('change to map');
    game.state.start('Map');
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
	
    if (tile.index == 2342){
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

function createGroups(){
    if (typeof coinGroup == 'undefined'){
        coinGroup = game.add.group();
    }
    if (typeof heartGroup == 'undefined'){
        heartGroup = game.add.group();
    }
    if (typeof enemyGroup == 'undefined'){
        enemyGroup = game.add.group();
    }
}