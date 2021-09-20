var game = new Phaser.Game(600, 400, Phaser.AUTO)
game.state.add('level1', demo.level1)
game.state.start(level1)    