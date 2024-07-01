const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Menambahkan rute dengan callback function yang valid
router.post('/submit', feedbackController.submitFeedback);
router.get('/all', feedbackController.getAllFeedback);

module.exports = router;
