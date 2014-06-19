describe("Scene.BugGame", function() {
  var bugGame, game;
  beforeEach(function() {
    game = {
      add: {
        text: function() {}
      }
    }
    bugGame = new Scene.BugGame(game);
  })

  it("#bugTotal is initialized with 100", function() {
    expect(bugGame.bugsTotal).toEqual(100);
  })

  it("#addMonster creates a new Monster instance", function() {
    var monsterName = 'fake monster'
    stubMonster(monsterName);
    bugGame.addMonster()
    expect(bugGame.player.name).toEqual( monsterName );
  })

  it("#addDisplays calls game.add.text function", function() {
    var addTextReturn = 'fakeValue';
    spyOn(game.add, 'text').and.returnValue(addTextReturn);
    // we need to fake the spy arguments this.bugsKilled.
    bugGame.bugsKilled = [];
    bugGame.bugsEscaped = [];

    bugGame.game = game;
    bugGame.addDisplays();
    expect(bugGame.game.add.text.calls.count()).toEqual(2);
    expect(bugGame.score).toEqual(addTextReturn);
    expect(bugGame.escaped).toEqual(addTextReturn);
  })
})
