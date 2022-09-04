// First we catch canvas id and store it on canvas variable.
let canvas = document.getElementById("canvas");

let ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
ctx.translate(radius,radius);
//reduce the clock radius to 90%;
radius = radius * 0.90;
setInterval(drawClock,100);

function drawClock(){
    drawFace(ctx,radius);
    drawNumbers(ctx,radius);
    drawTime(ctx,radius);
}
function drawFace(ctx,radius){
    var grad;
    ctx.beginPath();
    ctx.arc(0,0,radius,0,2*Math.PI);
    ctx.fillStyle = "White";
    ctx.fill();
// This is for radius color
    grad = ctx.createRadialGradient(0,0,radius*0.95,0,0,radius*1.05);
    grad.addColorStop(0,"#333");
    grad.addColorStop(0.5,"#fff");
    grad.addColorStop(1,"#333");
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    
    // This is for center color
    ctx.beginPath();
    ctx.arc(0,0,radius*0.04,0,2*Math.PI);
    ctx.fillStyle = "#333";
    ctx.fill();
}

function drawNumbers(ctx,radius){
    let ang,num;
    ctx.font = radius*0.10 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    for(num = 1;num<13;num++){
        ang = num * Math.PI/6;
        ctx.rotate(ang);
        ctx.translate(0,-radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(),0,0);
        ctx.rotate(ang);
        ctx.translate(0,radius*0.85);
        ctx.rotate(-ang);
    }
}
function drawTime(ctx,radius){
      let now,hour,minute,second;

    now = new Date();
    hour =now.getHours();
    minute =now.getMinutes();
    second =now.getSeconds();

    hour = hour % 12;
    hour = (hour*Math.PI/6) + (minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctx,hour,radius*0.5,radius*0.07);

    minute = (minute*Math.PI/30)+(second*Math.PI/(30*
    60));
    drawHand(ctx,minute,radius*0.8,radius*0.07);

    second = (second*Math.PI/30);
    drawHand(ctx,second,radius*0.9,radius*0.02);

}

function drawHand(ctx,pos,length,width){
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0,-length);
    ctx.stroke();
    ctx.rotate(-pos);
}



/*
    HTML canvas has many properties and among them some of are --
    1) getContext();provides the 2D rendering context for the drawing surface of canvas.

    2) translate(0,0); This is the position of the circle inside the canvas.

    3) arc(x,y,radius,startAngle,EndAngle); This function is used to create circles or circle parts. and it's start angle is (0 and end angle to 2*Math.PI). for coloring the circle either stroke or fill we have to use any of the properties stroke(),fill();

    4) fillStyle(); This is used for color.

    5) fill(); This function color the object by getting color from fillStyle();
*/