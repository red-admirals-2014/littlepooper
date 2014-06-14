Scene.HomePage = function(game) {

};

Scene.HomePage.prototype = {
	preload: function(){
		this.game.load.image('clouds','/images/clouds.png');
		this.game.load.image('land','/images/land.png');
	},

	create: function() {

		clouds = this.game.add.tileSprite(0, 0, 640, 138, 'clouds');
		land = this.game.add.tileSprite(0, 138, 640, 1020, 'land')
  	},

  	update: function() {
  		clouds.tilePosition.x += 1;
  	}

};