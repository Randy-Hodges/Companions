var cursors;

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
        
        // change this later
        game.load.audio('backtrack', "assets/audio/music/PMD Remix/Personality Test.mp3");

    },

    create: function(){     
        // configs
        createGameConfigs();
        
        // music
        if (!addedAudio){
            backtrack = game.add.audio('backtrack');
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

        map.createLayer('Background');  
        // map.createLayer('Landscape');

        var layer = map.createLayer('Landscape');
        layer.scale.set(1);
        layer.resizeWorld();

        // create view stuff, start at village on map
        game.camera.x = 80;
        game.camera.y = 1000;
        cursors = game.input.keyboard.createCursorKeys();
        // game.input.onDown.add(resize(), this);

        // level select UI
        levelSelect = game.add.text(8,8,"Use WASD to move around the map. \nPress 'C' to go to Level 1.", { fontSize: '18px', fill: '#fff' });
        levelSelect.fixedToCamera = true;


        // Eventually add cloud layer code
        
    },
    
    update: function(){
        // level select
        addLevelSpawns()

        // update view
        updateView()

        // Eventually add cloud layer update code
    
    }
}

function addKeyCallback(key, fn, args) {
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
};

function addLevelSpawns() {
    // scene change for village
    // addKeyCallback(Phaser.Keyboard.V, changeLevel, '0'); // uncomment when bug is fixed
    // scene change for level 1
    addKeyCallback(Phaser.Keyboard.C, changeLevel, '1-0'); 
};

function updateView() {
    if (cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 4;
    }
    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }
}

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