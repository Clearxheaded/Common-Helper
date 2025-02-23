require('dotenv').config();
const { matchSubject } = require('./src/services/subjectMatcher');

async function testSubjectMatcher() {
  try {
    // Verify API key is available
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not set in environment variables');
    }

    console.log('Testing Subject Matcher...\n');

    // Test Mathematics comparison
    console.log('Testing Mathematics Comparison:');
    const mathResult = await matchSubject('Mathematics');
    console.log('Match Results:', JSON.stringify(mathResult, null, 2));
    console.log('\n-------------------\n');

    // Test English comparison
    console.log('Testing English Comparison:');
    const englishResult = await matchSubject('English Home Language');
    console.log('Match Results:', JSON.stringify(englishResult, null, 2));
    console.log('\n-------------------\n');

    // Test Geography comparison
    console.log('Testing Geography Comparison:');
    const geoResult = await matchSubject('Geography');
    console.log('Match Results:', JSON.stringify(geoResult, null, 2));

  } catch (error) {
    console.error('Error during testing:', error);
  }
}

// Run the tests
testSubjectMatcher(); 