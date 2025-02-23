import { OpenAI } from 'openai';
import 'dotenv/config';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function evaluateTranscript(subjects, system = 'matric') {
  try {
    const prompt = `
      Analyze these ${system} subjects and grades:
      ${JSON.stringify(subjects, null, 2)}
      
      Provide a detailed evaluation including:
      - GPA calculation
      - US equivalent grades
      - Subject matches
      - Academic strengths
      
      Return as JSON only.
    `;

    const response = await openai.chat.completions.create({
      model: process.env.MODEL_NAME || "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert in international education systems and grade conversion. Respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error evaluating transcript:', error);
    throw error;
  }
} 