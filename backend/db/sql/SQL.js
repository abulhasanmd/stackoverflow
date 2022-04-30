const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'database-1.cqynemgknizb.us-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: '12345678',
  database: 'messagesDB',
});

db.connect((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('database connected');
});

module.exports = db;
