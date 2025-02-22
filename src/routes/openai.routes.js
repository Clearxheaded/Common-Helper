const express = require('express');
const router = express.Router();
const openaiController = require('../controllers/openai.controller');

router.post('/query', openaiController.queryOpenAI);
router.post('/convert-grades', openaiController.convertGrades);
router.post('/match-subjects', openaiController.matchSubjects);

module.exports = router; 