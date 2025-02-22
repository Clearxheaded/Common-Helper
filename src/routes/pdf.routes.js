const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdf.controller');
const upload = require('../middleware/upload');

router.post('/parse', upload.single('pdf'), pdfController.parsePdf);

module.exports = router; 