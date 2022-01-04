
demo.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

demo.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(game.width/2, game.height/2, 'piggyLoad');
		this.preloadBar = this.add.sprite(game.width/2, game.height/2 + 100, 'piggyLoad');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//  As this is just a Project Template I've not provided these assets, swap them for your own.
		loadAssetsMC();

        // Levels
        game.load.tilemap('title screen', "assets/tilemaps/Cutscenes+Main/Title Screen.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level1-0', "assets/tilemaps/Levels/level 1/level1-0.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level1-1', "assets/tilemaps/Levels/level 1/level1-1.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level1-2', "assets/tilemaps/Levels/level 1/level1-2.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level2-0', "assets/tilemaps/Levels/Level 2/level2-0.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level2-1', "assets/tilemaps/Levels/Level 2/level2-1.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level3-0', "assets/tilemaps/Levels/Level 3/level3-0.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level3-1', "assets/tilemaps/Levels/Level 3/level3-1.json", null, Phaser.Tilemap.TILED_JSON);

        // Music
        game.load.audio('discovery music', "assets/audio/music/Faint - Discovery.wav");
        game.load.audio('haven music', "assets/audio/music/Faint - Haven.wav");
        game.load.audio('criss cross skies music', "assets/audio/music/Ketsa - Criss Cross Skies.mp3");

        // Bosses
        game.load.spritesheet('slimeBoss', "assets/sprites/enemies/blue slime/slime-Sheet-white.png", 32, 25);
        
        // Event Specific
        loadHeadshots();
        game.load.spritesheet('grandfather', "assets/sprites/enemies/Plague Doctor/plague_doctor_sheet.png", 64, 64);



	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;
        game.state.start('title screen');

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		// if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		// {
		// 	this.ready = true;
		// 	this.state.start('MainMenu');
		// }

	}

};