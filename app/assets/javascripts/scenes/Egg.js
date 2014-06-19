Scene.Egg = function(game) {
  this.counter = 0
  this.hatched = false
};

Scene.Egg.prototype = {

  create: function() {
    this.makeEgg()
  },
  makeEgg: function(){
    this.egg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'egg')
    this.egg.anchor.set(0.5)
    this.egg.inputEnabled=true
    this.egg.input.useHandCursor=true
    this.egg.events.onInputDown.add(this.eggBreak.bind(this))
  },
  eggBreak: function(){
    if (this.counter < 5) {
      this.egg.animations.add('break',[this.counter, this.counter+1],6,false)
      if (this.game.input.activePointer.isDown) {
          this.egg.animations.play('break')
          this.counter++
      }
    }
    else {
      this.egg.kill()
      this.makeDragon()
    }
  },
  makeDragon: function() {
    this.green_dragon = this.game.add.sprite(this.egg.position.x, this.egg.position.y, 'green_dragon')
    this.green_dragon.anchor.set(0.5)
    this.green_dragon.animations.add('jump', [0, 33, 32, 33, 32, 33, 32, 33, 34], 9, true)
    this.green_dragon.animations.add('roll', [8, 9, 10, 11], 4, true)
    this.green_dragon.animations.play('jump') 

    setTimeout(this.rollDragon.bind(this), 1000)
  },
  rollDragon: function() {
      this.green_dragon.animations.play('roll') 
      var rollDown = this.game.add.tween(this.green_dragon)
      rollDown.to({y: this.green_dragon.position.y+200}, 1000)
      rollDown.start();
      setTimeout(this.nextStage.bind(this), 1000)
  },
  nextStage: function(){
    this.game.state.start('HomePage')
  }

};