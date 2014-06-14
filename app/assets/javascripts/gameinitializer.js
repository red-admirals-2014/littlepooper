(function () {
  var game = new Phaser.Game(640, 1136, Phaser.AUTO, 'game_div'); // Phaser engine initialization
  game.state.add('Boot', Scene.Boot); // scene to start loading game assets.
  game.state.add('Preloader', Scene.Preloader); // loading game assets
  game.state.add('MainMenu', Scene.MainMenu); // first proper game screen
  game.state.add('HomePage', Scene.HomePage);
  game.state.add('BugStomp', Scene.BugStomp)
  game.state.start('Boot'); // Go to Boot scene (start the game)
})();