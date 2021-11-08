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

        // change this later
        game.load.audio('mapMusic', "assets/audio/music/PMD Remix/Personality Test.mp3");

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

        // create view, clouds, level select UI, change as more levels are unlocked
        if (level2Unlocked){ // level 2 unlocked
            game.camera.x = 85;
            game.camera.y = 525;

            // clouds for level 2
            level2_clouds();

            levelSelect = game.add.text(8,8,"Use the arrow keys to move around the map. \nPress 'V' to go to the Village. \nPress 'C' to go to Level 1. \nPress 'H' to go to Level 2.", { fontSize: '11px', fill: '#fff' });
        } else if (level1Unlocked){ // level 1 unlocked
            game.camera.x = 25;
            game.camera.y = 375;

            // clouds for level 2
            level2_clouds();   

            levelSelect = game.add.text(8,8,"Use the arrow keys to move around the map. \nPress 'V' to go to the Village. \nPress 'C' to go to Level 1.", { fontSize: '11px', fill: '#fff' });
        } else { // start of game
            game.camera.x = 300;
            game.camera.y = 400;

            // clouds for level 2
            level2_clouds();

            levelSelect = game.add.text(8,8,"Use the arrow keys to move around the map. \nPress 'V' to go to the Village.", { fontSize: '11px', fill: '#fff'});
        }

        // level select
        addLevelSpawns()

        // add level select method eventually
    },
    
    update: function(){
        // update view
        updateView()

    }
};

function addKeyCallback(key, fn, args) {
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
};

function addLevelSpawns() {
    // scene change for village
    addKeyCallback(Phaser.Keyboard.V, function(){backtrack.destroy(); addedAudio = false; changeLevel(this, '0');});
    // scene change for level 1
    addKeyCallback(Phaser.Keyboard.C, function(){backtrack.destroy(); addedAudio = false; spawn = 0; spawndirection = -1; changeLevel(this, '1-0');}); 
    // scene change for level 2
    addKeyCallback(Phaser.Keyboard.H, function(){backtrack.destroy(); addedAudio = false; spawn = 1; spawndirection = -1; changeLevel(this, '2-0');});
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