//  adapted from original code by Jeff Thompson and Tim Vallencourt
// filter mouth shape
// programmable keyboard

let video;
let model;
let face;
let loaded = false;
let info = true;

function setup(){
    createCanvas(840, 630);
    background("#000000")
    video = createCapture(VIDEO);
    video.hide();
    loadFaceModel();
}

function draw() {
    if (loaded){
        document.getElementById("loadingContainer").style.display = "none";
    }
    else{
        document.getElementById("loadingContainer").style.display = "block";
    }

    if (video.loadedmetadata && model !== undefined) {
        getFace()
    }

    if (face !== undefined){
        image(video, 0, 0, width, height);
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
    loaded = true;
}

function getCoor() {
    console.log("left cheek: ", face.annotations.leftCheek[0][0]);
    console.log("right cheek: ", face.annotations.rightCheek[0][0]);

}

function toggleModal() {
    info = !info;
    let modal = document.getElementById("infoModal");
    if (info){
        modal.style.display = "block";
    }
    else{
        modal.style.display = "none";
    }
}

function isMouthOpen(){
    if (
        Math.abs(
            face.annotations.lipsUpperInner[5][1] - face.annotations.lipsLowerInner[5][1]
            ) < 10 /*|| // account for sideways mouth opening
        Math.abs(
            face.annotations.lipsUpperInner[5][0] - face.annotations.lipsLowerInner[5][0]
            ) < 10*/ ) {
        return false;
    }
    else{
        return true;
    }
}

/* -------- keyboard code -------- */
let audioCtx;
document.addEventListener(
  "DOMContentLoaded",
  function(event) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const globalGain = audioCtx.createGain();
    globalGain.gain.setValueAtTime(0.8, audioCtx.currentTime);
    globalGain.connect(audioCtx.destination);

    /* --keyboard map -- */
    const keyboardFrequencyMap = {
      "90": 261.625565300598634, //Z - C
      "83": 277.182630976872096, //S - C#
      "88": 293.66476791740756, //X - D
      "68": 311.12698372208091, //D - D#
      "67": 329.627556912869929, //C - E
      "86": 349.228231433003884, //V - F
      "71": 369.994422711634398, //G - F#
      "66": 391.995435981749294, //B - G
      "72": 415.304697579945138, //H - G#
      "78": 440.0, //N - A
      "74": 466.163761518089916, //J - A#
      "77": 493.883301256124111, //M - B
      "81": 523.251130601197269, //Q - C
      "50": 554.365261953744192, //2 - C#
      "87": 587.32953583481512, //W - D
      "51": 622.253967444161821, //3 - D#
      "69": 659.255113825739859, //E - E
      "82": 698.456462866007768, //R - F
      "53": 739.988845423268797, //5 - F#
      "84": 783.990871963498588, //T - G
      "54": 830.609395159890277, //6 - G#
      "89": 880.0, //Y - A
      "55": 932.327523036179832, //7 - A#
      "85": 987.766602512248223 //U - B
    };

    window.addEventListener("keydown", keyDown, false);
    window.addEventListener("keyup", keyUp, false);

/* -- data structures to remember notes -- */
    let activeOscillators = {};
    let activeGainNodes = {};

    function keyDown(event) {
        const key = (event.detail || event.which).toString();
        if (
            keyboardFrequencyMap[key] &&
            !activeOscillators[key] 
        ) {
            playNote(key);
        }
    }

    function keyUp(event) {
        const key = (event.detail || event.which).toString();
        if (keyboardFrequencyMap[key] && activeOscillators[key]) {
          // release
          activeGainNodes[key].gain.cancelScheduledValues(audioCtx.currentTime);
          activeGainNodes[key].gain.setTargetAtTime(
            0,
            audioCtx.currentTime,
            0.01
          );
          activeOscillators[key].stop(audioCtx.currentTime + 0.05);
          delete activeOscillators[key];
          delete activeGainNodes[key];
      }
    }

    function playNote(key) {
      const osc = audioCtx.createOscillator();
      osc.frequency.setValueAtTime(
        keyboardFrequencyMap[key],
        audioCtx.currentTime
      );
      if (isMouthOpen()){
        osc.type = "sawtooth";
      }
      else {
        osc.type = "sine";
      }
      
      var gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      osc.connect(gainNode).connect(audioCtx.destination);
      osc.start();
      activeOscillators[key] = osc;
      activeGainNodes[key] = gainNode;
      let gainFactor = Object.keys(activeGainNodes).length;
   
      // attack
      // reduce gain on all nodes for polyphony
      Object.keys(activeGainNodes).forEach(function(key) {
        activeGainNodes[key].gain.setTargetAtTime(
          0.7 / gainFactor,
          audioCtx.currentTime,
          0.15
        );
      });
      // decay and sustain
      gainNode.gain.setTargetAtTime(
        0.425 / gainFactor,
        audioCtx.currentTime + 0.15,
        0.15
      );
    }
  },
  false
);


function updatePage() {
    if (osc !== undefined){
        osc.frequency.value = (CurX / WIDTH) * maxFreq;
    }
  
}