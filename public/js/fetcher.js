// API 1 - 방 목록 보기
const getRoomArray = () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch("/api/roomList", requestOptions).catch((error) =>
    console.log("error", error)
  );
};

// API 2 - 방 만들기
const createRoom = (roomname, password, isprivate) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    roomName: roomname,
    password: password,
    isPrivate: isprivate,
  });
  console.log(raw);

  return fetch("/api/makeRoom", {
    headers: myHeaders,
    method: "POST",
    body: raw,
  }).catch((error) => console.log("error", error));
};

// API 3 - 방 제목 검색하기
const getRoomArrayByName = (roomname) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch(`/api/searchRoom?roomName=${roomname}`, requestOptions).catch(
    (error) => console.log("error", error)
  );
};

// API 4 - 방 입장번호 일치 여부 확인하기
const checkPassword = (roomindex, password) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = `{\r\n    "roomIndex": ${roomindex},\r\n    "password": "${password}"\r\n}`;

  const requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: raw,
  };

  return fetch("/api/checkPW", requestOptions).catch((error) =>
    console.log("error", error)
  );
};

// API 5 - 방 입장하기
const enterRoom = (roomindex) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = `{\r\n    "roomIndex": ${roomindex}\r\n}`;

  const requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: raw,
  };

  return fetch("/api/enterRoom", requestOptions).catch((error) =>
    console.log("error", error)
  );
};

// API 7 - 점수 저장하기
const recordScore = (username, score, roomname) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = `{\r\n    "userName": "${username}",\r\n    "score": ${score},\r\n    "roomName": "${roomname}"\r\n}`;

  const requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: raw,
    redirect: "follow",
  };

  return fetch("/api/record", requestOptions).catch((error) =>
    console.log("error", error)
  );
};

// API 8 - TOP30 랭킹 조회하기
const getAbsoluteRanking = () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch("/api/rank30", requestOptions).catch((error) =>
    console.log("error", error)
  );
};

// API 9 - 내 랭킹 조회하기
const getRelativeRanking = (username, score, roomID) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = `{\r\n    "userName": "${username}",\r\n    "score": ${score},\r\n    "roomID": ${roomID}\r\n}`;

  const requestOptions = {
    headers: myHeaders,
    method: "POST",
    body: raw,
    redirect: "follow",
  };

  return fetch("/api/myRank", requestOptions).catch((error) =>
    console.log("error", error)
  );
};

export {
  getRoomArray,
  createRoom,
  getRoomArrayByName,
  checkPassword,
  enterRoom,
  recordScore,
  getAbsoluteRanking,
  getRelativeRanking,
};
