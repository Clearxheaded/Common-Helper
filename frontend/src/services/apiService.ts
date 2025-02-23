const API_URL = 'http://localhost:3002'  // Updated backend URL

export const apiService = {
  async uploadDocuments(files: File[]) {
    try {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('documents', file)
      })

      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Upload failed')
      return await response.json()
    } catch (error) {
      console.error('API error:', error)
      throw error
    }
  },

  async analyzeGrades(text: string) {
    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      })

      if (!response.ok) throw new Error('Analysis failed')
      return await response.json()
    } catch (error) {
      console.error('API error:', error)
      throw error
    }
  }
} 