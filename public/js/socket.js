import data from "../data/characters.js";
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

const { room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const username = sessionStorage.getItem("username");

const socket = io();

sessionStorage.setItem("study-start", new Date());
sessionStorage.setItem("roomID", room);

// 유저가 방에 들어옴
socket.emit("joinRoom", { username, room });

// 유저 리스트 업데이트
socket.on("updateUsersList", ({ room, users }) => {
  outputUsers(users);
});

setInterval(
  () => socket.emit("score", sessionStorage.getItem("open-score")),
  1000 * 10 //10초
);

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = "";
  users.map((user) =>
    userList.insertAdjacentHTML(
      "beforeend",
      `<li>
        <img src="${data[Math.floor(user.score / 60)]["img-small"]}" width=30> 
        <span>${user.username} (${user.score}P)</span>
      </li>`
    )
  );
}
