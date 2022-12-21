let cursorColor = 'rgb(0,0,0)';
let cursorDia =   60;


function setup() {
  createCanvas(windowWidth, windowHeight);

 // noCursor(); 

}
function draw() {

    background(255);
    fill(cursorColor);
    noStroke();
    circle(mouseX, mouseY, cursorDia);
    cursorDia = map(mouseX, 0,width, 10,200);
}


// if the mouse is being clicked, change the cursor to blue
function mousePressed() {
  console.log('click!');
  cursorColor = 'rgb(0,150,255)';
}

// when the mouse is released, change the cursor back to black
function mouseReleased() {
  console.log('released!');
  cursorColor = 'rgb(0,0,0)';
  cursorDia =   60;
}

// when the mouse is dragged, change the color to orange
function mouseDragged() {
  console.log('- dragged...');
  cursorColor = 'rgb(255,150,0)';
}

// resize the canvas if we adjust the window's size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}