var Scene = Scene || {};
Scene.BugGame = function(game) {
    this.bugsTotal = 100;
    this.min_bug_speed = 50
    this.max_bug_speed = 250
    this.first_time = true
}

Scene.BugGame.prototype = {

  create: function() {
    this.resetGameValues()
    this.addBackground()
    this.addBugs()
    this.addMonster()
    this.addBushes()
    this.addDisplays()
  },

  addBackground: function(){
    this.game.add.sprite(0, 0, 'sidewalk-bg');
  },

  addBugs: function(){
    for (var i = 0; i < this.bugsTotal; i++) {
        this.bugs.push( new Bug(i, this.game ) )
    }
  },

  addMonster: function(){
    this.player = new Monster('Hank', this.game)
  },

  addBushes: function(){
    this.bushes = this.game.add.group();
    this.bushes.enableBody = true;
    this.bushes.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 3; i++){
      var bush = this.bushes.create(this.game.world.randomX, this.game.world.randomY, 'bush');
      bush.body.immovable = true;
    }
  },

  addDisplays: function(){
    this.score = this.game.add.text(10, 10, "Bugs Squashed: " + this.bugsKilled.length, {fill: 'white', font: 'bold 30pt Arial'});
    this.escaped = this.game.add.text(10, 50, "Bugs Escaped: " + this.bugsEscaped.length, {fill: 'white', font: 'bold 30pt Arial'});
  },

  checkOverlap: function(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
  },

  update: function() {
    for(var i in this.bugs){
        if (this.bugs[i].alive) {
            if (this.checkOverlap(this.bugs[i].bug, this.player.monster)){
                this.killBug(this.bugs[i], 'smash');
            }
            if (this.outOfBounds(this.bugs[i])){
                this.killBug(this.bugs[i], 'escape');
            }
            this.bugs[i].moveBugAtRandomIntervals(this.min_bug_speed, this.max_bug_speed)
        }
    }
    this.updateStats()
    this.game.input.onDown.add(this.player.moveMonster, this)
    this.checkGameOver()
  },

  updateStats: function(){
    this.score.text = "Bugs Squashed: " + this.bugsKilled.length
    this.escaped.text = "Bugs Escaped: " + this.bugsEscaped.length
  },

  outOfBounds: function(bug_obj){
    if(bug_obj.bug.x < 0 || bug_obj.bug.y < 0 || bug_obj.bug.x > this.game.width || bug_obj.bug.y > this.game.height && bug_obj.alive){
        return true
    } else {
        return false
    }
  },

  killBug: function(bug_obj, option){
    bug_obj.alive = false
    if(option === "smash"){
        bug_obj.smashed()
        this.bugsKilled.push(bug_obj)
    }
    if(option === "escape"){
        this.bugsEscaped.push(bug_obj)
    }
  },

  checkGameOver: function(){
    if(this.bugsKilled.length + this.bugsEscaped.length >= this.bugsTotal){
        this.gameOver()
    }
  },

  updateBugStats: function(){
    var ajaxRequest = $.ajax({
      url: '/bug_high_score',
      type: 'POST',
      data: 'score=' + this.bugsKilled.length
    })
    ajaxRequest.done(this.getBugStats.bind(this))
  },

  getBugStats: function(){
    var ajaxRequest = $.ajax({
      url: '/bug_high_scores',
      type: 'GET'
    })
    ajaxRequest.done(this.showHighScores.bind(this))
    this.currentAjaxRequest = ajaxRequest
  },

  showHighScores: function(data){
    if (this.showScores){
      var highscores = JSON.parse(data.highscores)
      this.style = { font: "bold 40px Arial", fill :"#ffffff"}
      for (var i = 0; i < highscores.length; i++ ){
        this.game.add.text(50, 150+60*(i+1), highscores[i].username + ": " + highscores[i].bug_high_score, this.style)
      }
    }
  },  

  gameOver: function() {
    this.player.monster.position.x = this.game.width/2-50
    this.player.monster.position.y = this.game.height/2-50
    this.player.monster.animations.play("idle")
    this.game.input.onDown.remove(this.player.moveMonster, this)
    if(this.first_time){
      this.first_time = false
      if(this.bugsKilled.length > 20){
      this.game.add.text(this.game.width/2, this.game.height/2-250, "Smashtastic!", {align: 'center', fill: 'red', font: 'bold 50pt Arial', stroke: 'white', strokeThickness: 8 }).anchor.set(0.5, 0.5)
      }
      else {
      this.game.add.text(this.game.width/2, this.game.height/2-250, "Try again!", {align: 'center', fill: 'white', font: 'bold 40pt Arial'}).anchor.set(0.5, 0.5)
      }
      this.showScores = true
      this.updateBugStats()        
      this.game.add.button(50, this.game.height-150, "homes_button", this.goHome, this, 0,0,1)
      this.game.add.button(200, this.game.height-150, "bugs_button", this.playAgain, this, 0,0,1)

    }
  },

  resetGameValues: function(){
    this.bugs = [];
    this.bugsKilled = [];
    this.bugsEscaped = [];
    this.first_time = true
  },

  resetMonsterStuff: function(){
    this.player.monster.destroy();
    for(var i in this.bugs){
        this.bugs[i].bug.destroy()
    }
  },

  goHome: function(){
    this.resetMonsterStuff()     
    this.showScores = false      
    this.game.state.start('HomePage')
  },

  playAgain: function(){
    this.resetMonsterStuff()
    this.showScores = false      
    this.game.state.start('BugGame');
  }
}

