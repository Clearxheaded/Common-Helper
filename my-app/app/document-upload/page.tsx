"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect } from "react"

interface DocumentUploadProps {
  label: string
  description: string
  id: string
}

function DocumentUpload({ label, description, id }: DocumentUploadProps) {
  return (
    <div className="rounded-lg border-2 border-dashed border-gray-200 p-6 hover:border-blue-400 transition-colors">
      <Label htmlFor={id} className="mb-2 block text-lg font-medium">
        {label}
      </Label>
      <div className="relative h-32 cursor-default">
        <Input id={id} type="file" accept=".pdf,.doc,.docx" className="absolute inset-0 cursor-pointer opacity-0" />
        <div className="flex h-full flex-col items-center justify-center rounded-lg bg-gray-50 px-4 py-6">
          <p className="mb-2 text-sm text-gray-600">{description}</p>
          <Button type="button" variant="outline" className="cursor-pointer">
            Choose File
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function DocumentUploadPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const system = searchParams.get("system")

  useEffect(() => {
    if (!system) {
      router.push("/country-selection")
    }
  }, [system, router])

  const handleContinue = () => {
    router.push("/results")
  }

  const getDocumentRequirements = () => {
    switch (system) {
      case "a-levels":
        return [
          {
            label: "AS Levels Report",
            description: "Upload your AS Level examination results",
            id: "as-levels",
          },
          {
            label: "A Level Report",
            description: "Upload your A Level examination results",
            id: "a-levels",
          },
        ]
      case "matric":
        return [
          {
            label: "Senior Certificate",
            description: "Upload your Senior Certificate examination results",
            id: "matric",
          },
        ]
      default:
        return []
    }
  }

  if (!system) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar currentStep={2} />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Upload Your Documents</h1>
            <p className="mt-2 text-gray-600">
              Please provide the following documents for {system === "a-levels" ? "A-Levels" : "Matric"} analysis
            </p>
          </div>
          <div className="space-y-12 rounded-lg bg-white p-8 shadow-lg">
            <div className="space-y-8">
              {getDocumentRequirements().map((doc) => (
                <DocumentUpload key={doc.id} label={doc.label} description={doc.description} id={doc.id} />
              ))}
            </div>
          </div>
          <Button className="w-full" onClick={handleContinue}>
            Continue to Results
          </Button>
        </div>
      </div>
    </div>
  )
}

