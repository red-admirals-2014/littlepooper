Scene.BugGame = function(game) {

    this.bugsTotal = 20;
    this.bugsDead = 0;
    this.bugs = [];
    bugsKilled = 0;
    bugsEscaped = 0;

    bugWorldX = game.width
    bugWorldY = game.height

}

Scene.BugGame.prototype = {

    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.add.sprite(0, 0, 'sidewalk-bg');

        // Create Bugs

        for (var i = 0; i < this.bugsTotal; i++)
        {
            var newBug = new Bug(i, this.game )
            this.bugs.push( newBug )
        }

        // Create Monster

        this.monster = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'green_dragon_bug');
        this.game.physics.enable(this.monster, Phaser.Physics.ARCADE);
        this.monster.body.setSize(50, 50, 50, 75);
        this.monster.anchor.setTo(0.5, 0.5);
        this.monster.animations.add('up', [32,33,34,35], 6,true);
        this.monster.animations.add('down', [36,37,38,39], 6,true);
        this.monster.animations.add('left', [24,25,26,27], 6,true);
        this.monster.animations.add('right', [28,29,30,31], 6,true);
        this.monster.animations.add('attackup', [12], 6,true);
        this.monster.animations.add('attackleft', [13], 6,true);
        this.monster.animations.add('attackright', [14], 6,true);
        this.monster.animations.add('attackdown', [15], 6,true);
        this.monster.animations.add('idle', [0,1,2,3,4,5,6,7], 6,true);



        var random_time = Math.floor(Math.random() * (3000) + 1500)

        // this.game.time.events.loop(random_time, this.updateBugs, this.game)

        score = this.game.add.text(10, 10, "Bugs Squashed: " + bugsKilled, {fill: 'white', font: 'bold 30pt Arial'});
        escaped = this.game.add.text(10, 50, "Bugs Escaped: ", {fill: 'white', font: 'bold 30pt Arial'});

    },

    moveMonster: function(pointer){
        var xDiff = pointer.x - this.monster.position.x
        var yDiff = pointer.y - this.monster.position.y

        if ( Math.abs(yDiff) >= Math.abs(xDiff) && yDiff < 0 ) {
            this.monster.animations.play('up')
        } else if ( Math.abs(yDiff) >= Math.abs(xDiff) && yDiff > 0 ) {
            this.monster.animations.play('down')
        } else if ( Math.abs(xDiff) >= Math.abs(yDiff) && xDiff > 0 ) {
            this.monster.animations.play('right')
        } else { this.monster.animations.play('left') }

        this.game.add.tween(this.monster).to( { x: pointer.x, y: pointer.y }, 100, Phaser.Easing.Linear.None, true)

    },

    update: function() {



        for(var i in this.bugs){
            if (this.bugs[i].alive) {
                this.game.physics.arcade.collide(this.monster, this.bugs[i].bug, this.collisionHandler, null, this.bugs[i]);
                this.bugs[i].update()
            }
        }

        var monster_speed = 500

        this.monster.body.velocity.x = 0;
        this.monster.body.velocity.y = 0;
        this.game.input.onDown.add(this.moveMonster, this)

        if(bugsKilled + bugsEscaped >= this.bugsTotal){
            this.gameOver()
        }
    },

    gameOver: function(){
        this.monster.x = bugWorldX /2;
        this.monster.y = bugWorldY /2;
        this.monster.animations.play('idle')
        this.game.input.onDown.remove(this.moveMonster, this)
        this.message = this.game.add.text(bugWorldX /2, bugWorldY /2 + 40, "Game Over", {fill: 'white', font: 'bold 50pt Arial'}).anchor.set(0.5, 0,5);
        this.resetBtn = this.game.add.button(bugWorldX/2, bugWorldY-150, 'goBack', this.goBack, this).anchor.set(0.5, 0.5);
    },

    goBack: function(){
        this.game.state.start('HomePage')

    },

    collisionHandler: function(monster, bug){
        this.killBug();
    },

    // updateBugs: function(){
    //     for(var i in this.bugs){
    //         this.bugs[i].moveBugAtRandom()
    //     }
    // },
}


function Bug(index, game) {
        var x = game.world.randomX;
        var y = game.world.randomY;

        var kill_frames = [12,13,14]
        var select_kill = kill_frames[Math.floor(Math.random()*kill_frames.length)];

        this.bug = game.add.sprite(x, y, 'bug');
        this.bug.anchor.set(0.5, 0,5);
        this.inputEnabled = true;
        this.alive = true;
        this.escaped = false;

        game.physics.enable(this.bug, Phaser.Physics.ARCADE);

        this.bug.animations.add('kill', [select_kill], 6, false);
        this.bug.animations.add('downwalk',[0,1,2],6,true);
        this.bug.animations.add('leftwalk',[3,4,5],6,true);
        this.bug.animations.add('rightwalk',[6,7,8],6,true);
        this.bug.animations.add('upwalk',[9,10,11],6,true);

};


Bug.prototype = {

    killBug: function () {
        this.bug.alive = false;
        this.bug.body.velocity.x = 0;
        this.bug.body.velocity.y = 0;
        this.bug.animations.play('kill');
        bugsKilled++
        score.text = "Bugs Squashed: " + bugsKilled
    },

    update: function(){

        // Check if bug escaped
        if (this.bug.alive){

            if(Math.floor(Math.random() * 100) < 5 ){
                this.moveBugAtRandom()
            }

            if (this.bug.x < 0 || this.bug.y < 0 || this.bug.x > bugWorldX || this.bug.y > bugWorldY && this.bug.alive ){
                this.bug.alive = false;
                bugsEscaped++
                escaped.text = "Bugs Escaped: " + bugsEscaped
            }
        }

    },

    moveBugAtRandom: function(){

        this.bug.body.velocity.x = 0;
        this.bug.body.velocity.y = 0;

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




