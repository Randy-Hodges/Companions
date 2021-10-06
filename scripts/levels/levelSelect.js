demo.levelSelect = function(){};
demo.levelSelect.prototype = {
    preload: function(){
        game.load.tilemap('overworldMap', "assets/tilemaps/overworld/overworld.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('RedMarket', "assets\overworld_map\Buildings\Red\RedMarket.png");
        game.load.image('RedTaverns', "assets\overworld_map\Buildings\Red\RedTaverns.png");
        game.load.image('TexturedGrass', "assets\overworld_map\Ground\TexturedGrass.png");
        game.load.image('Trees', "assets\overworld_map\Nature\Trees.png");
        game.load.image('Cliff', "assets\overworld_map\Ground\Cliff.png");
        game.load.image('AssortedGround', "assets\overworld_map\Ground\Grass.png");
        
        game.load.audio('backtrack', "assets/audio/music/Blizzard Island.mp3");
    },

    create: function(){
        
        
    },
    
    update: function(){
        
        // Collision
        //game.physics.arcade.collide(currentPlayer, levelZeroTiles);

        // Warping
        //game.physics.arcade.collide(currentPlayer, shop1, function(player, coin){spawn = 1; spawndirection = 1; changeLevel(0,"0_1");});
        //game.physics.arcade.collide(currentPlayer, shop2, function(player, coin){spawn = 2; spawndirection = -1; changeLevel(0,"0_2");});
        //
        
    }
}