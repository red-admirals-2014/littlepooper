var Scene = {};
Scene.Boot = function (game) {
  //
};
Scene.Boot.prototype = {
  preload: function () {
    this.game.load.spritesheet('egg', '/images/egg_break.png', 118, 130, 6)
  },
  create: function () {

    this.game.state.start('Preloader');
  }
};