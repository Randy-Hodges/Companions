
var gameWidth = 700, gameHeight = 350;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS);

game.state.add('level0', demo.level0);
game.state.add('level1', demo.level1);
game.state.add('level1_1', demo.level1_1);
game.state.add('level1_2', demo.level1_2);
game.state.start('level1');

