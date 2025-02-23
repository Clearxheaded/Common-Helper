import { Button } from "@/components/ui/button"
import { useLocation } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { generateReport } from "@/services/reportGenerator"
import { Download, Award, BookOpen, ArrowRight, CheckCircle } from "lucide-react"

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
    <Card className="p-6 space-y-6 hover:shadow-lg transition-all duration-300 border-2">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">{analysis.original}</h3>
          </div>
          <div className="px-3 py-1.5 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold">{analysis.grade}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>Equivalent to:</span>
          <span className="font-medium text-foreground flex items-center gap-2">
            {analysis.equivalent}
            <ArrowRight className="h-4 w-4" />
            GPA: {analysis.gpaEquivalent.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Content Match</span>
          <span className="text-sm font-medium">{analysis.matchPercentage}%</span>
        </div>
        <Progress 
          value={analysis.matchPercentage} 
          className="h-2 bg-primary/20" 
        />
      </div>

      <div className="grid grid-cols-2 gap-6 pt-4 border-t">
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-md">
              <CheckCircle className="h-4 w-4 text-primary" />
            </div>
            Original Content
          </h4>
          <ul className="space-y-2">
            {analysis.contentComparison.originalContent.map(topic => (
              <li key={topic} className="text-sm text-muted-foreground pl-4 border-l-2 border-primary/20">
                {topic}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <div className="p-1.5 bg-primary/10 rounded-md">
              <CheckCircle className="h-4 w-4 text-primary" />
            </div>
            AP Content
          </h4>
          <ul className="space-y-2">
            {analysis.contentComparison.apContent.map(topic => (
              <li key={topic} className="text-sm text-muted-foreground pl-4 border-l-2 border-primary/20">
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4 border-t">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-md">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          Detailed Comparison
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {analysis.contentComparison.narrativeComparison}
        </p>
      </div>
    </Card>
  )
}

export function ResultsPage() {
  const { state } = useLocation()
  const analysis = state?.analysis

  const handleDownload = () => {
    const doc = generateReport(analysis);
    doc.save('grade-conversion-report.pdf');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header with GPA */}
          <div className="text-center space-y-6">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
              <Award className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-4xl font-bold">Your Results</h2>
            <Card className="max-w-md mx-auto overflow-hidden">
              <div className="p-6 text-center space-y-2">
                <h3 className="text-xl font-semibold text-muted-foreground">Overall GPA Equivalent</h3>
                <p className="text-6xl font-bold text-primary">
                  {analysis.cumulativeGPA.toFixed(2)}
                  <span className="text-2xl text-muted-foreground">/4.0</span>
                </p>
              </div>
            </Card>
          </div>

          {/* Subject Analysis */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Subject Analysis</h3>
              <Button 
                onClick={handleDownload}
                className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20"
              >
                <Download className="h-4 w-4" />
                Download Report
              </Button>
            </div>
            <div className="grid gap-6">
              {analysis.subjectMatches.map((subject: any) => (
                <SubjectResult key={subject.original} analysis={subject} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 