Scene.HomePage = function(game) {

};

Scene.HomePage.prototype = {

	create: function() {
		this.clouds = this.game.add.tileSprite(0, 0, 640, 138, 'clouds');
		this.land = this.game.add.tileSprite(0, 138, 640, 1020, 'land')

    this.green_dragon = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY+200, 'green_dragon')
    this.green_dragon.anchor.set(0.5)
    
    this.game.physics.enable(this.green_dragon, Phaser.Physics.arcade)
    this.green_dragon.body.collideWorldBounds = true
    this.restMotion()

    this.green_dragon.animations.add('rest', [0, 1, 2, 3, 4, 5, 6, 7], 6, true)
    this.green_dragon.animations.add('walk', [16, 17, 18, 19, 20, 21], 6, true)
    this.green_dragon.animations.add('eat', [12, 13, 14, 15], 4, true)
    this.green_dragon.animations.add('poke', [22, 23, 24], 3, true)

    this.green_dragon.inputEnabled=true
    this.green_dragon.input.useHandCursor=true
    this.green_dragon.events.onInputDown.add(this.dragonPoke.bind(this))

    this.platforms = this.game.add.group()
    this.platforms.enableBody = true
    this.ground = this.platforms.create(0, this.game.world.height-145)
    this.ground.scale.setTo(800,1)
    this.ground.body.immovable = true
    this.ground.visibility = false

    this.food_button = this.game.add.sprite(30,676, "food_button")
    this.food_button.inputEnabled = true;
    this.food_button.events.onInputDown.add(this.dropFood.bind(this), this)
    this.exercise_button = this.game.add.sprite(240,676, "exercise_button")
    this.exercise_button.inputEnabled = true
    this.exercise_button.events.onInputDown.add(this.goExercise.bind(this), this)


    this.foods = this.game.add.group()
    this.foods.createMultiple(1, 'food')
    

  },
  update: function() {

    this.game.physics.arcade.overlap(this.green_dragon, this.foods, this.eatFood.bind(this), null, this)
    this.game.physics.arcade.collide(this.ground, this.foods, this.collision.bind(this), null, this)

    this.clouds.tilePosition.x += 1;
  },
  dragonPoke: function() {
    if (this.game.input.activePointer.isDown)
      this.green_dragon.animations.play('poke')
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
  },
  dropFood: function(){
    if (this.foods.getFirstDead()){
    this.food = this.foods.getFirstDead()
    this.game.physics.enable(this.food, Phaser.Physics.arcade)
    this.food.reset(Math.floor(Math.random()*420),0 )
    this.food.body.gravity.y = 800 
    } 
    //sample a sprite
    //
  },
  eatFood: function(){
    this.food.kill()
    this.green_dragon.animations.play('eat')
  },
  collision: function(){
    this.food.body.gravity.y = 0
    this.food.body.velocity.y = 0
  },
  goExercise: function(){
    this.game.state.start('Stomper')
  }
};
