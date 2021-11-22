demo.overworldMap = function(){};
demo.overworldMap.prototype = {
    preload: function(){
        loadGameConfigs();

        // loading in assets for map
        game.load.tilemap('overworldMap', "assets/tilemaps/overworld/overworld.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('RedMarket', "assets/overworld_map/Buildings/Red/RedMarket.png");
        game.load.image('RedTaverns', "assets/overworld_map/Buildings/Red/RedTaverns.png");
        game.load.image('TexturedGrass', "assets/overworld_map/Ground/TexturedGrass.png");
        game.load.image('Trees', "assets/overworld_map/Nature/Trees.png");
        game.load.image('Cliff', "assets/overworld_map/Ground/Cliff.png");
        game.load.image('AssortedGround', "assets/overworld_map/Ground/Grass.png");
        game.load.image('Chests', "assets/overworld_map/Miscellaneous/Chests.png");
        game.load.image('QuestBoard', "assets/overworld_map/Miscellaneous/QuestBoard.png");
        game.load.image('Rocks', "assets/overworld_map/Nature/Rocks.png");
        game.load.image('StreetSigns', "assets/overworld_map/Miscellaneous/StreetSigns.png");
        game.load.image('Static_cloud_group', "assets/tiles/painted style/PNG/Mountains/Layer 1 cloud anim1.png");
        game.load.image('Static_cloud_large', "assets/tiles/painted style/PNG/Mountains/Layer 3 cloud anim1.png");

        game.load.image('Moving_cloud', "assets/overworld_map/Clouds/cloud1.png");
        game.load.image('Moving_cloud2', "assets/overworld_map/Clouds/cloud2.png");

        // game.load.image('background', "");

        // change this later
        game.load.audio('mapMusic', "assets/audio/music/Personality Test.mp3");

    },

    create: function(){     
        // configs
        createGameConfigs();
        
        // music
        if (!addedAudio){
            backtrack = game.add.audio('mapMusic');
            backtrack.play();
            backtrack.volume = .1;
            addedAudio = true;
        }

        // Tilemap
        var map = game.add.tilemap('overworldMap');
        map.addTilesetImage('Overworld_RedMarket','RedMarket'); // make sure the tileset name is the same as the tileset name used in Tiled
        map.addTilesetImage('Overworld_RedTaverns','RedTaverns');
        map.addTilesetImage('Overworld_TexturedGrass','TexturedGrass');
        map.addTilesetImage('Overworld_Trees','Trees');
        map.addTilesetImage('Overworld_cliff','Cliff');
        map.addTilesetImage('Overworld_AssortedGround','AssortedGround');
        map.addTilesetImage('Overworld_Chests','Chests');
        map.addTilesetImage('Overworld_QuestBoard','QuestBoard');
        map.addTilesetImage('Overworld_Rocks','Rocks');
        map.addTilesetImage('Overworld_StreetSigns','StreetSigns');

        map.addTilesetImage('Layer 1 cloud anim1','Static_cloud_group');
        map.addTilesetImage('Layer 3 cloud anim1','Static_cloud_large');

        map.createLayer('Water');   
        map.createLayer('Background');
        map.createLayer('Cloud Layer 1');
        map.createLayer('Cloud Layer 2');  

        var layer = map.createLayer('Landscape');
        layer.scale.set(1);
        layer.resizeWorld();

        style = { fontSize: '11px', fill: '#fff', backgroundColor: '#343131' };

        // create view, clouds, level select UI, change as more levels are unlocked
        if (level3Unlocked){ // 3 unlocked
            game.camera.x = 540;
            game.camera.y = 230;

            // clouds for level 3
            level3_clouds();
            
            levelUI = game.add.text(8, 8, "  Use the arrow keys to move around the map.  \n      • 'V' - Village\n      • 'R' - Rocky Pass\n      • 'A' - Abandoned Caverns\n      • 'S' - Slime Valley", style);
            levelUI.fixedToCamera = true;
        } else if (level2Unlocked){ // level 2 unlocked
            game.camera.x = 85;
            game.camera.y = 525;

            // clouds for level 3
            level3_clouds();
            // clouds for level 2
            level2_clouds();

            levelUI = game.add.text(8, 8, "  Use the arrow keys to move around the map.  \n      • 'V' - Village\n      • 'R' - Rocky Pass\n      • 'A' - Abandoned Caverns", style);
            levelUI.fixedToCamera = true;
        } else if (level1Unlocked){ // level 1 unlocked
            game.camera.x = 25;
            game.camera.y = 375;

            // clouds for level 3
            level3_clouds();
            // clouds for level 2
            level2_clouds();   

            levelUI = game.add.text(8, 8, "  Use the arrow keys to move around the map.  \n      • 'V' - Village\n      • 'R' - Rocky Pass", style);
            levelUI.fixedToCamera = true;



            // If we want to use a background image, uncomment this
                // UI_background = game.add.sprite(0, 0, 'background');
                // UI_background.scale.setTo(0.25, 0.25);

                // UI_background.fixedToCamera = true;
                // style = { font: "16px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: UI_background.width, align: "center", backgroundColor: "#000" };

                // text = game.add.text(0, 0, "- text on a sprite", style);
                // text.anchor.set(0.5);
        } else { // start of game
            game.camera.x = 300;
            game.camera.y = 400;

            // clouds for level 3
            level3_clouds();
            // clouds for level 2
            level2_clouds();

            levelUI = game.add.text(8, 8, "  Use the arrow keys to move around the map.  \n      • 'V' - Village", style);
            levelUI.fixedToCamera = true;
        }

        // level select
        addLevelSpawns()

        // add level select method eventually
    },
    
    update: function(){
        // update view
        updateView()

        // If we want to use a background image, uncomment this
            // text.x = Math.floor(UI_background.x + UI_background.width / 2);
            // text.y = Math.floor(UI_background.y + UI_background.height / 2);

    }
};

function addKeyCallback(key, fn, args) {
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
};

function addLevelSpawns() {
    if (level3Unlocked || devTools){
        // scene change for level 3
        addKeyCallback(Phaser.Keyboard.S, function(){backtrack.destroy(); addedAudio = false; spawn = 1; changeLevel(this, '3-0');});
    }

    if (level2Unlocked || devTools){
        // scene change for level 2
        addKeyCallback(Phaser.Keyboard.A, function(){backtrack.destroy(); addedAudio = false; spawn = 1; changeLevel(this, '2-0');});
    }

    if (level1Unlocked || devTools){
        // scene change for level 1
        addKeyCallback(Phaser.Keyboard.R, function(){backtrack.destroy(); addedAudio = false; spawn = 1; changeLevel(this, '1-0');}); 
    }

    // scene change for village
    addKeyCallback(Phaser.Keyboard.V, function(){backtrack.destroy(); addedAudio = false; changeLevel(this, '0');});
};

function updateView() {
    // map update controls
    customKeys = new CustomKeys();
    
    if (customKeys.isDown('UP'))
    {
        game.camera.y -= 4;
    }
    else if (customKeys.isDown('DOWN'))
    {
        game.camera.y += 4;
    }
    if (customKeys.isDown('LEFT'))
    {
        game.camera.x -= 4;
    }
    else if (customKeys.isDown('RIGHT'))
    {
        game.camera.x += 4;
    }
};

function level2_clouds() {
    cloud7 = game.add.sprite(275, 700, 'Moving_cloud2');
    cloud7.anchor.set(0.5);
    
    cloud6 = game.add.sprite(375, 695, 'Moving_cloud');
    cloud6.anchor.set(0.5);

    cloud5 = game.add.sprite(250, 675, 'Moving_cloud2');
    cloud5.anchor.set(0.5);

    cloud4 = game.add.sprite(350, 625, 'Moving_cloud2');
    cloud4.anchor.set(0.5);

    cloud3 = game.add.sprite(315, 665, 'Moving_cloud');
    cloud3.anchor.set(0.5);

    cloud2 = game.add.sprite(300, 725, 'Moving_cloud');
    cloud2.anchor.set(0.5);

    cloud1 = game.add.sprite(375, 650, 'Moving_cloud2');
    cloud1.anchor.set(0.5);

    if (level2Unlocked){
        game.add.tween(cloud2).to({ x: 1500 }, 25000, Phaser.Easing.Out, true);
        game.add.tween(cloud3).to({ x: -100 }, 15000, Phaser.Easing.Out, true);
        game.add.tween(cloud4).to({ x: -100 }, 10000, Phaser.Easing.Out, true);
        game.add.tween(cloud5).to({ x: 1500 }, 22000, Phaser.Easing.Out, true);
        game.add.tween(cloud6).to({ x: 1500 }, 20000, Phaser.Easing.Out, true);
        game.add.tween(cloud7).to({ x: -100 }, 7000, Phaser.Easing.Out, true);
        game.add.tween(cloud1).to({ x: -100 }, 14000, Phaser.Easing.Out, true);
    }
}

function level3_clouds() {
    x_rel_level3 = 470;
    y_rel_level3 = -250;
    
    cloud14 = game.add.sprite(275 + x_rel_level3, 700 + y_rel_level3, 'Moving_cloud2');
    cloud14.anchor.set(0.5);
    
    cloud13 = game.add.sprite(375 + x_rel_level3, 695 + y_rel_level3, 'Moving_cloud');
    cloud13.anchor.set(0.5);

    cloud12 = game.add.sprite(250 + x_rel_level3, 675 + y_rel_level3, 'Moving_cloud2');
    cloud12.anchor.set(0.5);

    cloud11 = game.add.sprite(350 + x_rel_level3, 625 + y_rel_level3, 'Moving_cloud2');
    cloud11.anchor.set(0.5);

    cloud10 = game.add.sprite(315 + x_rel_level3, 665 + y_rel_level3, 'Moving_cloud');
    cloud10.anchor.set(0.5);

    cloud9 = game.add.sprite(300 + x_rel_level3, 725 + y_rel_level3, 'Moving_cloud');
    cloud9.anchor.set(0.5);

    cloud8 = game.add.sprite(375 + x_rel_level3, 650 + y_rel_level3, 'Moving_cloud2');
    cloud8.anchor.set(0.5);

    if (level3Unlocked){
        game.add.tween(cloud9).to({ x: 1500 }, 25000, Phaser.Easing.Out, true);
        game.add.tween(cloud10).to({ x: -100 }, 15000, Phaser.Easing.Out, true);
        game.add.tween(cloud11).to({ x: -100 }, 25000, Phaser.Easing.Out, true);
        game.add.tween(cloud12).to({ x: 1500 }, 22000, Phaser.Easing.Out, true);
        game.add.tween(cloud13).to({ x: 1500 }, 20000, Phaser.Easing.Out, true);
        game.add.tween(cloud14).to({ x: -100 }, 18000, Phaser.Easing.Out, true);
        game.add.tween(cloud8).to({ x: -100 }, 14000, Phaser.Easing.Out, true);
    }
}