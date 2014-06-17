Scene.BugGame = function(game) {

    this.bugsTotal = 50;
    this.bugs = [];
    bugsKilled = [];
    bugsEscaped = [];

    bugWorldX = game.width
    bugWorldY = game.height

}

Scene.BugGame.prototype = {

    create: function() {
        bugsKilled = [];
        bugsEscaped = [];
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
        this.monster.body.setSize(50, 50, 25, 25);

        // this.monster.anchor.setTo(0.5, 0.5);
        this.monster.animations.add('up', [32,33,34,35], 6,true);
        this.monster.animations.add('down', [36,37,38,39], 6,true);
        this.monster.animations.add('left', [24,25,26,27], 6,true);
        this.monster.animations.add('right', [28,29,30,31], 6,true);
        this.monster.animations.add('attackup', [12], 6,true);
        this.monster.animations.add('attackleft', [13], 6,true);
        this.monster.animations.add('attackright', [14], 6,true);
        this.monster.animations.add('attackdown', [15], 6,true);
        this.monster.animations.add('idle', [0,1,2,3,4,5,6,7], 6,true);

        // Create Bushes
        this.bushes = this.game.add.group();
        this.bushes.enableBody = true;
        this.bushes.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 3; i++)
        {
            var bush = this.bushes.create(this.game.world.randomX, this.game.world.randomY, 'bush');
            bush.body.immovable = true;
        }

        score = this.game.add.text(10, 10, "Bugs Squashed: " + bugsKilled.length, {fill: 'white', font: 'bold 30pt Arial'});
        escaped = this.game.add.text(10, 50, "Bugs Escaped: " + bugsEscaped.length, {fill: 'white', font: 'bold 30pt Arial'});
    },

    moveMonster: function(pointer){
        var monster_speed = 250   // msec
        var xDiff = pointer.x - this.monster.position.x
        var yDiff = pointer.y - this.monster.position.y

        if ( Math.abs(yDiff) >= Math.abs(xDiff) && yDiff < 0 ) {
            this.monster.animations.play('up')
        } else if ( Math.abs(yDiff) >= Math.abs(xDiff) && yDiff > 0 ) {
            this.monster.animations.play('down')
        } else if ( Math.abs(xDiff) >= Math.abs(yDiff) && xDiff > 0 ) {
            this.monster.animations.play('right')
        } else { this.monster.animations.play('left') }

        this.game.add.tween(this.monster).to( { x: pointer.x-50, y: pointer.y-50 }, monster_speed, Phaser.Easing.Linear.None, true)

    },
    checkOverlap: function(spriteA, spriteB) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(boundsA, boundsB);

    },


    update: function() {
        this.game.debug.body(this.monster)
        // this.game.physics.arcade.collide(this.monster, this.bushes);

        for(var i in this.bugs){
            if (this.bugs[i].alive) {
                if (this.checkOverlap(this.bugs[i].bug, this.monster))
                {
                    this.bugs[i].alive = false;
                    this.bugs[i].bug.animations.play('kill')
                    this.bugs[i].bug.body.velocity.x = 0;
                    this.bugs[i].bug.body.velocity.y = 0;
                    bugsKilled.push(this.bugs[i])
                }
                if (this.bugs[i].bug.x < 0 || this.bugs[i].bug.y < 0 || this.bugs[i].bug.x > bugWorldX || this.bugs[i].bug.y > bugWorldY && this.bugs[i].bug.alive ){
                    this.bugs[i].alive = false;
                    bugsEscaped.push(this.bugs[i])
                }

                this.bugs[i].update()
            }
        }
        score.text = "Bugs Squashed: " + bugsKilled.length
        escaped.text = "Bugs Escaped: " + bugsEscaped.length

        var monster_speed = 10

        this.monster.body.velocity.x = 0;
        this.monster.body.velocity.y = 0;
        this.game.input.onDown.add(this.moveMonster, this)

        if(bugsKilled.length + bugsEscaped.length >= this.bugsTotal){
            this.gameOver()
        }
    },


    gameOver: function() {

        // this.monster.x = bugWorldX/2-50;
        // this.monster.y = bugWorldY/2-50;
        // this.monster.animations.play("idle")
        // this.game.input.onDown.remove(this.moveMonster, this)
        this.game.add.button(50, bugWorldY-150, "home", this.goHome, this, 0,1,2)
        this.game.add.button(200, bugWorldY-150, "bug_button", this.resetGame, this, 0,1,2)
    },

    resetGame: function(){

        this.monster.destroy();
        for(var i in this.bugs){
            this.bugs[i].bug.destroy()
        }
        bugsKilled = [];
        bugsEscaped = [];
        this.game.state.start('BugGame');

    },

    goHome: function(){
        this.game.state.start('HomePage')

    },

}


function Bug(index, game) {
        var x = game.world.randomX;
        var y = game.world.randomY;

        var kill_frames = [12,13,14]
        var select_kill = kill_frames[Math.floor(Math.random()*kill_frames.length)];

        this.bug = game.add.sprite(x, y, 'bug');
        game.physics.enable(this.bug, Phaser.Physics.ARCADE);
        this.inputEnabled = true;
        this.alive = true;
        this.escaped = false;


        this.bug.animations.add('kill', [select_kill], 6, false);
        this.bug.animations.add('downwalk',[0,1,2],6,true);
        this.bug.animations.add('leftwalk',[3,4,5],6,true);
        this.bug.animations.add('rightwalk',[6,7,8],6,true);
        this.bug.animations.add('upwalk',[9,10,11],6,true);

};


Bug.prototype = {

    update: function(){
        // Move alive bug at random

        if (this.bug.alive){
            if(Math.floor(Math.random() * 100) < 5 ){
                this.moveBugAtRandom()
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




