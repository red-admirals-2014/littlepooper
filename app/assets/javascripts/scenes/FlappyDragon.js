Scene.FlappyDragon = function(game) {
  this.alive = true
  this.style = { font: "30px Arial", fill :"#ffffff"}
};

Scene.FlappyDragon.prototype = {
    
    create: function() { 
      this.alive = true
      this.game.stage.backgroundColor = '#62bce0'
      this.pipes = this.game.add.group()
      this.pipes.createMultiple(30, 'pipe')

      this.game.input.onDown.add(this.jump, this)



      this.green_dragon_fly = this.game.add.sprite(50,245,'green_dragon_fly')
      this.green_dragon_fly.anchor.set(0.5)
      this.green_dragon_fly.scale.setTo(-0.5,0.5)

      this.game.physics.enable(this.green_dragon_fly, Phaser.Physics.arcade);

      // this.game.debug.body(this.green_dragon_fly)

      this.green_dragon_fly.body.setSize(40,40,10,5)
      this.green_dragon_fly.animations.add('fly', [0,1,2,3,4,5,6,7,8,9,10,11], 6, true)
      this.green_dragon_fly.animations.play('fly')
      this.green_dragon_fly.body.gravity.y=1750;

      this.score = 0
      this.label_score =  this.game.add.text(20,20, "0", this.style)

      this.timer = this.game.time.events.loop(1750, this.add_row_of_pipes, this)
    },

    update: function() {

      // if (this.green_dragon_fly.angle < 20)
      //   this.green_dragon_fly.angle += 1;
      if (this.green_dragon_fly.inWorld == false)
        this.game_over()
      this.game.physics.arcade.overlap(this.green_dragon_fly, this.pipes, this.game_over
        , null, this);
    // Function called 60 times per second
    },
    jump: function() {
      if (this.alive){
      this.green_dragon_fly.body.velocity.y = -550
      }
    },
    game_over: function() {
      this.alive = false
      // this.green_dragon_fly.body.velocity.y = 0 
      this.pipes.forEachAlive(function(p){
        p.body.velocity.x = 0;
      }, this)
      this.green_dragon_fly.body.gravity.y=2000;

      this.game.time.events.remove(this.timer)
      this.updateHighScore()
      SHOWFLAPPYOPTIONS = true
      this.alive = true
      this.game.state.start('HomePage')

      
    },
    restart_game: function() {
      this.updateHighScore()
      this.alive = true
      this.game.state.start('FlappyDragon')
    },
    updateHighScore: function(){
      var ajaxRequest = $.ajax({
        url: '/flappy_high_score',
        type: 'POST',
        data: "score=" + this.score
      })
    },
    showHighScores: function(data){
      this.updateHighScore()
      this.game.state.start('FlappyHighScores')
    },
    go_home: function(){
      this.updateHighScore()
      this.game.state.start('HomePage')
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