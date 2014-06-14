Scene.Stomper = function(game) {

};

Scene.Stomper.prototype = {
    preload: function() { 
      this.game.stage.backgroundColor = "#71c5cf"
      this.game.load.image('bird', '/images/bird.png')
      this.game.load.image('pipe', '/images/pipe.png')

    },

    create: function() { 
      this.pipes = this.game.add.group()
      this.pipes.createMultiple(20, 'pipe')


      this.bird = this.game.add.sprite(100,245,'bird')
      this.bird.anchor.setTo(-0.2, 0.5);  
      this.game.physics.enable(this.bird, Phaser.Physics.arcade);   
      this.bird.body.gravity.y=1000;

      this.score = 0
      var style = { font: "30px Arial", fill :"#ffffff"}
      this.label_score =  this.game.add.text(20,20, "0", style)


      var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      space_key.onDown.add(this.jump, this)
      this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this)
    },
    
    update: function() {
      if (this.bird.angle < 20)  
        this.bird.angle += 1;
      if (this.bird.inWorld == false)
        this.restart_game()
      this.game.physics.arcade.overlap(this.bird, this.pipes, this.restart_game
        , null, this);
    // Function called 60 times per second
    },

    jump: function() {
      var animation = this.game.add.tween(this.bird)
      animation.to({angle:-20}, 100)
      animation.start()
      this.bird.body.velocity.y = -350
    },

    restart_game: function() {
      this.game.time.events.remove(this.timer);  
      this.game.state.start('Stomper')
    },

    add_one_pipe: function(x,y){
      var pipe = this.pipes.getFirstDead()
      pipe.checkWorldBounds= true
      this.game.physics.enable(pipe, Phaser.Keyboard.arcade)
      pipe.reset(x,y)
      pipe.body.velocity.x = -200
      pipe.outOfBoundsKill = true
    },
    add_row_of_pipes: function(){
      this.score += 1; 
      this.label_score.text = this.score;  
      var hole = (Math.floor(Math.random()*5)+1)
      for (var i = 0; i < 8; i++) {
        if (i != hole && i != hole +1) {
          this.add_one_pipe(400, i*60+10)
        }
      }
    }

};