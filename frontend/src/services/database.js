import { supabase } from '../config/supabase'

export const databaseService = {
  async saveEvaluation(evaluation) {
    try {
      const { data, error } = await supabase
        .from('main')
        .insert([{
          selected_system: evaluation.system,
          gpa: evaluation.ai_analysis.gpa,
          created_at: new Date().toISOString()
        }])
        .select()

      if (error) throw error

      // Save subjects
      const subjects = evaluation.ai_analysis.subjects;
      for (let i = 0; i < subjects.length && i < 4; i++) {
        const { error: subjectError } = await supabase
          .from(`subject_${i + 1}`)
          .insert([{
            sub_name: subjects[i],
            equiv_name: evaluation.ai_analysis.usGrades[i],
            perc_match: evaluation.ai_analysis.matchPercentages[i],
            text_description: evaluation.ai_analysis.analysis[i],
            created_at: new Date().toISOString()
          }])
        if (subjectError) throw subjectError
      }

      return data
    } catch (error) {
      console.error('Error saving evaluation:', error)
      throw error
    }
  },

  async getEvaluations() {
    try {
      const { data, error } = await supabase
        .from('main')
        .select(`
          *,
          subject_1 (
            subject_id,
            sub_name,
            equiv_name,
            perc_match,
            text_description
          ),
          subject_2 (
            subject_id,
            sub_name,
            equiv_name,
            perc_match,
            text_description
          ),
          subject_3 (
            subject_id,
            sub_name,
            equiv_name,
            perc_match,
            text_description
          ),
          subject_4 (
            subject_id,
            sub_name,
            equiv_name,
            perc_match,
            text_description
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching evaluations:', error)
      throw error
    }
  }
} 