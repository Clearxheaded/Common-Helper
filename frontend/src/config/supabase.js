import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hqvipwjgtismmrlzguyg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxdmlwd2pndGlzbW1ybHpndXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMDQ3ODgsImV4cCI6MjA1NTg4MDc4OH0.6dZZ6yvtD5uH0BQqHSfMhmVbsXXY9FCks3wRXpTm7EU'

// Test connection
async function testConnection() {
  try {
    console.log('Testing Supabase connection...')
    const { data, error } = await supabase
      .from('main')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('Database connection error:', error)
      console.error('Error details:', error.message)
    } else {
      console.log('Successfully connected to Supabase!')
      console.log('Test query result:', data)
    }
  } catch (error) {
    console.error('Connection test failed:', error)
    console.error('Error details:', error.message)
  }
}

// Call test immediately
testConnection().catch(console.error)

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
}) 