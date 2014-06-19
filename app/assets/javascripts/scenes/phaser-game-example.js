
var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'phaser-example',
    { preload: preload, create: create, update: update, render: render } );

function preload () {

    game.load.image('tank', 'assets/games/tanks/tanks.png');
}

function create () {

    tank = game.add.sprite(0, 0, 'tank', 'tank1');
    tank.anchor.setTo(0.5, 0.5);
    tank.animations.add('move', ['tank1', 'tank2'], 20, true);
}

function update () {

    game.physics.arcade.overlap(enemyBullets, tank, bulletHitPlayer, null, this);
}







