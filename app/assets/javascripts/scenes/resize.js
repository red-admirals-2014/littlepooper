window.addEventListener('resize', function(event){
    resizeGame();
});
var resizeGame = function () {
    game.stage.scale.setShowAll();
    game.stage.scale.refresh();
}