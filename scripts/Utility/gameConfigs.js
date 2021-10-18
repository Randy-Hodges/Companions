globalGravity = 400;

function loadGameConfigs(){
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();
    textOffsetX = 100;
    textWidth = game.width - textOffsetX;
    textHeight = game.height/5;
}
    
function createGameConfigs(){
    // configs
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = globalGravity;
    game.stage.backgroundColor = 'aeffee';
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
}