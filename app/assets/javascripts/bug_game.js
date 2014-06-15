const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 1136;

var game = new Phaser.Game( CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var text;
var bugsKilled = 0;

Bug = function (index, game) {
    var kill_frames = [12,13]
    var select_kill = kill_frames[Math.floor(Math.random()*kill_frames.length)];

    this.game = game;
    this.bug = game.add.sprite(0, 0, 'bug');
    this.bug.inputEnabled = true;
    this.bug.events.onInputDown.add(killBug, this);

    this.alive = true;
    this.escaped = false;
    this.bug.x = game.world.randomX;
    this.bug.y = game.world.randomY;
    this.bug.name = index.toString();
    game.physics.enable(this.bug, Phaser.Physics.ARCADE);

    this.bug.animations.add('downwalk',[0,1,2],6,true);
    this.bug.animations.add('leftwalk',[3,4,5],6,true);
    this.bug.animations.add('rightwalk',[6,7,8],6,true);
    this.bug.animations.add('upwalk',[9,10,11],6,true);
    this.bug.animations.add('kill', [select_kill], 6, false);

};

Bug.prototype = {

    moveBugAtRandom: function(){
        this.bug.body.velocity.x = 0;
        this.bug.body.velocity.y = 0;

        if(this.bug.alive){
            var min_speed = 50
            var max_speed = 200
            var direction = Math.floor(Math.random() * (4) + 1);

            if (direction == 1)
            {   // Move up
                var velocity_y = Math.floor(Math.random() * (-max_speed-min_speed) - min_speed );
                this.bug.animations.play('upwalk')
                this.bug.body.velocity.y = velocity_y;
            }
            else if (direction == 2)
            {   // Move right
                var velocity_x = Math.floor(Math.random() * (max_speed-min_speed) + min_speed );
                this.bug.animations.play('rightwalk')
                this.bug.body.velocity.x = velocity_x;
            }
            else if (direction == 3)
            {   // Move down
                var velocity_y = Math.floor(Math.random() * (max_speed-min_speed) + min_speed );
                this.bug.animations.play('downwalk')
                this.bug.body.velocity.y = velocity_y;
            }
            else if (direction == 4)
            {   // Move left
                var velocity_x = Math.floor(Math.random() * (-max_speed-min_speed) - min_speed );
                this.bug.animations.play('leftwalk')
                this.bug.body.velocity.x = velocity_x;
            }
        }

    }
}




function preload () {
    game.load.image('sidewalk-bg', '/images/bug_smash/sidewalk-birdeye.png')
    game.load.spritesheet('bug', '/images/bug_smash/bug_sprite2.png', 64, 64, 15)
}


function create() {

    game.add.sprite(0, 0, 'sidewalk-bg');
    // bugs.createMultiple(20, 'bug')

    bugs = [];

    var bugsTotal = 20;
    var bugsDead = 0;

    for (var i = 0; i < bugsTotal; i++)
    {
        new_bug = new Bug(i, game)
        bugs.push(new_bug)
    }
    game.physics.startSystem(bugs, Phaser.Physics.ARCADE);
    var random_time = Math.floor(Math.random() * (3000) + 1500)
    updateBugs();
    game.time.events.loop(random_time, updateBugs, game)

    text = game.add.text(60, 30, "Bugs Killed: ", {fill: 'white', font: 'bold 40pt Arial'});
}

function update() {

}

function killBug () {
    this.bug.body.velocity.x = 0;
    this.bug.body.velocity.y = 0;
    this.bug.animations.play('kill');
    if(this.bug.alive){
        this.bug.alive = false;
        bugsKilled++;
        text.text = "Bugs Killed: " + bugsKilled;
    }

}

function updateBugs(){
    for(var i in bugs){
        bugs[i].moveBugAtRandom()
    }
}


