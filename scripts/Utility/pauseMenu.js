// Pause Menu
function loadPauseMenu(){

        // Create a label to use as a button
        pause_label = game.add.sprite(gameWidth-20, 20, 'Gear_LightBlue');
        pause_label.anchor.setTo(0.5, 0.5);
        pause_label.fixedToCamera = true;
        pause_label.inputEnabled = true;
        
        // When the pause button is pressed, pause
        pause_label.events.onInputUp.add(pause, self);

        // Add a input listener that can help us return from being paused
        game.input.onDown.add(unpause, self);
}

// Pause
function pause(event){
    game.paused = true;

    // Then add the menu
    console.log('Paused.');
    menu = game.add.text(currentPlayer.x, currentPlayer.y - 50, "Paused!!!", { fontSize: '18px', fill: '#000' }); //game.add.sprite(gameWidth-20, 20, 'Play_Blue');
    menu.anchor.setTo(0.5, 0.5);
}

// Unpause
function unpause(event){

    // Only act if paused
    if(game.paused){
        // Remove the menu and the label
        console.log('Unpaused.');
        menu.destroy();
        game.paused = false;
    }

}