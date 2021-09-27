// Currently not used

/*
Heart = function(game, x, y){        
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, 'heart');
    //this.anchor.setTo(.5,.5);   
    this.scale.setTo(1,1);

    // Animations
    this.animations.add('heartbeat', [0,1,2,3,4,5]);
}


Heart.prototype = Object.create(Phaser.Sprite.prototype);
Heart.prototype.constructor = Heart;


// (Automatically called by World.update)
Heart.prototype.update = function() {
    this.animations.play('heartbeat', 6);
}
*/