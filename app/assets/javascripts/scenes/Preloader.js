Scene.Preloader = function(game) {

};

Scene.Preloader.prototype = {
  preload: function() {

    // this.game.stage.backgroundColor = '#dddddd'
    //GreenDragonRelatedSprites
    this.game.load.spritesheet('egg', 'images/egg_break.png', 118, 130, 6)
    this.game.load.spritesheet('green_dragon', 'images/green_dragon.png', 110, 110, 40)
    this.game.load.spritesheet('green_dragon_fly', 'images/green_dragon_fly.png', 125, 140, 12)


    //crappy bird

    // this.game.load.image('bird', '/images/bird.png')
    this.game.load.image('pipe', '/images/pipe.png')



    //HOME PAGE SPRTIES
    this.game.load.image('clouds','/images/clouds.png');
    this.game.load.image('land','/images/land.png');



    //FOOD
    // this.game.load.spritesheet('food', '/images/food.png')
    this.game.load.image('food_button', '/images/food_button.png')
    this.game.load.image('exercise_button', '/images/exercise_button.png')
    this.game.load.image('food', '/images/food.png')



    // this.game.load.image('sidewalk-bg', '/images/bug_smash/sidewalk-birdeye.png')
    // this.game.load.spritesheet('bug', '/images/bug_smash/bug_sprite.png', 64, 64, 15)

    // this.game.stage.backgroundColor = "#71c5cf"

    
  },
  create: function() {
    // this.game.canvas.id = 'game-canvas'
    // this.resizeCanvas()

    this.game.add.text(this.game.world.centerX, this.game.world.centerY,'click to start', { fontSize: '32px', fill: '#fff' }).anchor.set(0.5)
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.input.onDown.add(this.gofull.bind(this), this);    

  },
  gofull: function() {
    this.game.scale.startFullScreen();
    this.game.state.start('Egg')

  },

};