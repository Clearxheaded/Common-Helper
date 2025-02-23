import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pdfController from '../controllers/pdf.controller.js';
import upload from '../middleware/upload.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.post('/parse', upload.single('pdf'), pdfController.parsePdf);

export default router; 