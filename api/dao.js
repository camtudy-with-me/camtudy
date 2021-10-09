const {pool} = require('../config/database');

async function roomList() {
    const connection = await pool.getConnection(async (conn) => conn);
    const Query = `SELECT roomIndex, roomName, totalUsers, isPrivate FROM Room WHERE isActivated = 1;`;
    const [rows] = await connection.query(Query);
    connection.release();
    return rows;
}

async function makeRoom(roomName, password, isPrivate) {
    const connection = await pool.getConnection(async (conn) => conn);
    const Query = `INSERT INTO Room (roomName, password, isPrivate) VALUES ('${roomName}', '${password}', ${isPrivate});`;
    const [rows] = await connection.query(Query);
    connection.release();
    return rows.insertId;
}

async function searchRoom(roomName) {
    const connection = await pool.getConnection(async (conn) => conn);
    const Query = `SELECT roomIndex, roomName, totalUsers, isPrivate FROM Room WHERE isActivated = 1 AND roomName LIKE '%${roomName}%';`;
    const [rows] = await connection.query(Query);
    connection.release();
    return rows;
}

async function checkPW(roomIndex, password) {
    const connection = await pool.getConnection(async (conn) => conn);
    const Query = `SELECT COUNT(roomIndex) AS isSame FROM Room WHERE roomIndex = ${roomIndex} AND password = '${password}';`;
    const [rows] = await connection.query(Query);
    connection.release();
    return rows[0].isSame;
}

async function enterRoom(roomIndex) {
    const connection = await pool.getConnection(async (conn) => conn);
    const Query = `UPDATE Room SET totalUsers = totalUsers + 1 WHERE roomIndex = ${roomIndex};`;
    const [rows] = await connection.query(Query);
    connection.release();
    return rows;
}

async function exitRoom(roomIndex) {
    const connection = await pool.getConnection(async (conn) => conn);
    const Query = `UPDATE Room SET totalUsers = totalUsers - 1 WHERE roomIndex = ${roomIndex};`;
    const [rows] = await connection.query(Query);
    connection.release();
    return rows;
}

async function record(userName, score, roomName) {
    const connection = await pool.getConnection(async (conn) => conn);
    const Query = `INSERT INTO Score (userName, score, roomName) VALUES ('${userName}', ${score}, '${roomName}');`;
    const [rows] = await connection.query(Query);
    connection.release();
    return rows;
}

async function rank30() {
    const connection = await pool.getConnection(async (conn) => conn);
    const Query = `
        SELECT s1.scoreIndex, s1.userName, s1.score, s1.roomName, (SELECT COUNT(*) + 1 FROM Score s2 WHERE s2.score > s1.score AND s2.uploadTIME BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND DATE_ADD(NOW(), INTERVAL 1 DAY)) AS ranking
        FROM Score s1 WHERE s1.uploadTime BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND DATE_ADD(NOW(), INTERVAL 1 DAY) ORDER BY score DESC LIMIT 30;
    `;
    const [rows] = await connection.query(Query);
    connection.release();
    return rows;
}

async function myRank(userName, score, roomName) {
    const connection = await pool.getConnection(async (conn) => conn);
    const Query = `
        SELECT (SELECT COUNT(*) + 1 FROM Score s2 WHERE s2.score > s1.score) AS ranking FROM Score s1
        WHERE s1.uploadTime BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND DATE_ADD(NOW(), INTERVAL 1 DAY) AND userName = '${userName}' AND score = ${score} AND roomName = '${roomName}';
    `;
    const [rows] = await connection.query(Query);
    connection.release();
    return rows[0].ranking;
}

async function rank3() {
    const connection = await pool.getConnection(async (conn) => conn);
    const Query = `
        SELECT s1.scoreIndex, s1.userName, s1.score, s1.roomName, (SELECT COUNT(*) + 1 FROM Score s2 WHERE s2.score > s1.score) AS ranking
        FROM Score s1 WHERE s1.uploadTime BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND DATE_ADD(NOW(), INTERVAL 1 DAY) ORDER BY score DESC LIMIT 3;
    `;
    const [rows] = await connection.query(Query);
    connection.release();
    return rows;
}

async function roomName(roomID) {
    const connection = await pool.getConnection(async (conn) => conn);
    const Query = `SELECT roomName FROM Room WHERE roomIndex = ${roomID};`;
    const [rows] = await connection.query(Query);
    connection.release();
    return rows[0].roomName;
}

module.exports = {
    roomList,
    makeRoom,
    searchRoom,
    checkPW,
    enterRoom,
    exitRoom,
    record,
    rank30,
    myRank,
    rank3,
    roomName
}