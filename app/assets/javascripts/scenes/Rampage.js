var Scene = Scene || {};
Scene.Rampage = function(game) {
    var player;
    var platforms;
    var cursors;

    var stars;
    var score = 0;
    var scoreText;
}



Scene.Rampage.prototype = {

    create: function(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.add.sprite(0, 0, 'sky');

        building = new Phaser.Rectangle(10, 10, 100, 100)

        platforms = this.game.add.group();

        platforms.enableBody = true;

        var ground = platforms.create(0, this.game.world.height - 50, 'ground');

        ground.scale.setTo(2, 2);

        ground.body.immovable = true;

        platforms.create(300, 400, 'ground').body.immovable = true;
        platforms.create(300, 500, 'ground')
        platforms.create(300, 600, 'ground')
        platforms.create(300, 700, 'ground')

        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;


        player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

        this.game.physics.arcade.enable(player);

        player.body.bounce.y = 0.2;
        player.body.gravity.y = 200;
        player.body.collideWorldBounds = true;
        player.animations.add('jump', [0, 1, 2, 3], 1, true);
        player.animations.add('left', [0, 1, 2, 3], 100, true);
        player.animations.add('right', [5, 6, 7, 8], 100, true);

        stars = this.game.add.group();

        stars.enableBody = true;

        // for (var i = 0; i < 12; i++)
        // {
        //     var star = stars.create(i * 70, 0, 'star');
        //     star.body.gravity.y = GRAVITY;
        //     star.body.bounce.y = 0.7 + Math.random() * 0.2;
        // }
        scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function(){
        this.game.physics.arcade.collide(player, platforms);
        this.game.physics.arcade.collide(stars, platforms);
        this.game.physics.arcade.overlap(player, stars, this.collectStar, null, this);

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
    },

    collectStar: function(player, star) {
        star.kill();
        score += 10;
        scoreText.text = 'Score: ' + score;
    },

}
