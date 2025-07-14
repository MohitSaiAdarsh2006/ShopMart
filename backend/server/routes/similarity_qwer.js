// Integrated from qwer/backend/routes/similarity.js
const express = require('express');
const router = express.Router();
const similarityController = require('../controllers/similarityController_qwer');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/similarity
router.post('/', upload.single('image'), similarityController.similaritySearch);

module.exports = router;
