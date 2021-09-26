
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
    this.animations.add('dying', [1,17,18,19,20], frameRate = 10);
    dying = this.animations.getAnimation('dying');
    dying.killOnComplete = true;

    // physics
    game.physics.enable(this);
    this.body.setSize(18,11,7,14);
    this.movement_speed = 60;
    this.body.velocity.x = this.movement_speed;
    this.body.maxVelocity.x = this.movement_speed;

    this.damage = {none: false, left: true, right: true, up: false, down: true};

    this.stopAnimations = false;

    }




GDSlime.prototype = Object.create(Phaser.Sprite.prototype);
GDSlime.prototype.constructor = GDSlime;


// (Automatically called by World.update)
GDSlime.prototype.update = function() {
    if (enemyGroup){
        game.physics.arcade.collide(enemyGroup, enemyGroup, function(enemy1, enemy2){switchDirectionSlime(enemy1); switchDirectionSlime(enemy2)});
    }
    if (this.body.blocked.right || this.body.blocked.left){
        switchDirectionSlime(this);
    }
    this.body.velocity.x = this.movement_speed;
    if (!this.stopAnimations){
        this.animations.play('moving', 10, true);
    }
};

GDSlime.prototype.die = function() {
    console.log('dying')
    this.body.enable = false;
    this.stopAnimations = true;
    this.animations.play('dying');
}


function switchDirectionSlime(slime) {
    slime.movement_speed *= -1;
    slime.scale.x = -slime.scale.x;
}



