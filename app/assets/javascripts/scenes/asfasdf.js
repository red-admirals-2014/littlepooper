Scene.Egg = function(game) {
  this.counter = 0
};

Scene.Egg.prototype = {
  preload: function(){
    this.game.stage.backgroundColor = '#dddddd'
    this.game.load.spritesheet('egg', 'images/egg_break.png', 118, 130, 6)
<<<<<<< HEAD
    this.game.load.spritesheet('graymonster', 'images/graymonster.png', 131, 140, 12)


  },
  create: function() {
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    // this.game.scale.enterFullScreen.add(this.onEnterFullScreen, this);
    // this.game.scale.leaveFullScreen.add(this.onLeaveFullScreen, this);
    this.game.input.onDown.add(this.gofull, this);


    this.game.add.button(this.game.world.centerX - 0, 0, 'feed', function(){this.dragonAction('eat')}, this, 2, 1, 0);
    this.game.add.button(this.game.world.centerX - 40, 0, 'roll', function(){this.dragonAction('roll')}, this, 2, 1, 0);
    this.game.add.button(this.game.world.centerX - 80, 0, 'walk', function(){this.dragonAction('walk')}, this, 2, 1, 0);
    this.game.add.button(this.game.world.centerX - 120, 0, 'poke', function(){this.dragonAction('poke')}, this, 2, 1, 0);
    this.game.add.button(this.game.world.centerX - 160, 0, 'die', function(){this.dragonAction('die')}.bind(this), this, 2, 1, 0);

    this.egg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'egg')
    this.egg.anchor.set(0.5)
=======
    this.game.load.spritesheet('green_dragon', 'images/green_dragon.png', 110, 110, 32)
    this.game.load.image('bird', '/images/bird.png')
    this.game.load.image('pipe', '/images/pipe.png')
  },
  create: function() {
    this.egg = this.game.add.sprite(181,320,'egg')
>>>>>>> 7e1aa2b44cf569c24d0b075a96e30ef487932856
    this.egg.inputEnabled=true
    this.egg.input.useHandCursor=true
    this.egg.events.onInputDown.add(this.eggbreak.bind(this))

  },
<<<<<<< HEAD
  create_green_dragon: function(xc, yc) {
    this.green_dragon = this.game.add.sprite(xc, yc, 'green_dragon')
    this.green_dragon.anchor.set(0.5)
    this.green_dragon.animations.add('rest', [0, 1, 2, 3, 4, 5, 6, 7], 8, true)
    this.green_dragon.animations.add('roll', [8, 9, 10, 11], 4, true)
    this.green_dragon.animations.add('eat', [12, 13, 14, 15], 4, true)
    this.green_dragon.animations.add('walk', [16, 17, 18, 19, 20, 21], 6, true)
    this.green_dragon.animations.add('poke', [22, 23, 24], 3, true)
    this.green_dragon.animations.add('die', [25, 26, 27, 28, 29, 30], 6, true)
    this.green_dragon.inputEnabled=true
    this.green_dragon.input.useHandCursor=true
    this.DragonRest()
  },
  update: function() {

  },
  // onEnterFullScreen: function() {
  //     button.visible = true;
  // },

  // onLeaveFullScreen: function() {
  //     button.visible = false;
  // },

  gofull: function() {
      this.game.scale.startFullScreen();
  },

  render: function() {
      if (this.game.scale.isFullScreen)
          this.game.debug.text('ESC to leave fullscreen', 270, 16);
      else
          this.game.debug.text('Click / Tap to go fullscreen', 270, 16);
  },
  DragonRest: function(){
    this.green_dragon.animations.play('rest')
  },
  dragonAction: function(action){
    this.green_dragon.animations.play(action)
    setTimeout(this.DragonRest.bind(this), 3000)
=======
  update: function() {
    if (this.green_dragon){
      setTimeout(this.nextStage.bind(this), 2500)
    }
    else{}
>>>>>>> 7e1aa2b44cf569c24d0b075a96e30ef487932856
  },
  eggbreak: function(){
    if (this.counter < 6) {
      this.egg.animations.add('break',[this.counter, this.counter+1],6,false)
      if (this.game.input.activePointer.isDown) {
          this.egg.animations.play('break')
          this.counter++
      }
    }
    else {
      this.egg.kill()
      this.green_dragon = this.game.add.sprite(this.egg.position.x, this.egg.position.y, 'green_dragon')
      this.green_dragon.animations.add('rest', [0, 1, 2, 3, 4, 5, 6, 7], 6, true)
      this.green_dragon.animations.play('rest') 
      // setTimeout(this.game.state.start('Home'), 3000)
    }
  },
  nextStage: function(){
    this.game.state.start('Stomper')
  }

};