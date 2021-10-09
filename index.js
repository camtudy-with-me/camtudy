const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const logger = require("morgan");
const request = require("request");
const dao = require("./api/dao");

const formatMessage = require("./utils/messages");
const {
  userJoin,
  findUserByID,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const router = require("./api/router");
const express = require("./config/express");
const { exitRoom } = require("./api/controller");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

/*           S O C K E T           */

// Server 실행시 실행
io.on("connection", (socket) => {
  // 유저가 방에 들어갔을시 실행
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    // 해당 방에 있던 유저들에게 유저 리스트 업데이트
    io.to(user.room).emit("updateUsersList", {
      users: getRoomUsers(user.room),
    });
  });

  socket.on("score", (score) => {
    const user = findUserByID(socket.id);
    if (user) {
      user.score = score;
    }
  });

  setInterval(() => {
    const user = findUserByID(socket.id);
    if (user) {
      const room = user.room;
      socket.emit("updateUsersList", {
        users: getRoomUsers(room),
      });
    }
  }, 1000 * 10);

  // 유저가 방에서 나갔을시 실행
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      const roomIndex = Number(user.room);
      dao.exitRoom(roomIndex);
      // 해당 방에 있던 유저들에게 유저 리스트 업데이트
      io.to(user.room).emit("updateUsersList", {
        users: getRoomUsers(user.room),
      });
    }
  });
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
