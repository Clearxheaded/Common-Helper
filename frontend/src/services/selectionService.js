import { supabase } from '../config/supabase'

export const selectionService = {
  async saveSelection(country, system) {
    console.log('Selection service called with:', { country, system })
    try {
      const { data, error } = await supabase
        .from('main')
        .insert([{
          selected_system: system.toLowerCase(),
          country: country,
          created_at: new Date().toISOString()
        }])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        console.error('Error details:', error.message)
        throw error
      }

      console.log('Data saved:', data)
      return data[0]
    } catch (error) {
      console.error('Error saving selection:', error)
      console.error('Full error:', error)
      throw error
    }
  }
} 