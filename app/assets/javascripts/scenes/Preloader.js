Scene.Preloader = function (game) {
  this.background = null; // define background
  this.preloadBar = null; // define loader bar
};

Scene.Preloader.prototype = {
  preload: function () {

    this.game.stage.backgroundColor = '#B4D9E7'; // set background colour for whole game
    this.preloadBar = this.add.sprite((640-311)/2, (960-27)/2, 'preloaderBar'); // show loader bar
    this.load.setPreloadSprite(this.preloadBar); // assign loader image so it works as a loader


  },

  create: function () {
    this.game.state.start('MainMenu'); // go to menu when everything is loaded
  }
};