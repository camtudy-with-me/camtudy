import {
  checkPassword,
  createRoom,
  enterRoom,
  getAbsoluteRanking,
  getRoomArray,
  getRoomArrayByName,
} from "./fetcher.js";

const divRoomContainer = document.querySelector("#section-room-list"),
  btnCreateRoom = document.querySelector("#btn-room-create"),
  divRankingContainer = document.querySelector("#section-ranking-container"),
  inputSearchRoom = document.querySelector("#btn-room-search");

function showCreateSwal() {
  Swal.fire({
    title: "NEW ROOM",
    html:
      "<div>공개 방을 만드시려면 입장번호란을 비워주세요</div>" +
      '<input id="swal-input1" class="swal2-input" placeholder="ROOM NAME">' +
      '<input id="swal-input2" class="swal2-input" placeholder="PASSWORD">',
    focusConfirm: false,
    preConfirm: () => {
      const roomname = document.getElementById("swal-input1").value;
      const roompassword = document.getElementById("swal-input2").value;
      createRoom(roomname, roompassword, roompassword !== "" ? 1 : 0)
        .then((data) => data.json())
        .then((body) => {
          const roomIndex = body.roomIndex;
          location.href = `/room.html?room=${roomIndex}`;
        });
    },
  });
}

function showJoinPublicSwal(room) {
  Swal.fire({
    title: `${room.roomName}에 입장하시겠습니까?`,
    showCancelButton: true,
    confirmButtonText: "입장",
  }).then((result) => {
    if (result.isConfirmed) {
      const roomIndex = room.roomIndex;
      enterRoom(roomIndex);
      sessionStorage.setItem("roomname", room.roomName);
      location.href = `/room.html?room=${roomIndex}`;
    }
  });
}

function showJoinPrivateSwal(room) {
  Swal.fire({
    title: `${room.roomName}의 비밀번호를 입력해주세요`,
    html: '<input id="swal-input3" class="swal2-input" type="password" placeholder="PASSWORD">',
    focusConfirm: false,
    preConfirm: () => {
      const password = document.getElementById("swal-input3").value;
      checkPassword(room.roomIndex, password)
        .then((data) => data.json())
        .then((response) => {
          const isSame = response.isSame;
          if (isSame) {
            sessionStorage.setItem("roomname", room.roomName);
            enterRoom(room.roomIndex);
            location.href = `/room.html?room=${room.roomIndex}`;
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "WRONG PASSWORD!",
            });
          }
        });
    },
  });
}

const resetRooms = () => (divRoomContainer.innerHTML = "");
const insertRooms = (room) => {
  const roomDiv = document.createElement("li");
  roomDiv.setAttribute("data-id", room.roomIndex);
  roomDiv.innerText = `${room.roomName} (${room.totalUsers})`;
  const eventListener = room.isPrivate
    ? () => showJoinPrivateSwal(room)
    : () => showJoinPublicSwal(room);
  roomDiv.onclick = eventListener;
  divRoomContainer.insertAdjacentElement("beforeend", roomDiv);
};

const insertRankings = (ranking) => {
  divRankingContainer.insertAdjacentHTML(
    "beforeend",
    `<li><span>${ranking.ranking}. ${ranking.userName}</span><span>${ranking.score}</span></li>`
  );
};

(function init() {
  getRoomArray().then((response) => {
    switch (response.status) {
      case 200:
        response.json().then((data) => {
          resetRooms();
          const rooms = data.result;
          rooms.forEach((room) => insertRooms(room));
        });
        break;
      default:
        break;
    }
  });
  btnCreateRoom.addEventListener("click", showCreateSwal);
  getAbsoluteRanking().then((response) => {
    switch (response.status) {
      case 200:
        response.json().then((data) => {
          const rankings = data.result;
          rankings.forEach((ranking) => insertRankings(ranking));
        });
        break;
      default:
        break;
    }
  });
  document.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      const searchKeyword = inputSearchRoom.value;
      getRoomArrayByName(searchKeyword).then((data) =>
        data.json().then((data) => {
          resetRooms();
          const rooms = data.result;
          rooms.forEach((room) => insertRooms(room));
        })
      );
    }
  });
})();
