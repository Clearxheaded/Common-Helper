const { OpenAI } = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const AP_SUBJECTS = {
  'AP Calculus AB': {
    description: 'Covers limits, derivatives, integrals, and the Fundamental Theorem of Calculus',
    level: 'Advanced'
  },
  'AP Calculus BC': {
    description: 'Extends AB topics plus series, parametric equations, polar functions, vector functions',
    level: 'Very Advanced'
  },
  'AP Computer Science Principles': {
    description: 'Covers programming concepts, algorithms, data, internet, and digital innovation',
    level: 'Intermediate'
  },
  'AP English': {
    description: 'Analysis of literature, rhetorical analysis, argumentative writing',
    level: 'Advanced'
  },
  'AP Geography': {
    description: 'Covers patterns and processes of human and physical geography',
    level: 'Advanced'
  }
};

const SA_SUBJECTS = {
  'Mathematics': {
    description: 'Covers algebra, calculus basics, geometry, trigonometry',
    possibleMatches: ['AP Calculus AB', 'AP Calculus BC'],
    level: 'Advanced'
  },
  'Geography': {
    description: 'Physical and human geography, environmental studies',
    possibleMatches: ['AP Geography'],
    level: 'Advanced'
  }
};

async function matchSubject(saSubject) {
  try {
    const prompt = `
    You are an educational expert specializing in international curriculum comparison.
    
    Task: Compare this South African subject with AP (Advanced Placement) equivalents.

    South African Subject: ${saSubject}
    Detailed Syllabus:
    ${JSON.stringify(SA_SUBJECTS[saSubject], null, 2)}

    Potential AP Matches:
    ${JSON.stringify(SA_SUBJECTS[saSubject].possibleMatches.map(match => ({
      subject: match,
      details: AP_SUBJECTS[match]
    })), null, 2)}

    Please analyze:
    1. Content overlap
    2. Depth of coverage
    3. Skills developed
    4. Assessment methods
    5. Academic rigor

    Consider:
    - Topic-by-topic comparison
    - Mathematical/analytical requirements
    - Project work and practical components
    - Expected learning outcomes

    Return a detailed JSON response with:
    {
      "saSubject": "subject name",
      "bestMatch": "best AP equivalent",
      "matchPercentage": number (0-100),
      "reasoning": "detailed explanation",
      "keyDifferences": ["specific differences"],
      "topicOverlap": {
        "fullyMatched": ["topics that match exactly"],
        "partiallyMatched": ["topics with partial overlap"],
        "notCovered": ["topics in one but not the other"]
      }
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert in international education systems and curriculum comparison."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error('Error matching subject:', error);
    throw new Error(`Failed to match subject: ${error.message}`);
  }
}

module.exports = {
  matchSubject,
  SA_SUBJECTS,
  AP_SUBJECTS
}; 