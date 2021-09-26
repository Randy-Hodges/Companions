var playerJumpButton, currentPlayer;


Player = function(game, x = gameWidth/2, y = gameHeight/2){        
    // instantiate Sprite object
    Phaser.Sprite.call(this, game, x, y, 'player');
    this.anchor.setTo(.5,.5);   
    this.scale.setTo(spawndirection,1);

    // add animations
    this.animations.add('idle side', [11,12,13,14,15]);
    this.animations.add('walk side', [16,17,18,19,20,21]);
    this.frame = 11;

    // physics
    this.accelx = 750;
    game.physics.enable(this);
    this.body.setSize(9,28,28,20); // Creating hitbox. first two params are size of body, second two are offset of body
    this.body.gravity.y = 500;
    this.body.drag.x = 800;
    this.body.maxVelocity.x = 180;
    this.body.maxVelocity.y = 400;
    this.body.collideWorldBounds = true;

    // jumping
    this.jumpAccel = -3070;
    this.jumpInputTime = 120 //ms
    this.jumpStorage = 0; // should be initialized to 0, can increase for dev purposes
    this.currentlyJumping = false;
    currentPlayer = this;
    playerJumpButton =  game.input.keyboard.addKey(Phaser.Keyboard.W);
    playerJumpButton.onDown.add(
        function(){
            // give player ability to jump when touching ground
            if (currentPlayer.body.blocked.down && currentPlayer.jumpStorage == 0){
                currentPlayer.jumpStorage += 1;
            }
            // jumping 
            if (currentPlayer.jumpStorage > 0){
                //currentPlayer.jumpStorage -= 1; // comment this line out for infinite jumps ************************
                currentPlayer.currentlyJumping = true;
                //currentPlayer.body.velocity.y = currentPlayer.jumpVel;
                currentPlayer.body.acceleration.y = currentPlayer.jumpAccel;
            }
        })
    playerJumpButton.onUp.add(
        function(){
            currentPlayer.currentlyJumping = false;
            currentPlayer.body.acceleration.y = 0;
        })
    
    }




Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;


// (Automatically called by World.update)
Player.prototype.update = function() {
    playerSpeed = 1;
    customKeys = new CustomKeys();
    // ----- LATERAL MOVEMENT -----
    // Left (Movement)
    if (customKeys.isDown("A")){
        this.body.acceleration.x = -this.accelx;
    }
    // Right
    if (customKeys.isDown("D")){
        this.body.acceleration.x = this.accelx;
    }
    // No input
    if (customKeys.isUp("A") && customKeys.isUp("D")){
        this.body.acceleration.x = 0;
    }
    framerate = Math.abs(parseInt(this.body.velocity.x/50)) + 10;
    // left ****Animation****
    if (this.body.acceleration.x < 0){
        this.scale.x = Math.abs(this.scale.x);
        this.animations.play('walk side', framerate);
    }
    // right
    else if (this.body.acceleration.x > 0){
        this.scale.x = -Math.abs(this.scale.x);
        this.animations.play('walk side', framerate);
    }
    // idle
    if (this.body.velocity.x == 0) {
        this.animations.play('idle side', 10, true);
    }
    // ----- VERTICAL MOVEMENT -----
    // Jumping is mostly controlled under the section 'jumping' located in the Player function.
    if ( playerJumpButton.duration > currentPlayer.jumpInputTime){
        currentPlayer.currentlyJumping = false;
        currentPlayer.body.acceleration.y = 0;
    }
    // console.log(this.body.blocked.down)
    // if (customKeys.isDown("W") && this.currentlyJumping && playerJumpButton.duration < 300 && playerJumpButton.duration > 60){
    //     this.body.acceleration.y = -1000;
    //     console.log('ayooo')
    // }
};



/*
class Player extends Phaser.Sprite{
    constructor(){
        
        // new PIXI.BaseTexture("assets/sprites/characters/RPG Character/_side idle.png")
        super(game, gameWidth/2, gameHeight/2, game.load.spritesheet('player', "assets/sprites/characters/RPG Character/_side idle.png", 64, 64));
        this.anchor.x = .5;
        this.anchor.y = .5;
        //this.createAnimations();
        //this.animations.play('idle side', 20, true);
    }

    createAnimations(){
        game.load.spritesheet('idle side', "assets/sprites/characters/RPG Character/_side idle.png", 64, 64);
        game.load.spritesheet('walk side', "assets/sprites/characters/RPG Character/_side walk.png", 64, 64);
        this.animations.add('idle side');
        this.animations.add('walk side');
    }
}
*/

// function playerTryJump(player){
//     console.log('ayoooo')
//     // give player ability to jump when touching ground
//     // if (player.body.blocked.down && player.jumpStorage == 0){
//     //     player.jumpStorage += 1;
//     // }
//     // // jumping 
//     // if (player.jumpStorage > 0){
//     //     player.jumpStorage -= 1;
//     //     //player.body.velocity.y = player.jumpVel;
//     // }
//     // console.log(player.jumpStorage)
// }
