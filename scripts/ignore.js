
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

 // console.log(this.body.blocked.down)
    // if (customKeys.isDown("W") && this.currentlyJumping && playerJumpButton.duration < 300 && playerJumpButton.duration > 60){
    //     this.body.acceleration.y = -1000;
    //     console.log('ayooo')
    // }

// {
    //     preload: function(){},
    //     create: function(){
    //         game.stage.backgroundColor = 'a1bbee';
    //         console.log('level 2');
    //         game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(changeLevel, null, null, 1);
    //         game.input.keyboard.addKey(Phaser.Keyboard.TWO).onDown.add(changeLevel, null, null, 2);
    //     },
    //     update: function(){}
    //}