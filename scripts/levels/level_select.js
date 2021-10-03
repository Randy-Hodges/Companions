var level_select = {};
// colors is actually the array of level pages
var colors = ["0xffffff","0xff0000","0x00ff00","0x0000ff","0xffff00"];
// columns of thumbnails in each page
var columns = 3;
// rows of thumbnails in each page
var rows = 4;
// thumbnail width, in pixels
var thumbWidth = 60;
// thumbnail height, in pizels
var thumbHeight = 60;
// empty space between two thumbnails, in pixels
var spacing = 20;
// stars array
var stars = [];
// local storage name
var localStorageName = "levelselect";
// level we are currently playing
var level;

var game;

window.onload = function() {
    // creating a 320x480 pixels game and executing PlayGame state 	
    game = new Phaser.Game(320, 480, Phaser.AUTO, "");
    game.state.add("PlayGame", playGame);
    game.state.add("PlayLevel", playLevel);
    game.state.start("PlayGame");
}

level_select.playGame = function(){};
level_select.playGame.prototype = {
     preload: function(){
          // level thumbnail 
          game.load.spritesheet("levelthumb", "assets/overworld_map/levelthumb.png", 60, 60);
          // level pages at the bottom
          game.load.image("levelpages", "assets/overworld_map/levelpages.png");
          // transparent background used to scroll
          game.load.image("transp", "assets/overworld_map/transp.png");
     },
     create: function(){  
          // the first level has zero stars, to it's playable although not finished
          stars[0] = 0
          // the remaining levels have -1 stars, this means they are still locked
          for(var l = 1; l < columns * rows * colors.length; l++){
               stars[l] = -1;
          }
          // retrieving stars string from local storage or converting stars array to a string
          this.savedData = localStorage.getItem(localStorageName)==null?stars.toString():localStorage.getItem(localStorageName);
          // finally, no matter how we retrieved the string, splitting the string to form an array again
          stars = this.savedData.split(",");
          // setting game background color
          game.stage.backgroundColor = "#222222"; 
          // just a text placed on the top of the stage to show level page
          this.pageText = game.add.text(game.width / 2, 16, "Swipe to select level page (1 / " + colors.length + ")", {font: "18px Arial", fill: "#ffffff"})
          this.pageText.anchor.set(0.5);
          // the tiled transparent sprite, covering the entire scrollable area which width is (number of pages) * (game width)
          this.scrollingMap = game.add.tileSprite(0, 0, colors.length * game.width, game.height, "transp");
          // this is how we tell Phaser the sprite can receive inputs
          this.scrollingMap.inputEnabled = true;
          // the sprite can be dragged
          this.scrollingMap.input.enableDrag(false);
          // the sprite can't be dragged vertically
          this.scrollingMap.input.allowVerticalDrag = false;
          // this is the bounding box which defines dragging limits
          this.scrollingMap.input.boundsRect = new Phaser.Rectangle(game.width - this.scrollingMap.width, game.height - this.scrollingMap.height, this.scrollingMap.width * 2 - game.width, this.scrollingMap.height * 2 - game.height);
          // we start at page zero, that is the first page
          this.currentPage = 0;
          // this will be the array of page thumbnails
          this.pageSelectors = [];
          // determining row length according to thumbnail width, spacing and number of columns
          var rowLength = thumbWidth * columns + spacing * (columns - 1);
          // left margin is set to every row is centered in the stage
          var leftMargin = (game.width - rowLength) / 2;
          // same concept applies to column height and top margin
          var colHeight = thumbHeight * rows + spacing * (rows - 1);
          var topMargin = (game.height - colHeight) / 2;
          // looping through all pages
          for(var k = 0; k < colors.length; k++){
               // looping through all columns
               for(var i = 0; i < columns; i++){
                    // looping through all rows
                    for(var j = 0; j < rows; j++){
                         // adding level thumbnail
                         var thumb = game.add.image(k * game.width + leftMargin + i * (thumbWidth + spacing), topMargin + j * (thumbHeight + spacing), "levelthumb");
                         // setting tint color according to page cumber
                         thumb.tint = colors[k];
                         // each level has a number...
                         thumb.levelNumber = k * (rows * columns) + j * columns + i;
                         // assigning each thumbnail a frame according to its stars value
                         thumb.frame = parseInt(stars[thumb.levelNumber]) + 1;
                         // which we are going to write inside the thumbnail
                         var levelText = game.add.text(0, 0, thumb.levelNumber, {font: "24px Arial", fill: "#000000"})
                         // level number is added as a child of level thumbnail
                         thumb.addChild(levelText);
                         // level thumbnail is added as a child of scrolling map
                         this.scrollingMap.addChild(thumb);
                    }
               }
               // now it's time to place page thumbnail selectors, in a way they are centered on the stage
               this.pageSelectors[k] = game.add.button(game.width / 2 + (k - Math.floor(colors.length / 2) + 0.5 * (1 - colors.length % 2)) * 40, game.height - 40, "levelpages", function(e){
                    // each page thumbnail once clicked will scroll the map by "difference" pages
                    var difference = e.pageIndex - this.currentPage;
                    // changePage will handle scrolling
                    this.changePage(difference);
               }, this);
               // each page selector is anchored on its center point
               this.pageSelectors[k] .anchor.set(0.5);
               // each page selector has a page index according to the page it refers to
               this.pageSelectors[k].pageIndex = k;
               // adding a tint color so we can see we will move to "red" levels if we click or "red" page, to "green" levels if we click on "green" page and so on
               this.pageSelectors[k].tint = colors[k];
               // this is just to highlight current page, making it bigger (actually we are making other pages smaller)
               if(k == this.currentPage){
                    this.pageSelectors[k].height = 30;
               }
               else{
                    this.pageSelectors[k].height = 15;
               }
          }
          // when we start dragging, we just save horizontal map position
          this.scrollingMap.events.onDragStart.add(function(sprite, pointer){
               this.scrollingMap.startPosition = this.scrollingMap.x;
          }, this);
          // the core of the script is when we STOP dragging
          this.scrollingMap.events.onDragStop.add(function(sprite, pointer){
               // if there wasn't any scroll, we can say it wasn't a drag so the player clicked a level
               if(this.scrollingMap.startPosition == this.scrollingMap.x){
                    // now we just have to check for all bounding boxes to see which level thumbnail has been clicked
                    // sadly, we can't use buttons or they won't allow to detect scrolling
                    for(i = 0; i < this.scrollingMap.children.length; i++){
                         var bounds = this.scrollingMap.children[i].getBounds(); 
                         // before we start a level, let's check the level is not locked that means it's not on frame zero  
                         if(bounds.contains(pointer.x, pointer.y) && this.scrollingMap.children[i].frame > 0){
                              level = this.scrollingMap.children[i].levelNumber;
                              game.state.start("PlayLevel");
                              break; 
                         }                  
                    }
               }
               else{
                    // we define 1/8 of the width of the page as the minimum amount of pixels scrolled to say the player
                    // wanted to swipe the page
                    if(this.scrollingMap.startPosition - this.scrollingMap.x > game.width / 8){
                         this.changePage(1);
                    }
                    else{
                         if(this.scrollingMap.startPosition - this.scrollingMap.x < - game.width / 8){
                              this.changePage(-1);
                         }
                         else{
                              this.changePage(0);
                         }
                    }
               }
          }, this);
     },
     changePage: function(page){
          // here we move the scrolling map according to selected page
          this.currentPage += page;
          for(var k = 0; k < colors.length; k++){
               if(k == this.currentPage){
                     this.pageSelectors[k].height = 30;
               }
               else{
                    this.pageSelectors[k].height = 15;     
               }
          }
          this.pageText.text = "Swipe to select level page (" + (this.currentPage + 1).toString() + " / " + colors.length + ")"; 
          var tween = game.add.tween(this.scrollingMap).to({
               x: this.currentPage * -game.width    
          }, 300, Phaser.Easing.Cubic.Out, true);
     }
}