// Player(s) / Enemies classes

function Monster(name, game){
  this.monster = game.add.sprite(game.world.randomX, game.world.randomY, 'green_dragon_bug');
  game.physics.enable(this.monster, Phaser.Physics.ARCADE);
  this.monster.body.setSize(50, 50, 25, 25);
  this.monster.animations.add('up', [32,33,34,35], 6,true);
  this.monster.animations.add('down', [36,37,38,39], 6,true);
  this.monster.animations.add('left', [24,25,26,27], 6,true);
  this.monster.animations.add('right', [28,29,30,31], 6,true);
  this.monster.animations.add('idle', [0,1,2,3,4,5,6,7], 6,true);
}

Monster.prototype = {
  moveMonster: function(pointer){
    var monster_speed = 250   // msec
    var xDiff = pointer.x - this.player.monster.x
    var yDiff = pointer.y - this.player.monster.y
    if ( Math.abs(yDiff) >= Math.abs(xDiff) && yDiff < 0 ) {
        this.player.monster.animations.play('up')
    } else if ( Math.abs(yDiff) >= Math.abs(xDiff) && yDiff > 0 ) {
        this.player.monster.animations.play('down')
    } else if ( Math.abs(xDiff) >= Math.abs(yDiff) && xDiff > 0 ) {
        this.player.monster.animations.play('right')
    } else { this.player.monster.animations.play('left') }
    this.game.add.tween(this.player.monster).to( { x: pointer.x-50, y: pointer.y-50 }, monster_speed, Phaser.Easing.Linear.None, true)
  },

}

function Bug(name, game) {
  var kill_frames = [12,13,14]
  var select_kill = kill_frames[Math.floor(Math.random()*kill_frames.length)];
  this.bug = game.add.sprite(game.world.randomX, game.world.randomY, 'bug');
  game.physics.enable(this.bug, Phaser.Physics.ARCADE);
  this.alive = true;
  this.bug.animations.add('kill', [select_kill], 6, false);
  this.bug.animations.add('downwalk',[0,1,2],6,true);
  this.bug.animations.add('leftwalk',[3,4,5],6,true);
  this.bug.animations.add('rightwalk',[6,7,8],6,true);
  this.bug.animations.add('upwalk',[9,10,11],6,true);
}


Bug.prototype = {
  smashed: function(){
    this.bug.animations.play('kill')
    this.bug.body.velocity.x = 0;
    this.bug.body.velocity.y = 0;
  },

  moveBugAtRandomIntervals: function(min, max){
    if(Math.floor(Math.random() * 100) < 5 ){
        this.moveRandomDirection(min, max)
    }
  },

  moveRandomDirection: function(min, max){
    this.bug.body.velocity.x = 0;
    this.bug.body.velocity.y = 0;
    var direction = Math.floor(Math.random() * (4) + 1);

    if (direction == 1) {           // Move up
        var velocity_y = Math.floor(Math.random() * (-max-min) - min );
        this.bug.animations.play('upwalk')
        this.bug.body.velocity.y = velocity_y;
    }
    else if (direction == 2) {      // Move right
        var velocity_x = Math.floor(Math.random() * (max-min) + min );
        this.bug.animations.play('rightwalk')
        this.bug.body.velocity.x = velocity_x;
    }
    else if (direction == 3) {      // Move down
        var velocity_y = Math.floor(Math.random() * (max-min) + min );
        this.bug.animations.play('downwalk')
        this.bug.body.velocity.y = velocity_y;
    }
    else if (direction == 4) {      // Move left
        var velocity_x = Math.floor(Math.random() * (-max-min) - min );
        this.bug.animations.play('leftwalk')
        this.bug.body.velocity.x = velocity_x;
    }
  },
}
