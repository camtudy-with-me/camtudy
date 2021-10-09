const { unsortedSegmentSum } = require("@tensorflow/tfjs");

const users = [];

// 사용자가 방에 들어갔을시 users 배열에 user 추가
function userJoin(id, username, room) {
    const user = { id, username, room, score: 0 };
    users.push(user);
    return user;
}

// 특정 유저 찾기
function findUserByID(id) {
    return users.find((user) => user.id === id)
}

// 유저가 방에서 나갔을시 리스트에서 삭제
function userLeave(id) {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// Get room users
function getRoomUsers(room) {
    return users.filter((user) => user.room === room);
}

module.exports = {
    userJoin,
    findUserByID,
    userLeave,
    getRoomUsers,
}