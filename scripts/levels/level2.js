demo.level2 =  function(){};
demo.level2.prototype = {
    preload: function(){},
    create: function(){
        game.stage.backgroundColor = 'a1bbee';
        console.log('level 2');
        game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(changeLevel, null, null, 1);
        game.input.keyboard.addKey(Phaser.Keyboard.TWO).onDown.add(changeLevel, null, null, 2);
    },
    update: function(){}
};