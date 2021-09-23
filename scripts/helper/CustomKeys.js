class CustomKeys{
    constructor(){
        this.W = Phaser.Keyboard.W;
        this.A = Phaser.Keyboard.A;
        this.S = Phaser.Keyboard.S;
        this.D = Phaser.Keyboard.D;
    }
    processKey(key){
        // supporting string types ex: customKeys.isDown("A")
        if (typeof(key)=='string'){
            key = eval("this." + key.toUpperCase());
        }
        else{
            console.log('Key type is not a string, homie');
        }
        return key
    }
    isDown(key){
        key = this.processKey(key);
        return game.input.keyboard.isDown(key);
    }
    isUp(key){
        return !this.isDown(key);
    }
    // justPressed(key){
    //     key = this.processKey(key);
    //     return 
    // }
}