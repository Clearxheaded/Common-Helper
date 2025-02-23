import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { evaluateTranscript } from './services/transcriptEvaluator.js';
import { matchALevelSubject } from './services/subjectMatcher.js';
import { evaluateTranscript as testEvaluator } from './tests/integration/test-evaluator.js';
import { parsePDF, extractSubjectsFromText } from './services/pdfParser.js';
import multer from 'multer';

import openaiRoutes from './routes/openai.routes.js';
import errorHandler from './middleware/errorHandler.js';
import subjectRoutes from './routes/subject.routes.js';
import pdfRoutes from './routes/pdf.routes.js';

const app = express();
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 3002;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024  // 10MB limit
  }
});

// Add this before setting up routes
const uploadDir = path.join(__dirname, '..', 'uploads', 'temp');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
console.log('Upload directory:', uploadDir);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Grade Conversion API',
    version: '1.0.0',
    endpoints: {
      pdf: {
        'POST /api/pdf/parse': 'Upload and parse PDF transcript',
      },
      openai: {
        'POST /api/openai/query': 'General OpenAI query',
        'POST /api/openai/convert-grades': 'Convert grades to US equivalent',
        'POST /api/openai/match-subjects': 'Match subjects to US AP equivalents',
      }
    }
  });
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/pdf', pdfRoutes);
app.use('/api/openai', openaiRoutes);
app.use('/api/subjects', subjectRoutes);

// API endpoints
app.post('/api/evaluate', async (req, res) => {
  try {
    const { subjects, system } = req.body;
    const result = await evaluateTranscript(subjects, system);
    res.json(JSON.parse(result));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/match', async (req, res) => {
  try {
    const { subject } = req.body;
    const result = await matchALevelSubject(subject);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload endpoint
app.post('/upload', upload.array('documents'), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    
    const results = await Promise.all(files.map(async (file) => {
      const tempPath = path.join(uploadDir, file.originalname);
      await fs.promises.writeFile(tempPath, file.buffer);
      
      try {
        // Extract text from PDF
        const pdfText = await parsePDF(tempPath);
        
        // Extract subjects and grades from text
        const extractedSubjects = extractSubjectsFromText(pdfText);
        
        // Filter out Afrikaans and format for evaluator
        const formattedSubjects = extractedSubjects
          .filter(s => !s.name.toLowerCase().includes('afrikaans'))
          .map(s => ({
            subject: s.name,
            grade: s.grade
          }));
        
        // Use your evaluator
        const result = await testEvaluator(formattedSubjects, 'matric');
        
        await fs.promises.unlink(tempPath);
        
        return {
          filename: file.originalname,
          analysis: JSON.parse(result)
        };
      } catch (error) {
        console.error('File processing error:', error);
        return {
          filename: file.originalname,
          error: error.message
        };
      }
    }));
    
    res.json(results);
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 

app.use(cors({
  origin: ['https://common-helper.vercel.app', process.env.FRONTEND_URL],
  credentials: true
}));