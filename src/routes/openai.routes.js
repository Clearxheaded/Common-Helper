import express from 'express';
import openaiController from '../controllers/openai.controller.js';
const router = express.Router();

router.post('/query', openaiController.queryOpenAI);
router.post('/convert-grades', openaiController.convertGrades);
router.post('/match-subjects', openaiController.matchSubjects);

export default router; 