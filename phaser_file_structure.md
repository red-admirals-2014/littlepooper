# HOW TO MAKE A SCENE


## add your scene javascript into the scenes folder in app/assets/scenes

## add the javascript include tag into the game.html.haml file

## add the phaser code into gameinitializer.js

  e.g. game.state.add('SceneNameHere', Scene.SceneNameHere); // fist proper game screen

## to use a scene do game.state.start('SceneName')
  e.g. game.state.start('Boot')

## add the javascript path into the assets.rb file in config/initializers/assets.rb


#SHIT WONT WORK OTEHRWISE



