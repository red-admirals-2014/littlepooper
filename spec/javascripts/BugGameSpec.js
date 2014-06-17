describe(Scene.BugGames, function() {
  var bugGame, game;
  beforeEach(function() {
    game = {}
    bugGame = new Scene.BugGame(game);
  })
  it("#bugTotal is initialzed with 50", function() {
    expect(bugGame.bugsTotal).toEqual(50);
  })
  it("#bugs is initialzed with 50", function() {
    expect(bugGame.bugs).toEqual([]);
  })
})
