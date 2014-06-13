$(function(){
    var x = 0;
    setInterval(function(){
        x-=1;
        $('.container').css('background-position', x + 'px 0');
    }, 70);
})