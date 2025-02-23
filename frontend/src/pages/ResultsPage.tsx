import { Button } from "@/components/ui/button"

interface SubjectResultProps {
  subject: string
  percentage: number
  description: string
}

function SubjectResult({ subject, percentage, description }: SubjectResultProps) {
  return (
    <div className="space-y-4 p-6 border rounded-lg">
      <h3 className="text-xl font-semibold">{subject}</h3>
      <div className="relative h-4 bg-secondary rounded-full overflow-hidden">
        <div 
          className="absolute h-full bg-primary transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between text-sm">
        <span>Equivalency</span>
        <span>{percentage}%</span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export function ResultsPage() {
  const dummyResults = [
    {
      subject: "Mathematics",
      percentage: 85,
      description: "Strong alignment with AP Calculus AB curriculum. Covers advanced topics in calculus and analytical geometry.",
    },
    {
      subject: "Physics",
      percentage: 90,
      description: "Excellent match with AP Physics 1. Comprehensive coverage of mechanics and electromagnetic principles.",
    },
    {
      subject: "Chemistry",
      percentage: 75,
      description: "Good correlation with AP Chemistry. Some advanced topics may require supplementary study.",
    },
    {
      subject: "Biology",
      percentage: 80,
      description: "Strong match with AP Biology. Covers most major concepts with adequate depth.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Your Results</h2>
          <div className="p-6 bg-card rounded-lg border">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Overall GPA Equivalent</h3>
              <p className="text-4xl font-bold">3.7/4.0</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Subject Analysis</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {dummyResults.map((result) => (
              <SubjectResult key={result.subject} {...result} />
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