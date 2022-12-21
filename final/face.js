// code credit to Jeff Thompson

let video;
let model;
let face;

function setup(){
    createCanvas(640, 480);
    background("255, 255, 255")
    video = createCapture(VIDEO);
    video.hide();
    loadFaceModel();
}

function draw() {
    if (video.loadedmetadata && model !== undefined) {
        getFace()
    }

    if (face !== undefined){
       // image(video, 0, 0, width, height);
        
        fill(255);
        noStroke();
        for (let pt of face.scaledMesh) {
            pt = scalePoint(pt);
            circle(pt.x, pt.y, 3)
        }

        fill(0, 150, 255, 100);
        noStroke();
        beginShape();
        for (pt of face.annotations.silhouette){
            pt = scalePoint(pt);
            vertex(pt.x, pt.y);
        }
        endShape(CLOSE);
    }
}

async function loadFaceModel() {
    model = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
        { maxFaces: 1 }
    );
}

function scalePoint(pt) {
    let x = map(pt[0], 0, video.width, 0, width);
    let y = map(pt[1], 0, video.height, 0, height);
    return createVector(x,y);
}

async function getFace() {
    const predictions = await model.estimateFaces({
        input: document.querySelector('video')
    });

    if (predictions.length === 0){
        face = undefined;
    }
    else{
        face = predictions[0];
    }
}