level_select.playLevel = function(){};
level_select.playLevel.prototype = {
     create: function(){
          game.add.text(game.width / 2, 20, "Play level " + level.toString(), {
               font: "32px Arial",
               fill: "#ffffff"
          }).anchor.set(0.5);          
          // if we fail a level, we simply return to level select screen
          var failLevel = game.add.text(20, 60, "Fail level", {
               font: "48px Arial",
               fill: "#ff0000"
          });
          failLevel.inputEnabled = true;
          failLevel.events.onInputDown.add(function(){
               game.state.start("PlayGame");
          }, this)
          // if we complete the level with one star, we set star item to 1 if it was less than 1
          // at the same time, if next level exists and it's locked (-1) we unlock it (0)
          // then return to level selection screen, but before we save the progress on the local storage
          var oneStarLevel = game.add.text(20, 160, "Get 1 star", {
               font: "48px Arial",
               fill: "#ff8800"
          });
          oneStarLevel.inputEnabled = true;
          oneStarLevel.events.onInputDown.add(function(){
               stars[level] = Math.max(stars[level], 1);
               if(stars[level + 1] != undefined && stars[level + 1] == -1){
                    stars[level + 1] = 0;
               }
               localStorage.setItem(localStorageName, stars.toString());
               game.state.start("PlayGame");
          }, this)
          // same thing for completing the level with two stars
          var twoStarLevel = game.add.text(20, 260, "Get 2 stars", {
               font: "48px Arial",
               fill: "#ffff00"
          });
          twoStarLevel.inputEnabled = true;
          twoStarLevel.events.onInputDown.add(function(){
               stars[level] = Math.max(stars[level], 2);
               if(stars[level + 1] != undefined && stars[level + 1] == -1){
                    stars[level + 1] = 0;
               }
               localStorage.setItem(localStorageName, stars.toString());
               game.state.start("PlayGame");
          }, this)
          // same thing for completing the level with three stars
          var threeStarLevel = game.add.text(20, 360, "Get 3 stars", {
               font: "48px Arial",
               fill: "#00ff00"
          });
          threeStarLevel.inputEnabled = true;
          threeStarLevel.events.onInputDown.add(function(){
               stars[level] = 3;
               if(stars[level + 1] != undefined && stars[level + 1] == -1){
                    stars[level + 1] = 0;
               }
               localStorage.setItem(localStorageName, stars.toString());
               game.state.start("PlayGame");
          }, this)
     }
}