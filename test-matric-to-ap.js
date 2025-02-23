require('dotenv').config();
const { matchSubject } = require('./src/services/subjectMatcher');

async function testMatricToAP() {
  try {
    console.log('Testing Matric to AP Comparison...\n');

    // Test subjects from Matric transcript
    const subjects = [
      'Mathematics',
      'English',
      'Geography'
    ];

    for (const subject of subjects) {
      console.log(`\nTesting ${subject} Comparison:`);
      const result = await matchSubject(subject);
      console.log('Match Results:', JSON.stringify(result, null, 2));
      console.log('\n-------------------');
    }

  } catch (error) {
    console.error('Error during testing:', error);
  }
}

// Run the tests
console.log('Starting Matric to AP comparison tests...');
testMatricToAP(); 