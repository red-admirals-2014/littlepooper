Scene.HomePage = function(game) {

};

Scene.HomePage.prototype = {

	create: function() {
		this.clouds = this.game.add.tileSprite(0, 0, 640, 138, 'clouds');
		this.land = this.game.add.tileSprite(0, 138, 640, 1020, 'land')

    this.ground = this.game.add.sprite(0,750)
    this.ground.scale.setTo(450,1)
    this.green_dragon = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY+200, 'green_dragon')
    this.games.physics.enable(this.green_dragon, Phaser.Physics.arcade)
    this.green_dragon.anchor.set(0.5)
    this.green_dragon.animations.add('rest', [0, 1, 2, 3, 4, 5, 6, 7], 6, true)
    this.green_dragon.animations.add('walk', [16, 17, 18, 19, 20, 21], 6, true)
    this.green_dragon.animations.play('rest') 
    setTimeout(this.walkAround.bind(this), 2000)



    this.food_button = this.game.add.sprite(0,0, "food_button")
    this.food_button.inputEnabled = true;
    this.food_button.events.onInputDown.add(this.dropFood.bind(this), this)

    

  },
  update: function() {

    this.games.physics.arcade.overlap(this.green_dragon, this.food, this.eatFood, null, this)

    this.clouds.tilePosition.x += 1;
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
  },
  dropFood: function(){
    this.food = this.game.add.sprite(1,1,'food')
    this.games.physics.enable(this.food, Phaser.Physics.arcade)
    this.food.body.gravity.y = 800  
    //sample a sprite
    //
  }
};