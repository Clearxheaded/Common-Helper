import 'dotenv/config';
import { OpenAI } from 'openai';

// Debug: Check if API key is loaded
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OpenAI API key not found in environment variables. Make sure .env file exists and contains OPENAI_API_KEY');
}

// Debug: Log environment status
console.log('Environment loaded:', {
  hasApiKey: !!process.env.OPENAI_API_KEY,
  keyLength: process.env.OPENAI_API_KEY?.length,
  envPath: process.cwd()
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Grade conversion tables
const MATRIC_TO_GPA = {
  7: { percentage: '80-100%', gpa: 4.0 },
  6: { percentage: '70-79%', gpa: 3.3 },
  5: { percentage: '60-69%', gpa: 2.7 },
  4: { percentage: '50-59%', gpa: 2.0 },
  3: { percentage: '40-49%', gpa: 1.3 },
  2: { percentage: '30-39%', gpa: 1.0 },
  1: { percentage: '0-29%', gpa: 0.0 }
};

const ALEVELS_TO_GPA = {
  'A*': { usGrade: 'A+', gpa: 4.0 },
  'A': { usGrade: 'A', gpa: 4.0 },
  'B': { usGrade: 'B', gpa: 3.0 },
  'C': { usGrade: 'C', gpa: 2.0 },
  'D': { usGrade: 'D', gpa: 1.0 },
  'E': { usGrade: 'F', gpa: 0.0 }
};

async function evaluateTranscript(subjects, system = 'matric') {
  try {
    const systemPrompt = `You are an expert in international education evaluation, specifically for ${system === 'matric' ? 'South African Matric' : 'A-Levels'} to US university admissions.

    IMPORTANT: You must respond with ONLY valid JSON. No other text, explanations, or markdown.
    
    ${system === 'matric' ? `
    Matric Grade Conversion (USE THIS EXACTLY):
    Level 7 (80-100%) = GPA 4.0
    Level 6 (70-79%) = GPA 3.3
    Level 5 (60-69%) = GPA 2.7
    Level 4 (50-59%) = GPA 2.0
    Level 3 (40-49%) = GPA 1.3
    Level 2 (30-39%) = GPA 1.0
    Level 1 (0-29%) = GPA 0.0
    ` : `
    A-Levels Grade Conversion (USE THIS EXACTLY):
    A* = GPA 4.0
    A = GPA 4.0
    B = GPA 3.0
    C = GPA 2.0
    D = GPA 1.0
    E = GPA 0.0
    `}

    Subject Matching Guidelines:
    - Calculate similarity percentage based on overlapping content`;

    const userPrompt = `
      Analyze these ${system === 'matric' ? 'South African Matric' : 'A-Levels'} subjects and grades:
      ${subjects.map(s => `${s.subject}: ${s.grade}${system === 'matric' ? '%' : ''}`).join('\n')}

      RESPOND WITH ONLY THE FOLLOWING JSON STRUCTURE. NO OTHER TEXT OR EXPLANATIONS:
      {
        "subjectMatches": [
          {
            "original": "subject name",
            "grade": "${system === 'matric' ? 'percentage' : 'A-Level grade'}",
            "equivalent": "AP subject name",
            "matchPercentage": number,
            "gpaEquivalent": number,
            "contentComparison": {
              "originalContent": ["main topic 1", "main topic 2", "main topic 3"],
              "apContent": ["main topic 1", "main topic 2", "main topic 3"],
              "sharedContent": ["shared topic 1", "shared topic 2"],
              "differences": {
                "originalOnly": ["topic only in original"],
                "apOnly": ["topic only in AP"]
              },
              "narrativeComparison": "A detailed paragraph comparing the subjects..."
            }
          }
        ],
        "cumulativeGPA": number
      }

      Focus on:
      - Direct subject equivalents
      - Match percentage based on content overlap
      - Exact GPA conversion using the provided tables
      - Key topics covered in each subject
      - Specific content overlaps and differences
      - Main curriculum components
      - Provide detailed narrative comparison explaining the relationship between subjects
      - Include specific strengths and differences in the narrative

      IMPORTANT: 
      - Use the EXACT grade conversion tables provided
      - Return ONLY the JSON structure. No explanations or additional text
      - Do not include markdown code blocks or any other formatting
      - For content comparison, focus on main topics and key differences
      - Keep topic lists concise (3-5 main points each)
      - Make narrative comparisons clear, specific, and informative
      - Include curriculum focus, depth of coverage, and practical components in narratives
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.1  // Lower temperature for more consistent formatting
    });

    // Parse and validate the response
    try {
      const result = JSON.parse(response.choices[0].message.content.trim());
      return JSON.stringify(result, null, 2);  // Pretty print the JSON
    } catch (error) {
      // Try to extract JSON if it's wrapped in other text
      const jsonMatch = response.choices[0].message.content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const result = JSON.parse(jsonMatch[0]);
          return JSON.stringify(result, null, 2);
        } catch (e) {
          console.error('Failed to parse extracted JSON');
        }
      }
      console.error('Failed to parse AI response:', response.choices[0].message.content);
      throw new Error('AI response was not in valid JSON format');
    }
  } catch (error) {
    console.error('Error evaluating transcript:', error);
    throw error;
  }
}

// Test samples
const samples = {
  matric: [
    {
      description: "Strong Matric Performance",
      subjects: [
        { subject: 'Mathematics', grade: 88 },
        { subject: 'Physical Sciences', grade: 73 },
        { subject: 'Life Sciences', grade: 87 }
      ]
    }
  ],
  alevels: [
    {
      description: "Strong A-Levels Performance",
      subjects: [
        { subject: 'Mathematics', grade: 'A*' },
        { subject: 'Physics', grade: 'A' },
        { subject: 'Chemistry', grade: 'B' }
      ]
    }
  ]
};

// Test function
async function runTests() {
  console.log('Starting Transcript Evaluation Tests\n');

  // Test Matric
  console.log('Testing Matric Transcripts:');
  for (const sample of samples.matric) {
    console.log(`\nTesting: ${sample.description}`);
    console.log('Input subjects:');
    console.log(JSON.stringify(sample.subjects, null, 2));
    
    try {
      const result = await evaluateTranscript(sample.subjects, 'matric');
      console.log('\nEvaluation Result:');
      console.log(result);
      console.log('\n' + '='.repeat(80) + '\n');
    } catch (error) {
      console.error('Test failed:', error);
    }
  }

  // Test A-Levels
  console.log('\nTesting A-Level Transcripts:');
  for (const sample of samples.alevels) {
    console.log(`\nTesting: ${sample.description}`);
    console.log('Input subjects:');
    console.log(JSON.stringify(sample.subjects, null, 2));
    
    try {
      const result = await evaluateTranscript(sample.subjects, 'alevels');
      console.log('\nEvaluation Result:');
      console.log(result);
      console.log('\n' + '='.repeat(80) + '\n');
    } catch (error) {
      console.error('Test failed:', error);
    }
  }
}

// Run the tests
runTests().catch(console.error);

export { evaluateTranscript }; 