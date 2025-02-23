import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DocumentsPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [files, setFiles] = useState<{ [key: string]: File | null }>({})

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
          disabled={!isComplete()}
          onClick={() => navigate('/results')}
        >
          Continue
        </Button>
      </div>
    </div>
  )
} 