Scene.Preloader = function(game) {

};

Scene.Preloader.prototype = {
  preload: function() {
    this.game.stage.backgroundColor = '#dddddd'
    this.game.load.spritesheet('egg', 'images/egg_break.png', 118, 130, 6)
    this.game.load.spritesheet('green_dragon', 'images/green_dragon.png', 110, 110, 32)
    this.game.load.image('bird', '/images/bird.png')
    this.game.load.image('pipe', '/images/pipe.png')
    this.game.load.image('clouds','/images/clouds.png');
    this.game.load.image('land','/images/land.png');
    // this.game.stage.backgroundColor = "#71c5cf"
    
  },
  create: function() {
    this.game.state.start('Egg')

  },

};