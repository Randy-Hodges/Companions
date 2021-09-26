var levelOneTilesTiles;
var i = 0;
GDSlime = function(game, x, y){        
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, 'greenDocileSlime');
    this.anchor.setTo(.5,.5); 
    scale = 1.3;  
    this.scale.setTo(-scale,scale);
    this.faceDirection = 1;

    // add animations
    this.animations.add('idle', [0,1,2,3]);
    this.animations.add('moving', [4,5,6,7]);
    this.animations.add('attacking', [8,9,10,11,12]);
    this.animations.add('hurt', [13,14,15,16])
    this.animations.add('dying', [1,17,18,19,20], frameRate = 10);
    dying = this.animations.getAnimation('dying');
    dying.killOnComplete = true;
    this.stopAnimations = false;

    // physics
    game.physics.enable(this);
    bodyOffsetX = 7;
    bodyOffsetY = 14;
    this.body.setSize(18,11,bodyOffsetX,bodyOffsetY);
    this.movement_speed = 60;
    this.body.velocity.x = this.movement_speed;
    this.body.maxVelocity.x = this.movement_speed;

    //damage player
    this.damage = {none: false, left: true, right: true, up: false, down: true};

    //ledge tracking sprite
    enfrente = game.add.sprite(0,0);
    enfrente.scale.setTo(scale, scale)
    game.physics.enable(enfrente);
    enfrente.body.allowGravity = false;
    enfrente.body.setSize(18,11, bodyOffsetX + this.faceDirection*10,0); // redundant bc it's recalculated in update
    this.enfrente = enfrente;
    this.addChild(enfrente);
    this.timeLastSwitch = game.time.now;
    levelOneTilesTiles = levelOneTiles.getTiles(0,0,game.world.bounds.width, game.world.bounds.height)
    }




GDSlime.prototype = Object.create(Phaser.Sprite.prototype);
GDSlime.prototype.constructor = GDSlime;


// (Automatically called by World.update)
GDSlime.prototype.update = function() {
    // Ledge Detection
    this.enfrente.body.setSize(18,11, - 9 + this.faceDirection*20,1);
    // offset to get correct tile of slime
    faceconstant = 0;
    if (this.faceDirection == 1){
        faceconstant = this.faceDirection*25;
    }
    // if they are on a no-collision tile and haven't switched direction in a while, switch direction
    if (!magicCliffsNoCollide.includes(levelOneTilesTiles[levelOneTiles.getTileY(this.body.position.y)*game.world.bounds.width/tileLength + levelOneTiles.getTileX(this.body.position.x + faceconstant)].index) //32 is body width
        && game.time.now - this.timeLastSwitch > 200){
            // console.log('switching');    
            switchDirectionSlime(this);
    }
    

    // Collision
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
    this.body.enable = false;
    this.stopAnimations = true;
    this.animations.play('dying');
}


function switchDirectionSlime(slime) {
    slime.timeLastSwitch = game.time.now;
    slime.faceDirection *= -1;
    slime.movement_speed *= -1;
    slime.scale.x *= -1;
}



