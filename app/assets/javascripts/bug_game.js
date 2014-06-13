const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 1136;



Bug = function (index, game) {
    var x = game.world.randomX;
    var y = game.world.randomY;

    this.alive = true;
    this.escaped = false;

    this.shadow = game.add.sprite(x, y, 'enemy', 'shadow');
    this.tank = game.add.sprite(x, y, 'enemy', 'tank1');
    this.turret = game.add.sprite(x, y, 'enemy', 'turret');

    this.shadow.anchor.set(0.5);
    this.tank.anchor.set(0.5);
    this.turret.anchor.set(0.3, 0.5);

    this.tank.name = index.toString();
    game.physics.enable(this.tank, Phaser.Physics.ARCADE);
    this.tank.body.immovable = false;
    this.tank.body.collideWorldBounds = true;
    this.tank.body.bounce.setTo(1, 1);

    this.tank.angle = game.rnd.angle();

    game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);

};

var game = new Phaser.Game( CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });



function preload () {
    game.load.image('sidewalk-bg', '/images/bug_smash/sidewalk-birdeye.png')
    game.load.spritesheet('bug1', '/images/bug_smash/bug_sprite.png', 64, 64, 12)
}

var bug;
// var facing = 'down';

function create() {

    game.add.sprite(0, 0, 'sidewalk-bg');

    bug = game.add.sprite(0, 0, 'bug1');
    game.physics.startSystem(bug, Phaser.Physics.ARCADE);

    bug.animations.add('upwalk',[0,1,2],6,true);
    bug.animations.add('leftwalk',[3,4,5],6,true);
    bug.animations.add('rightwalk',[6,7,8],6,true);
    bug.animations.add('downwalk',[9,10,11],6,true);


}

function update() {


    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        bug.x -= 40;
        bug.animations.play('leftwalk')
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        bug.x += 40;
        bug.animations.play('rightwalk')
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        bug.y -= 40;
        bug.animations.play('downwalk')
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
        bug.y += 40;
        bug.animations.play('upwalk')
    }

}


