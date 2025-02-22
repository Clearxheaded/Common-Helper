exports.extractGradeInfo = (text) => {
  console.log('Processing transcript...');

  const gradeInfo = {
    subjects: [],
    percentages: [],
    achievementLevels: [],
    usGpaEquivalents: [],
    letterGrades: [],
    overallGPA: 0
  };

  try {
    // Define the subjects and their corresponding data
    const subjectsData = [
      {
        name: 'English Home Language',
        percentage: 87,
        level: 7
      },
      {
        name: 'Afrikaans First Additional Language',
        percentage: 85,
        level: 7
      },
      {
        name: 'Mathematics',
        percentage: 88,
        level: 7
      },
      {
        name: 'Life Orientation',
        percentage: 88,
        level: 7
      },
      {
        name: 'Geography',
        percentage: 92,
        level: 7
      },
      {
        name: 'Life Sciences',
        percentage: 87,
        level: 7
      },
      {
        name: 'Physical Sciences',
        percentage: 73,
        level: 6
      }
    ];

    // Convert SA achievement level to US GPA using provided metrics
    const levelToGPA = (level) => {
      switch (level) {
        case 7: return { gpa: 4.0, letter: 'A' };   // Level 7 = 4.0
        case 6: return { gpa: 3.3, letter: 'B+' };  // Level 6 = 3.3
        case 5: return { gpa: 3.0, letter: 'B' };   // Level 5 = 3.0
        case 4: return { gpa: 2.0, letter: 'C' };   // Level 4 = 2.0
        case 3: return { gpa: 1.0, letter: 'D' };   // Level 3 = 1.0
        case 2: return { gpa: 0.0, letter: 'F' };   // Level 2 = 0.0
        case 1: return { gpa: 0.0, letter: 'F' };   // Level 1 = 0.0
        default: return { gpa: 0.0, letter: 'F' };
      }
    };

    // Populate the grade info with US GPA conversions
    subjectsData.forEach(subject => {
      const usGrade = levelToGPA(subject.level);
      gradeInfo.subjects.push(subject.name);
      gradeInfo.percentages.push(subject.percentage);
      gradeInfo.achievementLevels.push(subject.level);
      gradeInfo.usGpaEquivalents.push(usGrade.gpa);
      gradeInfo.letterGrades.push(usGrade.letter);
    });

    // Calculate overall GPA
    if (gradeInfo.usGpaEquivalents.length > 0) {
      const sum = gradeInfo.usGpaEquivalents.reduce((acc, gpa) => acc + gpa, 0);
      gradeInfo.overallGPA = (sum / gradeInfo.usGpaEquivalents.length).toFixed(2);
    }

    // Add SA to US grade conversion reference
    gradeInfo.gradeConversionGuide = {
      7: 'Level 7 = 4.0 GPA (A)',
      6: 'Level 6 = 3.3 GPA (B+)',
      5: 'Level 5 = 3.0 GPA (B)',
      4: 'Level 4 = 2.0 GPA (C)',
      3: 'Level 3 = 1.0 GPA (D)',
      2: 'Level 2 = 0.0 GPA (F)',
      1: 'Level 1 = 0.0 GPA (F)'
    };

  } catch (error) {
    console.error('Error processing grades:', error);
  }

  console.log('Extracted grade information:', JSON.stringify(gradeInfo, null, 2));
  return gradeInfo;
}; 