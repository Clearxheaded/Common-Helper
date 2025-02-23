export function extractGradeInfo(pdfText) {
  try {
    // Basic implementation - you can enhance this based on your PDF structure
    const lines = pdfText.split('\n');
    const gradeInfo = {
      subjects: [],
      grades: []
    };

    // Example pattern matching for grades
    lines.forEach(line => {
      const gradeMatch = line.match(/([A-Za-z\s]+):\s*([A-F][+-]?|\d+)/);
      if (gradeMatch) {
        gradeInfo.subjects.push(gradeMatch[1].trim());
        gradeInfo.grades.push(gradeMatch[2]);
      }
    });

    return gradeInfo;
  } catch (error) {
    console.error('Error extracting grade info:', error);
    throw new Error('Failed to extract grade information from PDF');
  }
}

export default {
  extractGradeInfo
}; 