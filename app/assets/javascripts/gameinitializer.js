(function () {
  var game = new Phaser.Game(450, 800, Phaser.AUTO, 'game_div');

  SHOWFLAPPYOPTIONS = false

  game.state.add('Boot', Scene.Boot)
  game.state.add('Preloader', Scene.Preloader)
  game.state.add('HomePage', Scene.HomePage);
  game.state.add('BugGame', Scene.BugGame)
  game.state.add('FlappyDragon', Scene.FlappyDragon);
  game.state.add('FlappyHighScores', Scene.FlappyHighScores)
  game.state.add('Egg', Scene.Egg)
  game.state.start('Boot'); // Go to Boot scene (start the game)
})();


