var Scene = Scene || {};
Scene.FlappyDragon = function(game) {
  this.style = { font: "30px Arial", fill :"#ffffff"}
  this.first_time = true
  this.alive = true
  this.score = 0
};

Scene.FlappyDragon.prototype = {
    
    create: function() { 
      
      this.resetGameValues()
      this.game.stage.backgroundColor = '#62bce0'
      this.setPipesAndLoop()
      this.bindInputs()
      this.makeGreenDragon()
      this.addCurrentScore()
      this.rectangle = this.game.add.sprite(0,0,'rectangle')
      this.rectangle.alpha = 0
      this.flap = this.game.add.audio('flap')
      this.point = this.game.add.audio('point')
      this.crash = this.game.add.audio('crash')

    },
    update: function() {
      this.checkDead()
    },
    resetGameValues: function(){
      this.alive = true
      this.first_time = true
      this.score = 0
    },
    setPipesAndLoop: function(){
      this.pipes = this.game.add.group()
      this.pipes.createMultiple(30, 'pipe')
      this.timer = this.game.time.events.loop(1750, this.add_row_of_pipes, this)
    },
    bindInputs: function(){
      this.game.input.onDown.add(this.jump, this)
    },
    jump: function() {
      if (this.alive){
      this.green_dragon_fly.body.velocity.y = -550
      this.flap.play();
      }
    },
    makeGreenDragon: function(){
      this.green_dragon_fly = this.game.add.sprite(50,245,'green_dragon_fly')
      this.addGreenDragonAnimations()
      this.addGreenDragonPhysics()
      this.setGreenDragonHitBox()
      
    },
    addGreenDragonAnimations: function(){
      this.green_dragon_fly.animations.add('fly', [0,1,2,3,4,5,6,7,8,9,10,11], 6, true)
      this.green_dragon_fly.animations.play('fly')

    },
    addGreenDragonPhysics: function(){
      this.game.physics.enable(this.green_dragon_fly, Phaser.Physics.arcade)
      this.green_dragon_fly.body.gravity.y=1750
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
      if (this.green_dragon_fly.inWorld == false)
        this.game_over()
      this.game.physics.arcade.overlap(this.green_dragon_fly, this.pipes, this.game_over
        , null, this)
    },
    game_over: function() {
      this.alive = false
      this.deathAnimations()
      if (this.first_time){
        this.first_time = false
        this.crash.play();
        this.updateScores()
        this.game.add.text(50, 50, "HighScores", {fill: 'white', font: 'bold 50pt Arial' })
      this.getHighScores()
      this.addPostFlappyButtons() 
      }
    },
    goHome: function(){
      this.alive = true
      clearTimeout(this.fadeOut)
      this.game.state.start('HomePage')      
    },
    deathAnimations: function(){
      this.pipes.forEachAlive(function(p){
        p.body.velocity.x = 0;
        // p.kill()
      }, this)
      this.green_dragon_fly.body.gravity.y=2000;
      
      this.game.time.events.remove(this.timer)
    },
    updateScores: function(){
      var ajaxRequest = $.ajax({
        url: '/flappy_high_score',
        type: 'POST',
        data: "score=" + this.score
      })
      ajaxRequest.done(this.getHighScores.bind(this))
    },
    getHighScores: function(){
      var ajaxRequest = $.ajax({
        url: '/flappy_high_scores',
        type: 'GET'
      })
      ajaxRequest.done(this.showHighScores.bind(this))
    },
    showHighScores: function(data){
      var highscores = JSON.parse(data.highscores)
        this.style = { font: "bold 40px Arial", fill :"#ffffff"}
        for (var i = 0; i < highscores.length; i++ ){
          this.game.add.text(50, 90+60*(i+1), highscores[i].username + ": " + highscores[i].flappy_high_score, this.style)
        }
    },
    addPostFlappyButtons: function(){
      this.play_again = this.game.add.button(175, 676, "exercise_button", this.goFly, this, 0,0,1)
      this.return_home = this.game.add.button(40, 676, "homes_button", this.goHome, this, 0,0,1 )
    },
    add_one_pipe: function(x,y){
      var pipe = this.pipes.getFirstDead()
      pipe.checkWorldBounds= true
      this.game.physics.enable(pipe, Phaser.Keyboard.arcade)
      pipe.reset(x,y)
      pipe.body.velocity.x = -275
      pipe.outOfBoundsKill = true
    },
    add_row_of_pipes: function(){
      this.point.play();
      this.score += 1;
      this.label_score.text = this.score;
      var hole = (Math.floor(Math.random()*10)+1)
      for (var i = 0; i < 13; i++) {
        if (i != hole && i != hole +1) {
          this.add_one_pipe(450, i*60+10)
        }
      }
    }

};