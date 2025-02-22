require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');

const pdfRoutes = require('./routes/pdf.routes');
const openaiRoutes = require('./routes/openai.routes');
const errorHandler = require('./middleware/errorHandler');
const subjectRoutes = require('./routes/subject.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

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

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 