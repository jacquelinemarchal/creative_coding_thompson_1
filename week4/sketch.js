colors = [
    'rgb(239,71,111)',
    'rgb(17,138,178)',
    'rgb(255,209,102)',
    'rgb(7,59,76)',
    'rgb(6,214,160)'
];

speed = 12;

function setup() {
    createCanvas(windowWidth, windowHeight); // width, height
    //noLoop();
    frameRate(4);

}

function draw() {
    background(400);
    let x = width/2;
    let y = height/2;
    
   
    beginShape();
    for(let i = 0; i < 900; i++) {
        noFill()
        stroke(0)
        curveVertex(x, y);

        fill('#fae');
        //noStroke();
        circle(x,y,5);

        if (random(0, 100) < 50){
            if (random(100) < 50){
                x-= speed;
            }
            else{
                x += speed
            }
        }
        else{
            if (random(100) < 50){
                y-= speed;
            }
            else{
                y += speed
            }
        }
    }
    endShape();
    /*
    for (let i=0; i<12000; i++){
        drawRandomLine();
    }
    */
}

function drawRandomLine() {
    let x = random(0, width);
    let y = random(0, height);

    strokeWeight(4);
    let whichColor = int(random(0, colors.length));
    stroke(colors[whichColor])

    if (random(0,100) > 50 ){
        line(x,y,x,y+12);
    }
    else{
        line(x,y,x+12,y);
    }
}
function mousePressed() {
  redraw();
}