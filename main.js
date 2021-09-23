
var gameWidth = 800, gameHeight = 400;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS);
game.state.add('level1', demo.level1);
game.state.add('level2', demo.level2);
game.state.start('level1');

