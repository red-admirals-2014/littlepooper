describe("Scene.FlappyDragon", function() {
  var flappyDragon, game;
  beforeEach(function() {
    flappyDragon = new Scene.FlappyDragon(game);
    game = {
      add: {
        group: function(){}
      },
      time: {
        events: {
          loop: function(arg1){}
        }
      }
    }
  })
  it("#alive is initialized as true", function()
    {
    expect(flappyDragon.alive).toEqual(true)
  })
  it("#first_time is initialized as true", function()
    {
    expect(flappyDragon.first_time).toEqual(true)
  })
  it("#score is initialized as 0", function()
    {
    expect(flappyDragon.score).toEqual(0)
  })
  it("#resetGameValues sets alive, first_time and score to 0", function(){
    flappyDragon.alive = false
    flappyDragon.first_time = false
    flappyDragon.score = 2
    flappyDragon.resetGameValues()
    expect(flappyDragon.alive).toEqual(true)
    expect(flappyDragon.first_time).toEqual(true)
    expect(flappyDragon.score).toEqual(0)
  })
  it("#setPipesAndLoop should make a group and start a loop", function(){
    var addGroupReturn = {createMultiple: function(arg1, arg2){}}
    // spyOn(game.add, 'group').and.returnValue(addGroupReturn)
    // spyOn(game.time.events, 'loop').and.returnValue('hello')
    // flappyDragon.game = game
    // flappyDragon.setPipesAndLoop()
    // console.log(flappyDragon.pipes)
    // expect(flappyDragon.pipes).toEqual(addGroupReturn)
    // expect(flappyDragon.timer).toEqual()
    // flappyDragon.game
    // expect(flappyDragon.pipes).toEqual(flappyDragon.game.add.group())
  })
  // it("#first_time is initialized as true", function(){
  //   // expect(flappyDragon.first_time).toEqual(true)
  // })
  // it("#score is initialized as 0", function(){
  //   // expect(flappyDragon.score).toEqual(20)
  // })




})

