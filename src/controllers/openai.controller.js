import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function queryOpenAI(req, res) {
  try {
    const { prompt } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Error querying OpenAI' });
  }
}

export async function convertGrades(req, res) {
  try {
    const { grades, educationSystem } = req.body;
    
    // Construct prompt for grade conversion
    const prompt = `Convert these grades from ${educationSystem} to US GPA system: ${JSON.stringify(grades)}`;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ conversion: completion.choices[0].message.content });
  } catch (error) {
    console.error('Grade conversion error:', error);
    res.status(500).json({ error: 'Error converting grades' });
  }
}

export async function matchSubjects(req, res) {
  try {
    const { subjects } = req.body;
    
    // Construct prompt for subject matching
    const prompt = `Match these subjects to US AP equivalents: ${JSON.stringify(subjects)}`;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ matches: completion.choices[0].message.content });
  } catch (error) {
    console.error('Subject matching error:', error);
    res.status(500).json({ error: 'Error matching subjects' });
  }
}

export default {
  queryOpenAI,
  convertGrades,
  matchSubjects
}; 