var w,h,ctx;
var V = 0;
var dl = 0;
var dTime = 100;
var a = 0.0001;
$( document ).ready(function() {
	var example = $('canvas')[0];
	ctx = example.getContext('2d');
	ctx.fillStyle = 'white';
    ctx.save();
	w =  $('canvas').width();
	h =  $('canvas').height();
	go();
});
var pprint = function(a){
   // console.log(a);
}
//добавить круг
var addArc = function(R){
    return {
        x: 0,
        R: R,
        step: function(delta){
            var prevX = this.x;
            this.x+= delta;
            return prevX;
        },
        draw: function(){
            ctx.beginPath();
            ctx.arc(0, this.x, this.R, 0, 2 * Math.PI, true);
            pprint(-this.R);
            ctx.stroke();
        },
        clean: function(){
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2*ctx.lineWidth;
            ctx.arc(0, this.x, this.R, 0, 2 * Math.PI, true);
            ctx.stroke();
            ctx.restore();
        }
    }
};
var drawPoint = function(){
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, 2 * Math.PI, true);
    ctx.fill();
    ctx.restore();
}
//массив кругов
var arrArc = function(n){
    var arr = [];
    var dr = Math.ceil(Math.min(w,h)*0.5/(n + 1));
    _.each(_.range(1,n+1),function(i){
        arr.push(
            new addArc(dr*i)
        );
    });
    return{
        draw: function(){
            _.each(arr,function(inf){
                inf.draw();
            });
            return this;
        },
        clean: function(){
            _.each(arr,function(inf){
                inf.clean();
            });
            return this;
        },
        step: function(d){
            var d = d||0;
            _.reduce(arr, function(memo, inf){
                return inf.step(memo);
            }, d);
            return this;
        }
    }
};
var go = function(){
    ctx.fillRect(0,0,w,h);
    ctx.translate(w/2,h/2);
    var arcs = arrArc(10);

    drawPoint();
    arcs.draw();
    var repeat = function(){
       var prevL = dl;
       dl = V*dTime + 0.5*a*dTime*dTime;
       V += a*dTime;
       arcs.clean().step(0.01).draw();
    }
    setInterval(repeat,dTime)
};