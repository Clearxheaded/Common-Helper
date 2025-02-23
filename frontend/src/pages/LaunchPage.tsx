import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, Calculator, BookOpen, FileText } from "lucide-react"
import frontEndGraphic from "@/assets/front-end-graphic.png"

export function LaunchPage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: <Calculator className="h-8 w-8 mb-4 text-primary" />,
      title: "GPA Made Simple",
      description: "Upload your grades, get an accurate US-equivalent GPA—no guesswork."
    },
    {
      icon: <BookOpen className="h-8 w-8 mb-4 text-primary" />,
      title: "Match Your Subjects",
      description: "See how your courses compare to US high school and AP classes."
    },
    {
      icon: <FileText className="h-8 w-8 mb-4 text-primary" />,
      title: "Comprehensive Report",
      description: "Get a full report with your GPA and course equivalencies for easy applications."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container px-4 py-24 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
              Simplify Your College Application Journey
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl">
              Easily convert your grades, calculate your GPA, and compare your courses to US standards.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/country')}
              className="relative overflow-hidden bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(0,0,0,0.1)] group"
            >
              <span className="relative z-10 flex items-center">
                Get Started 
                <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
          <div className="hidden lg:block">
            <img 
              src={frontEndGraphic} 
              alt="Grade conversion illustration" 
              className="w-full h-[600px] object-contain rounded-lg bg-gradient-to-br from-primary/20 to-primary/5"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container px-4 py-24 mx-auto bg-slate-50 dark:bg-slate-900/50 rounded-3xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            About the Software
          </h2>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Save over $200 on GPA evaluations and course translations with our AI-powered solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="text-center flex flex-col items-center justify-center min-h-[280px] space-y-6">
                <div className="rounded-full bg-primary/10 p-4 mb-2">
                  {feature.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-24">
        <div className="container px-4 py-8 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Common Helper. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="link" size="sm">Privacy Policy</Button>
              <Button variant="link" size="sm">Terms of Service</Button>
              <Button variant="link" size="sm">Contact</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 