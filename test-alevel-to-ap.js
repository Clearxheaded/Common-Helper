require('dotenv').config();
const { matchALevelSubject } = require('./src/services/subjectMatcher');

async function testALevelToAP() {
  try {
    console.log('Testing A-Level to AP Comparison...\n');

    // Test each subject separately
    console.log('Testing A-Level Computer Science:');
    const csResult = await matchALevelSubject('Computer Science');
    console.log('Match Results:', JSON.stringify(csResult, null, 2));
    console.log('\n-------------------\n');

    console.log('Testing A-Level Chemistry:');
    const chemResult = await matchALevelSubject('Chemistry');
    console.log('Match Results:', JSON.stringify(chemResult, null, 2));
    console.log('\n-------------------\n');

    console.log('Testing A-Level Mathematics:');
    const mathResult = await matchALevelSubject('Mathematics');
    console.log('Match Results:', JSON.stringify(mathResult, null, 2));

  } catch (error) {
    console.error('Error during testing:', error);
  }
}

// Run the tests
console.log('Starting A-Level to AP comparison tests...');
testALevelToAP();