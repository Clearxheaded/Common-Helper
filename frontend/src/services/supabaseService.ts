import { supabase } from '@/config/supabase'

export const supabaseService = {
  async saveSelection(country: string, educationSystem: string) {
    try {
      // Convert the education system to match the database constraint
      const normalizedSystem = educationSystem.toLowerCase().replace(' ', '-')
      
      const { data, error } = await supabase
        .from('main')
        .insert([
          {
            selected_system: normalizedSystem,
            // Initialize other required fields with null
            gpa: null,
            subject_id_1: null,
            subject_id_2: null,
            subject_id_3: null,
            subject_id_4: null
          }
        ])
        .select()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Supabase error:', error)
      throw error
    }
  }
} 