const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'elisa',
  password: 'your_password', 
  database: 'website_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database!');
});

module.exports = connection;
