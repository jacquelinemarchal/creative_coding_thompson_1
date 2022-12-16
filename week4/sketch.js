colors = [
    'rgb(239,71,111)',
    'rgb(17,138,178)',
    'rgb(255,209,102)',
    'rgb(7,59,76)',
    'rgb(6,214,160)'
];

function setup() {
    createCanvas(windowWidth, windowHeight); // width, height
    noLoop();

}

function draw() {
    background(400);

    for (let i=0; i<12000; i++){
        drawRandomLine();
    }
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