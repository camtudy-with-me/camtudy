import * as blinkModel from "@mirrory/eyeblink/dist/umd/eyeblink";
import { Eyeblink } from "@mirrory/eyeblink/dist/umd/eyeblink";
import * as tf from "@tensorflow/tfjs";
import { DataStore } from "./data-store";
import data from "../data/characters.js";

let predictor;
let webcam;
let dataStore;

const webcamEl = document.querySelector("#webcam");
const myImage = document.querySelector("#myCharacter");

const ect = document.querySelector("#eyeopentime");

const fps = 100;
const fpsInterval = 1000 / fps;
let then = Date.now();
let elapsed = 0;

export function getImageData(
  videoEl,
  { width, height } = {
    width: 200,
    height: 200,
  }
) {
  const procCanvas = new OffscreenCanvas(width, height);
  const ctx = procCanvas.getContext("2d");
  ctx.drawImage(videoEl, 0, 0, procCanvas.width, procCanvas.height);
  const image = ctx.getImageData(0, 0, procCanvas.width, procCanvas.height);
  return image;
}

async function animate() {
  requestAnimationFrame(animate);
  const now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    const image = getImageData(webcamEl);
    const openness = await predictor.predictEyeOpenness(image);
    if (!openness) {
      dataStore.addEyeCloseDuration();
      return;
    }
    //console.log(openness.right, openness.left);
    if (openness.right > 0.01 || openness.left > 0.01) {
      dataStore.addEyeOpenDuration();
      dataStore.resetEyeCloseDuration();
    } else {
      dataStore.addEyeCloseDuration();
    }
    ect.textContent = String(dataStore.getEyeOpenScore());
    myImage.src = data[Math.floor(dataStore.getEyeOpenScore() / 60)]["img-big"];
  }
}

async function init() {
  dataStore = new DataStore();
  console.log(dataStore);
  predictor = await blinkModel.load(
    "https://raw.githubusercontent.com/mirrory-dev/eyeblink/master/models/model.json"
  );
  webcam = await tf.data.webcam(webcamEl);
  animate();
}

init();
