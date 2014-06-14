var Scene = {};
Scene.Boot = function (game) {
  //
};
Scene.Boot.prototype = {
  preload: function () {
    this.load.image('preloaderBar', 'Graphics/loading.png'); // preload loader image
  },
  create: function () {
    this.game.state.start('Preloader');
  }
};