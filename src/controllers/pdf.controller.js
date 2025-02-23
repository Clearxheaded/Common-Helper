import { OpenAI } from 'openai';
import multer from 'multer';
import fs from 'fs';
import { extractGradeInfo } from '../utils/pdfUtils.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function parsePdf(req, res) {
  try {
    console.log('Request received:', req.file);
    if (!req.file) {
      console.log('No file in request');
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    // Read the PDF file
    console.log('Reading file from:', req.file.path);
    const pdfText = fs.readFileSync(req.file.path, 'utf8');
    console.log('PDF content:', pdfText.substring(0, 200) + '...');
    
    // Extract initial grade info
    const gradeInfo = extractGradeInfo(pdfText);
    console.log('Extracted grade info:', gradeInfo);

    // Use OpenAI to analyze the transcript
    const completion = await openai.chat.completions.create({
      model: process.env.MODEL_NAME || "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert in analyzing academic transcripts and converting international grades to US equivalents."
        },
        {
          role: "user",
          content: `Analyze this transcript text and extract subject information:
            ${pdfText}
            
            Format the response as JSON with:
            - subjects: array of subject names
            - grades: array of original grades
            - usGrades: array of US equivalent grades
            - gpa: calculated US GPA (as a number like 3.7)
            - analysis: array of subject-specific analyses
            - matchPercentages: array of equivalency percentages for each subject`
        }
      ]
    });

    // Parse OpenAI response
    const aiAnalysis = JSON.parse(completion.choices[0].message.content);

    // Clean up the temporary file
    fs.unlinkSync(req.file.path);

    res.json({
      originalText: pdfText,
      gradeInfo: gradeInfo,
      aiAnalysis: aiAnalysis
    });
  } catch (error) {
    console.error('PDF processing error:', error);
    res.status(500).json({ 
      error: 'Error processing PDF',
      details: error.message 
    });
  }
}

export default {
  parsePdf
}; 