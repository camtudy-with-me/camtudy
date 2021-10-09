// 여기서 ranking 불러와야 함! select-room.js에 있는거랑 비슷한 일 하면 됨1
import { getRelativeRanking } from "./fetcher.js";

(function insertRankings() {
  const rankingList = document.querySelector("#section-ranking-container");
  //const rankingDiv = document.createElement("li");
  const username = sessionStorage.getItem("username");
  const score = sessionStorage.getItem("open-score");
  const roomID = Number(sessionStorage.getItem("roomID"));
  getRelativeRanking(username, score, roomID)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.top3);
      console.log(data.top3[0].userName);
      rankingList.innerHTML = `
            <li><span>1. ${data.top3[0].userName} (${data.top3[0].score}P)</span><span>${data.top3[0].roomName}</span></li>
            <li><span>2. ${data.top3[1].userName} (${data.top3[1].score}P)</span><span>${data.top3[1].roomName}</span></li>
            <li><span>3. ${data.top3[2].userName} (${data.top3[2].score}P)</span><span>${data.top3[2].roomName}</span></li>
            <div class="circles">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
            <li><span>${data.myRanking}.${username} (${score}P)</span><span>${data.myRoom}</span></li>
            <div class="circles">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
        `;
    });
})();
