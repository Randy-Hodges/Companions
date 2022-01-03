var devTools = true; // Developer tools are turned on if true, otherwise, they are inactive

var gameWidth = 500, gameHeight = 315;
var game = new Phaser.Game(gameWidth, gameHeight, Phaser.CANVAS);
// level select
game.state.add('Map', demo.overworldMap);
game.state.add('level0', demo.level0);
game.state.add('level1-0', demo.level1_0);
game.state.add('level1-1', demo.level1_1);
game.state.add('level1-2', demo.level1_2);
game.state.add('level2-0', demo.level2_0);
game.state.add('level2-1', demo.level2_1);
game.state.add('level3-0', demo.level3_0);
game.state.add('level3-1', demo.level3_1);
game.state.add('title screen', demo.title_screen)
spawn = 1;
game.state.start('title screen');
