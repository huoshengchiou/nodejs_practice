const mysql = require('mysql');
const bluebird = require('bluebird');


// 以下值有設定錯誤都會crash
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test',
});

db.on('error', (event)=>{
    console.log(event);
});


db.connect();
bluebird.promisifyAll(db);

module.exports = db;