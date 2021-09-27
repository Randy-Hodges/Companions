demo.level0 = function(){};
demo.level0.prototype = {
    preload: function(){},
    create: function(){
        
        
    },
    update: function(){
        
        // Collision
        game.physics.arcade.collide(currentPlayer, levelZeroTiles);

        // Warping
        game.physics.arcade.collide(currentPlayer, warp1, function(player, coin){spawn = 1; spawndirection = 1; changeLevel(0,"1_1");});
        game.physics.arcade.collide(currentPlayer, warp2, function(player, coin){spawn = 2; spawndirection = -1; changeLevel(0,"1_1");});
        updateMoney();
        
    }
}