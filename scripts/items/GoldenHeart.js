// GoldenHeart - Heart Collectible that heals to max
GoldenHeart = function(game, x, y){        
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, 'gold heart');
    //this.anchor.setTo(.5,.5);   
    this.scale.setTo(1,1);

    // Animations
    this.animations.add('heartbeat', [0,1,2,3,4,5]);

    // physics
    game.physics.enable(this);
    //this.body.setSize(9,28,28,20); // Creating hitbox. first two params are size of body, second two are offset of body
    //this.body.data.gravityScale=0;
    this.body.acceleration.y = -400;

}

GoldenHeart.prototype = Object.create(Phaser.Sprite.prototype);
GoldenHeart.prototype.constructor = GoldenHeart;

// (Automatically called by World.update)
GoldenHeart.prototype.update = function() {
    this.animations.play('heartbeat', 10);
    game.physics.arcade.overlap(currentPlayer, goldHeartGroup, function(player, heart){killGoldHeart(); healFullHearts(); /*heartCollect.play();*/});
}


function killGoldHeart () {
    if (basePlayer.maxHearts > basePlayer.currentHearts) {
        heart.kill();
    }
}