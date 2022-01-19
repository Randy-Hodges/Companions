### Start up
All of these files are concerned with when the game first launches. As it is coded now, all game assets are loaded at the beginning of the game which makes transitioning between levels much much smoother because game assets don't have to be repeated loaded. The order that things are launched are
(main.js) -> Boot.js -> Preload.js -> title_screen.js

Boot.js deals with some game configurations.
Preload.js loads in assets and handles the loading bar.
title_screen.js handles the creation of the title screen and is basically a MagicCliffs level with some modifications.
