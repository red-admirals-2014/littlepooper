const SAFE_ZONE_WIDTH = 640;
const SAFE_ZONE_HEIGHT = 1136;

var game = new Phaser.Game( SAFE_ZONE_WIDTH, SAFE_ZONE_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });



function preload () {
    game.load.image('sky', '/images/kenji_demo/sky.png')
    game.load.image('ground', '/images/kenji_demo/platform.png');
    game.load.image('star', '/images/kenji_demo/star.png');
    game.load.spritesheet('dude', '/images/kenji_demo/dude.png', 32, 48);
}

var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');

    platforms = game.add.group();

    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 64, 'ground');

    ground.scale.setTo(2, 2);

    ground.body.immovable = true;

    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 800, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(50, 900, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(150, 1000, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(50, 600, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(150, 700, 'ground');
    ledge.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 150, 'dude');

    game.physics.arcade.enable(player);

    var GRAVITY = 1000;


    player.body.bounce.y = 0.2;
    player.body.gravity.y = 2000;
    player.body.collideWorldBounds = true;
player.animations.add('jump', [0, 1, 2, 3], 1, true);
    player.animations.add('left', [0, 1, 2, 3], 100, true);
    player.animations.add('right', [5, 6, 7, 8], 100, true);

    stars = game.add.group();

    stars.enableBody = true;

    // for (var i = 0; i < 12; i++)
    // {
    //     var star = stars.create(i * 70, 0, 'star');
    //     star.body.gravity.y = GRAVITY;
    //     star.body.bounce.y = 0.7 + Math.random() * 0.2;
    // }
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else
    {
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }

}

function collectStar (player, star) {
    star.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;

}
