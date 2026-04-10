// Aidan Carey 0302409c, April 10th 2026

const error     = document.getElementById("error");
const input1    = document.getElementById("input1");
const input2    = document.getElementById("input2");
const volume1   = document.getElementById("volume1");
const volume2   = document.getElementById("volume2");
const canvas    = document.getElementById("canvas");

const canvasCtx = canvas.getContext("2d");
canvasCtx.globalCompositeOperation = "lighter";

let animationFrame = null;
let audioCtx = null;
let source1  = null;
let source2  = null;
let gain1    = null;
let gain2    = null;

// Adjust volume with sliders
volume1.addEventListener("input", (event) => {
  if (gain1) gain1.gain.value = event.target.value / 100;
});

volume2.addEventListener("input", (event) => {
  if (gain2) gain2.gain.value = event.target.value / 100;
});

// Start playing audio and start the visualizer
async function start() {
  // Make sure audio inputs are given
  if (checkInputs() < 0)
    return -1;

  // Make sure the sources aren't still playing audio
  if (source1 != undefined || source2 != undefined)
    stop();

  audioCtx = new AudioContext() || window.webkitAudioContext;

  // Load the audio files into a buffer
  const audioBuffer1 = await getAudioBuffer(input1);
  const audioBuffer2 = await getAudioBuffer(input2);
  
  // Analyser to get frequency and amplidude data
  const analyser1 = new AnalyserNode(audioCtx);
  const analyser2 = new AnalyserNode(audioCtx);
  analyser1.fftSize = analyser2.fftSize = 1024;

  // Gain to adjust output volume (doesn't effect the amplitude)
  gain1 = audioCtx.createGain();
  gain1.gain.value = volume1.value / 100;
  gain1.connect(audioCtx.destination)
  
  gain2 = audioCtx.createGain();
  gain2.gain.value = volume2.value / 100;
  gain2.connect(audioCtx.destination)
  
  // Load the buffers into source nodes
  source1 = new AudioBufferSourceNode(audioCtx, {
      buffer: audioBuffer1
  });
  source1.connect(analyser1);
  source1.connect(gain1);
  source1.start();

  source2 = new AudioBufferSourceNode(audioCtx, {
      buffer: audioBuffer2
  });
  source2.connect(analyser2);
  source2.connect(gain2);
  source2.start();

  // Start visualizing the audio
  visualization(analyser1, analyser2);
}

function visualization(analyser1, analyser2) {
  // Both analysers have the same FFT value
  const frequencyDataLength = analyser1.frequencyBinCount;
  
  const frequencyData1 = new Uint8Array(frequencyDataLength);
  const frequencyData2 = new Uint8Array(frequencyDataLength);

  const barWidth = (canvas.width / frequencyDataLength) + 0.2;
  
  function draw() {
    animationFrame = requestAnimationFrame(draw);
    
    analyser1.getByteFrequencyData(frequencyData1);
    analyser2.getByteFrequencyData(frequencyData2);

    clearCanvas();
    
    for (let i = 0, x = 0; i < frequencyDataLength; i++, x += barWidth) {
      const barHeight1 = frequencyData1[i];
      const barHeight2 = frequencyData2[i];

      // Audio 1
      canvasCtx.fillStyle = "rgb(255, 100, 0)";
      canvasCtx.fillRect(
        x,
        canvas.height,
        barWidth,
        -(barHeight1 / 2)
      );

      // Audio 2
      canvasCtx.fillStyle = "rgb(0, 100, 255)";
      canvasCtx.fillRect(
        x,
        canvas.height,
        barWidth,
        -(barHeight2 / 2)
      );
    }
  }
  
  draw();
}

function clearCanvas() {
  canvasCtx.clearRect(
    0, 0,
    canvas.width,
    canvas.height
  );
}

// Return the audio buffer from the inputted file
async function getAudioBuffer(fileInput) {
  const audioFile   = fileInput.files[0];
  const arrayBuffer = await audioFile.arrayBuffer();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

// Make sure that inputs were given, otherwise show errors
function checkInputs() {
  const errors = [];

  // No inputs given
  if (input1.files.length == 0) {
    errors.push("No audio input 1 selected");
  }
  if (input2.files.length == 0) {
    errors.push("No audio input 2 selected");
  }
  
  // Clear error messages
  if (errors.length == 0) {
    error.innerHTML = "";
    return 0;
  }

  // Show error messages
  const errorMessage = errors.join(", ") + ".";
  error.innerHTML = errorMessage;
  console.error("Error: " + errorMessage);
  
  return -1;
}

// Stop audio and visualizer
function stop() {
  source1.stop();
  source2.stop();
  audioCtx = null;

  cancelAnimationFrame(animationFrame);
}
