// GoldenHeart - Heart Collectible that heals to max
GoldenHeart = function(game, x, y){        
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, 'gold heart');
    this.scale.setTo(1,1);

    // Animations
    this.animations.add('heartbeat', [0,1,2,3,4,5]);

    // physics
    game.physics.enable(this);
    this.body.acceleration.y = -globalGravity;

    this.killable = true;

}

GoldenHeart.prototype = Object.create(Phaser.Sprite.prototype);
GoldenHeart.prototype.constructor = GoldenHeart;

// (Automatically called by World.update)
GoldenHeart.prototype.update = function() {
    this.animations.play('heartbeat', 10);
    game.physics.arcade.overlap(currentPlayer, goldHeartGroup, function(player, heart){heart.kill(); healMaxHearts(); /*heartCollect.play();*/});
}


GoldenHeart.prototype.kill = function(){
    if (basePlayer.currentHearts < basePlayer.maxHearts){
        if (this.killable){
            this.destroy();   
        }
    }
}