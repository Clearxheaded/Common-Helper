import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { apiService } from "@/services/apiService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Upload, FileText, X, Check } from "lucide-react"

export function DocumentsPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [files, setFiles] = useState<{ [key: string]: File | null }>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getRequiredDocuments = () => {
    const system = state?.educationSystem?.toLowerCase() || ""
    
    if (system === "matric") {
      return ["Senior Academic Transcript"]
    } else if (system === "a-levels") {
      return ["AS level Results", "A level Results"]
    }
    return ["Senior Academic Transcript"]
  }

  const getSystemDisplayName = () => {
    const system = state?.educationSystem?.toLowerCase() || ""
    if (system === "matric") return "Matric"
    if (system === "a-levels") return "A-Levels"
    return state?.educationSystem || "education system"
  }

  const handleFileChange = (documentType: string, file: File | null) => {
    setFiles(prev => ({ ...prev, [documentType]: file }))
  }

  const removeFile = (documentType: string) => {
    setFiles(prev => ({ ...prev, [documentType]: null }))
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
          analysis: result[0].analysis,
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
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Upload Required Documents</h2>
            <p className="text-muted-foreground text-lg">
              Please upload the following documents for your {getSystemDisplayName()} evaluation
            </p>
          </div>

          {/* Upload Cards */}
          <div className="grid gap-6">
            {getRequiredDocuments().map((doc) => (
              <Card key={doc} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">{doc}</h3>
                    </div>
                    {files[doc] && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(doc)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {!files[doc] ? (
                    <div className="border-2 border-dashed rounded-lg p-6 hover:border-primary/50 transition-colors">
                      <label className="flex flex-col items-center gap-2 cursor-pointer">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </span>
                        <span className="text-xs text-muted-foreground">
                          PDF, DOC, or DOCX (Max 10MB)
                        </span>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileChange(doc, e.target.files?.[0] || null)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 bg-primary/5 rounded-lg p-4">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">{files[doc]?.name}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
              disabled={!isComplete() || loading}
              onClick={handleContinue}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Processing...</span>
                </div>
              ) : (
                "Continue"
              )}
            </Button>

            {error && (
              <div className="p-4 bg-red-50 text-red-500 rounded-lg text-center text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 