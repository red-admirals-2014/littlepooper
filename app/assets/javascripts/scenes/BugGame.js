Scene.BugGame = function(game) {

    this.bugsTotal = 40;
    this.bugsDead = 0;
    this.bugs = [];
    bugsKilled = 0;


}

Scene.BugGame.prototype = {

    create: function() {
        this.game.add.sprite(0, 0, 'sidewalk-bg');

        for (var i = 0; i < this.bugsTotal; i++)
        {
            this.bugs.push( new Bug(i, this.game ) )
        }
        this.game.physics.startSystem(this.bugs, Phaser.Physics.ARCADE);
        var random_time = Math.floor(Math.random() * (3000) + 1500)
        this.updateBugs();
        this.game.time.events.loop(random_time, this.updateBugs, this.game)

        score = this.game.add.text(10, 10, "Bugs Killed: ", {fill: 'white', font: 'bold 30pt Arial'});
    },

    updateBugs: function(){
        for(var i in this.bugs){
            this.bugs[i].moveBugAtRandom()
        }
    },
}


function Bug(index, game) {
        var kill_frames = [12,13,14]
        var select_kill = kill_frames[Math.floor(Math.random()*kill_frames.length)];
        this.bug = game.add.sprite(0, 0, 'bug');
        this.bug.inputEnabled = true;

        this.bug.events.onInputDown.add(this.killBug.bind(this), this);

        this.bug.alive = true;
        this.bug.escaped = false;
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

    killBug: function () {
        this.bug.body.velocity.x = 0;
        this.bug.body.velocity.y = 0;
        this.bug.animations.play('kill');
        if(this.bug.alive){
            this.bug.alive = false;
            bugsKilled++
            score.text = "Bugs Killed: " + bugsKilled

        }

    },

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




