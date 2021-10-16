// frog

companion02 = function(game,x,y){
    Companion.call(this, game, x, y, 'companion02');
    
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, 'frog');
    this.anchor.setTo(.5,.5);   
    this.scale.setTo(.6,.6);
}

companion02.prototype = Object.create(Companion.prototype);
Object.defineProperty(companion02.prototype, 'constructor', {
    value: companion02,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true });

Companion.prototype.update = function() {
    
    this.animations.play('frog idle');
    //PlayerClass.increaseMaxJumps(1);
    game.physics.arcade.moveToObject(this, currentPlayer, 60, 1000);
    
};
