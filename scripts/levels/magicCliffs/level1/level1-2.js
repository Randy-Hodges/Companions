
demo.level1_2 = function () { };
demo.level1_2.prototype = {
    preload: function () {
        loadAssetsMC();
        game.load.tilemap('level1-2', "assets/tilemaps/Levels/level 1/level1-2.json", null, Phaser.Tilemap.TILED_JSON);

        // Event Specific
        loadHeadshots();
        game.load.spritesheet('grandfather', "assets/sprites/enemies/Plague Doctor/plague_doctor_sheet.png", 64, 64);
    },
    create: function () {
        // configs
        createGameConfigs();

        //spawn points (in tiles)
        this.createSpawnPoints();

        addTilemapMC("level1-2");

        // Warp points (doing it with coins bc I'm pressed for time)
        warp1 = new Warp(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength);
        warp2 = new Warp(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength);
        game.add.existing(warp2);

        // Coins, Enemies, Player
        addCoins();
        addHearts();
        addEnemiesMC();
        addPlayer();

        // Tilemap Infront
        tilemap.createLayer('front');

        addUI();

        this.setUpEvents();
        this.setUpHiddens();
    },
    update: function () {
        // Collision
        game.physics.arcade.collide(currentPlayer, levelTiles);
        game.physics.arcade.collide(enemyGroup, levelTiles);

        // Warping
        game.physics.arcade.overlap(currentPlayer, warp1, function(){transitionLevel('1-1', false, 2);});
        game.physics.arcade.overlap(currentPlayer, warp2, function(){
            transitionLevel('0', true);
            level1Completed = true;
            level2Unlocked = true;
        });

        this.collideEvents();
        this.checkHiddens();
    },
    render: function () {
        //game.debug.body(player);
        // game.debug.spriteInfo(currentPlayer);
        // game.debug.geom(rect1, 'rgb(0,0,0)');
        // game.debug.geom(rect2, 'rgb(0,0,0)');
    },
    createSpawnPoints: function () {
        //SpawnPoints are in units of tiles
        spawnpoint1 = [10, 12];
        spawnpoint2 = [107, 22];
        if (spawn == 1) {
            spawnpoint = spawnpoint1.slice();
            spawnpoint[0] += 2;
            spawndirection = 1;
        }
        if (spawn == 2){
            spawnpoint = spawnpoint2.slice();
            spawnpoint[0] -= 2;
            spawndirection = -1;
        }
    },
    setUpEvents: function(){
        // Events
        if (!level1Completed) {
            rect1 = new Phaser.Rectangle(310, 0, 40, 1000); // x0, y0, width, height
            rect2 = new Phaser.Rectangle(1560, 0, 40, 1000); // x0, y0, width, height
            eventTrackingList = [false, false];
            // Companion
            companionGroup = game.add.group();
            pig = new CompanionPig(game, 1620, 410, false, false);
            game.add.existing(pig);
            companionGroup.add(pig)
        }
    },
    collideEvents: function () {
        if (!level1Completed) {
            if (eventTrackingList[0] == false) {
                if (rect1.intersects(currentPlayer.body)) {
                    event3_1_2();
                    eventTrackingList[0] = true;
                }
            }
            if (eventTrackingList[1] == false) {
                if (rect2.intersects(currentPlayer.body)) {
                    event4_1_2();
                    eventTrackingList[1] = true;
                }
            }
        }
    },
    setUpHiddens: function(){
        smallBell = game.add.audio('small bell');
        smallBell.volume = .1;
        if (hiddens12[0]){
            hidden1Layer = tilemap.createLayer('hidden1');
            hiddenRect1 = new Phaser.Rectangle(25*tileLength, 32*tileLength, 2*tileLength, 2*tileLength); // x0, y0, width, height
        }
    },
    checkHiddens: function(){
        if (hiddens12[0]){
            if (hiddenRect1.intersects(currentPlayer.body)){
                hiddens12[0] = false;
                hidden1Layer.alpha = 0;
                smallBell.play();
            }
        }
    }
};
