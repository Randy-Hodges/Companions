<h1 align='center'> Companions </h1>

---------- 
![title screen](./assets/media/github/title_screen.gif)


## Welcome to the game

Welcome to our project. Companions is game that was inspired by video games we developers played as kids which has resulted in our game being similar to a mix of Mario, Hollow Knight, and Pokemon Mystery Dungeon. Whether you're here because you played the demo or for another reason, we're excited to see that you're interested in the code.

>You can see all of our current, future, and past tasks by visiting our trello board: https://trello.com/b/VMfbqora

### File layout

./assets - Contains all of the assets used for the game. This includes all images, sprites, and audio.
./phaser - The phaser game engine (downloaded from the phaser website). This goes untouched.
./scripts - Contains all of our scripts and logic for running the game. The files in this folder define how characters move, when sounds are played, and much much more.
./unused - Contains all of the assets that are currently not being used in the game. This is a convienient place to store cool, free assets that we have found, but separates them from our current assets so that the game can be compiled easier when uploading to a site like itch.io.

#### Start-up flow
When the game is initially started, the files are activated as follows: ./index.html -> ./main.js -> ./scripts/levels/Start-up/Boot.js -> /scripts/levels/Start-up/Preload.js -> /scripts/levels/Start-up/title_screen.js.
From that point forward, player input decides when and how files/levels are activated.

### People

#### Randy Hodges 
- Responsible for nearly everything in this repo.
- Contact: 
  - Email: randyhodges0303@gmail.com
#### Lori Vanhoose 
- Responsible for Village Design and Companion design. 
#### Joshua Oh
- Responsible for Overworld map design and overworld map code. 

