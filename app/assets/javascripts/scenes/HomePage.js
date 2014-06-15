Scene.HomePage = function(game) {

};

Scene.HomePage.prototype = {
	preload: function(){
		
	},

	create: function() {

		clouds = this.game.add.tileSprite(0, 0, 640, 138, 'clouds');
		land = this.game.add.tileSprite(0, 138, 640, 1020, 'land')
  	},

  	update: function() {
  		clouds.tilePosition.x += 1;
  	}

};