export interface Evaluation {
  id: number
  created_at: string
  file_name: string
  original_text: string
  grade_info: {
    subjects: string[]
    grades: string[]
  }
  ai_analysis: {
    subjects: string[]
    grades: string[]
    usGrades: string[]
    gpa: number
    analysis: string[]
    matchPercentages: number[]
  }
} 