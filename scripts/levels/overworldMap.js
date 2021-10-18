var cloud;

demo.overworldMap = function(){};
demo.overworldMap.prototype = {
    preload: function(){
        loadGameConfigs();

        // loading in assets
        game.load.tilemap('overworldMap', "assets/tilemaps/overworld/overworld.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('RedMarket', "assets/overworld_map/Buildings/Red/RedMarket.png");
        game.load.image('RedTaverns', "assets/overworld_map/Buildings/Red/RedTaverns.png");
        game.load.image('TexturedGrass', "assets/overworld_map/Ground/TexturedGrass.png");
        game.load.image('Trees', "assets/overworld_map/Nature/Trees.png");
        game.load.image('Cliff', "assets/overworld_map/Ground/Cliff.png");
        game.load.image('AssortedGround', "assets/overworld_map/Ground/Grass.png");
        game.load.image('Cloud', "assets/tiles/painted style/PNG/Mountains/Layer 1 cloud anim1.png");
        game.load.image('Cloud2', "assets/tiles/painted style/PNG/Mountains/Layer 3 cloud anim1.png");
        
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
        map.addTilesetImage('Layer 1 cloud anim1','Cloud');
        map.addTilesetImage('Layer 3 cloud anim1','Cloud2');
        map.createLayer('Water');   
        map.createLayer('Background');
        map.createLayer('Cloud Layer 1');
        map.createLayer('Cloud Layer 2');  

        var layer = map.createLayer('Landscape');
        layer.scale.set(1);
        layer.resizeWorld();

        // create view stuff, start at village on map, change map view as more levels are unlocked
        if (unlock == 2){ // level 2 unlocked
            game.camera.x = 225;
            game.camera.y = 675;

            // add moving cloud layers
            cloud1 = game.add.sprite(500, 800, 'Cloud');
            cloud1.anchor.set(0.5);
        } else { // start of game
            game.camera.x = 225;
            game.camera.y = 675;

            // add moving cloud layers
            cloud1 = game.add.sprite(500, 800, 'Cloud');
            cloud1.anchor.set(0.5);

            // add more moving cloud layers as more levels are made
    
        }

        // level select UI
        levelSelect = game.add.text(8,8,"Use WASD to move around the map. \nPress 'C' to go to Level 1. \nPress 'V' to go to the Village.", { fontSize: '12px', fill: '#fff' });
        levelSelect.fixedToCamera = true;

        // add moving cloud layers
        cloud1 = game.add.sprite(500, 800, 'Cloud');
        cloud1.anchor.set(0.5);

        // example cloud movement (will be updated and be place in the update function eventually)
        game.add.tween(cloud1).to({ x: -100 }, 4000, Phaser.Easing.Out, true);
        
        // level select
        addLevelSpawns()
    },
    
    update: function(){

        // update view
        updateView()

        // cloud layer update
        // example cloud movement (will be updated and be place in the update function eventually)
        if (unlock == 2){ // level 2 unlocked
            game.add.tween(cloud1).to({ x: -100 }, 4000, Phaser.Easing.Out, true);
        }

    }
};

function addKeyCallback(key, fn, args) {
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
};

function addLevelSpawns() {
    // scene change for village
    addKeyCallback(Phaser.Keyboard.V, function(){backtrack.destroy(); addedAudio = false; changeLevel(this, '0');});
    // scene change for level 1
    addKeyCallback(Phaser.Keyboard.C, function(){backtrack.destroy(); addedAudio = false; changeLevel(this, '1-0');}); 
};

function updateView() {
    // map update controls
    customKeys = new CustomKeys();
    // game.input.onDown.add(resize(), this);
    
    if (customKeys.isDown('W'))
    {
        game.camera.y -= 4;
    }
    else if (customKeys.isDown('S'))
    {
        game.camera.y += 4;
    }
    if (customKeys.isDown('A'))
    {
        game.camera.x -= 4;
    }
    else if (customKeys.isDown('D'))
    {
        game.camera.x += 4;
    }
};

// function resize() {
//     // layer.offset.x += 50;

//     if (layer.displayWidth !== undefined)
//     {
//         var w = layer.displayWidth + 100;
//         var h = layer.displayHeight + 100;
//         layer.resize(w, h);
//     }
//     else
//     {
//         if (layer.width < 800)
//         {
//             var w = layer.width + 100;
//             var h = layer.height + 100;
//             layer.resize(w, h);
//         }
//     }
// };