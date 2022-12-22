const videoElement = document.getElementById(`webcam`);

function onResults(results) {
  handResults = results;
}

const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }
});

hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({
      image: videoElement
    });
  },
  width: 1280,
  height: 720
});

camera.start();

let handResults = undefined;

let webcam = undefined;

function setup() {
  createCanvas(640, 360);
  webcam = select(`#webcam`);
}

function draw() {
  background(0);

  image(webcam, 0, 0, width, height);

  displayHands(handResults);
}

function displayHands(results) {
  if (!results) return;

  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      for (let i = 0; i < landmarks.length; i++) {
        fill("#F0F8FF");
        noStroke();
        ellipse(landmarks[i].x * width, landmarks[i].y * height, 25);
      }
    }
  }

}