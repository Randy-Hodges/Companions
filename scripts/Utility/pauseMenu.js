// Pause Menu
function addPauseMenu(){

        // Create a label to use as a button
        pause_label = game.add.sprite(gameWidth-20, 20, 'Gear_LightBlue');
        pause_label.anchor.setTo(0.5, 0.5);
        pause_label.fixedToCamera = true;
        pause_label.inputEnabled = true;
        
        // When the pause button is pressed or ESC is pressed, pause
        pause_label.events.onInputUp.add(pause, self);
        addKeyCallback(Phaser.Keyboard.ESC, pause);

        // Add a input listener that can help us return from being paused
        game.input.onDown.add(unpause, self);
}

// Pause
function pause(event){
    game.paused = true;

    // Then add the menu
    console.log('Paused.');
    menu = game.add.text(currentPlayer.x, currentPlayer.y - 50, "Paused!!!", { fontSize: '18px', fill: '#000' }); //game.add.sprite(gameWidth-20, 20, 'Play_Blue');
    menu2 = game.add.text(currentPlayer.x - 1, currentPlayer.y - 51, "Paused!!!", { fontSize: '18px', fill: '#fff' });
    
    menu.anchor.setTo(0.5, 0.5);
    menu2.anchor.setTo(0.5, 0.5);
}

// Unpause
function unpause(event){

    // Only act if paused
    if(game.paused){
        // Remove the menu and the label
        console.log('Unpaused.');
        menu.destroy();
        menu2.destroy();
        game.paused = false;
    }
}