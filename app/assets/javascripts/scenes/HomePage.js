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
    this.game.physics.enable(this.green_dragon, Phaser.Physics.arcade)
    this.green_dragon.body.collideWorldBounds = true
    this.restMotion()
  },
  update: function() {
    clouds.tilePosition.x += 1;
  },
  restMotion: function() {
    this.green_dragon.animations.play('rest')
    setTimeout(this.walkAround.bind(this), 2000)
  },
  walkAround: function() {
    var amountMoved = Math.floor(Math.random()*(200))
    if (amountMoved%2==0)
      this.walkLeft(amountMoved)
    else
      this.walkRight(amountMoved)
  },
  walkLeft: function(amountMoved) {
    if (this.green_dragon.scale.x < 0) {
      this.green_dragon.scale.x *= -1
    }
    this.green_dragon.animations.play('walk')
    var leftWalk = this.game.add.tween(this.green_dragon)
    leftWalk.to({x: this.green_dragon.position.x-amountMoved}, 2000)
    leftWalk.start()
    setTimeout(this.restMotion.bind(this), 2000)
  },
  walkRight: function(amountMoved) {
    if (this.green_dragon.scale.x > 0) {
      this.green_dragon.scale.x *= -1
    }
    this.green_dragon.animations.play('walk')
    var leftWalk = this.game.add.tween(this.green_dragon)
    leftWalk.to({x: this.green_dragon.position.x+amountMoved}, 2000)
    leftWalk.start()
    // setTimeout(function(){this.green_dragon.scale.x *= -1}, 2000)
    setTimeout(this.restMotion.bind(this), 2000)
  }
};
