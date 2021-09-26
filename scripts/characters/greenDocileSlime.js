
GDSlime = function(game, x, y){        
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, 'greenDocileSlime');
    this.anchor.setTo(.5,.5);   
    this.scale.setTo(spawndirection,1);

    // add animations
    this.animations.add('idle', [0,1,2,3]);
    this.animations.add('moving', [4,5,6,7]);
    this.animations.add('attacking', [8,9,10,11,12]);
    this.animations.add('hurt', [13,14,15,16])
    this.animations.add('dying', [1,17,18,19,20]);


    // physics
    game.physics.enable(this);
    this.movement_speed = 60;
    this.body.velocity.x = this.movement_speed;
    this.body.maxVelocity.x = this.movement_speed;

    }




GDSlime.prototype = Object.create(Phaser.Sprite.prototype);
GDSlime.prototype.constructor = GDSlime;


// (Automatically called by World.update)
GDSlime.prototype.update = function() {
    if (this.body.blocked.right || this.body.blocked.left){
        this.movement_speed *= -1;
        this.body.velocity.x = this.movement_speed;
        this.scale.x = -this.scale.x;
    }
    this.animations.play('moving', 10, true);
};

