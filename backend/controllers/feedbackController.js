const db = require('../config/db');

// Submit new feedback
exports.submitFeedback = (req, res) => {
    const { username, message } = req.body;
    const sql = 'INSERT INTO feedback (username, message) VALUES (?, ?)';
    db.query(sql, [username, message], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error submitting feedback' });
        }
        res.status(200).json({ message: 'Feedback submitted successfully' });
    });
};

// Get all feedback
exports.getAllFeedback = (req, res) => {
    const sql = 'SELECT * FROM feedback';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error fetching feedback' });
        }
        res.status(200).json(results);
    });
};
