Scene.FlappyHighScores = function(game) {

};

Scene.FlappyHighScores.prototype = {

  create: function() {
    this.game.stage.backgroundColor = '#62bce0'
    this.getHighScores()

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

    // console.log(this.highscores.length)
  }

};