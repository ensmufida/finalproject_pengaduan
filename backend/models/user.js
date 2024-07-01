const db = require('../config/db');

const User = {
  findByUsername: (username, callback) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
      if (err) throw err;
      callback(results[0]);
    });
  },
  
  createUser: (newUser, callback) => {
    const sql = 'INSERT INTO users (username, email, password, phone_number, address, gender, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [newUser.username, newUser.email, newUser.password, newUser.phone_number, newUser.address, newUser.gender, newUser.role], (err, result) => {
      if (err) throw err;
      callback(result.insertId);
    });
  },
};

module.exports = User;
