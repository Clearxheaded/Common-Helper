"use client"

import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"

interface SubjectAnalysis {
  name: string
  equivalency: number
  analysis: string
}

const subjects: SubjectAnalysis[] = [
  {
    name: "Mathematics",
    equivalency: 85,
    analysis:
      "Strong alignment with AP Calculus AB. Covers advanced topics including derivatives and integrals. Some additional statistics content not typically found in AP curriculum.",
  },
  {
    name: "Physics",
    equivalency: 90,
    analysis:
      "Excellent match with AP Physics 1. Comprehensive coverage of mechanics and electricity. Includes advanced lab work comparable to AP standards.",
  },
  {
    name: "Chemistry",
    equivalency: 75,
    analysis:
      "Good alignment with AP Chemistry. Strong theoretical foundation but less emphasis on laboratory work. Additional organic chemistry topics covered.",
  },
  {
    name: "Biology",
    equivalency: 80,
    analysis:
      "Strong correlation with AP Biology. Extensive coverage of genetics and cellular processes. Some ecological concepts exceed AP requirements.",
  },
]

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar currentStep={3} />
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Your Results</h1>
            <p className="mt-2 text-gray-600">Analysis of your academic records</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold">Calculated GPA</h2>
            <div className="mb-8 flex items-center justify-center">
              <div className="text-center">
                <span className="text-5xl font-bold text-primary">3.8</span>
                <p className="mt-2 text-sm text-gray-600">U.S. 4.0 Scale Equivalent</p>
              </div>
            </div>

            <h2 className="mb-6 text-2xl font-semibold">Subject Analysis</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {subjects.map((subject) => (
                <div key={subject.name} className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-semibold">{subject.name}</h3>
                  <div className="mb-4">
                    <div className="mb-2 h-4 rounded-full bg-gray-200">
                      <div
                        className="h-4 rounded-full bg-primary transition-all"
                        style={{ width: `${subject.equivalency}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600">{subject.equivalency}% AP Course Equivalency</p>
                  </div>
                  <p className="text-sm text-gray-600">{subject.analysis}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button>Download Full Report</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

