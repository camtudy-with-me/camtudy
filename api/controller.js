const request = require('request');
const dao = require('./dao');

exports.roomList = async (req, res) => {
    const rows = await dao.roomList();
    res.json({result: rows});
}

exports.makeRoom = async (req, res) => {
    const roomName = req.body.roomName;
    const password = req.body.password;
    const isPrivate = req.body.isPrivate;
    const rows = await dao.makeRoom(roomName, password, isPrivate);
    res.json({roomIndex: rows});
}

exports.searchRoom = async (req, res) => {
    const roomName = req.query.roomName;
    const rows = await dao.searchRoom(roomName);
    res.json({result: rows});
}

exports.checkPW = async (req, res) => {
    const roomIndex = req.body.roomIndex;
    const password = req.body.password;
    const rows = await dao.checkPW(roomIndex, password);
    res.json({isSame: rows});
}

exports.enterRoom = async (req, res) => {
    const roomIndex = req.body.roomIndex;
    const rows = await dao.enterRoom(roomIndex);
    res.json({isSuccess: true});
}

exports.record = async (req, res) => {
    const userName = req.body.userName;
    const score = req.body.score;
    const roomName = req.body.roomName;
    const rows = await dao.record(userName, score, roomName);
    res.json({isSuccess: true});
}

exports.rank30 = async (req, res) => {
    const rows = await dao.rank30();
    res.json({result: rows});
}

exports.myRank = async (req, res) => {
    const userName = req.body.userName;
    const score = req.body.score;
    const roomID = req.body.roomID;
    const roomName = await dao.roomName(roomID);
    const rows1 = await dao.myRank(userName, score, roomName);
    const rows2 = await dao.rank3();
    res.json({myRanking: rows1, myRoom: roomName, top3: rows2})
}