Scene.HomePage = function(game) {
};

Scene.HomePage.prototype = {

	create: function() {
    if (SHOWFLAPPYOPTIONS){
      this.getHighScores()
      this.addPostFlappyButtons()  
    } else {    
      this.clouds = this.game.add.tileSprite(0,0, 450,180, 'clouds');
      this.forest = this.game.add.tileSprite(0,125, 450, 675, 'forest');
      this.poops = this.game.add.group()
      this.makeGreenDragon()
      this.addGround()
      this.setupFood()
      this.addHomeButtons()
      this.getPetStats()
      this.showStats()

      this.rectangle = this.game.add.sprite(0,0,'rectangle')
      this.rectangle.alpha = 0
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
    this.restMotion()
  },
  addGreenDragonClick: function(){
    this.green_dragon.inputEnabled=true
    this.green_dragon.input.useHandCursor=true
    this.green_dragon.events.onInputDown.add(this.greenDragonPoke.bind(this))
  },
  greenDragonPoke: function() {
    if (this.game.input.activePointer.isDown) {
      this.green_dragon.animations.play('poke')
      this.happiness += 30
    }
  },
  addHomeButtons: function(){
    this.food_button = this.game.add.button(40,676, "food_button", this.dropFood, this, 0, 0, 1)
    this.fly_button = this.game.add.button(175,676, "exercise_button", this.goFly, this, 0, 0, 1)
    this.exercise_button = this.game.add.button(310,676, "bugs_button", this.goSmash, this, 0, 0, 1)
    this.ladder_button = this.game.add.button(310, 100, "ranking_button", this.getRankings, this, 0, 0, 1)
  },
  addGround: function(){
    this.platforms = this.game.add.group()
    this.platforms.enableBody = true
    this.ground = this.platforms.create(0, this.game.world.height-145)
    this.ground.scale.setTo(800,1)
    this.ground.body.immovable = true
    this.ground.visibility = false
  },
  addPostFlappyButtons: function(){
    this.game.stage.backgroundColor="#000"
    this.play_again = this.game.add.button(40, 676, "exercise_button", this.goFly, this, 0,0,1)
    this.return_home = this.game.add.button(310, 676, "homes_button", this.goHome, this, 0,0,1 )
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
    this.updatePetStats()

    var amountMoved = Math.floor(Math.random()*(170)+70)
    this.nomnom -= Math.floor(amountMoved/50)
    this.strength -= Math.floor(amountMoved/70)
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
    this.poopCount.text = "Poops: " + this.poops.countLiving()
    this.happinessDisplay.text = "Happiness: " + this.happiness
    this.nomnomDisplay.text = "Nom nom: " + this.nomnom
    this.strengthDisplay.text = "Strength: " + this.strength
    this.xpDisplay.text = "XP: " + this.xp
    if (this.happiness <= 0 || this.nomnom <= 0 || this.strength <= 0)
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
    this.updatePetStats()

    this.food.kill()
    this.green_dragon.animations.play('eat')
    this.clearAllTimeouts()
    this.eatRestDelay = setTimeout(this.restMotion.bind(this), 2000)
    this.nomnom += 25

  },
  collision: function(){
    this.food.body.gravity.y = 0
    this.food.body.velocity.y = 0
  },

  goFly: function(){
    this.strength += 50
    this.updatePetStats()

    this.clearAllTimeouts()
    this.game.state.start('FlappyDragon')
  },
  goSmash: function(){
    this.strength += 50
    this.updatePetStats()
    
    this.clearAllTimeouts()
    this.game.state.start('BugGame')
  },
  poop: function(xc, yc) {
    this.happiness -= 2 * this.poops.countLiving()
    this.updatePetStats()

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
      this.happiness +=30
      this.updatePetStats()

  },
  goHome: function(){
    SHOWFLAPPYOPTIONS = false
    this.game.state.start('HomePage')
  },

  checkDeathPenalty: function(){
    if (this.happiness <= 0 || this.nomnom <= 0 || this.strength <= 0){
      if (this.xp >0) {
        this.xp -= 1
      }
    }
  },
  updatePetStats: function(){
    this.checkDeathPenalty()
    var ajaxRequest = $.ajax({
      url: '/set_pet_stats',
      type: 'POST',
      data: 'happiness=' + this.happiness + '&nomnom=' + this.nomnom + '&strength=' + this.strength + '&xp=' + this.xp
    })
  },
  getPetStats: function(){
    var ajaxRequest = $.ajax({
      url: '/get_pet_stats',
      type: 'GET'
    })
    ajaxRequest.done(this.initializePetStats.bind(this))
  },
  initializePetStats: function(data){
    this.happiness = data.happiness
    this.nomnom = data.nomnom
    this.strength = data.strength
    this.xp = data.xp
  },
  showStats: function(){
    this.xpDisplay = this.game.add.text(10, 175, "XP: " + this.xp, {fill: 'white', font: 'bold 20pt Arial'});
    this.happinessDisplay = this.game.add.text(10, 200, "Happiness: " + this.happiness, {fill: 'white', font: 'bold 20pt Arial'});
    this.nomnomDisplay = this.game.add.text(10, 225, "Nom Nom: " + this.nomnom, {fill: 'white', font: 'bold 20pt Arial'});
    this.strengthDisplay = this.game.add.text(10, 250, "Strength: " + this.strength, {fill: 'white', font: 'bold 20pt Arial'});
    this.poopCount = this.game.add.text(10, 275, "Poops: " + this.poops.countLiving(), {fill: 'white', font: 'bold 20pt Arial'});
  },
  getHighScores: function(){
    var ajaxRequest = $.ajax({
      url: '/flappy_high_scores',
      type: 'GET'
    })
    ajaxRequest.done(this.showHighScores.bind(this))
  },
  showHighScores: function(data){
    highscores = JSON.parse(data.highscores)
    this.style = { font: "30px Arial", fill :"#ffffff"}
    for (var i = 0; i < highscores.length; i++ ){
      this.game.add.text(10, 50*(i+1), highscores[i].username + ": " + highscores[i].flappy_high_score, this.style)
    }
  },
  getRankings: function(){
    var ajaxRequest = $.ajax({
      url: '/rankings',
      type: 'GET'
    })
    ajaxRequest.done(this.checkRankings.bind(this))
  },
  checkRankings: function(data){
    this.fadeIn = this.game.add.tween(this.rectangle).to({ alpha: 0.8}, 250, Phaser.Easing.Linear.None)
    this.fadeIn.start()
    rankings = JSON.parse(data.rankings)
    this.rankingText = this.game.add.group()
    this.style = { font: "30px Arial", fill :"#ffffff"}
    this.rankingText.add(this.game.add.text(10, 25, "Leaderboard", { font: "50px Arial", fill :"#ffffff"}))
    for (var i = 0; i < rankings.length; i++ ){
      this.rankingText.add(this.game.add.text(10, 50*(i+2), i + 1 + ": " + rankings[i].username + " - " + rankings[i].pet_xp, this.style))
    }
    this.ladder_button = this.game.add.button(310, 100, "ranking_button", this.exitRankings, this)
  },
  exitRankings: function() {
    this.fadeIn = this.game.add.tween(this.rectangle).to({ alpha: 0}, 250, Phaser.Easing.Linear.None)
    this.fadeIn.start()
    this.rankingText.removeAll()
    this.ladder_button.destroy()

  }
};
