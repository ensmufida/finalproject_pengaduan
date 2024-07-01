// backend/routes/complaintRoutes.js
const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/submit', upload.single('image'), complaintController.submitComplaint);
router.get('/all', complaintController.getAllComplaints);

module.exports = router;
