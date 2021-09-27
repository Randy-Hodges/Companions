function loadGameConfigs(){
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();
}
    
function createGameConfigs(){
    // configs
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 400;
    game.stage.backgroundColor = 'aeffee';
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
}