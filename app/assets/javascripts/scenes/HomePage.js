Scene.HomePage = function(game) {

};

Scene.HomePage.prototype = {

	create: function() {
		clouds = this.game.add.tileSprite(0, 0, 640, 138, 'clouds');
		land = this.game.add.tileSprite(0, 138, 640, 1020, 'land')
    this.green_dragon = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY+200, 'green_dragon')
    this.green_dragon.anchor.set(0.5)
    this.green_dragon.animations.add('rest', [0, 1, 2, 3, 4, 5, 6, 7], 6, true)
    this.green_dragon.animations.add('walk', [16, 17, 18, 19, 20, 21], 6, true)
    this.green_dragon.animations.play('rest') 
    setTimeout(this.walkAround.bind(this), 2000)

  },
  update: function() {
    clouds.tilePosition.x += 1;
  },
  walkAround: function() {
    this.green_dragon.animations.play('rest') 
    var amountMoved = Math.floor(Math.random()*(100))
    setTimeout(this.walkLeft(amountMoved), 1000)
  },
  walkLeft: function(amountMoved) {
    var left = this.game.add.tween(this.green_dragon)
    this.green_dragon.animations.play('walk')
    left.to({x: this.green_dragon.position.x-amountMoved}, 1000)
    // setTimeout(this.walkAround.bind(this), 2000)

  }
};