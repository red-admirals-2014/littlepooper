Scene.Egg = function(game) {
  this.counter = 0
  this.hatched = false
};

Scene.Egg.prototype = {

  create: function() {
    
    this.egg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'egg')
    this.egg.anchor.set(0.5)
    this.egg.inputEnabled=true
    this.egg.input.useHandCursor=true
    this.egg.events.onInputDown.add(this.eggbreak.bind(this))

  },
  update: function() {

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
      this.green_dragon.anchor.set(0.5)
      this.green_dragon.animations.add('rest', [0, 1, 2, 3, 4, 5, 6, 7], 6, true)
      this.green_dragon.animations.play('rest') 
      setTimeout(this.nextStage.bind(this), 2500)

      // setTimeout(this.game.state.start('Home'), 3000)
    }
  },
  nextStage: function(){
    this.game.state.start('HomePage')
  }

};