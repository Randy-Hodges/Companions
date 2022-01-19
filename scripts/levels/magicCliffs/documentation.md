### Magic Cliffs
Magic cliffs refers to the tileset named MagicCliffs and I have put levels made with this tileset, along with some of the code that helps with this tile set's functionality/logic, into this MagicCliffs folder. 

The way the levels are layed out is as follows: 
Each level has multiple parts. This is so that the game does not overload itself with too many calculations from enemy movement/logic and all the different parts that make up a level. Each level's parts are labeled with a dash. Ex. 1-0 is the first part of level 1, 1-1 is the second part, 1-2 is the third. 
Each part of the level code deals with the creation of the tilemap and anything inside of the level. It also deals with the updating of collision in the game as well as updating any events that might need to occur.

##### Events
While some references to events are made in the create and update sections of the level code, most of the event logic is held in the ..._events.js files. You can see how those work by viewing them. 

##### MagicCliffsUtils
This contains functions/data specific to the magicCliffsTileset. Due to it being specific to MagicCliffs, most of the functions deal with updating or modifying the tile map based on some tile id numbers that are specific to MagicCliffs.