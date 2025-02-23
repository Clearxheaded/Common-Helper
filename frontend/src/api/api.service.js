import axios from 'axios';
import { API_BASE_URL } from './config';
import { supabase } from '../config/supabase';

const apiService = {
  async matchSubject(subject) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/match`, { subject });
      return response.data;
    } catch (error) {
      console.error('Error matching subject:', error);
      throw error;
    }
  },

  async evaluateTranscript(subjects, system) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/evaluate`, { 
        subjects, 
        system 
      });
      return response.data;
    } catch (error) {
      console.error('Error evaluating transcript:', error);
      throw error;
    }
  },

  async uploadPDF(file) {
    try {
      console.log('Creating form data with file:', file.name);
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await axios.post(`${API_BASE_URL}/api/pdf/parse`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Store the results in Supabase
      const { data, error } = await supabase
        .from('evaluations')
        .insert([
          {
            original_text: response.data.originalText,
            grade_info: response.data.gradeInfo,
            ai_analysis: response.data.aiAnalysis,
            file_name: file.name,
            created_at: new Date()
          }
        ])
        .select()

      if (error) throw error;

      console.log('Response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default apiService; 