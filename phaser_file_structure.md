in the scenes folder,  put all graphics to preload in preloader.js


follow mainmenu.js to create a scene:

Scene.MainMenu = function(game) {

};

Scene.MainMenu.prototype = {

  create: function() {
    var player = this.add.sprite(100, 100, "mr_cube"); // show image and asign it into a 'player' variable
    player.inputEnabled = true; // enable input so you can use some functions 
    player.input.enableDrag(false, true); // enable drag function which allows you to drag object around on touch
  },

};

also make sure to add scenes in the game initializer JS

(function () {
  var game = new Phaser.Game(640, 1136, Phaser.AUTO, 'game_div'); // Phaser engine initialization
  game.state.add('Boot', Scene.Boot); // scene to start loading game assets.
  game.state.add('Preloader', Scene.Preloader); // loading game assets
  game.state.add('MainMenu', Scene.MainMenu); // first proper game screen

EXAMPLE: 

  game.state.add("BugStomp", Scene.BugStomp)
  game.state.start('Boot'); // Go to Boot scene (start the game)
})();



TO START ANOTHER SCENE - 
have a function that calls this 
    this.game.state.start('Preloader');


