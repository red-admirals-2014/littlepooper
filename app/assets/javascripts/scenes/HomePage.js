Scene.HomePage = function(game) {

};

Scene.HomePage.prototype = {


	create: function() {
		clouds = this.game.add.tileSprite(0, 0, 640, 138, 'clouds');
		land = this.game.add.tileSprite(0, 138, 640, 1020, 'land')
    this.green_dragon = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY+200, 'green_dragon')
    this.green_dragon.anchor.set(0.5)
    this.green_dragon.animations.add('rest', [0, 1, 2, 3, 4, 5, 6, 7], 6, true)
    this.green_dragon.animations.play('rest') 
  	},

  	update: function() {
  		clouds.tilePosition.x += 1;
  	}
};