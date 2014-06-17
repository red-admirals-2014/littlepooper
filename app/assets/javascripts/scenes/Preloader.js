
Scene.Preloader = function(game) {

};

Scene.Preloader.prototype = {
  preload: function() {

    // this.game.stage.backgroundColor = '#dddddd'
    //GreenDragonRelatedSprites
    this.game.load.spritesheet('egg', '/images/egg_break.png', 118, 130, 6)
    this.game.load.spritesheet('green_dragon', '/images/green_dragon.png', 110, 110, 40)
    this.game.load.spritesheet('green_dragon_fly', '/images/green_dragon_fly.png', 140, 125, 12)


    //crappy bird

    // this.game.load.image('bird', '/images/bird.png')
    this.game.load.image('pipe', '/images/pipe.png')
    this.game.load.image('homes_button', '/images/transparent_home_button.png')

    // this.game.load.image('dragon_play_again', '/images/replay_button.png')



    //HOME PAGE SPRTIES
    this.game.load.image('forest','/images/home_background.png')
    // this.game.load.image('clouds','/images/clouds.png');
    // this.game.load.image('land','/images/land.png');



    //FOOD
    // this.game.load.spritesheet('food', '/images/food.png')
    this.game.load.image('food_button', '/images/transparent_food_button.png')
    this.game.load.image('exercise_button', '/images/transparent_flappydragon_button.png')
    this.game.load.image('food', '/images/food.png')

    //POOP
    this.game.load.image('poop', '/images/poopie.png')


    //BUG GAME
    this.game.load.image('bugs_button', '/images/transparent_bug_button.png')
    this.game.load.image('sidewalk-bg', '/images/bug_smash/sidewalk-birdeye.png')
    this.game.load.image('bush', '/images/bug_smash/bush.png')
    this.game.load.spritesheet('green_dragon_bug', '/images/bug_smash/green_dragon_smash.png', 110, 110, 39)
    this.game.load.spritesheet('bug', '/images/bug_smash/bug_sprite.png', 64, 64, 15)

    // this.game.load.image('playAgain', '/images/bug_smash/play_again_button.png', 200, 100)


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
    // this.game.scale.startFullScreen();
    this.game.state.start('HomePage')

  },

};