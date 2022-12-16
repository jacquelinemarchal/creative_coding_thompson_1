let whichFilter = 'blur';

let img; 

function preload() { 
    img = loadImage('maze.jpg')
}
function setup() {
    img.resize(windowWidth, 0);
    createCanvas(img.width, img.height);
    noLoop();
}

function draw() {
  
    // draw the image first, then we apply the filters
    image(img, 0,0);
    
    filter(THRESHOLD, 0.52);    // threshold value should be 0–1

  }