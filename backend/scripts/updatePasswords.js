// backend/scripts/updatePasswords.js
const bcrypt = require('bcrypt');
const db = require('../config/db');  // Pastikan path ini benar sesuai dengan struktur proyek Anda

const users = [
  { id: 5, username: 'user01', password: '0202' },
  { id: 7, username: 'admin01', password: '0101' }
];

async function updatePasswords() {
  for (let user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const query = 'UPDATE users SET password = ? WHERE id = ?';
    db.query(query, [hashedPassword, user.id], (err, result) => {
      if (err) throw err;
      console.log(`Password updated for user: ${user.username}`);
    });
  }
}

updatePasswords();
