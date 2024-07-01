const db = require('../config/db');

// Submit new complaint
exports.submitComplaint = (req, res) => {
    const { username, category, message } = req.body;
    const image = req.file ? req.file.filename : null;
    const sql = 'INSERT INTO complaints (username, category, message, image) VALUES (?, ?, ?, ?)';
    db.query(sql, [username, category, message, image], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error submitting complaint' });
        }
        res.status(200).json({ message: 'Complaint submitted successfully' });
    });
};

// Get all complaints
exports.getAllComplaints = (req, res) => {
    const sql = 'SELECT * FROM complaints';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error fetching complaints' });
        }
        res.status(200).json(results);
    });
};
