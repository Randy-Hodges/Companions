
demo.title_screen = function(){};
demo.title_screen.prototype = {
    preload: function(){
    },
    create: function(){
        // configs
        createGameConfigs();

        // music
        addMusic('discovery music', .2);

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

        // Title screen stuff
        game.camera.x = 22*tileLength;
        game.camera.y = 13*tileLength;
        game.add.text(23*tileLength, 14*tileLength, "Companions", 
            { 
            font: "Georgia",
            fontSize: '72px', 
            fill: '#fff' , 
            strokeThickness: 2
        
        })

        game.add.text(23*tileLength, 20*tileLength, "A platforming game", 
            { 
            font: "Georgia",
            fontSize: '28px', 
            fill: '#fff' , 
            strokeThickness: 1
        
        })
        startText = game.add.text(game.width/2, game.height - 20, "(Press Space to start)", 
            { 
            font: "Georgia",
            fontSize: '18px', 
            fill: '#494' , 
            strokeThickness: 1
        
        })
        startText.anchor.setTo(.5, .5);
        startText.fixedToCamera = true;
        // startText.body.enable = true;
        game.physics.arcade.enable([startText]);
        startText.body.velocity.setTo(0, 10);
        startText.body.collideWorldBounds = true;
        startText.body.bounce.set(1);

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



