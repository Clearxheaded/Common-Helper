const { OpenAI } = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

exports.queryOpenAI = async (req, res) => {
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
};

exports.convertGrades = async (req, res) => {
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
};

exports.matchSubjects = async (req, res) => {
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
}; 