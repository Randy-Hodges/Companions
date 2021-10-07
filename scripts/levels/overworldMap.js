demo.overworldMap = function(){};
demo.overworldMap.prototype = {
    preload: function(){
        loadGameConfigs();
        
        game.load.tilemap('overworldMap', "assets/tilemaps/overworld/overworld.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('RedMarket', "assets/overworld_map/Buildings/Red/RedMarket.png");
        game.load.image('RedTaverns', "assets/overworld_map/Buildings/Red/RedTaverns.png");
        game.load.image('TexturedGrass', "assets/overworld_map/Ground/TexturedGrass.png");
        game.load.image('Trees', "assets/overworld_map/Nature/Trees.png");
        game.load.image('Cliff', "assets/overworld_map/Ground/Cliff.png");
        game.load.image('AssortedGround', "assets/overworld_map/Ground/Grass.png");
        
        game.load.audio('backtrack', "assets/audio/music/Blizzard Island.mp3");

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

        // Tilemap behind
        var map = game.add.tilemap('overworldMap');
        map.addTilesetImage('RedMarket','RedMarket'); // make sure the tileset name is the same as the tileset name used in Tiled
        map.addTilesetImage('RedTaverns','RedTaverns');
        map.addTilesetImage('TexturedGrass','TexturedGrass');
        map.addTilesetImage('Trees','Trees');
        map.addTilesetImage('Cliff','Cliff');
        map.addTilesetImage('AssortedGround','AssortedGround');
        map.createLayer('Background');  
        levelOneTiles = map.createLayer('mainGrass');  // layer name is the same as used in Tiled
        // Game borders based on tilemap
        game.world.setBounds(0, 0, map.layer.widthInPixels, map.layer.heightInPixels);

        // Add cloud layer code
        
    },
    
    update: function(){
        // level select
        addLevelSpawns()
        
    }
}

function addKeyCallback(key, fn, args) {
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
};

function addLevelSpawns() {
    addKeyCallback(Phaser.Keyboard.V, changeLevel, 0);
    addKeyCallback(Phaser.Keyboard.C, changeLevel, 1); 
};