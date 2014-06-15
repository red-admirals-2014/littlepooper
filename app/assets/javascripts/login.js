var game = new Phaser.Game(640, 1136, Phaser.AUTO, 'login_div'); // Phaser engine initialization
  // game.state.add('Login', Scene.Login);
  
var main_state = {
	preload: function() {
		this.game.load.image('login','/images/front_page.png');
	},

	create: function() {
		frontPage = this.game.add.tileSprite(0, 0, 640, 1136, 'login');
	},

	update: function() {
  		frontPage.tilePosition.x += 1;
	}
}

game.state.add('main', main_state);
game.state.start('main');