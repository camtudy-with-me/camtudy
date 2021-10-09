import { recordScore } from "./fetcher.js";

const buttonSave = document.querySelector(".btn1");
buttonSave.addEventListener("click", () => {
  const username = sessionStorage.getItem("username");
  const score = sessionStorage.getItem("open-score");
  const roomname = sessionStorage.getItem("roomname");
  recordScore(username, score, roomname);
});
