const pdfParse = require('pdf-parse');
const fs = require('fs');
const { extractGradeInfo } = require('../utils/pdfUtils');

exports.parsePdf = async (req, res) => {
  try {
    console.log('Received PDF upload request');
    console.log('Request files:', req.file);
    
    if (!req.file) {
      console.log('No file received');
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    console.log('File path:', req.file.path);
    const dataBuffer = fs.readFileSync(req.file.path);
    
    console.log('Parsing PDF...');
    const data = await pdfParse(dataBuffer);
    
    console.log('Extracting grade info...');
    const gradeInfo = extractGradeInfo(data.text);

    // Clean up temporary file
    fs.unlinkSync(req.file.path);

    console.log('Sending response...');
    res.json({
      text: data.text,
      gradeInfo
    });
  } catch (error) {
    console.error('PDF parsing error:', error);
    res.status(500).json({ 
      error: 'Error parsing PDF',
      details: error.message 
    });
  }
}; 