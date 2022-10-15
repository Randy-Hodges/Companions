
demo.title_screen = function () { 
    this.scrollCameraDown = false;
    this.font = "Georgia";
};
demo.title_screen.prototype = {
    preload: function () {
    },
    create: function () {
        // configs
        createGameConfigs();

        // music
        addMusic('discovery music', .2);

        // Tilemap
        addTilemapMC('title screen');

        // Spawn points
        this.createSpawnPoints();

        // Warp points
        warp1 = new Warp(game, spawnpoint1[0] * tileLength, spawnpoint1[1] * tileLength); // Custom class
        warp2 = new Warp(game, spawnpoint2[0] * tileLength, spawnpoint2[1] * tileLength);

        // Coins, Enemies, Player
        addCoins();
        addHearts();
        addEnemiesMC();
        addPlayer();
        currentPlayer.disableAllInput();
        currentPlayer.animations.play('idle side');
        game.camera.unfollow();

        // Tilemap Infront
        tilemap.createLayer('front');

        // Title screen stuff
        game.camera.x = 22 * tileLength;
        game.camera.y = 13 * tileLength;

        game.add.text(23 * tileLength, 14 * tileLength, "Companions",
            {
                font: this.font,
                fontSize: '72px',
                fill: '#fff',
                strokeThickness: 2

            })

        game.add.text(23 * tileLength, 20 * tileLength, "A platforming game",
            {
                font: this.font,
                fontSize: '28px',
                fill: '#fff',
                strokeThickness: 1

            })
        startText = game.add.text(game.width / 2, game.height - 20, "(Press Space to start)",
            {
                font: this.font,
                fontSize: '18px',
                fill: '#494',
                strokeThickness: 1

            })
        startText.anchor.setTo(.5, .5);
        startText.fixedToCamera = true;

        // Companions
        companionGroup = game.add.group();
        pig = new CompanionPig(game, 28 * tileLength, 30.4 * tileLength, false, false);
        pig.scale.x *= -1;
        game.add.existing(pig);
        companionGroup.add(pig);

        dragon = game.add.sprite(33 * tileLength, 51 * tileLength, 'concealed dragon');
        dragon.animations.add('awaken', [1,2,3,4,5,4,5,4,3,2,1], framerate = 10);
        dragon.scale.setTo(2.5, 2.5);

        fadeIn();
    },
    update: function () {
        // Collision
        game.physics.arcade.collide(currentPlayer, levelTiles);
        game.physics.arcade.collide(enemyGroup, levelTiles);

        // Warping
        game.physics.arcade.overlap(currentPlayer, warp1, function () { transitionLevel('0', newLevel = true) });
        game.physics.arcade.overlap(currentPlayer, warp2, function () { transitionLevel('1-1') });

        // Events
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.transitionToGame();
        }
        if (this.scrollCameraDown){
            game.camera.y += 2;
            startText.alpha -= .05;
            if (startText.alpha < 0){
                startText.alpha = 0;
            }
        }
        //this.collideEvents();
    },
    render: function () {
        // game.debug.body(currentPlayer.slash);
        // game.debug.spriteInfo(currentPlayer);
        // game.debug.geom(rect1, 'rgb(0,0,0)');
    },
    createSpawnPoints: function () {
        spawnpoint1 = [47, 27]
        spawnpoint2 = [229, 12];
        if (spawn == 1) {
            spawnpoint = spawnpoint1.slice();
            spawnpoint[0] -= 2;
            spawndirection = -1;
        }
        else {
            spawnpoint = spawnpoint2.slice();
            spawnpoint[0] -= 2;
            spawndirection = -1;
        }
    },
    transitionToGame: function () {
        if (this.scrollCameraDown){
            return
        }
        this.scrollCameraDown = true;
        var timer1 = game.time.create();
        timer1.add(5000, function () {
            transitionLevel('level1-0', true);
        });
        var timer2 = game.time.create();
        timer2.add(4500, function(){
            dragon.animations.play("awaken");
        })
        timer1.start();
        timer2.start();
    }
};



