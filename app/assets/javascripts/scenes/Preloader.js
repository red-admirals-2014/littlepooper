
Scene.Preloader = function(game) {

};

Scene.Preloader.prototype = {
  preload: function() {
    this.startLoadingAnimation()
    this.loadButtons()
    this.loadHomePage()
    this.loadFlappyDragon()
    this.loadBugGame()
    this.loadCloudJump()
  },
  create: function() {
    this.stopLoadingAnimation()
    this.setUpScreenMode()
  },
  startLoadingAnimation: function(){
    this.egg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'egg')
    this.egg.anchor.set(0.5)
    this.wiggle = this.game.time.events.loop(100, this.wiggleEgg, this)
  },
  stopLoadingAnimation: function(){
    this.egg.angle = 0
    this.game.time.events.remove(this.wiggle)
  },
  wiggleEgg: function(){
    if (this.egg.angle < 5){
        this.egg.angle = 5
    } else{
        this.egg.angle = -5
    }
  },
  loadButtons: function() {
    this.game.load.spritesheet('food_button','/images/food_button_spritesheet.png',100, 100, 2)
    this.game.load.spritesheet('exercise_button','/images/flappydragon_button_spritesheet.png', 100, 100, 2)
    this.game.load.spritesheet('ranking_button','/images/ranking_button_spritesheet.png', 100, 100, 2)
    this.game.load.spritesheet('logout_button','/images/logout_button_spritesheet.png', 100, 100, 2)
    this.game.load.spritesheet('bugs_button', '/images/bug_button_spritesheet.png', 100, 100, 2)
    this.game.load.spritesheet('cloud_button', '/images/cloud_button_spritesheet.png', 100, 100, 2)
    this.game.load.spritesheet('homes_button', '/images/home_button_spritesheet.png', 100, 100, 2)
    this.game.load.image('rank_button', '/images/transparent_ranks_button.png')
  },
  loadHomePage: function(){
    this.game.load.spritesheet('green_dragon', '/images/green_dragon.png', 110, 110, 40)
    this.game.load.image('clouds','/images/clouds.png');
    this.game.load.image('forest','/images/forest.png');
    this.game.load.audio('forestMusic', '/audio/forest_music.mp3')
    this.game.load.audio('poke','/audio/poke.mp3')
    this.game.load.image('rectangle', '/images/blackrectangle.png')
    this.game.load.image('food', '/images/food.png')
    this.game.load.image('poop', '/images/poopie.png')
  },
  loadFlappyDragon: function(){
    this.game.load.spritesheet('green_dragon_fly', '/images/green_dragon_fly.png', 140, 125, 12)
    this.game.load.image('pipe', '/images/pipe.png')
    this.game.load.audio('flap','/audio/flap.mp3')
    this.game.load.audio('point','/audio/point.mp3')
    this.game.load.audio('crash','/audio/crash.mp3')
  },
  loadBugGame: function(){
    this.game.load.image('sidewalk-bg', '/images/bug_smash/sidewalk-birdeye.png')
    this.game.load.image('bush', '/images/bug_smash/bush.png')
    this.game.load.spritesheet('green_dragon_bug', '/images/bug_smash/green_dragon_smash.png', 110, 110, 39)
    this.game.load.spritesheet('bug', '/images/bug_smash/bug_sprite.png', 64, 64, 15)
  },
  loadCloudJump: function(){
    this.game.load.audio('jump','/audio/jump.mp3')
    this.game.load.image('cloud', '/images/cloud.png')
    this.game.load.image('night_sky', '/images/night_sky.png')
  },



    // this.game.load.image('playAgain', '/images/bug_smash/play_again_button.png', 200, 100)


    // this.game.stage.backgroundColor = "#71c5cf"


  setUpScreenMode: function(){
    this.game.add.text(this.game.world.centerX, this.game.world.centerY+100,'click to start', { fontSize: '32px', fill: '#fff' }).anchor.set(0.5)
    // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.input.onDown.add(this.gofull.bind(this), this)
  },
  gofull: function() {
    this.game.state.start('Egg')
  },

};