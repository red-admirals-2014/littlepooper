Scene.CloudJump = function(game) {
  this.style = { font: "30px Arial", fill :"#ffffff"}
  this.first_time = true
  this.score = 0;
};

Scene.CloudJump.prototype = {

    create: function() {
      this.easyStart = false;
      this.mediumStart = false;
      this.hardStart = false;
      this.resetGameValues()
      this.game.stage.backgroundColor = '#7f7ad7'
      this.jumpMusic = this.game.add.audio('jump')

      this.nightSky = this.game.add.sprite(0, this.game.height, 'night_sky')
      this.nightSky.anchor.set(0,1);
      this.game.physics.enable(this.nightSky, Phaser.Physics.arcade)
      this.nightSky.body.velocity.y = 10;

      this.setClouds()
      this.makeGreenDragon()
      this.addCurrentScore()
      platforms = this.game.add.group();
      platforms.enableBody = true;

      this.startingPlatform = this.game.add.sprite(this.game.width/2, this.game.height, 'pipe')
      this.startingPlatform.anchor.set(0.5,1)
      this.game.physics.enable(this.startingPlatform, Phaser.Physics.arcade)
      this.startingPlatform.body.immovable = true

    },
    update: function() {
    // Function called 60 times per second
      if(this.score === 6){
        this.startingPlatform.destroy()
      }
      this.game.physics.arcade.collide(this.green_dragon_fly, this.startingPlatform);
      this.game.physics.arcade.collide(this.green_dragon_fly, this.clouds);

      if(this.green_dragon_fly.body.touching.down){
        this.green_dragon_fly.body.velocity.x = 0
      }
      if(this.conditionsToJump()){
        this.jump()
      }
      this.setDifficulty()
      this.checkDead()
    },
    setDifficulty: function(){
      if(this.score < 50 && this.easyStart === false){
        this.game.time.events.loop(1000, this.add_row_of_easy_clouds, this)
        this.easyStart = true;
      }
      else if(this.score >= 50 && this.score < 100 && this.mediumStart === false){
        this.game.time.events.removeAll()
        this.game.time.events.loop(1000, this.add_row_of_medium_clouds, this)
        this.mediumStart = true;
      }
      else if(this.score >= 100 && this.hardStart === false){
        this.game.time.events.removeAll()
        this.game.time.events.loop(1000, this.add_row_of_hard_clouds, this)
        this.hardStart = true;
      }
    },
    conditionsToJump: function(){
      if(this.game.input.activePointer.isDown &&
        this.green_dragon_fly.body.touching.down &&
        this.green_dragon_fly.alive ){
        return true
      } else {
        return false
      }
    },
    resetGameValues: function(){
      this.alive = true
      this.first_time = true
      this.score = 0
    },
    setClouds: function(){
      this.clouds = this.game.add.group()
      this.clouds.createMultiple(50, 'cloud')
    },
    jump: function(pointer) {
      this.jumpMusic.play()
      var xVelocity = this.game.input.activePointer.x - this.green_dragon_fly.x
      this.green_dragon_fly.body.velocity.y = -1200
      this.green_dragon_fly.body.velocity.x = xVelocity * 1.5
    },
    makeGreenDragon: function(){
      this.green_dragon_fly = this.game.add.sprite(this.game.width/2,this.game.height/2,'green_dragon_fly')
      this.game.physics.enable(this.green_dragon_fly, Phaser.Physics.arcade)
      this.setGreenDragonHitBox()
      this.green_dragon_fly.body.bounce.y = 0.2;
      this.green_dragon_fly.body.bounce.x = 0.2;
      this.green_dragon_fly.body.gravity.y = 3000;
      this.addGreenDragonAnimations()
    },
    addGreenDragonAnimations: function(){
      this.green_dragon_fly.animations.add('fly', [0,1,2,3,4,5,6,7,8,9,10,11], 6, true)
      this.green_dragon_fly.animations.play('fly')
    },

    setGreenDragonHitBox: function(){
      this.green_dragon_fly.anchor.set(0.5)
      this.green_dragon_fly.scale.setTo(-0.5,0.5)
      this.green_dragon_fly.body.setSize(40,40,10,5)
    },

    addCurrentScore: function(){
      this.label_score =  this.game.add.text(20,20, "0", this.style)
    },

    checkDead: function(){
      if (this.deadConditions()){
        this.gameOver()
      }
    },
    deadConditions: function(){
      if(this.green_dragon_fly.y > this.game.height){
        return true
      } else {
        return false
      }
    },
    gameOver: function() {
      this.alive = false
      this.game.time.events.removeAll()
      if (this.first_time){
        this.first_time = false
        this.updateScores()
        this.nightSky.body.velocity.y = 0;
        this.game.add.text(50, 50, "HighScores", {fill: 'white', font: 'bold 50pt Arial' })
        this.game.add.button(50, this.game.height-150, "homes_button", this.goHome, this, 0,1,2)
        this.game.add.button(200, this.game.height-150, "cloud_button", this.playAgain, this, 0,1,2)
      }
    },
    goHome: function(){
      this.currentAjaxRequest.abort()
      this.game.state.start('HomePage')
    },
    playAgain: function(){
      this.currentAjaxRequest.abort()
      this.game.state.start('CloudJump')
    },
    updateScores: function(){
      var ajaxRequest = $.ajax({
        url: '/cloud_high_score',
        type: 'POST',
        data: "score=" + this.score
      })
      ajaxRequest.done(this.getHighScores.bind(this))
    },
    getHighScores: function(){
      var ajaxRequest = $.ajax({
        url: '/cloud_high_scores',
        type: 'GET'
      })
      ajaxRequest.done(this.showHighScores.bind(this))
      this.currentAjaxRequest = ajaxRequest
    },
    showHighScores: function(data){
      var highscores = JSON.parse(data.highscores)
      this.style = { font: "bold 40px Arial", fill :"#ffffff"}
      for (var i = 0; i < highscores.length; i++ ){
        this.game.add.text(50, 90+60*(i+1), highscores[i].username + ": " + highscores[i].cloud_high_score, this.style)
      }
    },
    add_one_cloud: function(x,y){
      var cloud = this.clouds.getFirstDead()
      this.game.physics.enable(cloud, Phaser.Keyboard.arcade)
      cloud.body.checkCollision.down = false;
      cloud.body.checkCollision.left = false;
      cloud.body.checkCollision.right = false;
      cloud.checkWorldBounds = true
      cloud.outOfBoundsKill = true
      cloud.reset(x,y)
      cloud.body.velocity.y = 200
      cloud.body.immovable = true
    },

    add_row_of_easy_clouds: function(){
      this.score += 1;
      this.label_score.text = this.score;
      var random1 = (Math.floor(Math.random()*10)+1)
      var random2 = (Math.floor(Math.random()*10)+1)
      this.add_one_cloud(random1*40, 0)
      this.add_one_cloud((random1+1)*40, 0)
      this.add_one_cloud(random2*40, 0)
      this.add_one_cloud((random2+1)*40, 0)
      this.add_one_cloud((random2+2)*40, 0)
    },
    add_row_of_medium_clouds: function(){
      this.score += 1;
      this.label_score.text = this.score;
      var random1 = (Math.floor(Math.random()*10)+1)
      this.add_one_cloud(random1*40, 0)
      this.add_one_cloud((random1+1)*40, 0)
    },
    add_row_of_hard_clouds: function(){
      this.score += 1;
      this.label_score.text = this.score;
      var random1 = (Math.floor(Math.random()*10)+1)
      for (var i = 0; i < 12; i++) {
        if(i === random1){
          this.add_one_cloud(i*40, 0)
        }
      }
    },


};