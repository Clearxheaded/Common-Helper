import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  'https://hqvipwjgtismmrlzguyg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhxdmlwd2pndGlzbW1ybHpndXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMDQ3ODgsImV4cCI6MjA1NTg4MDc4OH0.6dZZ6yvtD5uH0BQqHSfMhmVbsXXY9FCks3wRXpTm7EU'  // Replace with your actual anon key
)

document.addEventListener('DOMContentLoaded', () => {
  // Fetch GPA and courses data
  fetchGPAData();
  
  // Add copy button functionality
  document.getElementById('copy-gpa').addEventListener('click', () => {
    const gpa = document.getElementById('gpa').textContent;
    navigator.clipboard.writeText(gpa);
    
    // Show feedback
    const button = document.getElementById('copy-gpa');
    button.textContent = 'Copied!';
    setTimeout(() => {
      button.textContent = 'Copy';
    }, 1500);
  });
});

async function fetchGPAData() {
  try {
    // Query the 'main' table, ordering by created_at (assuming this is your timestamp column)
    // and getting only the most recent row's GPA
    const { data, error } = await supabase
      .from('main')
      .select('GPA')
      .order('created_at', { ascending: false })
      .limit(1)
    
    if (error) throw error
    
    if (data && data.length > 0) {
      // This line updates the HTML to show the GPA
      const formattedGPA = Number(data[0].GPA).toFixed(2);
      document.getElementById('gpa').textContent = formattedGPA;
    }
    else {
      document.getElementById('gpa').textContent = 'No GPA found';
    }
  } catch (error) {
    document.getElementById('gpa').textContent = 'Error loading GPA';
  }
}

function copyCourse(courseName) {
  navigator.clipboard.writeText(courseName);
  // You could add copy feedback here as well
}