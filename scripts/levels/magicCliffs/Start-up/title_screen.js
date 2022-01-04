
demo.title_screen = function(){};
demo.title_screen.prototype = {
    preload: function(){
    },
    create: function(){
        // configs
        createGameConfigs();

        // music
        addMusic('criss cross skies music', .2);

        // Tilemap
        addTilemapMC('title screen');
        
        // Spawn points
        this.createSpawnPoints();

        // Warp points
        warp1 = new Warp(game, spawnpoint1[0]*tileLength, spawnpoint1[1]*tileLength); // Custom class
        warp2 = new Warp(game, spawnpoint2[0]*tileLength, spawnpoint2[1]*tileLength);

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

        game.camera.x = 22*tileLength;
        game.camera.y = 13*tileLength;

        // Companions
        companionGroup = game.add.group();
        pig = new CompanionPig(game,  28*tileLength, 30.4*tileLength, false, false);
        pig.scale.x *= -1;
        game.add.existing(pig);
        companionGroup.add(pig);
        // frog = new CompanionFrog(game, 47*tileLength, 27*tileLength, false, false);
        // game.add.existing(frog);
        // companionGroup.add(frog);

        fadeIn();
    },
    update: function(){
        // Collision
        game.physics.arcade.collide(currentPlayer, levelTiles);
        game.physics.arcade.collide(enemyGroup, levelTiles);

        // Warping
        game.physics.arcade.overlap(currentPlayer, warp1, function(){transitionLevel('0', newLevel = true)});
        game.physics.arcade.overlap(currentPlayer, warp2, function(){transitionLevel('1-1')});

        // Events
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            this.transitionToGame();
        }
        //this.collideEvents();
    },
    render: function(){
        // game.debug.body(currentPlayer.slash);
        // game.debug.spriteInfo(currentPlayer);
        // game.debug.geom(rect1, 'rgb(0,0,0)');
    },
    createSpawnPoints: function(){
        spawnpoint1 = [47, 27]
        spawnpoint2 = [229,12];
        if (spawn == 1){
            spawnpoint = spawnpoint1.slice();
            spawnpoint[0] -= 2;
            spawndirection = -1;
        }
        else{ 
            spawnpoint = spawnpoint2.slice();
            spawnpoint[0] -= 2;
            spawndirection = -1;
        }
    },
    transitionToGame: function(){
        transitionLevel('level1-0', true);
    }
};



