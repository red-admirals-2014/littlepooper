Scene.CloudJump = function(game) {
  this.style = { font: "30px Arial", fill :"#ffffff"}

};

Scene.CloudJump.prototype = {

    create: function() {
      this.resetGameValues()
      this.game.stage.backgroundColor = '#62bce0'
      this.setClouds()
      this.makeGreenDragon()
      this.addCurrentScore()

      platforms = this.game.add.group();
      platforms.enableBody = true;


      var ground = platforms.create(0, this.game.world.height - 50)
      ground.scale.setTo(40, 2)
      ground.body.immovable = true

      var leftwall = platforms.create(-20, this.game.height)
      leftwall.anchor.set(0,1)
      leftwall.scale.setTo(1, 50)
      leftwall.body.immovable = true

      var rightwall = platforms.create(this.game.width+30,this.game.height)
      rightwall.anchor.set(1,1)
      rightwall.scale.setTo(1, 50)
      rightwall.body.immovable = true

      cursors = this.game.input.keyboard.createCursorKeys();

    },

    update: function() {
    // Function called 60 times per second
      this.game.physics.arcade.collide(this.green_dragon_fly, platforms);
      this.game.physics.arcade.collide(this.green_dragon_fly, this.clouds);

      if(this.green_dragon_fly.body.touching.down){
        this.green_dragon_fly.body.velocity.x = 0
      }
      if(this.conditionsToJump()){
        this.jump()
      }

      this.checkDead()
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
      this.score = 0
    },
    setClouds: function(){
      this.clouds = this.game.add.group()
      this.clouds.createMultiple(100, 'cloud')
      this.timer = this.game.time.events.loop(1000, this.add_row_of_medium_clouds, this)
    },

    jump: function(pointer) {
      var xVelocity = this.game.input.activePointer.x - this.green_dragon_fly.x


      this.green_dragon_fly.body.velocity.y = -1200
      this.green_dragon_fly.body.velocity.x = xVelocity * 1.5

    },

    makeGreenDragon: function(){
      this.green_dragon_fly = this.game.add.sprite(this.game.width/2,this.game.height/2,'green_dragon_fly')
      this.game.physics.enable(this.green_dragon_fly, Phaser.Physics.arcade)


      this.green_dragon_fly.body.bounce.y = 0.2;
      this.green_dragon_fly.body.bounce.x = 0.2;
      this.green_dragon_fly.body.gravity.y = 3000;
      this.addGreenDragonAnimations()
      this.setGreenDragonHitBox()

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

      if (this.green_dragon_fly.y > this.game.height){
        this.game_over()
      }
    },
    game_over: function() {
      this.alive = false
    },
    updateScores: function(){
      var ajaxRequest = $.ajax({
        url: '/flappy_high_score',
        type: 'POST',
        data: "score=" + this.score
      })
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