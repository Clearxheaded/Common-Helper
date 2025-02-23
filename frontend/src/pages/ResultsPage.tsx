import { Button } from "@/components/ui/button"
import { useLocation } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SubjectAnalysis {
  original: string
  grade: string
  equivalent: string
  matchPercentage: number
  gpaEquivalent: number
  contentComparison: {
    originalContent: string[]
    apContent: string[]
    sharedContent: string[]
    differences: {
      originalOnly: string[]
      apOnly: string[]
    }
    narrativeComparison: string
  }
}

function SubjectResult({ analysis }: { analysis: SubjectAnalysis }) {
  return (
    <Card className="space-y-6 p-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold flex justify-between">
          {analysis.original}
          <span className="text-primary">{analysis.grade}</span>
        </h3>
        <p className="text-muted-foreground">
          Equivalent to: <span className="font-medium">{analysis.equivalent}</span>
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Match Percentage</p>
        <Progress value={analysis.matchPercentage} className="h-2" />
        <div className="flex justify-between text-sm text-muted-foreground mt-1">
          <span>Content Match</span>
          <span>{analysis.matchPercentage}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4">
        <div>
          <h4 className="font-medium mb-2">Original Content</h4>
          <ul className="text-sm space-y-1">
            {analysis.contentComparison.originalContent.map(topic => (
              <li key={topic} className="text-muted-foreground">{topic}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">AP Content</h4>
          <ul className="text-sm space-y-1">
            {analysis.contentComparison.apContent.map(topic => (
              <li key={topic} className="text-muted-foreground">{topic}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4">
        <h4 className="font-medium mb-2">Comparison</h4>
        <p className="text-sm text-muted-foreground">
          {analysis.contentComparison.narrativeComparison}
        </p>
      </div>
    </Card>
  )
}

export function ResultsPage() {
  const { state } = useLocation()
  const analysis = state?.analysis

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Your Results</h2>
          <div className="p-6 bg-card rounded-lg border">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Overall GPA Equivalent</h3>
              <p className="text-4xl font-bold">{analysis.cumulativeGPA.toFixed(2)}/4.0</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Subject Analysis</h3>
          <div className="grid gap-6">
            {analysis.subjectMatches.map((subject) => (
              <SubjectResult key={subject.original} analysis={subject} />
            ))}
          </div>
        </div>

        <Button className="w-full" size="lg">
          Download Full Report
        </Button>
      </div>
    </div>
  )
} 