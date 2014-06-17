Scene.FlappyHighScores = function(game) {

};

Scene.FlappyHighScores.prototype = {

  create: function() {
    this.getHighScores()
    this.play_again = this.game.add.button(75, 300, "exercise_button", this.goFly, this, 0,1,2)
    this.return_home = this.game.add.button(250, 300, "homes_button", this.goHome, this, 0,1,2 )

  },

  getHighScores: function(){
    var ajaxRequest = $.ajax({
      url: '/flappy_high_scores',
      type: 'GET'
    })
    ajaxRequest.done(this.showHighScores.bind(this))
  },
  showHighScores: function(data){
    highscores = JSON.parse(data)
    this.style = { font: "30px Arial", fill :"#ffffff"}
    for (var i = 0; i < highscores.length; i++ ){
      this.game.add.text(10, 50*(i+1), highscores[i].username + ": " + highscores[i].flappy_high_score, this.style)
    }

    // console.log(this.highscores.length)
  },
  goFly: function(){
    this.game.state.start('FlappyDragon')
  },
  goHome: function(){
    SHOWFLAPPYOPTIONS = false
    this.game.state.start('HomePage')
  }
};
