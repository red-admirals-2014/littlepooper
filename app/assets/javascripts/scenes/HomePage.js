Scene.HomePage = function(game) {
};

Scene.HomePage.prototype = {

	create: function() {
    if (SHOWFLAPPYOPTIONS){
      this.addPostFlappyButtons()  
    } else {    
      this.clouds = this.game.add.tileSprite(0,0, 450,125, 'clouds');
      this.forest = this.game.add.tileSprite(0,125, 450, 675, 'forest');
      this.poops = this.game.add.group()
      this.makeGreenDragon()
      this.addGround()
      this.setupFood()
      this.addStats()
      this.addHomeButtons()
      this.restMotion()
    }
  },
  update: function() {
    if (!SHOWFLAPPYOPTIONS){
    this.updateFood()
    this.updateStatus()
    }
    this.clouds.tilePosition.x += 1;
  },
  makeGreenDragon: function(){
    this.green_dragon = this.game.add.sprite(this.game.world.centerX, 600, 'green_dragon')
    this.addGreenDragonAnimations()
    this.addGreenDragonPhysics()
    this.addGreenDragonClick()
  },
  addGreenDragonAnimations: function(){
    this.green_dragon.animations.add('rest', [0, 1, 2, 3, 4, 5, 6, 7], 6, true)
    this.green_dragon.animations.add('walk', [16, 17, 18, 19, 20, 21], 6, true)
    this.green_dragon.animations.add('eat', [12, 13, 14, 15], 4, false)
    this.green_dragon.animations.add('poke', [22, 23, 24], 3, true)
    this.green_dragon.animations.add('die', [25, 26, 27, 28, 29, 30], 6, true)
  },
  addGreenDragonPhysics: function(){
    this.green_dragon.anchor.set(0.5)
    this.game.physics.enable(this.green_dragon, Phaser.Physics.arcade)
    this.green_dragon.body.collideWorldBounds = true
  },
  addGreenDragonClick: function(){
    this.green_dragon.inputEnabled=true
    this.green_dragon.input.useHandCursor=true
    this.green_dragon.events.onInputDown.add(this.greenDragonPoke.bind(this))
  },
  greenDragonPoke: function() {
    if (this.game.input.activePointer.isDown)
      this.green_dragon.animations.play('poke')
  },
  addHomeButtons: function(){
    this.food_button = this.game.add.button(40,676, "food_button", this.dropFood, this)
    this.fly_button = this.game.add.button(175,676, "exercise_button", this.goFly, this)
    this.exercise_button = this.game.add.button(310,676, "bugs_button", this.goSmash, this)
  },
  addGround: function(){
    this.platforms = this.game.add.group()
    this.platforms.enableBody = true
    this.ground = this.platforms.create(0, this.game.world.height-145)
    this.ground.scale.setTo(800,1)
    this.ground.body.immovable = true
    this.ground.visibility = false
  },
  addStats: function(){
    this.hunger = 100
    this.exercise = 50
    this.happy = 100
    this.happiness = this.game.add.text(10, 200, "Happiness: " + this.happy, {fill: 'white', font: 'bold 20pt Arial'});
    this.nomnom = this.game.add.text(10, 225, "Nom Nom: " + this.hunger, {fill: 'white', font: 'bold 20pt Arial'});
    this.strength = this.game.add.text(10, 250, "Fitness: " + this.exercise, {fill: 'white', font: 'bold 20pt Arial'});
    this.poopCount = this.game.add.text(10, 275, "Poops: " + this.poops.countLiving(), {fill: 'white', font: 'bold 20pt Arial'});
  },
  addPostFlappyButtons: function(){
    this.game.stage.backgroundColor="#000"
    this.play_again = this.game.add.button(75, 300, "exercise_button", this.goFly, this, 0,1,2)
    this.return_home = this.game.add.button(250, 300, "homes_button", this.goHome, this, 0,1,2 )
    this.high_scores = this.game.add.button(75, 100, "egg", this.showHighScores, this, 0,1,2)
  },
  setupFood: function(){
    this.foods = this.game.add.group()
    this.foods.createMultiple(1, 'food')
  },
  restMotion: function() {
    this.green_dragon.animations.play('rest')
    this.walkAroundDelay = setTimeout(this.walkAround.bind(this), 2000)
  },
  walkAround: function() {
    var amountMoved = Math.floor(Math.random()*(170)+70)
    this.hunger -= Math.floor(amountMoved/50)
    if (amountMoved > 150)
      setTimeout(this.poop(this.green_dragon.position.x, this.green_dragon.position.y), 1000)
    if (amountMoved%2==0)
      if (this.green_dragon.position.x <= 55){
        this.walkRight(amountMoved)
      } else {
      this.walkLeft(amountMoved)
      }
    else
      if (this.green_dragon.position.x >= 385){
        this.walkLeft(amountMoved)
      } else {
      this.walkRight(amountMoved)
    }
  },
  walkLeft: function(amountMoved) {
    if (this.green_dragon.scale.x < 0) {
      this.green_dragon.scale.x *= -1
    }
    this.green_dragon.animations.play('walk')
    var leftWalk = this.game.add.tween(this.green_dragon)
    
    if (this.green_dragon.position.x - amountMoved < 0 ){
      amountMoved = this.green_dragon.position.x - 55
    }
    leftWalk.to({x: this.green_dragon.position.x-amountMoved}, amountMoved*10)
    leftWalk.start()
    this.leftRestDelay = setTimeout(this.restMotion.bind(this), amountMoved*10)
  },
  walkRight: function(amountMoved) {
    if (this.green_dragon.scale.x > 0) {
      this.green_dragon.scale.x *= -1
    }
    this.green_dragon.animations.play('walk')
    var rightWalk = this.game.add.tween(this.green_dragon)

    if (this.green_dragon.position.x + amountMoved > 385 ){
      amountMoved = 450 - this.green_dragon.position.x - 65
    }

    rightWalk.to({x: this.green_dragon.position.x+amountMoved}, amountMoved*10)
    rightWalk.start()
    this.rightRestDelay = setTimeout(this.restMotion.bind(this), amountMoved*10)
  },
  dropFood: function(){

    if (this.foods.getFirstDead()){
    this.food = this.foods.getFirstDead()
    this.game.physics.enable(this.food, Phaser.Physics.arcade)
    this.food.reset(this.green_dragon.position.x, 0)
    this.food.body.gravity.y = 2000

    }
  },
  updateStatus: function(){
    this.happy = 100-2*this.poops.countLiving()
    this.poopCount.text = "Poops: " + this.poops.countLiving()
    this.happiness.text = "Happiness: " + this.happy
    this.nomnom.text = "Nom nom: " + this.hunger
    if (this.happy <= 0 || this.hunger <= 0)
      this.green_dragon.animations.play('die')
  },
  updateFood: function(){
    this.game.physics.arcade.overlap(this.green_dragon, this.foods, this.eatFood.bind(this), null, this)
    this.game.physics.arcade.collide(this.ground, this.foods, this.collision.bind(this), null, this)
  },
  clearAllTimeouts: function(){
    clearTimeout(this.rightRestDelay)
    clearTimeout(this.leftRestDelay)
    clearTimeout(this.walkAroundDelay)
    clearTimeout(this.eatRestDelay)

  },
  eatFood: function(){
    this.food.kill()
    this.green_dragon.animations.play('eat')
    this.clearAllTimeouts()
    this.eatRestDelay = setTimeout(this.restMotion.bind(this), 2000)
    this.hunger += 5

  },
  collision: function(){
    this.food.body.gravity.y = 0
    this.food.body.velocity.y = 0
  },
  goFly: function(){
    this.clearAllTimeouts()
    this.game.state.start('FlappyDragon')
  },
  goSmash: function(){
    this.clearAllTimeouts()
    this.game.state.start('BugGame')
    this.exercise += 10
  },
  poop: function(xc, yc) {
    this.poopie = this.game.add.sprite(xc, yc+40, 'poop')
    this.poopie.position.z = -10
    this.poopie.anchor.set(0.5)
    this.poopie.inputEnabled=true
    this.poopie.input.useHandCursor=true
    this.poopie.events.onInputDown.add(this.cleanPoop.bind(this))
    this.poops.add(this.poopie)
  },
  getLevel: function() {
    var ajaxRequest = $.ajax({

    })
  },
  cleanPoop: function() {
    if (this.game.input.activePointer.isDown)
      this.poops.removeAll()
  },
  goHome: function(){
    SHOWFLAPPYOPTIONS = false
    this.game.state.start('HomePage')
  },
  showHighScores: function(){
    this.game.state.start('FlappyHighScores')
  }
};
