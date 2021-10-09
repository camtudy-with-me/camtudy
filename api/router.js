module.exports = (app) => {
  const index = require("./controller");

  // API 1. 방 목록 확인
  app.get("/api/roomList", index.roomList);

  // API 2. 방 만들기
  app.post("/api/makeRoom", index.makeRoom);

  // API 3. 방 제목 검색
  app.get("/api/searchRoom", index.searchRoom);

  // API 4. 방 입장번호 일치 여부 확인
  app.get("/api/checkPW", index.checkPW);
  app.post("/api/checkPW", index.checkPW);

  // API 5. 방 입장하기
  app.get("/api/enterRoom", index.enterRoom);
  app.post("/api/enterRoom", index.enterRoom);

  // API 7. 점수 저장하기
  app.post("/api/record", index.record);

  // API 8. TOP30 랭킹 조회하기
  app.get("/api/rank30", index.rank30);

  // API 9. 내 랭킹 조회하기
  app.get("/api/myRank", index.myRank);
  app.post("/api/myRank", index.myRank);
  
};