describe("Scene.BugGame", function() {
  var bugGame, game;
  beforeEach(function() {
    game = {}
    bugGame = new Scene.BugGame(game);
  })
  it("#bugTotal is initialized with 50", function() {
    expect(bugGame.bugsTotal).toEqual(50);
  })
  it("#addMonster creates a new Monster instance", function() {
    expect(bugGame.addMonster).toEqual('');
  })
})
