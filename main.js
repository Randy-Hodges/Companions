
var gameWidth = 700, gameHeight = 480;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS);

// level select
game.state.add("Map", demo.overworldMap);
// game.state.start("Map");

game.state.add('level0', demo.level0);
game.state.add('level1-0', demo.level1);
game.state.add('level1-1', demo.level1_1);
game.state.add('level1-2', demo.level1_2);
game.state.start('level1-0');

