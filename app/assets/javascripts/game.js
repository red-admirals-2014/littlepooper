const SAFE_ZONE_WIDTH = 640;
const SAFE_ZONE_HEIGHT = 1136;

var game = new Phaser.Game(SAFE_ZONE_WIDTH, SAFE_ZONE_HEIGHT, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });


var text;
var counter = 0;

function preload () {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('einstein', '/images/ra_einstein.png');

}



function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen and assign it to a variable
    var image = game.add.sprite(0,0, 'einstein');
    game.physics.enable(image, Phaser.Physics.ARCADE);
    //  Moves the image anchor to the middle, so it centers inside the game properly
    // image.anchor.set(0.5);
    image.body.velocity.x=150;

    //  Enables all kind of input actions on this image (click, etc)
    // image.inputEnabled = true;

    text = game.add.text(10, 16, '', { fill: '#ffffff' });

    // image.events.onInputDown.add(listener, this);

}

function listener () {

    counter++;
    text.text = "You clicked " + counter + " times!";

}