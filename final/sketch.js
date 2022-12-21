//font credit : Pinyon Script by google font
// code credit: https://www.atchareeya-j.com/post/recreating-john-whitney
let num = 20;
let radian = 500;
let sizeText = 150;
let font;
let a = 50;

function preload(){
    font = loadFont("Pinyon_Script/PinyonScript.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0,0,0,50);
  angleMode(DEGREES);
  textSize(sizeText);
  textAlign(CENTER);

  textFont(font);
  noFill();
  
  let time = millis()/100;
  
  radian = map(sin(time),-1,1,300,0);
  a = map(sin(time),-1,1,10,50);
  drawText("E",-150,0,200,255);
  drawText("N",-50,0,200,255);
  drawText("T",50,0,255,150);
  drawText("E",150,0,255,150);
  drawText("R",250,0,255,150);

}

function drawText(TEXT,space,r,g,b){
  for(let angle=0; angle<=360; angle+=360/num){
    push();
    translate(width/2,height/2+(sizeText/3));
    stroke(r,g,b,a);
    fill(r,g,b,a);
    let xPos = space+radian*cos(angle);
    let yPos = radian*sin(angle);
    text(TEXT,xPos,yPos);
    pop();
  }
}

let page = document.getElementById("sketchContainer");
page.addEventListener("click", () => {
    console.log("hi")
    window.location.href = "home.html"
});
