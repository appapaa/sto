var w,h,ctx;
$( document ).ready(function() {
	var example = $('canvas')[0];
	ctx = example.getContext('2d');
	ctx.fillStyle = 'white';
    ctx.save();
	w =  $('canvas').width();
	h =  $('canvas').height();
	go();
});
var go = function(){
    ctx.fillRect(0,0,w,h);

    ctx.translate(w/2,h/2);
    ctx.beginPath();
    ctx.arc(0, 0, 200, 0, 2 * Math.PI, true);
    ctx.stroke();
    ctx.restore();
}