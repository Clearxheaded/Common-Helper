import { supabase } from '../config/supabase'

export const supabaseService = {
  async saveSelection(country: string, system: string) {
    try {
      console.log('Saving to Supabase:', { country, system })
      const { data, error } = await supabase
        .from('main')
        .insert([{
          selected_system: system.toLowerCase(),
          created_at: new Date().toISOString(),
          gpa: null,
          subject_id_1: null,
          subject_id_2: null,
          subject_id_3: null,
          subject_id_4: null
        }])
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Supabase error:', error)
      throw error
    }
  }
} 