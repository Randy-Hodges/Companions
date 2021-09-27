// Coin - Money Collectible that gives 1 coin
Coin = function(game, x, y){        
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, 'coin');
    //this.anchor.setTo(.5,.5);   
    this.scale.setTo(1,1);

    // Animations
    this.animations.add('rotate', [0,1,2,3,4]);

    // physics
    game.physics.enable(this);
    this.body.acceleration.y = -400; // counteracts gravity

}


Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin;


// (Automatically called by World.update)
Coin.prototype.update = function() {
    this.animations.play('rotate', 10);
}