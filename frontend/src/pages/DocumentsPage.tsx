import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { apiService } from "@/services/apiService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DocumentsPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [files, setFiles] = useState<{ [key: string]: File | null }>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getRequiredDocuments = () => {
    if (state.educationSystem === "Matric") {
      return ["Senior Academic Transcript"]
    }
    return ["AS level Results", "A level Results"]
  }

  const handleFileChange = (documentType: string, file: File | null) => {
    setFiles(prev => ({ ...prev, [documentType]: file }))
  }

  const isComplete = () => {
    const required = getRequiredDocuments()
    return required.every(doc => files[doc])
  }

  const handleContinue = async () => {
    setLoading(true)
    setError(null)
    try {
      const uploadedFiles = Object.values(files).filter((f): f is File => f !== null)
      const result = await apiService.uploadDocuments(uploadedFiles)
      // Check for errors in results
      const errors = result.filter(r => r.error)
      if (errors.length > 0) {
        throw new Error(errors[0].error)
      }
      
      navigate('/results', { 
        state: { 
          analysis: result[0].analysis,  // Assuming single file for now
          originalText: result[0].originalText 
        } 
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Upload Required Documents</h2>
          <p className="text-muted-foreground">
            Please upload the following documents for your {state.educationSystem} evaluation
          </p>
        </div>

        <div className="space-y-6">
          {getRequiredDocuments().map((doc) => (
            <div key={doc} className="space-y-2">
              <label className="text-sm font-medium">{doc}</label>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(doc, e.target.files?.[0] || null)}
              />
            </div>
          ))}
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={!isComplete() || loading}
          onClick={handleContinue}
        >
          {loading ? 'Processing...' : 'Continue'}
        </Button>
      </div>
      {error && (
        <div className="mt-4 text-red-500">{error}</div>
      )}
    </div>
  )
} 