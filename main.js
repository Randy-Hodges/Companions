
var gameWidth = 700, gameHeight = 350;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS, "");

game.state.add('level0', demo.level0);
game.state.add('level1', demo.level1);
game.state.add('level1_1', demo.level1_1);
game.state.add('level1_2', demo.level1_2);


// level select
game.state.add("PlayGame", level_select.playGame);
game.state.add("PlayLevel", level_select.playLevel);
game.state.start("PlayGame");