const mysql = require('mysql2');
require('dotenv').config();

// mysql 접속 설정
const db = mysql.createConnection({
  host: process.env.HOST,
  port: '3306',
  user: 'applefarm',
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

db.connect();
console.log('db가 연결되었습니다!!!')

module.exports = db;