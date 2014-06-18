Scene.FlappyHighScores = function(game) {

};

Scene.FlappyHighScores.prototype = {

  create: function() {
    this.play_again = this.game.add.button(75, 300, "exercise_button", this.goFly, this, 0,1,2)
    this.return_home = this.game.add.button(250, 300, "homes_button", this.goHome, this, 0,1,2 )

  },

  
 
  goFly: function(){
    this.game.state.start('FlappyDragon')
  },
  goHome: function(){
    SHOWFLAPPYOPTIONS = false
    this.game.state.start('HomePage')
  }
};